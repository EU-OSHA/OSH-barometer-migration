package eu.europa.osha.barometer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import eu.europa.osha.barometer.bean.model.IndicatorData;
import eu.europa.osha.barometer.bean.model.QueryFilter;

public class QuantitativeDataAccess {

	private static final Logger log = LogManager.getLogger(DataAccess.class);
	private Connection con = null;
	
	private static Context ctx;
	private static DataSource ds;
	static{
		try {
			ctx = (Context) new InitialContext();
			ds = (DataSource) ctx.lookup("java:comp/env/jdbc/osha_dvt");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public QuantitativeDataAccess() {
		init();
	}
	
	private void init() {
		try {
			con = ds.getConnection();
			log.trace("connection ++");
		} catch (Exception e) { 
			e.printStackTrace();
		}
	}
	
	public void close() {
		log.trace("connection --");
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/*
	 * Queries for the web server
	 */
	public List<IndicatorData> getIndicatorData(QueryFilter pQueryFilter)
	{
		List<IndicatorData> data = new ArrayList<IndicatorData>();
		
		StringBuilder queryBuilder = new StringBuilder();
		Map<String, List<String>> queryClauses = new HashMap<String, List<String>>();
		ArrayList<String> paramValues = new ArrayList<String>();
		
		// When the country goes in the legend, the code is placed first
		// When it is displayed in the chart, the name is placed first
		boolean countryCodeFirst = true;
		
		/*
		 * We will build the query with 4 different StringBuilders
		 * The first will have the SELECT part, the second will have the FROM part
		 * the third will have the WHERE part, the last will have the ORDER BY part
		 */
		StringBuilder selectBuilder = new StringBuilder();
		StringBuilder fromBuilder = new StringBuilder();
		StringBuilder whereBuilder = new StringBuilder();
		StringBuilder orderBuilder = new StringBuilder();
		
		// All the FROM statements will start the same for all the queries
		fromBuilder.append("from indicators_by_chart ibc, value v, profile p, nuts n, translation t ");
		
		// All the WHERE statements will start the same for all the queries
		whereBuilder.append("where ibc.indicator_id=v.indicator_id and ibc.dataset_id=v.dataset_id and v.profile_id=p.id " +
							"and p.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN' ");	
		
		
		int chartID = -1;
		
		if (pQueryFilter.getChart().size() == 1)
		{
			chartID = Integer.parseInt(pQueryFilter.getChart().get(0));
		}
		
		// If country1 and country2 are null, the query will return data for all the countries except UK
		if (pQueryFilter.getCountry1() == null && pQueryFilter.getCountry2() == null)
		{
			// The country will not be displayed in the legend of the chart
			countryCodeFirst = false;
			
			// The chart will show the data for all the countries that have data
			if (chartID == 20023) {
				// The filter is the trend
				selectBuilder.append("select p.trend as Trend, n.country_code as countryCode, t.text as countryName, v.value as Value ");
				whereBuilder.append("and n.country_code NOT IN ('UK') ");
				
				orderBuilder.append("order by field(n.country_code, 'EU27_2020','EU28') desc, FIELD(n.country_code, 'CH', 'IS', 'NO'), n.country_code ASC ");
			}
			else if (chartID == 20038 || chartID == 20039 || chartID == 20040 || chartID == 20053 || chartID == 20054 || 
					chartID == 20055 || chartID == 20056 || chartID == 20073 || chartID == 20074 ||	chartID == 20075 ||
					chartID == 20076 || chartID == 20077 || chartID == 20078 || chartID == 20079)
			{
				// The filter is answer
				selectBuilder.append("select t1.text as Answer, n.country_code as countryCode, t.text as countryName, v.value as Value ");
				fromBuilder.append(", split_answer a, translation t1 ");
				whereBuilder.append("and p.answer_id=a.id and a.literal_id=t1.literal_id and t1.language='EN' and n.country_code NOT IN ('UK') ");
				
				// Add the filter for the answer
				fillInFiltersInQuery(pQueryFilter.getAnswer(), queryClauses, "a.id", false);
				
				orderBuilder.append("order by field(n.country_code, 'EU27_2020','EU28') desc, FIELD(n.country_code, 'CH', 'IS', 'NO'), n.country_code asc, "+
									"field(p.answer_id, 97,98,99,1,31,2,32,7,6,8,9,13,12,11,10,14,16,15,17,18,20,19,21,23,22,25,24,26,27,28,29,30) asc");
			}
			else if (chartID == 20091 || chartID == 20092 || chartID == 20093 || chartID == 20094 || chartID == 20095 ||
					chartID == 20096 || chartID == 20097 || chartID == 20098 || chartID == 20099 || chartID == 20100 ||
					chartID == 20103 || chartID == 20104)
			{
				// The filters are answer and activity sector
				// The indicators belong to ESENER
				// For ESENER data, return the data multiplied by 100
				// The sector is not returned in the select
				selectBuilder.append("select t1.text as Answer, n.country_code as countryCode, t.text as countryName, (v.value*100) as Value ");
				fromBuilder.append(", split_answer a, translation t1 ");
				whereBuilder.append("and p.answer_id=a.id and a.literal_id=t1.literal_id and t1.language='EN' and n.country_code NOT IN ('AL','ME','MK','RS','TR','UK') ");
				
				// Add the filter for the answer
				fillInFiltersInQuery(pQueryFilter.getAnswer(), queryClauses, "a.id", false);
				
				// Add the filter for the activity sector
				fillInFiltersInQuery(pQueryFilter.getSector(), queryClauses, "p.activity_sector_id", false);
				
				orderBuilder.append("order by field(n.country_code, 'EU27_2020','EU28') desc, FIELD(n.country_code, 'CH', 'IS', 'NO'), n.country_code asc, " + 
									"field(p.answer_id, 97,98,99,1,31,2,32,7,6,8,9,13,12,11,10,14,16,15,17,18,20,19,21,23,22,25,24,26,27,28,29,30) asc");
			}
		}
		else
		{
			// The chart will only show data for one or two countries and EU27_2020 or EU28
			
			if (chartID == 20089)
			{
				// The filter is company size
				selectBuilder.append("select t1.text as Size, n.country_code as countryCode, t.text as countryName, v.value as Value ");
				fromBuilder.append(", split_company_size scs, translation t1 ");
				whereBuilder.append("and p.company_size_id=scs.id and scs.literal_id=t1.literal_id and t1.language='EN' ");
				
				// The order will only include the countries
				orderBuilder.append("order by field(n.country_code, " + pQueryFilter.getCountryFilter() + ") asc, "+
									"p.company_size_id asc");
			}
			else if (chartID == 20102 || chartID == 20105 || chartID == 20107)
			{
				orderBuilder.append("order by field(n.country_code, " + pQueryFilter.getCountryFilter() + ") asc, p.answer_id ASC");
				
				// The filter is answer and 
				if (pQueryFilter.getSector() != null && pQueryFilter.getSector().size() > 0)
				{
					// Activity Sector
					selectBuilder.append("select t1.text as Sector, n.country_code as countryCode, t.text as countryName, v.value as Value ");
					fromBuilder.append(", split_activity_sector sas, translation t1 ");
					whereBuilder.append("and p.activity_sector_id=sas.id and sas.literal_id=t1.literal_id and t1.language='EN' ");
					
					fillInFiltersInQuery(pQueryFilter.getSector(), queryClauses, "sas.id", false);
					
					orderBuilder.append(", field (p.activity_sector_id, 2,3,4,6,7,18,14) ASC");
				}
				else if (pQueryFilter.getCompanySize() != null && pQueryFilter.getCompanySize().size() > 0)
				{
					// Company Size
					selectBuilder.append("select t1.text as Size, n.country_code as countryCode, t.text as countryName, v.value as Value ");
					fromBuilder.append(", split_company_size scs, translation t1 ");
					whereBuilder.append("and p.company_size_id=scs.id and scs.literal_id=t1.literal_id and t1.language='EN' ");
					
					fillInFiltersInQuery(pQueryFilter.getCompanySize(), queryClauses, "scs.id", false);
					
					orderBuilder.append(", p.company_size_id ASC");
				}
				
				fillInFiltersInQuery(pQueryFilter.getAnswer(), queryClauses, "p.answer_id", false);
			}
			else if (chartID == 20010 || (chartID == 20041 && pQueryFilter.getSector() != null && pQueryFilter.getSector().size() > 0))
			{
				// The filter is activity sector
				selectBuilder.append("select t1.text as Sector, n.country_code as countryCode, t.text as countryName, v.value as Value ");
				fromBuilder.append(", split_activity_sector sas, translation t1 ");
				whereBuilder.append("and p.activity_sector_id=sas.id and sas.literal_id=t1.literal_id and t1.language='EN' ");
				
				// Add the sector IDs to the filter
				if (pQueryFilter.getSector() != null && pQueryFilter.getSector().size() > 0)
				{
					fillInFiltersInQuery(pQueryFilter.getSector(), queryClauses, "sas.id", false);
				}				
				
				// The order will only include the countries
				orderBuilder.append("order by field(n.country_code, " + pQueryFilter.getCountryFilter() + ") asc,"+
									"field(p.activity_sector_id,1,2,3,4,18,6,7,9,10,11,12,13,8) asc");
			}
			else if (chartID == 20041 && pQueryFilter.getGender()!= null && pQueryFilter.getGender().size()>0)
			{
				// The filter is gender
				selectBuilder.append("select t1.text as Gender, n.country_code as countryCode, t.text as countryName, v.value as Value ");
				fromBuilder.append(", split_gender g, translation t1 ");
				whereBuilder.append("and p.gender_id=g.id and g.literal_id=t1.literal_id and t1.language='EN' ");
				
				// Add the gender IDs to the filter
				fillInFiltersInQuery(pQueryFilter.getGender(), queryClauses, "g.id", false);
				
				orderBuilder.append("order by field(n.country_code, " + pQueryFilter.getCountryFilter() + ") asc,"+
									"p.gender_id desc");
			}
			else if (chartID == 20041 && pQueryFilter.getAgeGroup()!= null && pQueryFilter.getAgeGroup().size()>0)
			{
				// The filter is age group
				selectBuilder.append("select t1.text as 'Age group', n.country_code as countryCode, t.text as countryName, v.value as Value ");
				fromBuilder.append(", split_age_group ag, translation t1 ");
				whereBuilder.append("and p.age_group_id=ag.id and ag.literal_id=t1.literal_id and t1.language='EN' ");
				
				// Add the age group IDs to the filter
				fillInFiltersInQuery(pQueryFilter.getAgeGroup(), queryClauses, "ag.id", false);
				
				orderBuilder.append("order by field(n.country_code, " + pQueryFilter.getCountryFilter() + ") asc,"+
									"p.age_group_id asc");
			}
			else if (chartID == 20014 || chartID == 20088 || chartID == 20022)
			{
				// The filter is the year
				selectBuilder.append("select p.year as Year, n.country_code as countryCode, t.text as countryName, v.value as Value ");
				
				// The order will have the countries and the year
				orderBuilder.append("order by field(n.country_code, " + pQueryFilter.getCountryFilter() + ") asc, Year asc");
				
			}
			else if (chartID == 20011 || chartID == 20013 || chartID == 20087)
			{
				// Only the two countries as filter
				selectBuilder.append("select n.country_code as countryCode, t.text as countryName, v.value as Value ");
				
				// The order will only include the countries
				orderBuilder.append("order by field(n.country_code, " + pQueryFilter.getCountryFilter() + ") asc");
			}
			
			List<String> countryFilters = new ArrayList<String>();
			
			// If country1 is null, return an empty list
			if (pQueryFilter.getCountry1() == null)
			{
				return data;
			}
			else 
			{
				countryFilters.add(pQueryFilter.getCountry1());
			}
			
			// country2 can be null
			if (pQueryFilter.getCountry2() != null)
			{
				countryFilters.add(pQueryFilter.getCountry2());
			}
			
			// Add EU27_2020 and EU28 to the countryFilters
			countryFilters.add("EU27_2020");
			countryFilters.add("EU28");
			
			fillInFiltersInQuery(countryFilters, queryClauses, "n.country_code", false);			
		}		
		
		// Add the filter for the chart
		fillInFiltersInQuery(pQueryFilter.getChart(), queryClauses, "ibc.chart_id", false);
		
		// Add the filter for the indicator(s) displayed in the chart
		fillInFiltersInQuery(pQueryFilter.getIndicator(), queryClauses, "ibc.indicator_id", false);
		
		if (selectBuilder.length() > 0)
		{
			// selectBuilder is not empty, so the filters for the query have been set
			int counter = 0;
			if (queryClauses.size() > 0)
			{
				// If queryClauses is not empty, add the clauses to the where statement
				whereBuilder.append(" and ");
				for(String clause : queryClauses.keySet())
				{
					whereBuilder.append(clause);
					int clauseValuesSize = queryClauses.get(clause).size();
					for(int i = 0; i < clauseValuesSize; i ++)
					{
						String clauseValue = queryClauses.get(clause).get(i);
						paramValues.add(clauseValue);
						whereBuilder.append("?");
						if(i < (clauseValuesSize - 1))
						{
							whereBuilder.append(",");
						}
					}
					if(counter < queryClauses.keySet().size() - 1)
					{
						whereBuilder.append(") and ");
					}
					counter ++;
				}
				whereBuilder.append(") ");
			}			
			
			queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + orderBuilder.toString());
			
			String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
			System.out.println(queryBuilderTxt);
			log.trace(queryBuilderTxt + " " + Arrays.toString(paramValues.toArray()));
			
			/*
			 * Run query
			 */	
			runQuery(data, queryBuilderTxt, paramValues, countryCodeFirst);			
		}
		
		return data;
	}
	
	private void fillInFiltersInQuery (List<String> pFilterValues, Map<String, List<String>> pQueryClauses, String pParamName, boolean pExclude)
	{
		// Check if the filterValues is empty or not
		if (pFilterValues != null && pFilterValues.size() > 0)
		{
			// Check if the filter is going to exclude values or not
			if (pExclude == true)
			{
				pQueryClauses.put(pParamName + " not in (", pFilterValues);				
			}
			else
			{
				pQueryClauses.put(pParamName + " in (", pFilterValues);
			}
		}
	}
	
	private void runQuery (List<IndicatorData> pData, String pQueryBuilderTxt, ArrayList<String> pParamValues, boolean pCountryCodeFirst)
	{
		PreparedStatement st = null;
		ResultSet rs = null;
		
		try
		{
			st = con.prepareStatement(pQueryBuilderTxt);
			
			// params
			for (int i=0; i< pParamValues.size(); i++){
				st.setString(i+1, pParamValues.get(i));
			}
			rs = st.executeQuery();
			
			String countryCode = null, countryName;
			String split, splitName = null, auxSplit;
			double value;
			
			ResultSetMetaData rsmeta = rs.getMetaData();
			
			// If the query has 3 columns, the first 2 will be for the country and the 3rd one will have the value
			// 4 columns-> 1st split, 2nd and 3rd country and 4th value
			// 5 columns-> 1st split, 2nd and 3rd country, 4th value and 5th aux split
			int columnCount = rsmeta.getColumnCount();
			if (columnCount == 4 || columnCount == 5)
			{
				splitName = rsmeta.getColumnLabel(1);
			}
			
			// This flags will be set to true if there is data for EU27_2020 or EU28. If there is data for both, the data for EU28 will be removed
			boolean eu27Flag = false;
			boolean eu28Flag = false;
			
			
			while(rs.next())
			{
				IndicatorData iData = new IndicatorData();
				
				if (columnCount == 3)
				{
					countryCode = rs.getString(1);
					countryName = rs.getString(2);
					value = rs.getDouble(3);
					
					iData.setCountry(countryCode, countryName, pCountryCodeFirst);
					iData.setCountryCode(countryCode);
					iData.setValue(value);
				}
				else if (columnCount == 4)
				{
					split = rs.getString(1);
					countryCode = rs.getString(2);
					countryName = rs.getString(3);
					value = rs.getDouble(4);
					
					iData.setSplit(split);
					iData.setCountry(countryCode, countryName, pCountryCodeFirst);
					iData.setCountryCode(countryCode);
					iData.setValue(value);
					iData.setSplitName(splitName);
				}
				else if (columnCount == 5)
				{
					split = rs.getString(1);
					countryCode = rs.getString(2);
					countryName = rs.getString(3);
					value = rs.getDouble(4);
					auxSplit = rs.getString(5);
					
					iData.setSplit(split);
					iData.setCountry(countryCode, countryName, pCountryCodeFirst);
					iData.setCountryCode(countryCode);
					iData.setValue(value);
					iData.setAuxSplit(auxSplit);
					iData.setSplitName(splitName);
				}
				
				// If countryCode is EU27_2020 or EU28, set the flag as true to remove EU28
				if (countryCode != null && countryCode.equalsIgnoreCase("EU27_2020"))
				{
					eu27Flag = true;
				}
				else if (countryCode != null && countryCode.equalsIgnoreCase("EU28"))
				{
					eu28Flag = true;
				}
				
				pData.add(iData);
			}
			
			// Check if both flags for EU27_2020 and EU28 are set to true
			if (eu27Flag && eu28Flag)
			{
				removeEU28(pData);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally 
		{
			if (rs != null){
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		    if (st != null){
		    	try {
					st.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		    }		
		}
	}

	private void removeEU28(List<IndicatorData> pData) {
		// As there can be more than one instance of EU28 (using splits), we must check all the list
		for (int i = 0; i < pData.size(); i++)
		{
			if (pData.get(i).getCountryCode().equalsIgnoreCase("EU28"))
			{
				pData.remove(i);
				i--;
			}
		}		
	}
}
