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

import eu.europa.osha.barometer.bean.model.Country;

public class DataAccess {
	
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
	
	public DataAccess() {
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
	 * Queries for the Web Server
	 */
	
	/**
	 * Return list of countries that have data for the indicators for a certain chart or chart group
	 */
	public List<Country> getIndicatorCountries(List<String> pChartID, List<String> pCountryToExclude)
	{
		List<Country> countriesList = new ArrayList<Country>();
		
		StringBuilder queryBuilder = new StringBuilder("select distinct n.country_code AS code, n.literal_id AS literalID, t.text AS name FROM indicators_by_chart ibc, value v, profile p, nuts n, translation t");
		Map<String, List<String>> queryClauses = new HashMap<String, List<String>>();
		
		/*
		 * Filter query - mandatory
		 */
		fillInFiltersInQuery(pChartID, queryClauses, "ibc.chart_id", false);
		
		/*
		 * Filter query - optional
		 */
		fillInFiltersInQuery(pCountryToExclude, queryClauses, "n.country_code", true);	
		
		/*
		 * Where clauses
		 */
		ArrayList<String> paramValues = new ArrayList<String>();
		queryBuilder.append(" where ibc.indicator_id=v.indicator_id and ibc.dataset_id=v.dataset_id and v.profile_id=p.id and p.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN'");
		
		int counter = 0;
		queryBuilder.append(" and ");
		for(String clause : queryClauses.keySet())
		{
			queryBuilder.append(clause);
			int clauseValuesSize = queryClauses.get(clause).size();
			for(int i = 0; i < clauseValuesSize; i ++)
			{
				String clauseValue = queryClauses.get(clause).get(i);
				paramValues.add(clauseValue);
				queryBuilder.append("?");
				if(i < (clauseValuesSize - 1))
				{
					queryBuilder.append(",");
				}
			}
			if(counter < queryClauses.keySet().size() - 1)
			{
				queryBuilder.append(") and ");
			}
			counter ++;
		}
		
		if (pChartID.indexOf("20010") > -1)
		{
			// The page is Economic and Sector Profile, Switzerland and Norway must go at the end of the list
			queryBuilder.append(")");
		}
		else
		{
			queryBuilder.append(") order by n.country_code asc");
		}
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt + " " + Arrays.toString(paramValues.toArray()));
		System.out.println(queryBuilderTxt);
		
		/*
		 * Run query
		 */	
		runQuery(countriesList, queryBuilderTxt, paramValues);
		
		return countriesList;
	}
	
	public List<Country> getCountriesMatrixPage(List<String> pPage, List<String> pCountryToExclude)
	{
		List<Country> countriesList = new ArrayList<Country>();
		
		StringBuilder queryBuilder = new StringBuilder("select distinct n.country_code AS code, n.literal_id AS literalID, t.text AS name FROM matrix_page mp, nuts n, translation t");
		Map<String, List<String>> queryClauses = new HashMap<String, List<String>>();
		
		/*
		 * Filter query - mandatory
		 */
		fillInFiltersInQuery(pPage, queryClauses, "mp.page", false);
		
		/*
		 * Filter query - optional
		 */
		fillInFiltersInQuery(pCountryToExclude, queryClauses, "n.country_code", true);
		
		/*
		 * Where clauses
		 */
		ArrayList<String> paramValues = new ArrayList<String>();
		queryBuilder.append(" where mp.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN'");
		
		int counter = 0;
		queryBuilder.append(" and ");
		for(String clause : queryClauses.keySet())
		{
			queryBuilder.append(clause);
			int clauseValuesSize = queryClauses.get(clause).size();
			for(int i = 0; i < clauseValuesSize; i ++)
			{
				String clauseValue = queryClauses.get(clause).get(i);
				paramValues.add(clauseValue);
				queryBuilder.append("?");
				if(i < (clauseValuesSize - 1))
				{
					queryBuilder.append(",");
				}
			}
			if(counter < queryClauses.keySet().size() - 1)
			{
				queryBuilder.append(") and ");
			}
			counter ++;
		}
		queryBuilder.append(") order by field(n.country_code, 'EU28') desc, n.country_code asc");
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt + " " + Arrays.toString(paramValues.toArray()));
		
		/*
		 * Run query
		 */	
		runQuery(countriesList, queryBuilderTxt, paramValues);
		
		return countriesList;
	}
	
	public List<Country> getCountriesStrategiesPage(List<String> pPage, List<String> pCountryToExclude)
	{
		List<Country> countriesList = new ArrayList<Country>();
		
		StringBuilder queryBuilder = new StringBuilder("select distinct n.country_code AS code, n.literal_id AS literalID, t.text AS name FROM strategies_page sp, nuts n, translation t");
		Map<String, List<String>> queryClauses = new HashMap<String, List<String>>();
		
		/*
		 * Filter query - mandatory
		 */
		fillInFiltersInQuery(pPage, queryClauses, "sp.page", false);
		
		/*
		 * Filter query - optional
		 */
		fillInFiltersInQuery(pCountryToExclude, queryClauses, "n.country_code", true);
		
		/*
		 * Where clauses
		 */
		ArrayList<String> paramValues = new ArrayList<String>();
		queryBuilder.append(" where sp.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN'");
		
		int counter = 0;
		queryBuilder.append(" and ");
		for(String clause : queryClauses.keySet())
		{
			queryBuilder.append(clause);
			int clauseValuesSize = queryClauses.get(clause).size();
			for(int i = 0; i < clauseValuesSize; i ++)
			{
				String clauseValue = queryClauses.get(clause).get(i);
				paramValues.add(clauseValue);
				queryBuilder.append("?");
				if(i < (clauseValuesSize - 1))
				{
					queryBuilder.append(",");
				}
			}
			if(counter < queryClauses.keySet().size() - 1)
			{
				queryBuilder.append(") and ");
			}
			counter ++;
		}
		queryBuilder.append(") order by field(n.country_code, 'EU28') desc, n.country_code asc");
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt + " " + Arrays.toString(paramValues.toArray()));
		
		/*
		 * Run query
		 */	
		runQuery(countriesList, queryBuilderTxt, paramValues);
		
		return countriesList;
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
	
	private void runQuery (List<Country> pCountriesList, String pQueryBuilderTxt, ArrayList<String> pParamValues)
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
			
			String code, name;
			int literalID;
			
			while (rs.next())
			{
				code = rs.getString("code");
				literalID = rs.getInt("literalID");
				name = rs.getString("name");
				
				pCountriesList.add(new Country(code, name, literalID));
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
