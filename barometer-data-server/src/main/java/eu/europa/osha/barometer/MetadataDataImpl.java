package eu.europa.osha.barometer;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;

import eu.europa.osha.barometer.bean.model.ChartMetadata;
import eu.europa.osha.barometer.bean.model.IndicatorMethodology;
import eu.europa.osha.barometer.bean.response.DataServerResponse;
import eu.europa.osha.barometer.bean.response.QueryInfo;
import eu.europa.osha.barometer.dao.MetadataDataAccess;
import eu.europa.osha.barometer.dao.MethodologyDataAccess;

@Path("metadata")
@Produces(MediaType.APPLICATION_JSON)
public class MetadataDataImpl {
	
private static final Logger log = LogManager.getLogger(DataServerImpl.class);
	
	private static int access = 0;
	
	@GET
	@Path("getChartMetadata")
	public String getChartMetadata(
									@Context UriInfo uriInfo,
									@QueryParam("chart") String chart
								)
	{
		log.trace("getChartMetadata");
		log.trace(uriInfo.getQueryParameters());
		
		if (chart == null || chart.equalsIgnoreCase("") || chart.length() == 0)
		{
			return generateErrorResponse(new Exception("No strategies page defined"));
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		MetadataDataAccess da = null;
		List<ChartMetadata> metadata = null;
		QueryInfo qInfo = null;
		try
		{
			da = new MetadataDataAccess();
			long t0 = System.currentTimeMillis();
			
			metadata = da.getChartMetadata(chart);
			
			qInfo = new QueryInfo(metadata.size(), System.currentTimeMillis() - t0);
		}
		catch (Exception e)
		{
			generateErrorResponse(e);
		}
		finally
		{
			if (da != null)
			{
				da.close();
			}
		}
		
		return generateResponse(metadata, qInfo);
	}
	
	@GET
	@Path("getMethodologyIndicators")
	public String getMethodologyIndicators(
											@Context UriInfo uriInfo,
											@QueryParam("section") String section
										)
	{
		log.trace("getMethodologyIndicators");
		log.trace(uriInfo.getQueryParameters());
		
		if (section == null || section.equalsIgnoreCase("") || section.length() == 0)
		{
			return generateErrorResponse(new Exception("No section defined"));
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		MethodologyDataAccess da = null;
		List<IndicatorMethodology> methodology = null;
		QueryInfo qInfo = null;
		try
		{
			da = new MethodologyDataAccess();
			long t0 = System.currentTimeMillis();
			
			methodology = da.getMethodologyIndicators(section);
			
			qInfo = new QueryInfo(methodology.size(), System.currentTimeMillis() - t0);
		}
		catch (Exception e)
		{
			generateErrorResponse(e);
		}
		finally
		{
			if (da != null)
			{
				da.close();
			}
		}
		
		return generateResponse(methodology, qInfo);
	}
	
	@GET
	@Path("getMethodologyData")
	public String getMethodologyData(
											@Context UriInfo uriInfo,
											@QueryParam("section") String section,
											@QueryParam("indicator") Integer indicator
										)
	{
		log.trace("getMethodologyIndicators");
		log.trace(uriInfo.getQueryParameters());
		
		if (section == null || section.equalsIgnoreCase("") || section.length() == 0)
		{
			return generateErrorResponse(new Exception("No section defined"));
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		MethodologyDataAccess da = null;
		List<IndicatorMethodology> methodologyData = null;
		QueryInfo qInfo = null;
		try
		{
			da = new MethodologyDataAccess();
			long t0 = System.currentTimeMillis();
			
			methodologyData = da.getMethodologyData(section, indicator);
			
			qInfo = new QueryInfo(methodologyData.size(), System.currentTimeMillis() - t0);
		
		}
		catch (Exception e)
		{
			generateErrorResponse(e);
		}
		finally
		{
			if (da != null)
			{
				da.close();
			}
		}
		
		return generateResponse(methodologyData, qInfo);
	}
	
	
	
	private String generateResponse(Object pResponseData, QueryInfo pQueryInfo)
	{
		log.trace(pQueryInfo);
		DataServerResponse response = new DataServerResponse();
		response.setResponseData(pResponseData);
		response.setQueryInfo(pQueryInfo);
		
		String responseTxt = response.toJSON();
		log.trace(responseTxt);
		ThreadContext.pop();
		return responseTxt;
	}
	
	private String generateErrorResponse(Exception e){
		log.error("Data-Server error ", e.getMessage());
		DataServerResponse response = new DataServerResponse();
		response.setError(e);
		
		String responseTxt = response.toJSON();
		log.trace(responseTxt);
		return responseTxt;
	}

}
