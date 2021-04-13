package eu.europa.osha.barometer.bean.model;

public class Indicator {
	
	private int id;
	private int literalID;
	
	public Indicator (int pId, int pLiteralID)
	{
		id = pId;
		literalID = pLiteralID;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getLiteralID() {
		return literalID;
	}
	public void setLiteralID(int literalID) {
		this.literalID = literalID;
	}
}
