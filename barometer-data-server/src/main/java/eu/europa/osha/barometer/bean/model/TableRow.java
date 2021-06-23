package eu.europa.osha.barometer.bean.model;

public class TableRow {
	
	private String split;
	private String countryCode;
	private String countryName;
	private Double value;
	
	public String getSplit() {
		return split;
	}
	public void setSplit(String split) {
		this.split = split;
	}
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
	public Double getValue() {
		return value;
	}
	public void setValue(Double value) {
		this.value = value;
	}
	public void valueAdd(Double sum)
	{
		this.value = this.value + sum;
	}
}
