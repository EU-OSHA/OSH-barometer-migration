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

import eu.europa.osha.barometer.bean.model.CountryCard;
import eu.europa.osha.barometer.bean.model.IndicatorData;
import eu.europa.osha.barometer.bean.model.QueryFilter;
import eu.europa.osha.barometer.bean.model.TableRow;
import eu.europa.osha.barometer.bean.response.DataServerResponse;
import eu.europa.osha.barometer.bean.response.QueryInfo;
import eu.europa.osha.barometer.dao.CountryCardDataAccess;
import eu.europa.osha.barometer.dao.QuantitativeDataAccess;
import eu.europa.osha.barometer.dao.TableDataAccess;

@Path("quantitative")
@Produces(MediaType.APPLICATION_JSON)
public class QuantitativeDataImpl {

private static final Logger log = LogManager.getLogger(QualitativeDataImpl.class);
	
	private static int access = 0;
	
	@GET
	@Path("getChartData")
	public String getIndicatorCountries(
											@Context UriInfo uriInfo,
											@QueryParam("chart") List<String> chart,
											@QueryParam("indicator") List<String> indicator,
											@QueryParam("country1") String country1,
											@QueryParam("country2") String country2,
											@QueryParam("sector") List<String> sector,
											@QueryParam("gender") List<String> gender,
											@QueryParam("answer") List<String> answer,
											@QueryParam("age") List<String> ageGroup,
											@QueryParam("size") List<String> companySize
										)
	{
		log.trace("getChartData");
		log.trace(uriInfo.getQueryParameters());
		
		if (chart == null){
			return generateErrorResponse(new Exception("No chart defined"));
		}	
		
		ThreadContext.push(String.valueOf(++access));
		
		QuantitativeDataAccess da = null;
		List<IndicatorData> data = null;
		QueryInfo qInfo = null;
		try
		{
			da = new QuantitativeDataAccess();
			long t0 = System.currentTimeMillis();
			
			QueryFilter queryFilter = new QueryFilter();
			queryFilter.setChart(chart);
			if (indicator != null && indicator.size() > 0)
			{
				queryFilter.setIndicator(indicator);
			}
			if (country1 != null && country1.length() > 0)
			{
				queryFilter.setCountry1(country1);
			}
			if (country2 != null && country2.length() > 0)
			{
				queryFilter.setCountry2(country2);
			}		
			if (sector != null && sector.size() > 0)
			{
				queryFilter.setSector(sector);
			}
			if (gender != null && gender.size() > 0)
			{
				queryFilter.setGender(gender);
			}
			if (answer != null && answer.size() > 0)
			{
				queryFilter.setAnswer(answer);
			}
			if (ageGroup != null && ageGroup.size() > 0)
			{
				queryFilter.setAgeGroup(ageGroup);
			}
			if (companySize != null && companySize.size() > 0)
			{
				queryFilter.setCompanySize(companySize);
			}
			
			data = da.getIndicatorData(queryFilter);
			
			qInfo = new QueryInfo(data.size(), System.currentTimeMillis() - t0);
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
		
		return generateResponse(data, qInfo);
	}
	
	@GET
	@Path("getRadarChartData")
	public String getRadarChartData(
											@Context UriInfo uriInfo,
											@QueryParam("chart") List<String> chart,
											@QueryParam("country1") String country1,
											@QueryParam("country2") String country2
										)
	{
		log.trace("getRadarChartData");
		log.trace(uriInfo.getQueryParameters());
		
		if (chart == null){
			return generateErrorResponse(new Exception("No chart defined"));
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		CountryCardDataAccess da = null;
		List<CountryCard> data = null;
		QueryInfo qInfo = null;
		try
		{
			da = new CountryCardDataAccess();
			long t0 = System.currentTimeMillis();
			
			QueryFilter queryFilter = new QueryFilter();
			queryFilter.setChart(chart);
			
			if (country1 != null && country1.length() > 0)
			{
				queryFilter.setCountry1(country1);
			}
			
			if (country2 != null && country2.length() > 0)
			{
				queryFilter.setCountry2(country2);
			}
			
			data = da.getRadarChartData(queryFilter);
			
			qInfo = new QueryInfo(data.size(), System.currentTimeMillis() - t0);
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
		
		return generateResponse(data, qInfo);
	}
	
	@GET
	@Path("getCountryCardData")
	public String getCountryCardData(
											@Context UriInfo uriInfo,
											@QueryParam("chart") List<String> chart,
											@QueryParam("country") List<String> country
										)
	{
		log.trace("getCountryCardData");
		log.trace(uriInfo.getQueryParameters());
		
		if (chart == null){
			return generateErrorResponse(new Exception("No chart defined"));
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		CountryCardDataAccess da = null;
		List<CountryCard> data = null;
		QueryInfo qInfo = null;
		try
		{
			da = new CountryCardDataAccess();
			long t0 = System.currentTimeMillis();
			
			QueryFilter queryFilter = new QueryFilter();
			queryFilter.setChart(chart);
			
			if (country != null && country.size() > 0)
			{
				queryFilter.setCountries(country);
			}			
			
			data = da.getCountryCardData(queryFilter);		
			
			qInfo = new QueryInfo(data.size(), System.currentTimeMillis() - t0);
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
		
		return generateResponse(data, qInfo);
	}
	
	@GET
	@Path("getTableData")
	public String getTableData(
											@Context UriInfo uriInfo,
											@QueryParam("chart") List<String> chart,
											@QueryParam("indicator") List<String> indicator,
											@QueryParam("country") String country,
											@QueryParam("sector") List<String> sector,
											@QueryParam("gender") List<String> gender,
											@QueryParam("answer") List<String> answer,
											@QueryParam("age") List<String> ageGroup,
											@QueryParam("size") List<String> companySize,
											@QueryParam("split") String split
										)
	{
		log.trace("getTableData");
		log.trace(uriInfo.getQueryParameters());
		
		if (chart == null){
			return generateErrorResponse(new Exception("No chart defined"));
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		TableDataAccess da = null;
		List<TableRow> data = null;
		QueryInfo qInfo = null;
		try
		{
			da = new TableDataAccess();
			long t0 = System.currentTimeMillis();
			
			QueryFilter queryFilter = new QueryFilter();
			queryFilter.setChart(chart);
			
			if (country != null && country.length() > 0)
			{
				queryFilter.setCountry1(country);
			}
			else
			{
				return generateErrorResponse(new Exception("No country defined"));
			}
			
			if (sector != null && sector.size() > 0)
			{
				queryFilter.setSector(sector);
			}
			if (gender != null && gender.size() > 0)
			{
				queryFilter.setGender(gender);
			}
			if (answer != null && answer.size() > 0)
			{
				queryFilter.setAnswer(answer);
			}
			if (ageGroup != null && ageGroup.size() > 0)
			{
				queryFilter.setAgeGroup(ageGroup);
			}
			if (companySize != null && companySize.size() > 0)
			{
				queryFilter.setCompanySize(companySize);
			}
			if (split != null && split.length() > 0)
			{
				queryFilter.setSplit(split);
			}
			
			data = da.getTableData(queryFilter);		
			
			qInfo = new QueryInfo(data.size(), System.currentTimeMillis() - t0);
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
		
		return generateResponse(data, qInfo);
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
