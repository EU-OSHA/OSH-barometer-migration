package eu.europa.osha.barometer.bean.response;

public class QueryInfo {
	
	private int totalRows;
	private long totalTime;
	
	public QueryInfo(int totalRows, long totalTime){
		this.totalRows = totalRows;
		this.totalTime = totalTime;
	}
	public int getTotalRows() {
		return totalRows;
	}
	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}
	public long getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(long totalTime) {
		this.totalTime = totalTime;
	}
	@Override
	public String toString(){
		return String.format("totalRows:%s - totalTime:%s ms.", totalRows, totalTime);
	}

}
