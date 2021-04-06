package eu.europa.osha.barometer;

import java.util.ArrayList;
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

import eu.europa.osha.barometer.bean.model.Country;
import eu.europa.osha.barometer.dao.DataAccess;
import eu.europa.osha.barometer.bean.response.QueryInfo;
import eu.europa.osha.barometer.bean.response.DataServerResponse;

@Path("countries")
@Produces(MediaType.APPLICATION_JSON)
public class DataServerImpl {
	
	private static final Logger log = LogManager.getLogger(DataServerImpl.class);
	
	private static int access = 0;
	
	@GET
	@Path("getIndicatorCountries")
	public String getIndicatorCountries(
											@Context UriInfo uriInfo,
											@QueryParam("chart") List<String> chartID,
											@QueryParam("country") List<String> countryToExclude
										)
	{
		log.trace("getIndicatorCountries");
		log.trace(uriInfo.getQueryParameters());
		
		if (chartID == null || chartID.equals("") || chartID.size() == 0){
			return generateErrorResponse(new Exception("No chart defined"));
		}
		
		// Add UK, EU28 and EU27_2020 to the excluded countries
		if (countryToExclude == null || countryToExclude.equals(""))
		{
			countryToExclude = new ArrayList<String>();
		}
		countryToExclude.add("UK");
		countryToExclude.add("EU28");
		countryToExclude.add("EU27_2020");		
		
		ThreadContext.push(String.valueOf(++access));
		DataAccess da = new DataAccess();
		long t0 = System.currentTimeMillis();
		
		List<Country> countriesList = da.getIndicatorCountries(chartID, countryToExclude);
		
		da.close();
		
		QueryInfo qInfo = new QueryInfo(countriesList.size(), System.currentTimeMillis() - t0);
		
		return generateResponse(countriesList, qInfo);
	}
	
	@GET
	@Path("getCountriesMatrixPage")
	public String getCountriesMatrixPage(
											@Context UriInfo uriInfo,
											@QueryParam("page") List<String> page,
											@QueryParam("country") List<String> countryToExclude
										)
	{
		log.trace("getCountriesMatrixPage");
		log.trace(uriInfo.getQueryParameters());
		
		if (page == null || page.equals("") || page.size() == 0)
		{
			return generateErrorResponse(new Exception("No matrix page defined"));
		}
		
		// Add UK to the excluded countries
		if (countryToExclude == null || countryToExclude.equals(""))
		{
			countryToExclude = new ArrayList<String>();
		}
		countryToExclude.add("UK");
		
		ThreadContext.push(String.valueOf(++access));
		DataAccess da = new DataAccess();
		long t0 = System.currentTimeMillis();
		
		List<Country> countriesList = da.getCountriesMatrixPage(page, countryToExclude);
		
		da.close();
		
		QueryInfo qInfo = new QueryInfo(countriesList.size(), System.currentTimeMillis() - t0);
		
		return generateResponse(countriesList, qInfo);
	}
	
	@GET
	@Path("getCountriesStrategiesPage")
	public String getCountriesStrategiesPage(
											@Context UriInfo uriInfo,
											@QueryParam("page") List<String> page,
											@QueryParam("country") List<String> countryToExclude
										)
	{
		log.trace("getCountriesStrategiesPage");
		log.trace(uriInfo.getQueryParameters());
		
		System.out.println(page);
		
		if (page == null || page.equals("") || page.size() == 0)
		{
			return generateErrorResponse(new Exception("No strategies page defined"));
		}
		
		// Add UK to the excluded countries
		if (countryToExclude == null || countryToExclude.equals(""))
		{
			countryToExclude = new ArrayList<String>();
		}
		countryToExclude.add("UK");
		
		ThreadContext.push(String.valueOf(++access));
		DataAccess da = new DataAccess();
		long t0 = System.currentTimeMillis();
		
		List<Country> countriesList = da.getCountriesStrategiesPage(page, countryToExclude);
		
		da.close();
		
		QueryInfo qInfo = new QueryInfo(countriesList.size(), System.currentTimeMillis() - t0);
		
		return generateResponse(countriesList, qInfo);
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
