import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import SpiderChart from '../common/charts/SpiderChart';
import WorkAccidentsChart from '../common/charts/WorkAccidentsChart';
import RiskChart from '../common/charts/RiskChart';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import { overallOpinion, mentalRisk, physicalRiskTabs } from '../../model/subMenuTabs';
import { largeSize, mediumSize } from '../common/utils/chartConfig';
import ChartDataTable from './country-report-sections/ChartDataTable';

import fullReportIcon from '../../style/img/full-report-icon.png';

//Generic Information
import AuthoritiesReport from './country-report-sections/AuthoritiesReport';
import EconomicSectorReport from './country-report-sections/EconomicSectorReport';
import WorkforceProfileReport from './country-report-sections/WorkforceProfileReport';

// Steering of OSH
import SocialDialogueReport from './country-report-sections/SocialDialogueReport';

// OSH Outcomes and working conditions
import HealthPerceptionReport from './country-report-sections/HealthPerceptionReport';

//Steering of OSH
import NationalStrategiesReport from './country-report-sections/NationalStrategiesReport';

//OSH Infrastructure
import EnforcementCapacityReport from './country-report-sections/EnforcementCapacityReport';
import StatisticsReport from './country-report-sections/StatisticsReport';
import OshCultureReport from './country-report-sections/OshCultureReport';

