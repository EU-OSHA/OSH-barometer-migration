package eu.europa.osha.barometer.bean.model;

public class MatrixPageData {
	
	private Country country;
	private boolean check1, check2, check3, check4;
	private String text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12, text13;
	
	public MatrixPageData(String pCountryCode, String pCountryName, int pCountryLiteralID, boolean pCheck1, boolean pCheck2, boolean pCheck3, boolean pCheck4, String pText1LiteralID, String pText2LiteralID, String pText3LiteralID)
	{
		country = new Country(pCountryCode, pCountryName, pCountryLiteralID);
		
		check1 = pCheck1;
		check2 = pCheck2;
		check3 = pCheck3;
		check4 = pCheck4;
		
		text1 = pText1LiteralID;
		text2 = pText2LiteralID;
		text3 = pText3LiteralID;
	}
	
	public MatrixPageData(String pCountryCode, String pCountryName, int pCountryLiteralID, String pText1LiteralID, String pText2LiteralID, String pText3LiteralID, String pText4LiteralID, String pText5LiteralID, String pText6LiteralID, String pText7LiteralID, String pText8LiteralID, String pText9LiteralID, String pText10LiteralID, String pText11LiteralID, String pText12LiteralID, String pText13LiteralID)
	{
		country = new Country(pCountryCode, pCountryName, pCountryLiteralID);
		
		text1 = pText1LiteralID;
		text2 = pText2LiteralID;
		text3 = pText3LiteralID;
		text4 = pText4LiteralID;
		text5 = pText5LiteralID;
		text6 = pText6LiteralID;
		text7 = pText7LiteralID;
		text8 = pText8LiteralID;
		text9 = pText9LiteralID;
		text10 = pText10LiteralID;
		text11 = pText11LiteralID;
		text12 = pText12LiteralID;
		text13 = pText13LiteralID;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public boolean isCheck1() {
		return check1;
	}

	public void setCheck1(boolean check1) {
		this.check1 = check1;
	}

	public boolean isCheck2() {
		return check2;
	}

	public void setCheck2(boolean check2) {
		this.check2 = check2;
	}

	public boolean isCheck3() {
		return check3;
	}

	public void setCheck3(boolean check3) {
		this.check3 = check3;
	}

	public boolean isCheck4() {
		return check4;
	}

	public void setCheck4(boolean check4) {
		this.check4 = check4;
	}

	public String getText1() {
		return text1;
	}

	public void setText1(String text1) {
		this.text1 = text1;
	}

	public String getText2() {
		return text2;
	}

	public void setText2(String text2) {
		this.text2 = text2;
	}

	public String getText3() {
		return text3;
	}

	public void setText3(String text3) {
		this.text3 = text3;
	}

	public String getText4() {
		return text4;
	}

	public void setText4(String text4) {
		this.text4 = text4;
	}

	public String getText5() {
		return text5;
	}

	public void setText5(String text5) {
		this.text5 = text5;
	}

	public String getText6() {
		return text6;
	}

	public void setText6(String text6) {
		this.text6 = text6;
	}

	public String getText7() {
		return text7;
	}

	public void setText7(String text7) {
		this.text7 = text7;
	}

	public String getText8() {
		return text8;
	}

	public void setText8(String text8) {
		this.text8 = text8;
	}

	public String getText9() {
		return text9;
	}

	public void setText9(String text9) {
		this.text9 = text9;
	}

	public String getText10() {
		return text10;
	}

	public void setText10(String text10) {
		this.text10 = text10;
	}

	public String getText11() {
		return text11;
	}

	public void setText11(String text11) {
		this.text11 = text11;
	}

	public String getText12() {
		return text12;
	}

	public void setText12(String text12) {
		this.text12 = text12;
	}

	public String getText13() {
		return text13;
	}

	public void setText13(String text13) {
		this.text13 = text13;
	}
}
