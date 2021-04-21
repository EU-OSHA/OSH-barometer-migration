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
import eu.europa.osha.barometer.bean.response.DataServerResponse;
import eu.europa.osha.barometer.bean.response.QueryInfo;
import eu.europa.osha.barometer.dao.MetadataDataAccess;

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
		MetadataDataAccess da = new MetadataDataAccess();
		long t0 = System.currentTimeMillis();
		
		List<ChartMetadata> metadata = da.getChartMetadata(chart);
		
		da.close();
		
		QueryInfo qInfo = new QueryInfo(metadata.size(), System.currentTimeMillis() - t0);
		
		return generateResponse(metadata, qInfo);
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
