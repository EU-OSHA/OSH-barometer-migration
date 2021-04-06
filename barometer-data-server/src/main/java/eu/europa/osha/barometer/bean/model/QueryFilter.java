package eu.europa.osha.barometer.bean.model;

import java.util.List;

public class QueryFilter {
	
	private List<String> chart;
	private List<String> indicator;
	
	private String country1;
	private String country2;
	private List<String> countries;
	
	private List<String> ageGroup;
	private List<String> answer;
	private List<String> sector;
	private List<String> gender;
	private List<String> companySize;
	
	public boolean filtersByCountry()
	{
		if (country1 != null || country2 != null)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public String getCountryFilter()
	{
		StringBuilder countryFilter = new StringBuilder();
		if (country1 != null || country2 != null)
		{
			if (country1 != null)
			{
				countryFilter.append("'"+country1+"'");
			}
			if (country2 != null)
			{
				countryFilter.append(",'"+country2+"'");
			}
			countryFilter.append(",'EU28','EU27_2020'");
		}
		return countryFilter.toString();
	}

	public List<String> getChart() {
		return chart;
	}

	public void setChart(List<String> chart) {
		this.chart = chart;
	}

	public List<String> getIndicator() {
		return indicator;
	}

	public void setIndicator(List<String> indicator) {
		this.indicator = indicator;
	}

	public String getCountry1() {
		return country1;
	}

	public void setCountry1(String country1) {
		this.country1 = country1;
	}

	public String getCountry2() {
		return country2;
	}

	public void setCountry2(String country2) {
		this.country2 = country2;
	}

	public List<String> getCountries() {
		return countries;
	}

	public void setCountries(List<String> countries) {
		this.countries = countries;
	}

	public List<String> getSector() {
		return sector;
	}

	public void setSector(List<String> sector) {
		this.sector = sector;
	}
	
	public List<String> getGender() {
		return gender;
	}

	public void setGender(List<String> gender) {
		this.gender = gender;
	}

	public List<String> getAnswer() {
		return answer;
	}

	public void setAnswer(List<String> answer) {
		this.answer = answer;
	}

	public List<String> getAgeGroup() {
		return ageGroup;
	}

	public void setAgeGroup(List<String> ageGroup) {
		this.ageGroup = ageGroup;
	}

	public List<String> getCompanySize() {
		return companySize;
	}

	public void setCompanySize(List<String> companySize) {
		this.companySize = companySize;
	}
}
