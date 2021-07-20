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

import eu.europa.osha.barometer.bean.model.ChartMetadata;
import eu.europa.osha.barometer.conf.BarometerConf;

public class MetadataDataAccess {
	
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
	
	public MetadataDataAccess() {
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

	public List<ChartMetadata> getChartMetadata(String chart) {
		List<ChartMetadata> metadata = new ArrayList<ChartMetadata>();
		
		StringBuilder queryBuilder = new StringBuilder("SELECT d.source AS source, YEAR(d.date_from) AS year_from, YEAR (d.date_to) AS year_to "+
														"FROM indicators_by_chart ibc, dataset d "+
														"WHERE ibc.dataset_id=d.id AND ibc.chart_id=?");
		ArrayList<String> paramValues = new ArrayList<String>();
		
		// The chart will be the param for the query
		paramValues.add(chart);
		
		
		String queryBuilderTxt = queryBuilder.toString().replaceAll("\\sand\\s?$", "");
		log.trace(queryBuilderTxt + " " + Arrays.toString(paramValues.toArray()));
		
		/*
		 * Run query
		 */	
		runQuery(metadata, queryBuilderTxt, paramValues);
		
		return metadata;
	}

	private void runQuery(List<ChartMetadata> pMetadata, String pQueryBuilderTxt, ArrayList<String> pParamValues) {
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
			
			while (rs.next())
			{
				ChartMetadata data = new ChartMetadata();
				
				data.setSource(rs.getString("source"));
				data.setYearFrom(rs.getInt("year_from"));
				if (rs.getObject("year_to") != null)
				{
					data.setYearTo(rs.getInt("year_to"));
				}
				
				pMetadata.add(data);
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
