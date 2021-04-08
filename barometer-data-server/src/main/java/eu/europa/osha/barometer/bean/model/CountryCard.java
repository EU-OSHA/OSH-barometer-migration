package eu.europa.osha.barometer.bean.model;

import java.util.HashMap;

public class CountryCard {
	
	private String countryCode, countryName;
	private HashMap<String, Double> data = new HashMap<String, Double>();
	
	
	public String getCountryCode() {
		return countryCode;
	}
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}	
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	public HashMap<String, Double> getData() {
		return data;
	}
	public void setData(HashMap<String, Double> data) {
		this.data = data;
	}
	
	public void addData(String pIndicatorName, double pValue)
	{
		// If indicator is Job Satisfaction, and it has already been added, sum the two values
		if (data.get(pIndicatorName) != null && pIndicatorName.equalsIgnoreCase("Job satisfaction"))
		{
			data.put(pIndicatorName, data.get(pIndicatorName)+pValue);
		}
		else
		{
			data.put(pIndicatorName, pValue);
		}
	}
}