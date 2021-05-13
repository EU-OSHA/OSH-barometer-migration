import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import PreventionChart from '../common/charts/PreventionChart';
import SelectEconomic from '../common/select-filters/SelectEconomic'
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';

const subTabs = require('../../model/mentalHealth.json');

class PreventionCompanies extends Component {

	constructor(props){
		super(props);

		this.state={
			indicatorTabs: subTabs,
			selectCountry1: 'AT',
			selectCountry2: '',
			split: this.props.split,
			subMenuTabs: [{ literalTab: '20679' }, { literalTab: '20680' }, { literalTab: '20681' },{ literalTab: '20682' }, { literalTab: '20683' }],
			selectMenu: [{ literalTab: '20679' }, { literalTab: '20683' }],
			selectChart: [{ literalTab: '20680' }, { literalTab: '20682' }],
			selectedTab: this.props.indicator,
			selectedSuvery: this.props.dataset,
			chartLegend: '',
			chartDimension: window.innerWidth > 768 ? 'column': 'bar',
			currentPath: `/osh-outcomes-working-conditions/prevention-companies/`,
			visible: false,
		}
	}

	handleSearch = (callbackCountry1) =>{
		this.setState({ selectCountry1: callbackCountry1})
	}

	handleSearch2 = (callbackCountry2) =>{
		this.setState({ selectCountry2: callbackCountry2})
	}

	updateDimension = () => {
		if (window.innerWidth > 768){
			this.setState({ chartDimension: 'column'});
		}else{
			this.setState({ chartDimension: 'bar'})
		}
	}

	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend })
	}

	callbackSelectedSurvey = (callback) => {
		this.setState({ selectedSurvey: callback })
	}

	callbackSelectedTab = (callback) => {
		this.setState({ selectedTab: callback })
	}


	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22014 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
		window.addEventListener('resize', this.updateDimension);
	}

	componentDidUpdate(prevProps) {

		if (prevProps.dataset != this.props.dataset) {
			this.setState({ selectedSurvey: this.props.dataset })
		}

		if (prevProps.indicator != this.props.indicator) {
			this.setState({ selectedTab: this.props.indicator })
		}

	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimension)
	}

	render()
	{
		return(
			<div className="prevention-companies">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","prevention-companies"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection:'Prevention in companies', indicator: 304}} />

				<SubMenuTabs 
					literals={this.props.literals} 
					callbackSelectedTab={this.callbackSelectedTab} 
					selectedTab={this.state.selectedTab} 
					//selectedSurvey={this.state.selectedSurvey} 
					subMenuTabs={this.state.subMenuTabs}
					locationPath={this.state.currentPath}
					selectCountry1={this.state.selectCountry1}
					selectCountry2= {this.state.selectCountry2}
				/>
				<div className="line background-main-light" />

				{this.state.selectMenu.map((tab)=> {
					if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab) {
						return (

							<SelectEconomic 
								handleSearch={this.handleSearch} 
								handleSearch2={this.handleSearch2} 
								//charts={['20022']}
								//indicator={'53'}
								literals={this.props.literals}
								selectedCountry1={this.state.selectCountry1}
								selectedCountry2={this.state.selectCountry2}
								/> 
							)}
					})
				}
			

				<div className="line background-main-light"></div>
				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text" >
					<div className="card--block--chart" >
						<div className="chart--block with-filter" >
							<div className="card--block--chart--wrapper" >
									

								 {this.state.indicatorTabs.map((tab) => {
									if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab) {
										return (
											<div className="chart--wrapper" key={tab.literalTab} >
												{this.state.selectedTab == 'internal-or-external-ra' && (<MentalRiskCharts
													literals={this.props.literals}
													tabIndicator={tab.literalTab}
													chartType={tab.chartType}
													colors={['#7b7b7d', '#cbe2e3','#f6a400']}
													type={this.state.chartDimension}
													percentage={true}
													callbackLegend={this.callbackChartLegend}
													callbackSelectedSurvey={this.callbackSelectedSurvey}
												/>)}
												{this.state.selectedTab == 'training-in-osh' && (<MentalRiskCharts
													literals={this.props.literals}
													tabIndicator={tab.literalTab}
													chartType={tab.chartType}
													colors={['#7b7b7d', '#cbe2e3','#f6a400']}
													type={this.state.chartDimension}
													percentage={true}
													callbackLegend={this.callbackChartLegend}
													callbackSelectedSurvey={this.callbackSelectedSurvey}
												/>)}

									{this.state.selectedTab == 'risk-assessment' && (<PreventionChart
									literals={this.props.literals}
									tabIndicator={tab.literalTab}
									chartType={tab.chartType}
									showDataLabel={true}
									colors={['#f6a400', '#003399','#cbe2e3']}
									type={this.state.chartDimension}
									percentage={true}
									callbackLegend={this.callbackChartLegend}
									callbackSelectedSurvey={this.callbackSelectedSurvey}
									selectedCountry1={this.state.selectCountry1}
									selectedCountry2={this.state.selectCountry2}
																	
									/>)}

									{this.state.selectedTab == 'employees-participation-in-prevention' && (<PreventionChart
									literals={this.props.literals}
									tabIndicator={tab.literalTab}
									chartType={tab.chartType}
									colors={['#f6a400', '#003399','#cbe2e3']}
									type={this.state.chartDimension}
									percentage={true}
									callbackLegend={this.callbackChartLegend}
									callbackSelectedSurvey={this.callbackSelectedSurvey}
									selectedCountry1={this.state.selectCountry1}
									selectedCountry2={this.state.selectCountry2}
									/>)}

										{this.state.selectedTab == 'evaluated-aspects-in-risk-assessments' && (
											<div className='chart-container'>
												<h2 class='title--card'>{this.props.literals.L20681}</h2><br/>
												<a href='https://visualisation.osha.europa.eu/esener#!/en/survey/detailpage-european-map/2019/osh-management/en_1/E3Q252_1/activity-sector/14/11/1' target='_blank'>
												<img src={require('../../style/img/EU-map.png')} alt=""/>
												</a>
												<p className='ng-binding'>{this.props.literals.L20738}</p>
												</div>
											)}
											</div>
										)
									}
								})}
	
							</div>
						</div>
					</div>
					<div className="chart-legend">
						{this.props.literals[`L${this.state.chartLegend}`]}
					</div>
				</div>

				<Methodology literals={this.props.literals} section={'Prevention in companies'} />
				{/*<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","prevention-companies","risk-assessment"]} /> */}
			</div>
		)
	}
}
PreventionCompanies.displayName = 'PreventionCompanies';
export default PreventionCompanies;