package eu.europa.osha.barometer.bean.model;

public class IndicatorMethodology {
	
	private int indicatorID;
	
	private Integer datasetID;
	private String dataset;
	
	// This data will be populated with the literal IDs
	private String diagram;
	private String description;
	private String datasource;
	private String specificTable;
	private String url;
	private String optionsApplied;
	private String referenceYear;
	private String lastUpdate;
	private String coverage;
	private String unitMeasure;
	private String calculations;
	private String visualisation;
	private String additionalComments;
	
	
	public int getIndicatorID() {
		return indicatorID;
	}
	public void setIndicatorID(int indicatorID) {
		this.indicatorID = indicatorID;
	}
	public Integer getDatasetID() {
		return datasetID;
	}
	public void setDatasetID(Integer datasetID) {
		this.datasetID = datasetID;
	}
	public String getDataset() {
		return dataset;
	}
	public void setDataset(String dataset) {
		this.dataset = dataset;
	}
	public String getDiagram() {
		return diagram;
	}
	public void setDiagram(String diagram) {
		this.diagram = diagram;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDatasource() {
		return datasource;
	}
	public void setDatasource(String datasource) {
		this.datasource = datasource;
	}
	public String getSpecificTable() {
		return specificTable;
	}
	public void setSpecificTable(String specificTable) {
		this.specificTable = specificTable;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getOptionsApplied() {
		return optionsApplied;
	}
	public void setOptionsApplied(String optionsApplied) {
		this.optionsApplied = optionsApplied;
	}
	public String getReferenceYear() {
		return referenceYear;
	}
	public void setReferenceYear(String referenceYear) {
		this.referenceYear = referenceYear;
	}
	public String getLastUpdate() {
		return lastUpdate;
	}
	public void setLastUpdate(String lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
	public String getCoverage() {
		return coverage;
	}
	public void setCoverage(String coverage) {
		this.coverage = coverage;
	}
	public String getUnitMeasure() {
		return unitMeasure;
	}
	public void setUnitMeasure(String unitMeasure) {
		this.unitMeasure = unitMeasure;
	}
	public String getCalculations() {
		return calculations;
	}
	public void setCalculations(String calculations) {
		this.calculations = calculations;
	}
	public String getVisualisation() {
		return visualisation;
	}
	public void setVisualisation(String visualisation) {
		this.visualisation = visualisation;
	}
	public String getAdditionalComments() {
		return additionalComments;
	}
	public void setAdditionalComments(String additionalComments) {
		this.additionalComments = additionalComments;
	}
	
	/*m.dataset_id, d.source, i.literal_id, 
	m.indicator_name_displayed_literal_id as diagram, 
	m.description_literal_id as description, 
	m.source_methodology_literal_id as datasource, 
	m.specific_table_literal_id as specific_table, 
	m.url_literal_id as url, 
	m.filtering_options_literal_id as options_applied, 
	m.reference_year_literal_id as reference_year, 
	m.last_update_literal_id as last_update, 
	m.coverage_literal_id as coverage, 
	m.unit_measure_literal_id as unit_measure, 
	m.calculations_literal_id as calculations, 
	m.visualisation_literal_id as visualisation, 
	m.additional_comments_literal_id as additional_comments*/

}
