package eu.europa.osha.barometer.bean.model;

public class Country {
	
	private String code;
	private String name;
	private int literalID;
	
	public Country (String pCode, String pName, int pLiteralID)
	{
		this.code = pCode;
		this.name = pName;
		this.literalID = pLiteralID;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLiteralID() {
		return literalID;
	}

	public void setLiteralID(int literalID) {
		this.literalID = literalID;
	}
}
