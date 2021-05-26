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

import eu.europa.osha.barometer.bean.model.Indicator;
import eu.europa.osha.barometer.bean.model.MatrixPageData;
import eu.europa.osha.barometer.bean.model.QualitativeFilter;
import eu.europa.osha.barometer.bean.response.DataServerResponse;
import eu.europa.osha.barometer.bean.response.QueryInfo;
import eu.europa.osha.barometer.dao.QualitativeDataAccess;

@Path("qualitative")
@Produces(MediaType.APPLICATION_JSON)
public class QualitativeDataImpl {
	
	private static final Logger log = LogManager.getLogger(QualitativeDataImpl.class);
	
	private static int access = 0;
	
	@GET
	@Path("getMatrixPageData")
	public String getIndicatorCountries(
											@Context UriInfo uriInfo,
											@QueryParam("page") String page,
											@QueryParam("country") List<String> country,
											@QueryParam("check1") String check1,
											@QueryParam("check2") String check2,
											@QueryParam("check3") String check3,
											@QueryParam("check4") String check4,
											@QueryParam("search") String searchText
										)
	{
		log.trace("getMatrixPageData");
		log.trace(uriInfo.getQueryParameters());
		
		if (page == null || page.equalsIgnoreCase("")){
			return generateErrorResponse(new Exception("No qualitative page defined"));
		}
		
		QualitativeFilter filter = new QualitativeFilter();
		
		if (country != null && country.size() > 0 && !country.equals(""))
		{
			filter.setCountries(country);
		}
		
		if (check1 != null && !check1.equalsIgnoreCase(""))
		{
			filter.setCheck1(check1);
		}
		
		if (check2 != null && !check2.equalsIgnoreCase(""))
		{
			filter.setCheck2(check2);
		}
		
		if (check3 != null && !check3.equalsIgnoreCase(""))
		{
			filter.setCheck3(check3);
		}
		
		if (check4 != null && !check4.equalsIgnoreCase(""))
		{
			filter.setCheck4(check4);
		}
		
		if (searchText != null && !searchText.equals(""))
		{
			filter.setText(searchText);
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		QualitativeDataAccess da = null;
		List<MatrixPageData> matrix = null;
		QueryInfo qInfo = null;
		try
		{
			da = new QualitativeDataAccess();
			long t0 = System.currentTimeMillis();
			
			if (page.equalsIgnoreCase("MATRIX_AUTHORITY") || page.equalsIgnoreCase("MATRIX_STATISTICS") || page.equalsIgnoreCase("MATRIX_STRATEGY"))
			{
				filter.setPageType(page);
				matrix = da.getMatrixPageData("matrix", filter);
			}
			else if (page.equalsIgnoreCase("STRATEGY") || page.equalsIgnoreCase("STRATEGY_ENFOR_CAPACITY") || page.equalsIgnoreCase("STRATEGY_REGULATION"))
			{
				filter.setPageType(page);
				matrix = da.getMatrixPageData("strategies", filter);
			}
			else
			{
				return generateErrorResponse(new Exception("No valid matrix page definded"));
			}
			
			qInfo = new QueryInfo(matrix.size(), System.currentTimeMillis() - t0);
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
		
		return generateResponse(matrix, qInfo);
	}
	
	@GET
	@Path("getStrategiesPageIndicators")
	public String getStrategiesPageIndicators(
											@Context UriInfo uriInfo,
											@QueryParam("page") String page
										)
	{
		log.trace("getStrategiesPageIndicators");
		log.trace(uriInfo.getQueryParameters());
		
		if (page == null || page.equalsIgnoreCase("")){
			return generateErrorResponse(new Exception("No qualitative page defined"));
		}
		
		ThreadContext.push(String.valueOf(++access));
		
		QualitativeDataAccess da = null;
		List<Indicator> indicators = null;
		QueryInfo qInfo = null;
		try
		{
			da = new QualitativeDataAccess();
			long t0 = System.currentTimeMillis();
			
			if (page.equalsIgnoreCase("STRATEGY") || page.equalsIgnoreCase("STRATEGY_ENFOR_CAPACITY") || page.equalsIgnoreCase("STRATEGY_REGULATION"))
			{
				indicators = da.getStrategiesPageIndicators(page);
			}
			else
			{
				return generateErrorResponse(new Exception("No valid strategies page definded"));
			}
			
			qInfo = new QueryInfo(indicators.size(), System.currentTimeMillis() - t0);
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
		
		return generateResponse(indicators, qInfo);
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