class CountryReport extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			selectedCountryCode: 'AT',
			selectedCountryName: 39
		}
	}

	changeCountry = (event) =>
	{
		this.setState({ selectedCountryCode: event.target.value });
	}

	render()
	{
		return(
			<div className="full-country-report-page">
				<div className="header-logo"></div>
				<table className="full-content-report">
					<thead>
						<tr>
							<td>
								<div className="page-header-space"></div>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<section className="cover-page">
									<div className="content-cover">
										<div className="icon-full-report">
											<img src={fullReportIcon} />
										</div>
										<h1>{this.props.literals.L22020}</h1>
										<h2>{this.props.literals[`L${this.state.selectedCountryName}`]}</h2>
										{/* -- FILTERS -- */}
										<form>
											<label htmlFor="report-country">Select one country</label>
											<select id="report-country" onChange={this.changeCountry} value={this.state.selectedCountryCode}>
												<option value="AT">(AT) Austria</option>
												<option value="BE">(BE) Belgium</option>
												<option value="BG">(BG) Bulgaria</option>
												<option value="CH">(CH) Switzerland</option>
												<option value="CY">(CY) Cyprus</option>
												<option value="CZ">(CZ) Czechia</option>
												<option value="DE">(DE) Germany</option>
												<option value="DK">(DK) Denmark</option>
												<option value="EE">(EE) Estonia</option>
												<option value="EL">(EL) Greece</option>
												<option value="ES">(ES) Spain</option>
												<option value="FI">(FI) Finland</option>
												<option value="FR">(FR) France</option>
												<option value="HR">(HR) Croatia</option>
												<option value="HU">(HU) Hungary</option>
												<option value="IE">(IE) Ireland</option>
												<option value="IS">(IS) Iceland</option>
												<option value="IT">(IT) Italy</option>
												<option value="LT">(LT) Lithuania</option>
												<option value="LU">(LU) Luxembourg</option>
												<option value="LV">(LV) Latvia</option>
												<option value="MT">(MT) Malta</option>
												<option value="NL">(NL) Netherlands</option>
												<option value="NO">(NO) Norway</option>
												<option value="PL">(PL) Poland</option>
												<option value="PT">(PT) Portugal</option>
												<option value="RO">(RO) Romania</option>
												<option value="SE">(SE) Sweden</option>
												<option value="SI">(SI) Slovenia</option>
												<option value="SK">(SK) Slovakia</option>
											</select>
										</form>
										<h3>Country Report</h3>
									</div>
								</section>
								<section className="index-page">
									<div className="title-page">
										<h2>{this.props.literals[`L${this.state.selectedCountryName}`]}</h2>
										<h3>Country Report Index</h3>
									</div>
									<p>This document contains the OSH Barometer Country Report Summary of {this.props.literals[`L${this.state.selectedCountryName}`]}</p>
									<div className="index">
										<ul className="index-list">
											<li className="main-item">
												<span>{this.props.literals.L20719}</span>
												<ul>
													<li>{this.props.literals.L22120}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22001}</span>
												<ul>
													<li>{this.props.literals.L22002}</li>
													<li>{this.props.literals.L22003}</li>
													<li>{this.props.literals.L22004}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22005}</span>
												<ul>
													<li>{this.props.literals.L22007}</li>
													<li>{this.props.literals.L22008}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22009}</span>
												<ul>
													<li>{this.props.literals.L22010}</li>
													<li>{this.props.literals.L22011}</li>
													<li>{this.props.literals.L22012}</li>
													<li>{this.props.literals.L22013}</li>
													<li>{this.props.literals.L22014}</li>
													<li>{this.props.literals.L22015}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22016}</span>
												<ul>
													<li>{this.props.literals.L22017}</li>
													<li>{this.props.literals.L22018}</li>
												</ul>
											</li>
										</ul>
									</div>
								</section>
								<section className="introduction-page">
									<div className="title-page">
										<h2>{this.props.literals.L20719}</h2>
										<h3>{this.props.literals.L22120}</h3>
									</div>
									<div className="content-page-about-tool-content">
										{ReactHtmlParser(this.props.literals.L20737)}
									</div>
								</section>
								{/* -- OSH AUTHORITIES -- */}
								<section className={"osh-authorities "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22002}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22025}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<div className="content-page">
										<AuthoritiesReport country={this.state.selectedCountryCode} literals={this.props.literals}/>
									</div>
								</section>
								{/* -- ECONOMIC AND SECTOR PROFILE -- */}
								<section className={"economic-sector-profile indicator1 "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22003}</h3>
									</div>
									<div className="intro-page">
										<div>{ReactHtmlParser(this.props.literals.L22028)}</div>
										<span>{this.props.literals.L20696} {this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<div className="content-page">
										{/* Activity Sector 1 */}
										<EconomicSectorReport country={this.state.selectedCountryCode} sectorIndicator={1} literals={this.props.literals} />
									</div>
								</section>
								<section className={"economic-sector-profile indicator2 "+this.state.selectedCountryCode}>
									<div className="content-page">
										{/* Activity Sector 2 */}
										<EconomicSectorReport country={this.state.selectedCountryCode} sectorIndicator={2} literals={this.props.literals} />
									</div>
								</section>
								{/* -- WORKFORCE PROFILE -- */}
								<section className={"workforce-profile "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22004}</h3>
									</div>
									<div className="intro-page">
										<div>{ReactHtmlParser(this.props.literals.L22030)}</div>
										<span>{this.props.literals.L20696} {this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<WorkforceProfileReport literals={this.props.literals} country={this.state.selectedCountryCode} />
								</section>
								{/* -- NATIONAL STRATEGIES -- */}
								<section className={"national-strategies "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22005}</h2>
										<h3>{this.props.literals.L22007}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22038}</p>
										<span>{this.props.literals.L20704} </span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<NationalStrategiesReport country={this.state.selectedCountryCode} literals={this.props.literals} 
										countryName={this.state.selectedCountryName}/>
								</section>
								{/* -- SOCIAL DIALOGUE -- */}
								<section className={"social-dialogue "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22005}</h2>
										<h3>{this.props.literals.L22008}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22041}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<SocialDialogueReport literals={this.props.literals} country={this.state.selectedCountryCode} />
								</section>
								{/* -- WORK ACCIDENTS -- */}
								<section className={"work-accidents "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22010}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22050}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<div className="box-rounded">
										<WorkAccidentsChart 
										title={this.props.literals.L310}
										showDataLabel={true}
										percentage={true}
										type={'line'}
										chart={'20022'}
										indicator={'53'}
										selectedCountry1={this.state.selectedCountryCode}
										selectedCountry2="EU27_2020"
										colors={['#f6a400','#529FA2','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e','#003399']}
										chartSize={mediumSize}
										/>
										<ChartDataTable
											literals={this.props.literals}
											country={this.state.selectedCountryCode}
											chartID={20022}
											split={'year'}
											sameRow={true}
											columns={['Country','Year','Value (%)','Country','Year','Value (%)']}
											showDecimals={true}
											countryDisplay={'before'}
										/>
									</div>
									<div className="box-rounded">
										<WorkAccidentsChart 
										title={this.props.literals.L22196}
										showDataLabel={true}
										type="column"
										chart={'20023'}
										indicator={'54'}
										colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e','#003399']}
										chartSize={largeSize}
										/>
										<ChartDataTable
											literals={this.props.literals}
											country={this.state.selectedCountryCode}
											chartID={20023}
											split={'trend'}
											columns={['Country','Trend','Value (accidents)']}
											showDecimals={true}
											countryDisplay={'after'}
										/>
									</div>
								</section>
								{/* -- HEALTH PERCEPTION -- */}
								<section className={"health-perception "+this.state.selectedCountryCode}>
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22011}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22052}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<HealthPerceptionReport literals={this.props.literals} country={this.state.selectedCountryCode} />
								</section>
								{/* -- OSH CULTURE -- */}
								<section className={"osh-culture "+this.state.selectedCountryCode}>
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22012}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22054}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<OshCultureReport country={this.state.selectedCountryCode} literals={this.props.literals} />
									{/* TODO -- Add the charts for OSH Culture */}
								</section>
								{/* -- WORKING CONDITIONS - OVERALL OPINION -- */}
								<section className={"working-conditions overall-opinion "+this.state.selectedCountryCode}>
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22013}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22054}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<h4 className="header3">{this.props.literals.L20709}</h4>
									<p>{this.props.literals.L20577}</p>
									<span>{this.props.literals.L20704} </span>
									<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									{/* <!-- Job satisfaction --> */}
									<div className="box-rounded overall">
										<MentalRiskCharts
											literals={this.props.literals}
											tabIndicator="322"
											chartType={overallOpinion[0].chartType}
											colors={['#ffe400','#7b7b7d', '#cbe2e3','#f6a300']}
											type="column"
											percentage={true}
											exportingEnabled={false}
											// callbackLegend={callbackChartLegend}
											// callbackSelectedSurvey={callbackSelectedSurvey}
										/>
										<div className="chart-legend">{this.props.literals.L20580}</div>
										<ChartDataTable
											literals={this.props.literals}
											country={this.state.selectedCountryCode}
											chartID={20040}
											split={'answer'}
											sameRow={true}
											columns={['Country','Very satisfied (%)', 'Satisfied (%)', 'Not very satisfied (%)', 'Not at all satisfied (%)']}
											showDecimals={true}
											countryDisplay={'after'}
										/>
									</div>

									{/* <!-- Health at Risk - Sector --> */}
									<div className="box-rounded overall">
										<RiskChart
											title={`${this.props.literals.L22135} - ${this.props.literals.L20648}`}
											colors={['#f6a400','#003399']}
											showDataLabel={true}
											tick={20}
											percentage={true}
											type="column"
											selectCountry1={this.state.selectedCountryCode}
											selectCountry2="EU27_2020"
											chart={'20041'}
											indicator={'66'}
											sector={[8,9,10,11,12,13]}
											gender={[1,2,3]}
											age={[1,2,3,4]}
											showSelect={false}
											selectedIndicator="sector"
											exportingEnabled={false}
											// handleSector={handleSector}
										/>
										<div className="chart-legend">{this.props.literals.L20582}</div>
										<ChartDataTable
											literals={this.props.literals}
											country={this.state.selectedCountryCode}
											chartID={20041}
											split={'sector'}
											sameRow={true}
											columns={['Sector','Country','Value (%)', 'Country','Value (%)',]}
											showDecimals={false}
											countryDisplay={'before'}
										/>
									</div>

									{/* <!-- Health at Risk - Gender --> */}
    								<div className="box-rounded overall">
										<RiskChart
											title={`${this.props.literals.L22135} - ${this.props.literals.L20649}`}
											colors={['#f6a400','#003399']}
											showDataLabel={true}
											tick={20}
											percentage={true}
											type="column"
											selectCountry1={this.state.selectedCountryCode}
											selectCountry2="EU27_2020"
											chart={'20041'}
											indicator={'66'}
											sector={[8,9,10,11,12,13]}
											gender={[1,2,3]}
											age={[1,2,3,4]}
											showSelect={false}
											selectedIndicator="gender"
											exportingEnabled={false}
											// handleSector={handleSector}
										/>
										<div className="chart-legend">{this.props.literals.L20582}</div>
										<ChartDataTable
											literals={this.props.literals}
											country={this.state.selectedCountryCode}
											chartID={20041}
											split={'gender'}
											sameRow={true}
											columns={['Gender','Country','Value (%)', 'Country','Value (%)',]}
											showDecimals={false}
											countryDisplay={'before'}
										/>
									</div>

									{/* <!-- Health at Risk - Age --> */}
    								<div className="box-rounded overall">
										<RiskChart
											title={`${this.props.literals.L22135} - ${this.props.literals.L20650}`}
											colors={['#f6a400','#003399']}
											showDataLabel={true}
											tick={20}
											percentage={true}
											type="column"
											selectCountry1={this.state.selectedCountryCode}
											selectCountry2="EU27_2020"
											chart={'20041'}
											indicator={'66'}
											sector={[8,9,10,11,12,13]}
											gender={[1,2,3]}
											age={[1,2,3,4]}
											showSelect={false}
											selectedIndicator="age"
											exportingEnabled={false}
											// handleSector={handleSector}
										/>
										<div className="chart-legend">{this.props.literals.L20582}</div>
										<ChartDataTable
											literals={this.props.literals}
											country={this.state.selectedCountryCode}
											chartID={20041}
											split={'age'}
											sameRow={true}
											columns={['Age','Country','Value (%)', 'Country','Value (%)',]}
											showDecimals={false}
											countryDisplay={'before'}
										/>
									</div>
								</section>
								{/* -- WORKING CONDITIONS - MENTAL RISK */}
								<section className={"working-conditions mental-risk "+this.state.selectedCountryCode}>
									<h4 className="header3">{this.props.literals.L20710}</h4>
									<p>{this.props.literals.L20578}</p>
									<p>
										<span>{this.props.literals.L20700} </span>
										<span>{this.props.literals.L20704} </span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</p>
									{
										mentalRisk.map((tab) => {
											let chartTypes = tab.chartType;
											let length = chartTypes.length;
											return chartTypes.map((chartType) => {
												let title;
												if(length === 1){
													title = `${this.props.literals['L'+chartType.title]}`;
												}else{
													title = (chartType.type === "esener") ? `${this.props.literals['L'+chartType.title]} -  ${this.props.literals.L20645}` 
														: `${this.props.literals['L'+chartType.title]} -  ${this.props.literals.L20646}` ;
												}
												return (
													<div className="box-rounded mental" key={`${tab.url}-${chartType.type}`}>
														<MentalRiskCharts
															reportTitle={title}
															literals={this.props.literals}
															tabIndicator={tab.literalTab}
															chartType={tab.chartType}
															colors={['#7b7b7d', '#cbe2e3','#f6a400']}
															percentage={true}
															exportingEnabled={false}
															showSelect={false}
															selectedIndicator={chartType.type}
														/>
														<div className="chart-legend">
															{this.props.literals['L'+chartType.legend]}
														</div>
														<ChartDataTable
															literals={this.props.literals}
															country={this.state.selectedCountryCode}
															chartID={chartType.chart}
															sector={chartType.sector}
															answer={chartType.answer}
															split={chartType.chart == '20074' ? 'none' : 'answer'}
															sameRow={chartType.chart == '20074' ? false: true}
															columns={chartType.columns}
															showDecimals={true}
															countryDisplay={'after'}
														/>
													</div>
												)
											})
										})
									}
								</section>
								{/* -- WORKING CONDITIONS - PHYSICAL RISK */}
								<section className={"working-conditions physical-risk "+this.state.selectedCountryCode}>
									<div className="intro-page">
										<h4 className="header3">{this.props.literals.L20711}</h4>
										<p>{this.props.literals.L20579}</p>
										<p>
											<span>{this.props.literals.L20700} </span>
											<span>{this.props.literals.L20704} </span>
											<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
										</p>
									</div>
									{/* Vibrations, loud noise and temperature */}
									<div className="box-rounded">
										<SpiderChart
											literals={this.props.literals}
											tabIndicator={physicalRiskTabs[0].literalTab}
											selectCountry1={this.state.selectedCountryCode}
											selectCountry2="EU27_2020"
											showDataLabel={true}
											colors={['#f6a400','#003399','#cbe2e3']}
											selectedTab={physicalRiskTabs[0].url}
											indicatorTabs={this.state.indicatorTabs}
											chartType={physicalRiskTabs[0].chartType}
											//callbackLegend={this.callbackChartLegend}
											// callbackSelectedSurvey={this.callbackSelectedSurvey}
											dataset={this.state.dataset}
											exportingEnabled={false}
										/>
										<ChartDataTable 
											literals={this.props.literals} 
											country={this.state.selectedCountryCode}
											chartID={20049}
											split={'indicator'} 
											columns={['Indicator', 'Country', 'Value (%)']}
											showDecimals={true}
											countryDisplay={'after'}
										/>
									</div>

									{/* Exposure to dangerous substances */}
									<h5 className="header4 break-before">{this.props.literals.L20655}</h5>
									{
										physicalRiskTabs[1].subTabs.map((tab) => {
											return (
												<div className="box-rounded exposure" key={tab.url}>
													<MentalRiskCharts
														reportTitle={`${this.props.literals['L'+tab.chartType[0].title]}`}
														literals={this.props.literals}
														tabIndicator={tab.literalTab}
														chartType={tab.chartType}
														colors={['#7b7b7d', '#cbe2e3','#f6a400']}
														percentage={true}
														exportingEnabled={false}
														showSelect={false}
														selectedIndicator={tab.chartType[0].type}
													/>
													<div className="chart-legend">
														{this.props.literals['L'+tab.chartType[0].legend]}
													</div>
													<ChartDataTable
														literals={this.props.literals}
														country={this.state.selectedCountryCode}
														chartID={tab.chartType[0].chart}
														sector={tab.chartType[0].sector}
														answer={tab.chartType[0].answer}
														split={tab.chartType[0].chart == '20074' ? 'none' : 'answer'}
														sameRow={tab.chartType[0].chart == '20074' ? false: true}
														columns={tab.chartType[0].columns}
														showDecimals={true}
														countryDisplay={'after'}
													/>
												</div>
											);
										})
									}

									{/* Risks involved with work */}
									<div className="box-rounded">
										<SpiderChart
											literals={this.props.literals}
											reportTitle={`${this.props.literals["L"+physicalRiskTabs[2].chartType[0].title]} - ${this.props.literals.L20645}`}
											tabIndicator={physicalRiskTabs[2].literalTab}
											selectCountry1={this.state.selectedCountryCode}
											selectCountry2="EU27_2020"
											showDataLabel={true}
											colors={['#f6a400','#003399','#cbe2e3']}
											selectedTab={physicalRiskTabs[2].url}
											indicatorTabs={this.state.indicatorTabs}
											chartType={physicalRiskTabs[2].chartType}
											//callbackLegend={this.callbackChartLegend}
											// callbackSelectedSurvey={this.callbackSelectedSurvey}
											// dataset={this.state.dataset}
											showSelect={false}
											exportingEnabled={false}
											selectedIndicator={physicalRiskTabs[2].chartType[0].type}
										/>
										<ChartDataTable 
											literals={this.props.literals} 
											country={this.state.selectedCountryCode}
											chartID={physicalRiskTabs[2].chartType[0].chart}
											split={'indicator'} 
											columns={['Indicator', 'Country', 'Value (%)']}
											showDecimals={true}
											countryDisplay={'after'}
										/>
									</div>

									<div className="box-rounded">
										<SpiderChart
											literals={this.props.literals}
											reportTitle={`${this.props.literals["L"+physicalRiskTabs[2].chartType[0].title]} - ${this.props.literals.L20646}`}
											tabIndicator={physicalRiskTabs[2].literalTab}
											selectCountry1={this.state.selectedCountryCode}
											selectCountry2="EU27_2020"
											showDataLabel={true}
											colors={['#f6a400','#003399','#cbe2e3']}
											selectedTab={physicalRiskTabs[2].url}
											indicatorTabs={this.state.indicatorTabs}
											chartType={physicalRiskTabs[2].chartType}
											//callbackLegend={this.callbackChartLegend}
											// callbackSelectedSurvey={this.callbackSelectedSurvey}
											// dataset={this.state.dataset}
											showSelect={false}
											exportingEnabled={false}
											selectedIndicator={physicalRiskTabs[2].chartType[1].type}
										/>
										<ChartDataTable 
											literals={this.props.literals} 
											country={this.state.selectedCountryCode}
											chartID={physicalRiskTabs[2].chartType[1].chart}
											split={'indicator'} 
											columns={['Indicator', 'Country', 'Value (%)']}
											showDecimals={true}
											countryDisplay={'after'}
										/>
									</div>
									
								</section>
								{/* -- PREVENTION IN COMPANIES */}
								<section className={"prevention-in-companies "+this.state.selectedCountryCode}>
									<div className="title-page wrap">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22014}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22058}</p>
										<span>{this.props.literals.L20702}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									{/* TODO -- Add the charts for Prevention in Companies */}
								</section>
								{/* -- WORKER INVOLVEMENT */}
								<section className={"worker-involvement "+this.state.selectedCountryCode}>
									<div className="title-page wrap multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22015}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22060}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<h4 className="header3">{this.props.literals.L22015}</h4>
									<div className="box-rounded">
										<SpiderChart
											literals={this.props.literals}
											tabIndicator={'L20645'}
											selectCountry1={this.state.selectedCountryCode}
											showDataLabel={true}
											colors={['#f6a400','#003399','#cbe2e3']}
											chartType={[
												{type: "esener", chart:"20106", title: "20645", chartIndicator: null, sector: null, answers: null, legend: null}
											]}
											dataset={'esener'}
											exportingEnabled={false}
											backgroundColor={'#E4EFEF'}
										/>
										<ChartDataTable 
											literals={this.props.literals} 
											country={this.state.selectedCountryCode}
											chartID={20106}
											split={'indicator'} 
											columns={['Indicator', 'Country', 'Value (%)']}
											showDecimals={true}
											countryDisplay={'after'}
										/>
									</div>
									<div className="box-rounded">
										<SpiderChart
											literals={this.props.literals}
											tabIndicator={'L20646'}
											selectCountry1={this.state.selectedCountryCode}
											showDataLabel={true}
											colors={['#f6a400','#003399','#cbe2e3']}
											chartType={[
												{type: "ewcs", chart:"20069", title: "20646", chartIndicator: null, sector: null, answers: null, legend: null}
											]}
											dataset={'ewcs'}
											exportingEnabled={false}
											backgroundColor={'#E4EFEF'}
										/>
										<ChartDataTable 
											literals={this.props.literals} 
											country={this.state.selectedCountryCode}
											chartID={20069}
											split={'indicator'} 
											columns={['Indicator', 'Country', 'Value (%)']}
											showDecimals={true}
											countryDisplay={'after'}
										/>
									</div>
								</section>
								{/* -- ENFORCEMENT CAPACITY */}
								<section className={"enforcement-capacity "+this.state.selectedCountryCode}>
									<div className="title-page wrap">
										<h2>{this.props.literals.L22016}</h2>
										<h3>{this.props.literals.L22017}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22063}</p>
										<p>{ReactHtmlParser(this.props.literals.L20699)}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<EnforcementCapacityReport country={this.state.selectedCountryCode} literals={this.props.literals} />

								</section>
								{/* -- OSH-STATISTICS -- */}
								<section className={"enforcement-capacity "+this.state.selectedCountryCode}>
									<div className="title-page wrap">
										<h2>{this.props.literals.L22016}</h2>
										<h3>{this.props.literals.L22018}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22065}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<div className="content-page">
										<StatisticsReport country={this.state.selectedCountryCode} literals={this.props.literals} />								
									</div>
								</section>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td>
								<div className="page-footer-space" />
							</td>
						</tr>
					</tfoot>
				</table>
				<p className="footer-pdf">
					<span>Santiago de Compostela 12, 5th floor - 48003 Bilbao × Spain</span>
            		<span>Tel. +34 944 358 400 × Fax +34 944 358 401 </span>
            		<span>information@osha.europa.eu - <a href="http://osha.europa.eu" target="_blank">http://osha.europa.eu</a></span>
				</p>
			</div>
		)
	}
}
CountryReport.displayName='CountryReport';
export default CountryReport;