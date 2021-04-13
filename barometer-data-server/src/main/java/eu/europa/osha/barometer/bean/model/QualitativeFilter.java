package eu.europa.osha.barometer.bean.model;

import java.util.List;

public class QualitativeFilter {
	
	private String pageType;
	private List<String> countries;
	private int check1=-1, check2=-1, check3=-1, check4=-1;
	private String text;
	
	
	public String getPageType() {
		return pageType;
	}
	public void setPageType(String pageType) {
		this.pageType = pageType;
	}
	public List<String> getCountries() {
		return countries;
	}
	public void setCountries(List<String> countries) {
		this.countries = countries;
	}
	public int getCheck1() {
		return check1;
	}
	public void setCheck1(String pCheck1) {
		if (pCheck1.equalsIgnoreCase("true") || pCheck1.equalsIgnoreCase("1"))
		{
			this.check1 = 1;
		}
		else if (pCheck1.equalsIgnoreCase("false") || pCheck1.equalsIgnoreCase("0"))
		{
			this.check1 = 0;
		}
			
	}
	public int getCheck2() {
		return check2;
	}
	public void setCheck2(String pCheck2) {
		if (pCheck2.equalsIgnoreCase("true") || pCheck2.equalsIgnoreCase("1"))
		{
			this.check2 = 1;
		}
		else if (pCheck2.equalsIgnoreCase("false") || pCheck2.equalsIgnoreCase("0"))
		{
			this.check2 = 0;
		}
	}
	public int getCheck3() {
		return check3;
	}
	public void setCheck3(String pCheck3) {
		if (pCheck3.equalsIgnoreCase("true") || pCheck3.equalsIgnoreCase("1"))
		{
			this.check3 = 1;
		}
		else if (pCheck3.equalsIgnoreCase("false") || pCheck3.equalsIgnoreCase("0"))
		{
			this.check3 = 0;
		}
	}
	public int getCheck4() {
		return check4;
	}
	public void setCheck4(String pCheck4) {
		if (pCheck4.equalsIgnoreCase("true") || pCheck4.equalsIgnoreCase("1"))
		{
			this.check4 = 1;
		}
		else if (pCheck4.equalsIgnoreCase("false") || pCheck4.equalsIgnoreCase("0"))
		{
			this.check4 = 0;
		}
	}	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	/*
	 * Check if any of the boolean filters is set
	 */
	public boolean checkFiltersSet()
	{
		if (check1 > -1 || check2 > -1 || check3 > -1 || check4 > -1)
		{
			return true;
		}
		else
		{
			return false;
		}		
	}
	
	

}
