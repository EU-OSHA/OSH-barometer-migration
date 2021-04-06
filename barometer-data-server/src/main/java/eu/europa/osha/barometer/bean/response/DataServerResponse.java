package eu.europa.osha.barometer.bean.response;

import flexjson.JSONSerializer;

public class DataServerResponse {
	
	private boolean isError = false;
	private QueryInfo queryInfo;
	private Object resultset;
	
	
	public QueryInfo getQueryInfo() {
		return queryInfo;
	}
	public void setQueryInfo(QueryInfo queryInfo) {
		this.queryInfo = queryInfo;
	}
	public Object getResultset() {
		return resultset;
	}
	
	public boolean isError() {
		return isError;
	}
	public void setResponseData(Object responseData) {
		this.resultset = responseData;
	}
	
	public void setError(Exception e){
		isError = true;
		this.resultset = e;
	}
	
	public String toJSON(){
		JSONSerializer serializer = new JSONSerializer().exclude("*.class");
		if (isError){
			return serializer.exclude("queryInfo").serialize(this);
			
		}else{
			return serializer.exclude("queryInfo.filter.orderedValues").deepSerialize(this);
		}
	}
	
}
