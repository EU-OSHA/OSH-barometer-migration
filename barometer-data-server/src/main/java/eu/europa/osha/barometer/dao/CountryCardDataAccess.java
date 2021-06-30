package eu.europa.osha.barometer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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

import eu.europa.osha.barometer.bean.model.CountryCard;
import eu.europa.osha.barometer.bean.model.QueryFilter;

public class CountryCardDataAccess {

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
	
	public CountryCardDataAccess() {
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
	public List<CountryCard> getCountryCardData(QueryFilter pQueryFilter)
	{
		List<CountryCard> data = new ArrayList<CountryCard>();
		
		int chartID = -1;
		
		if (pQueryFilter.getChart().size() == 1)
		{
			chartID = Integer.parseInt(pQueryFilter.getChart().get(0));
		}
		
		StringBuilder queryBuilder = new StringBuilder();
		
		// Create the 3 builders for the different clauses of the query
		StringBuilder selectBuilder = new StringBuilder();
		StringBuilder fromBuilder = new StringBuilder();
		StringBuilder whereBuilder = new StringBuilder();
		
		selectBuilder.append("select i.name, n.country_code, t.text, v.value ");
		fromBuilder.append("from indicators_by_chart ibc, indicator i, value v, profile p, nuts n, translation t ");
		whereBuilder.append("where ibc.indicator_id=v.indicator_id and v.indicator_id=i.id and ibc.dataset_id=v.dataset_id "+
							"and v.profile_id=p.id and p.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN' ");	
		String order = " order by n.name asc";
		
		if (pQueryFilter.getCountries() != null && pQueryFilter.getCountries().size() > 0)
		{
			// Country filters have been applied
			List<String> countries = pQueryFilter.getCountries();
			
			whereBuilder.append("and n.country_code in ('EU27_2020','EU28'");
			for (int i = 0; i < countries.size(); i++)
			{
				whereBuilder.append(",'"+countries.get(i)+"'");
			}
			whereBuilder.append(")");
		}
		
		if (chartID == 20012)
		{
			// Workforce Profile
			// Each country will have data for 4 different indicators. One of them will get data for three different genders
			// 34 -> Unemployment rate
			// 37 -> Median age of population
			// 38 -> Ageing workers (55 to 64) employment rate
			// 39 -> Total, male and female employment rate
			String indicators[] = {"37","38","39","34"};
			
			whereBuilder.append("and ibc.chart_id="+chartID+" and n.country_code not in ('UK','EU28') ");
			
			for (int i = 0; i < indicators.length; i++)
			{				
				// If the indicator is not the employment rate, run the query withou filtering by gender
				if (indicators[i].equalsIgnoreCase("39"))
				{
					// Genders
					// 1 -> Total
					// 2 -> Male
					// 3 -> Female 
					String genders[] = {"1","2","3"};
					
					String select = "select CONCAT(i.name, ' - ', t1.text), n.country_code, t.text, v.value ";
					fromBuilder.append(", split_gender g, translation t1 ");
					whereBuilder.append("and p.gender_id=g.id and g.literal_id=t1.literal_id and t1.language='EN' ");
					
					for (int j = 0; j < genders.length; j++)
					{						
						queryBuilder.append(select + fromBuilder.toString() + whereBuilder.toString() + "and p.gender_id="+genders[j]+" and i.id="+indicators[i] + " order by n.country_code asc");
						
						String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
						System.out.println(queryBuilderTxt);
						
						runQuery(data, queryBuilderTxt);
						
						queryBuilder = new StringBuilder();
					}
				}
				else
				{
					queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicators[i] + " order by n.country_code asc");
					
					String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
					System.out.println(queryBuilderTxt);
					
					runQuery(data, queryBuilderTxt);
					
					queryBuilder = new StringBuilder();
				}
			}
			
		}
		else if (chartID == 20090)
		{
			// The data for ESENER needs to be multiplied by 100
			selectBuilder = new StringBuilder();
			selectBuilder.append("select i.name, n.country_code, t.text, (v.value*100) ");
			
			// Social Dialogue
			// Each country will have data for 4 different indicators
			// 354 -> E3Q350_1
			// 355 -> E3Q350_2
			// 356 -> E3Q350_3
			// 357 -> E3Q350_4
			String indicators[] = {"354","355","356","357"};
			// Answer will always be Yes (answer_id=1) and Activity Sector will always be All (activity_sector_id=14
			whereBuilder.append("and ibc.chart_id="+chartID+" and p.answer_id=1 and p.activity_sector_id=14 "+
								"and n.country_code not in ('AL','ME','MK','RS','TR','UK') ");
			
			for (int i = 0; i < indicators.length; i++)
			{
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicators[i] + order);
				
				String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
				System.out.println(queryBuilderTxt);
				log.trace(queryBuilderTxt);
				
				runQuery(data, queryBuilderTxt);
				
				queryBuilder = new StringBuilder();
			}			
		}
		else if (chartID == 20026)
		{
			// Health perception of the workers
			// Each country will have 6 different indicators
			// 58 -> Health affected by work
			// 59 -> Health problem in the last 12 months
			// 60 -> More than 15 days of absence
			// 61 -> Sick at working
			// 62 -> Be able to do current job until 60 years old
			// 65 -> Job satisfaction
			// Each indicator will load the value for different answers
			Map<String, List<String>> indicatorAnswers = new HashMap<String, List<String>>();
			indicatorAnswers.put("58", Arrays.asList("106"));
			indicatorAnswers.put("59", null);
			indicatorAnswers.put("60", Arrays.asList("108"));
			indicatorAnswers.put("61", Arrays.asList("1"));
			indicatorAnswers.put("62", Arrays.asList("1"));
			indicatorAnswers.put("65", Arrays.asList("12,13"));
			
			whereBuilder.append("and ibc.chart_id="+chartID+ " and n.country_code not in ('UK')  ");
			
			for (String indicator: indicatorAnswers.keySet())
			{
				// Get the answers for the current indicator
				List<String> answers = indicatorAnswers.get(indicator);
				
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicator+" ");
				
				if (answers != null)
				{
					queryBuilder.append("and p.answer_id IN (");
					for (int i = 0; i < answers.size(); i++)
					{
						if (i > 0)
						{
							queryBuilder.append(",");
						}
						queryBuilder.append(answers.get(i));
					}
					queryBuilder.append(") ");
				}
				queryBuilder.append(order);
				
				String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
				System.out.println(queryBuilderTxt);
				log.trace(queryBuilderTxt);
				
				runQuery(data, queryBuilderTxt);
				
				queryBuilder = new StringBuilder();
			}
		}
		
		return data;
	}
	
	public List<CountryCard> getRadarChartData(QueryFilter pQueryFilter) {
		List<CountryCard> data = new ArrayList<CountryCard>();
		
		int chartID = -1;
		
		if (pQueryFilter.getChart().size() == 1)
		{
			chartID = Integer.parseInt(pQueryFilter.getChart().get(0));
		}
		
		StringBuilder queryBuilder = new StringBuilder();
		
		// Create the 3 builders for the different clauses of the query
		StringBuilder selectBuilder = new StringBuilder();
		StringBuilder fromBuilder = new StringBuilder();
		StringBuilder whereBuilder = new StringBuilder();
		
		selectBuilder.append("select t1.text, n.country_code, t.text, v.value ");
		fromBuilder.append("from indicators_by_chart ibc, indicator i, value v, profile p, nuts n, translation t, translation t1 ");
		whereBuilder.append("where ibc.indicator_id=v.indicator_id and v.indicator_id=i.id and ibc.dataset_id=v.dataset_id "+
							"and v.profile_id=p.id and p.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN' "+
							"and i.literal_id=t1.literal_id and t1.language='EN' ");
		
		// The Radar Charts have data for two countries max, as well as EU27_2020 or EU28			
		if (pQueryFilter.getCountry1() == null && pQueryFilter.getCountry2() == null)
		{
			// No countries have been defined, return empty array of data
			return data;
		}
		
		whereBuilder.append("and n.country_code in (" + pQueryFilter.getCountryFilter() + ") ");
		
		
		if (chartID == 20049)
		{
			// Physical Risk -> Vibrations
			// Each country will have data for 4 different indicators
			// 70 -> Low temperatures
			// 69 -> Temperatures
			// 68 -> Loud Noise
			// 67 -> Vibrations
			String indicators[] = {"70","69","68","67"};
			// Answer will always be Yes (answer_id=1) and Activity Sector will always be All (activity_sector_id=14
			whereBuilder.append("and ibc.chart_id="+chartID+" ");
			
			for (int i = 0; i < indicators.length; i++)
			{
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicators[i] + " order by field (n.country_code,"+pQueryFilter.getCountryFilter()+") ASC");
				
				String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
				System.out.println(queryBuilderTxt);
				log.trace(queryBuilderTxt);
				System.out.println(queryBuilderTxt);
				
				runQuery(data, queryBuilderTxt);
				
				queryBuilder = new StringBuilder();
			}			
		}
		else if (chartID == 20080)
		{
			// Physical Risk -> Ergonomic Risks Eurofound
			// Each country will have 6 different indicators
			// 90 -> Tiring or painful positions
			// 93 -> Repetitive hand or arm movements
			// 92 -> Carrying or moving heavy loads
			// 94 -> Lifting or moving people
			// 91 -> Does your work involve sitting
			// Each indicator will load the value for different answers
			Map<String, List<String>> indicatorAnswers = new HashMap<String, List<String>>();
			indicatorAnswers.put("90", Arrays.asList("14","16"));
			indicatorAnswers.put("93", Arrays.asList("14","16"));
			indicatorAnswers.put("92", Arrays.asList("26"));
			indicatorAnswers.put("94", Arrays.asList("26"));
			indicatorAnswers.put("91", Arrays.asList("14","16"));			

			whereBuilder.append("and ibc.chart_id="+chartID+" ");
			
			for (String indicator: indicatorAnswers.keySet())
			{
				// Get the answers for the current indicator
				List<String> answers = indicatorAnswers.get(indicator);
				
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicator+" ");
				
				if (answers != null)
				{
					queryBuilder.append("and p.answer_id IN (");
					for (int i = 0; i < answers.size(); i++)
					{
						if (i > 0)
						{
							queryBuilder.append(",");
						}
						queryBuilder.append(answers.get(i));
					}
					queryBuilder.append(") order by field (n.country_code,"+pQueryFilter.getCountryFilter()+") ASC");
				}
				String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
				System.out.println(queryBuilderTxt);
				log.trace(queryBuilderTxt);
				
				runQuery(data, queryBuilderTxt);
				
				queryBuilder = new StringBuilder();
			}
		}
		else if (chartID == 20101)
		{
			// The data for ESENER needs to be multiplied by 100
			selectBuilder = new StringBuilder();
			selectBuilder.append("select t1.text, n.country_code, t.text, (v.value*100) ");
			
			// Physical Risk -> Ergonomic Risks ESENER
			// Each country will have data for 4 different indicators
			// 293 -> E3Q200_4
			// 291 -> E3Q200_1
			// 364 -> E3Q200_3
			// 292 -> E3Q200_2
			String indicators[] = {"293","291","364","292"};
			// Answer will always be Yes (answer_id=1) and Activity Sector will always be All (activity_sector_id=14
			whereBuilder.append("and ibc.chart_id="+chartID+" and p.activity_sector_id=14 and p.answer_id=1 ");
			
			for (int i = 0; i < indicators.length; i++)
			{
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicators[i] + " order by field (n.country_code,"+pQueryFilter.getCountryFilter()+") ASC");
				
				String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
				System.out.println(queryBuilderTxt);
				log.trace(queryBuilderTxt);
				
				runQuery(data, queryBuilderTxt);
				
				queryBuilder = new StringBuilder();
			}
		}
		else if (chartID == 20106)
		{
			// The data for ESENER needs to be multiplied by 100
			selectBuilder = new StringBuilder();
			selectBuilder.append("select i.name, n.country_code, t.text, (v.value*100) ");
			
			// Worker involvement ESENER
			// Each country will have 5 different indicators
			// 355 -> E3Q350_2
			// 357 -> E3Q350_4
			// 353 -> E3Q306
			// 361 -> E3Q357
			// 359 -> E3Q353
			// Each indicator will load the value for different answers
			Map<String, List<String>> indicatorAnswers = new HashMap<String, List<String>>();
			indicatorAnswers.put("355", Arrays.asList("1"));
			indicatorAnswers.put("357", Arrays.asList("1"));
			indicatorAnswers.put("353", Arrays.asList("1"));
			indicatorAnswers.put("361", Arrays.asList("97","98"));
			indicatorAnswers.put("359", Arrays.asList("34","20"));
			
			whereBuilder.append("and ibc.chart_id="+chartID+ " and p.activity_sector_id=14  ");
			
			for (String indicator: indicatorAnswers.keySet())
			{
				// Get the answers for the current indicator
				List<String> answers = indicatorAnswers.get(indicator);
				
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicator+" ");
				
				if (answers != null)
				{
					queryBuilder.append("and p.answer_id IN (");
					for (int i = 0; i < answers.size(); i++)
					{
						if (i > 0)
						{
							queryBuilder.append(",");
						}
						queryBuilder.append(answers.get(i));
					}
					queryBuilder.append(") order by field (n.country_code,"+pQueryFilter.getCountryFilter()+") ASC");
				}
				
				String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
				System.out.println(queryBuilderTxt);
				log.trace(queryBuilderTxt);
				
				runQuery(data, queryBuilderTxt);
				
				queryBuilder = new StringBuilder();
			}
			
		}
		else if (chartID == 20069)
		{
			// Worker involvement Eurofound
			// Each country will have data for 4 different indicators
			// 95 -> Trade Union
			// 96 -> Health and Safety delegate or committee
			// 75 -> Regular Meeting
			String indicators[] = {"95","96","75"};
			// Answer will always be Yes (answer_id=1) and Activity Sector will always be All (activity_sector_id=14
			whereBuilder.append("and ibc.chart_id="+chartID+" and p.answer_id=1 ");
			
			for (int i = 0; i < indicators.length; i++)
			{
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString() + "and i.id="+indicators[i] + " order by field (n.country_code,"+pQueryFilter.getCountryFilter()+") ASC");
				
				String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
				System.out.println(queryBuilderTxt);
				log.trace(queryBuilderTxt);
				
				runQuery(data, queryBuilderTxt);
				
				queryBuilder = new StringBuilder();
			}
		}
		
		return data;
	}
	
	private void runQuery(List<CountryCard> pData, String pQueryBuilderTxt)
	{
		PreparedStatement st = null;
		ResultSet rs = null;
		
		try
		{
			st = con.prepareStatement(pQueryBuilderTxt);
			
			rs = st.executeQuery();
			
			String indicatorName, countryCode, countryName;
			double value;			
			
			while(rs.next())
			{
				indicatorName = rs.getString(1);
				countryCode = rs.getString(2);
				countryName = rs.getString(3);
				value = rs.getDouble(4);
				
				if (countryCode.equalsIgnoreCase("EU28"))
				{
					countryCode = "EU27_2020";
					countryName = "EU27_2020";
				}
				
				// Search for the current country in the CountryCard list
				boolean countryFound = false;
				int i = 0;
				while (i < pData.size() && !countryFound)
				{
					// If the country exists in the list, add the value for the current indicato
					if (pData.get(i).getCountryCode().equalsIgnoreCase(countryCode))
					{
						countryFound = true;
						pData.get(i).addData(indicatorName, value);
					}
					i++;
				}
				
				// If the country doesn't exist, add it to the list and add the value for the current indicator
				if (!countryFound)
				{
					CountryCard iData = new CountryCard();
					
					iData.setCountryCode(countryCode);
					iData.setCountryName(countryName);
					iData.addData(indicatorName, value);
					
					pData.add(iData);
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
