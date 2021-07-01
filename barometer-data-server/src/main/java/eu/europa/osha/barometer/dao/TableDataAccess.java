package eu.europa.osha.barometer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import eu.europa.osha.barometer.bean.model.QueryFilter;
import eu.europa.osha.barometer.bean.model.TableRow;

public class TableDataAccess {

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
	
	public TableDataAccess() {
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

	public List<TableRow> getTableData(QueryFilter queryFilter) {
		List<TableRow> data = new ArrayList<TableRow>();
		
		// The chart ID will be the first element of the chartList of the filter
		int chartID = Integer.parseInt(queryFilter.getChart().get(0));
		
		// A flag to check if the query needs to retrieve the split
		// 0 -> No split required
		// 1 -> Split required, but split is not textual
		// 2 -> Split required and split is text
		int needsSplit = 1;
		
		StringBuilder queryBuilder = new StringBuilder();
		ArrayList<String> paramValues = new ArrayList<String>();
		
		// START SELECT STATEMENT
		if (queryFilter.getSplit() == null || queryFilter.getSplit().equalsIgnoreCase("none"))
		{
			// The table will only have columns for the countries and values
			queryBuilder.append("select n.country_code as countryCode, t.text as countryName, v.value as value ");
			needsSplit = 0;			
		}
		else
		{
			// The radar charts will use the indicator as split
			if (queryFilter.getSplit().equalsIgnoreCase("indicator"))
			{
				queryBuilder.append("select i.id as split, n.country_code as countryCode, t.text as countryName,");
				// Depending on the chart, some filters need to be applied
				if (chartID == 20101 || chartID == 20106)
				{
					// The chart shows data for ESENER, add the filter for the questions that will be displayed and for the All activity sector
					queryFilter.setAnswer(Arrays.asList("1","97","98","20","34"));
					queryFilter.setSector(Arrays.asList("14"));
				}
				else
				{
					// The chart shows data for Eurofound, shoy data for some answers
					queryFilter.setAnswer(Arrays.asList("26","14","16","1"));
				}
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("year"))
			{
				queryBuilder.append("select p.year as split, n.country_code as countryCode, t.text as countryName,");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("trend"))
			{
				queryBuilder.append("select p.trend as split, n.country_code as countryCode, t.text as countryName,");
			}
			else
			{
				queryBuilder.append("select t2.text as split, n.country_code as countryCode, t.text as countryName, ");
				needsSplit = 2;
			}
			
			// The charts that use data from ESENER need to multiply its value by 100
			if (chartID == 20102 || chartID == 20103 || chartID == 20104 || chartID == 20105 || chartID == 20107 || chartID == 20091 || chartID == 20092 || chartID == 20093 ||
					chartID == 20094 || chartID == 20095 || chartID == 20096 || chartID == 20097 || chartID == 20098 || chartID == 20099 || chartID == 20100 || chartID == 20101 ||
					chartID == 20106)
			{
				queryBuilder.append("v.value*100 as value ");
			}
			else
			{
				queryBuilder.append("v.value as value ");
			}
		}
		// END SELECT STATEMENT
		// START FROM STATEMENT
		queryBuilder.append("from indicators_by_chart ibc, indicator i, value v, profile p, nuts n, translation t ");
		// Add the split, if necessary
		if (needsSplit == 2)
		{
			if (queryFilter.getSplit().equalsIgnoreCase("sector"))
			{
				queryBuilder.append(", split_activity_sector s, translation t2 ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("size"))
			{
				queryBuilder.append(", split_company_size s, translation t2 ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("answer"))
			{
				queryBuilder.append(", split_answer s, translation t2 ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("gender"))
			{
				queryBuilder.append(", split_gender s, translation t2 ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("age"))
			{
				queryBuilder.append(", split_age_group s, translation t2 ");
			}
		}
		// END FROM STATEMENT
		// START WHERE STATEMENT
		queryBuilder.append("where ibc.indicator_id=i.id and ibc.indicator_id=v.indicator_id and ibc.dataset_id=v.dataset_id and v.profile_id=p.id "+
							"and p.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN' ");
		// add the ID of the chart
		queryBuilder.append("and ibc.chart_id=? ");
		paramValues.add(String.valueOf(chartID));
		// add the country and EU27_2020 and EU28
		queryBuilder.append("and n.country_code IN (?, 'EU28', 'EU27_2020') ");
		paramValues.add(queryFilter.getCountry1());
		// add the relation between the profile and the current tab
		if (needsSplit == 2)
		{
			if (queryFilter.getSplit().equalsIgnoreCase("sector"))
			{
				queryBuilder.append("and p.activity_sector_id=s.id ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("size"))
			{
				queryBuilder.append("and p.company_size_id=s.id ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("answer"))
			{
				queryBuilder.append("and p.answer_id=s.id ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("gender"))
			{
				queryBuilder.append("and p.gender_id=s.id ");
			}
			else if (queryFilter.getSplit().equalsIgnoreCase("age"))
			{
				queryBuilder.append("and p.age_group_id=s.id ");
			}
			
			queryBuilder.append("and s.literal_id=t2.literal_id and t2.language='EN' ");
		}
		// add the filter for answer (if necessary)
		fillInFilters(queryBuilder, paramValues, queryFilter.getAnswer(), "p.answer_id");
		// add the filter for sector (if necessary)
		fillInFilters(queryBuilder, paramValues, queryFilter.getSector(), "p.activity_sector_id");
		// add the filter for company size (if necessary)
		fillInFilters(queryBuilder, paramValues, queryFilter.getCompanySize(), "p.company_size_id");
		// add the filter for age group (if necessary)
		fillInFilters(queryBuilder, paramValues, queryFilter.getAgeGroup(), "p.age_group_id");
		// add the filter for gender (if necessary)
		fillInFilters(queryBuilder, paramValues, queryFilter.getGender(), "p.gender_id");
		// END WHERE STATEMENT
		// START ORDER STATEMENT
		// Depending on the chart, the country displayed first will be EU or the selected country
		if (chartID == 20023 || chartID == 20038 || chartID == 20039 || chartID == 20091 || chartID == 20092 || chartID == 20093 || chartID == 20094 || chartID == 20095 || chartID == 20040
			|| chartID == 20073 || chartID == 20074 || chartID == 20075 || chartID == 20076 || chartID == 20077 || chartID == 20078 || chartID == 20079 || chartID == 20096 || chartID == 20097
			|| chartID == 20098 || chartID == 20099 || chartID == 20100 || chartID == 20053 || chartID == 20054 || chartID == 20055 || chartID == 20056 || chartID == 20103 || chartID == 20104)
		{
			queryBuilder.append("order by field (n.country_code, 'EU27_2020', 'EU28', ?) asc");
		}
		else
		{
			queryBuilder.append("order by field (n.country_code, ?, 'EU27_2020', 'EU28') asc");
		}		
		paramValues.add(queryFilter.getCountry1());
		if (queryFilter.getSplit().equalsIgnoreCase("indicator"))
		{
			queryBuilder.append(", field(v.indicator_id, 67, 68, 69, 70, 293, 291, 292, 364, 90, 91, 92, 93, 94, 353, 357, 355, 361, 359, 75, 95, 96) asc");
		}
		else if (queryFilter.getSplit().equalsIgnoreCase("year"))
		{
			queryBuilder.append(", p.year asc");
		}
		else if (queryFilter.getSplit().equalsIgnoreCase("trend"))
		{
			queryBuilder.append(", p.trend asc");
		}
		else if (queryFilter.getSplit().equalsIgnoreCase("sector"))
		{
			if (chartID == 20010)
			{
				queryBuilder.append(", field (p.activity_sector_id, 1, 2, 3, 4, 18, 6, 7)");
			}
			else
			{
				queryBuilder.append(", field (p.activity_sector_id, 9, 10, 11, 12, 13, 8, 1, 2, 3, 4, 6, 7, 18, 14) asc");
			}
		}
		else if (queryFilter.getSplit().equalsIgnoreCase("size"))
		{
			queryBuilder.append(", field(p.company_size_id,7,8,10,14,11) asc");
		}
		else if (queryFilter.getSplit().equalsIgnoreCase("answer"))
		{
			queryBuilder.append(", field(p.answer_id, 97,98,99,1,31,2,32,7,6,8,9,13,12,11,10,14,16,15,17,18,20,19,21,23,22,25,24,26,27,28,29,30) asc");
		}
		else if (queryFilter.getSplit().equalsIgnoreCase("gender"))
		{
			queryBuilder.append(", p.gender_id desc");
		}
		else if (queryFilter.getSplit().equalsIgnoreCase("age"))
		{
			queryBuilder.append(", p.age_group_id asc");
		}
		// END ORDER STATEMENT
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		System.out.println(queryBuilderTxt);
		log.trace(queryBuilderTxt + " " + Arrays.toString(paramValues.toArray()));
		
		/*
		 * Run query
		 */	
		runQuery(data, queryBuilderTxt, paramValues, needsSplit);		
		
		return data;
	}

	private void fillInFilters(StringBuilder queryBuilder, ArrayList<String> paramValues, List<String> filter,
			String table) {
		
		if (filter != null && filter.size() > 0)
		{
			queryBuilder.append("and "+table+" in (");
			for (int i = 0; i < filter.size(); i++)
			{
				if (i > 0)
				{
					queryBuilder.append(",");
				}
				queryBuilder.append("?");
				paramValues.add(filter.get(i));
			}
			queryBuilder.append(") ");
		}		
	}

	private void runQuery(List<TableRow> data, String queryBuilderTxt, ArrayList<String> paramValues, int needsSplit) {
		PreparedStatement st = null;
		ResultSet rs = null;
		
		try
		{
			st = con.prepareStatement(queryBuilderTxt);
			
			// params
			for (int i=0; i< paramValues.size(); i++){
				st.setString(i+1, paramValues.get(i));
			}
			
			rs = st.executeQuery();
			
			String split = null, countryCode, countryName;
			double value;
			
			boolean eu27Exists = false;
			
			while(rs.next())
			{
				boolean valueFound = false;
				if (needsSplit != 0)
				{
					split = rs.getString("split");
				}
				countryCode = rs.getString("countryCode");
				countryName = rs.getString("countryName");
				value = rs.getDouble("value");
				
				// Check if the current row already exists to add the new value
				for (int i = 0; i < data.size(); i++)
				{
					TableRow current = data.get(i);
					if (current.getCountryCode().equalsIgnoreCase(countryCode) && split != null && current.getSplit().equalsIgnoreCase(split))
					{
						current.valueAdd(value);
						valueFound = true;
					}
				}
				
				if ((!countryCode.equalsIgnoreCase("EU28") || !eu27Exists) && !valueFound)
				{
					TableRow row = new TableRow();
					
					if (split != null)
					{
						row.setSplit(split);
					}					
					row.setCountryCode(countryCode);
					row.setCountryName(countryName);
					row.setValue(value);
					
					data.add(row);
					
					if (countryName.equalsIgnoreCase("EU27_2020"))
					{
						eu27Exists = true;
					}
				}
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
}
