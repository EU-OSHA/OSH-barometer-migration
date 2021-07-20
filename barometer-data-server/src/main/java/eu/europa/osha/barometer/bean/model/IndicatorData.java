package eu.europa.osha.barometer.bean.model;

public class IndicatorData {
	
	private String country;
	private String countryCode;
	
	private String split;
	private String auxSplit;
	private String splitName;
	
	private Double value;
	
	
	public String getCountry() {
		return country;
	}
	public void setCountry(String countryCode, String countryName, boolean pCountryCodeFirst) {
		// EU27_2020 and EU28 do not need the country code before the country name
		if (countryCode.equalsIgnoreCase("EU27_2020") || countryCode.equals("EU28"))
		{
			this.country = countryCode;
		}
		else if (pCountryCodeFirst)
		{
			this.country = "("+countryCode+") "+countryName;
		}
		else
		{
			this.country = countryName+" ("+countryCode+")";
		}
	}
	
	public String getCountryCode() {
		return countryCode;
	}
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	public String getSplit() {
		return split;
	}
	public void setSplit(String split) {
		this.split = split;
	}
	public String getSplitName() {
		return splitName;
	}
	public void setSplitName(String splitName) {
		this.splitName = splitName;
	}
	public String getAuxSplit() {
		return auxSplit;
	}
	public void setAuxSplit(String auxSplit) {
		this.auxSplit = auxSplit;
	}
	public Double getValue() {
		return value;
	}
	public void setValue(Double value) {
		if (value != null)
		{
			double auxVal = Math.round(value*10);
			
			this.value = auxVal/10;
		}
		else
		{
			this.value = null;
		}		
	}
}
