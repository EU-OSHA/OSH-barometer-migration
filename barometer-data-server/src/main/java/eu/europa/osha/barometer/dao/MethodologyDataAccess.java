package eu.europa.osha.barometer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import eu.europa.osha.barometer.bean.model.IndicatorMethodology;
import eu.europa.osha.barometer.conf.BarometerConf;

public class MethodologyDataAccess {
	
	private static final Logger log = LogManager.getLogger(DataAccess.class);
	private Connection con = null;
	
	private static Context ctx;
	private static DataSource ds;
	static{
		try {
			ctx = (Context) new InitialContext();
			ds = (DataSource) ctx.lookup(BarometerConf.getBarometerConf("eu.europa.osha.barometer.jdbc"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public MethodologyDataAccess() {
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
	public List<IndicatorMethodology> getMethodologyIndicators(String pSection)
	{
		List<IndicatorMethodology> data = new ArrayList<IndicatorMethodology>();
		
		StringBuilder queryBuilder = new StringBuilder();
		
		queryBuilder.append("select i.id as indicator_id, m.indicator_name_displayed_literal_id as name "+
							"from indicator i, methodology m, section s "+
							"where m.section_id=s.id and s.name=? and m.indicator_id=i.id "+
							"order by m.id asc");
		
		ArrayList<String> paramValues = new ArrayList<String>();
		paramValues.add(pSection);
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt);
		System.out.println(queryBuilderTxt);
		
		runQuery("methodologyIndicators", data, queryBuilderTxt, paramValues);
		
		return data;
	}
	
	public List<IndicatorMethodology> getMethodologyData(String pSection, Integer pIndicatorID)
	{
		List<IndicatorMethodology> data = new ArrayList<IndicatorMethodology>();
		
		StringBuilder queryBuilder = new StringBuilder();
		ArrayList<String> paramValues = new ArrayList<String>();
		
		queryBuilder.append("select m.indicator_id as indicator_id, m.dataset_id as dataset_id, d.source as dataset, m.indicator_name_displayed_literal_id as diagram, "+
							"m.description_literal_id as description, m.source_methodology_literal_id as datasource, m.specific_table_literal_id as specific_table, "+
							"m.url_literal_id as url, m.filtering_options_literal_id as options_applied, m.reference_year_literal_id as reference_year, "+
							"m.last_update_literal_id as last_update, m.coverage_literal_id as coverage, m.unit_measure_literal_id as unit_measure, "+
							"m.calculations_literal_id as calculations, m.visualisation_literal_id as visualisation, m.additional_comments_literal_id as additional_comments "+
							"from methodology m, dataset d, section s "+
							"where m.section_id=s.id and m.dataset_id=d.id and s.name=? ");
	
		paramValues.add(pSection);
		// Check if it needs to be filtered by indicator
		if (pIndicatorID != null)
		{
			// The indicator ID filter is defined, add it to the query
			queryBuilder.append("and m.indicator_id=? ");
			
			paramValues.add(pIndicatorID.toString());
		}
		queryBuilder.append("order by m.id asc");
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt);
		System.out.println(queryBuilderTxt);
		
		runQuery("methodologyData", data, queryBuilderTxt, paramValues);
		
		return data;
	}
	
	private void runQuery (String pQueryType, List<IndicatorMethodology> pData, String pQueryBuilderTxt, ArrayList<String> pParamValues)
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
			
			switch (pQueryType)
			{
			case "methodologyIndicators": {
				while (rs.next())
				{
					IndicatorMethodology methodology = new IndicatorMethodology();
					
					if (rs.getObject("indicator_id") != null)
					{
						methodology.setIndicatorID(rs.getInt("indicator_id"));
					}
					methodology.setDiagram(rs.getString("name"));
					
					
					pData.add(methodology);
				}
				
				break;
			}
			case "methodologyData": {
				while (rs.next())
				{					
					IndicatorMethodology methodology = new IndicatorMethodology();
					
					if (rs.getObject("indicator_id") != null)
					{
						methodology.setIndicatorID(rs.getInt("indicator_id"));
					}
					methodology.setDatasetID(rs.getInt("dataset_id"));
					methodology.setDataset(rs.getString("dataset"));
					
					methodology.setDiagram(rs.getString("diagram"));
					methodology.setDescription(rs.getString("description"));
					methodology.setDatasource(rs.getString("datasource"));
					methodology.setSpecificTable(rs.getString("specific_table"));
					methodology.setUrl(rs.getString("url"));
					methodology.setOptionsApplied(rs.getString("options_applied"));
					methodology.setReferenceYear(rs.getString("reference_year"));
					methodology.setLastUpdate(rs.getString("last_update"));
					methodology.setCoverage(rs.getString("coverage"));
					methodology.setUnitMeasure(rs.getString("unit_measure"));
					methodology.setCalculations(rs.getString("calculations"));
					methodology.setVisualisation(rs.getString("visualisation"));
					methodology.setAdditionalComments(rs.getString("additional_comments"));
					
					pData.add(methodology);
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
