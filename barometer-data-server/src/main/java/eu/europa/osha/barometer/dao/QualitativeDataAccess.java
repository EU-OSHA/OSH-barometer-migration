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

import eu.europa.osha.barometer.bean.model.Indicator;
import eu.europa.osha.barometer.bean.model.MatrixPageData;
import eu.europa.osha.barometer.bean.model.QualitativeFilter;

public class QualitativeDataAccess {
	
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
	
	public QualitativeDataAccess() {
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
	
	public List<Indicator> getStrategiesPageIndicators(String pPageType)
	{
		List<Indicator> data = new ArrayList<Indicator>();
		
		StringBuilder queryBuilder = new StringBuilder();
		
		queryBuilder.append("select id, literal_id from indicator i ");
		
		if (pPageType.equalsIgnoreCase("STRATEGY"))
		{
			queryBuilder.append("where i.id IN (46, 47, 48, 49, 50, 98, 51, 99) order by field (i.id ,46, 47, 48, 49, 50, 98, 51, 99)");
		}
		else if (pPageType.equalsIgnoreCase("STRATEGY_ENFOR_CAPACITY"))
		{
			queryBuilder.append("where i.id IN (76,77,78,79,126) order by field (i.id, 126) desc, i.id asc");
		}
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt);
		System.out.println(queryBuilderTxt);
		
		PreparedStatement st = null;
		ResultSet rs = null;
		
		try
		{
			st = con.prepareStatement(queryBuilderTxt);
			
			rs = st.executeQuery();
			
			int id, literalID;
			
			while (rs.next())
			{
				id = rs.getInt("id");
				literalID = rs.getInt("literal_id");
				
				data.add(new Indicator(id, literalID));
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
		
		return data;
	}

	public List<MatrixPageData> getMatrixPageData(String pPageType, QualitativeFilter pFilter) {
		List<MatrixPageData> matrix = new ArrayList<MatrixPageData>();
		
		StringBuilder queryBuilder = new StringBuilder();
		StringBuilder selectBuilder = new StringBuilder();
		StringBuilder fromBuilder = new StringBuilder();
		StringBuilder whereBuilder = new StringBuilder();
		Map<String, List<String>> queryClauses = new HashMap<String, List<String>>();
		ArrayList<String> paramValues = new ArrayList<String>();
		
		switch (pPageType)
		{
			case "matrix": {
				selectBuilder.append("select n.country_code as code, n.literal_id as countryLiteralID, t.text as countryName, mp.check_1 as check1, mp.check_2 as check2, "+
									"mp.check_3 as check3, mp.check_4 as check4, mp.text_1_literal_id as literal1, mp.text_2_literal_id as literal2, mp.text_3_literal_id as literal3 ");
				fromBuilder.append("FROM nuts n, translation t, matrix_page mp ");
				
				/*
				 * Where clauses
				 */
				whereBuilder.append("where mp.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN' and n.country_code NOT IN ('UK') ");
				
				/*
				 * Filter query - mandatory
				 */
				whereBuilder.append("and mp.page='"+pFilter.getPageType()+"' ");
				
				/*
				 * Filter query - optional
				 */
				// Check if any country has been selected
				if (pFilter.getCountries() != null && pFilter.getCountries().size() > 0)
				{
					fillInFiltersInQuery(pFilter.getCountries(), queryClauses, "n.country_code", false);
				}
				
				// Check if any of the checks is set. If so, add the filters for the checks
				if (pFilter.checkFiltersSet())
				{
					// The filters are set, add them to the query
					whereBuilder.append("and (mp.check_1="+pFilter.getCheck1()+" or mp.check_2="+pFilter.getCheck2()+ " " +
							 			"or mp.check_3="+pFilter.getCheck3()+" or mp.check_4="+pFilter.getCheck4()+") ");
				}
				// Check if the user has entered a search to filter by
				if (pFilter.getText() != null && !pFilter.getText().equalsIgnoreCase(""))
				{
					String searchTerm = pFilter.getText();
					fromBuilder.append("left join translation t1 on mp.text_1_literal_id=t1.literal_id "+
										"left join translation t2 on mp.text_2_literal_id=t2.literal_id "+
										"left join translation t3 on mp.text_3_literal_id=t3.literal_id ");
					whereBuilder.append("and (t.text REGEXP '"+searchTerm+"' or t1.text REGEXP '"+searchTerm+"' or t2.text REGEXP '"+searchTerm+"' or t3.text REGEXP '"+searchTerm+"' ");
					// Check if the search term contains any of the values for the checks
					// The checks have different names on the different 
					if(pFilter.getPageType().equalsIgnoreCase("MATRIX_AUTHORITY"))
					{
						if ("osh authority".indexOf(searchTerm.toLowerCase()) > -1)
						{
							whereBuilder.append("or (mp.check_1=true and mp.check_2=false and mp.check_3=false and mp.check_4=false)");
						}
						else if ("compensation and insurance body".indexOf(searchTerm.toLowerCase()) > -1)
						{
							whereBuilder.append("or (mp.check_1=false and mp.check_2=true and mp.check_3=false and mp.check_4=false)");
						}
						else if ("prevention institute".indexOf(searchTerm.toLowerCase()) > -1)
						{
							whereBuilder.append("or (mp.check_1=false and mp.check_2=false and mp.check_3=true and mp.check_4=false)");
						}
						else if ("standardisation body".indexOf(searchTerm.toLowerCase()) > -1)
						{
							whereBuilder.append("or (mp.check_1=false and mp.check_2=false and mp.check_3=false and mp.check_4=true)");
						}
					}
					else if (pFilter.getPageType().equalsIgnoreCase("MATRIX_STRATEGY"))
					{
						if ("implementation record".indexOf(searchTerm.toLowerCase()) > -1)
						{
							whereBuilder.append("or (mp.check_1=true and mp.check_2=false and mp.check_3=false)");
						}
						else if ("prevention of work-related diseases".indexOf(searchTerm.toLowerCase()) > -1)
						{
							whereBuilder.append("or (mp.check_1=false and mp.check_2=true and mp.check_3=false)");
						}
						else if ("tackling demographic change".indexOf(searchTerm.toLowerCase()) > -1)
						{
							whereBuilder.append("or (mp.check_1=false and mp.check_2=false and mp.check_3=true)");
						}
					}
					whereBuilder.append(")");
				}
				queryBuilder.append(selectBuilder.toString() + fromBuilder.toString() + whereBuilder.toString());
				break;
			}
			case "strategies": {
				queryBuilder.append("select n.country_code as code, n.literal_id as countryLiteralID, t.text as countryName, "+
						"sp.text_1_literal_id as literal1, sp.text_2_literal_id as literal2, sp.text_3_literal_id as literal3, sp.text_4_literal_id as literal4, " +
						"sp.text_5_literal_id as literal5, sp.text_6_literal_id as literal6, sp.text_7_literal_id as literal7, sp.text_8_literal_id as literal8, " +
						"sp.text_9_literal_id as literal9, sp.text_10_literal_id as literal10, sp.text_11_literal_id as literal11, sp.text_12_literal_id as literal12, " +
						"sp.text_13_literal_id as literal13 " +
						"FROM strategies_page sp, nuts n, translation t");
				
				/*
				 * Where clauses
				 */
				queryBuilder.append(" where sp.nuts_id=n.id and n.literal_id=t.literal_id and t.language='EN' and n.country_code not in ('UK') ");
				
				/*
				 * Filter query - mandatory
				 */
				queryBuilder.append("and sp.page='"+pFilter.getPageType()+"' ");
				
				/*
				 * Filter query - optional
				 */
				fillInFiltersInQuery(pFilter.getCountries(), queryClauses, "n.country_code", false);
				
				break;
			}
			default: {
				return matrix;
			}
		}
		
		int counter = 0;
		if (queryClauses.size() > 0)
		{
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
			queryBuilder.append(")");
		}		
		queryBuilder.append(" order by field(n.country_code, 'EU28') desc, n.name asc");
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt + " " + Arrays.toString(paramValues.toArray()));
		System.out.println(queryBuilderTxt);
		
		/*
		 * Run query
		 */	
		runQuery(pPageType, matrix, queryBuilderTxt, paramValues);
		
		return matrix;
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
	
	private void runQuery (String pPageType, List<MatrixPageData> pMatrix, String pQueryBuilderTxt, ArrayList<String> pParamValues)
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
			
			String countryCode, countryName;
			int countryLiteralID;
			String text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12, text13;
			boolean check1, check2, check3, check4;
			
			switch (pPageType)
			{
			case "matrix": {
				while (rs.next())
				{
					countryCode = rs.getString("code");
					countryLiteralID = rs.getInt("countryLiteralID");
					countryName = rs.getString("countryName");
					check1 = rs.getBoolean("check1");
					check2 = rs.getBoolean("check2");
					check3 =  rs.getBoolean("check3");
					check4 =  rs.getBoolean("check4");
					text1 = rs.getString("literal1");
					text2 = rs.getString("literal2");
					text3 = rs.getString("literal3");
					
					pMatrix.add(new MatrixPageData(countryCode, countryName, countryLiteralID, check1, check2, check3, check4, text1, text2, text3));
				}
				
				break;
			}
			case "strategies": {
				while (rs.next())
				{
					countryCode = rs.getString("code");
					countryLiteralID = rs.getInt("countryLiteralID");
					countryName = rs.getString("countryName");
					text1 = rs.getString("literal1");
					text2 = rs.getString("literal2");
					text3 = rs.getString("literal3");
					text4 = rs.getString("literal4");
					text5 = rs.getString("literal5");
					text6 = rs.getString("literal6");
					text7 = rs.getString("literal7");
					text8 = rs.getString("literal8");
					text9 = rs.getString("literal9");
					text10 = rs.getString("literal10");
					text11 = rs.getString("literal11");
					text12 = rs.getString("literal12");
					text13 = rs.getString("literal13");
					
					pMatrix.add(new MatrixPageData(countryCode, countryName, countryLiteralID, text1,text2,text3,text4,text5,text6,text7,text8,text9,text10,text11,text12,text13));
				}
				
				break;
			}
			default:{
				// Do nothing
				break;
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
