import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import PreventionChart from '../common/charts/PreventionChart';
import SelectEconomic from '../common/select-filters/SelectEconomic'
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import { preventionInCompanies } from '../../model/subMenuTabs';
import { connect } from 'react-redux';
import { setDefaultCountry2 } from '../../actions/';

const subTabs = require('../../model/mentalHealth.json');

class PreventionCompanies extends Component {

	constructor(props){
		super(props);

		let selected = '';
		for (let i = 0; i < preventionInCompanies.length; i++)
		{
			if (preventionInCompanies[i].url == props.indicator)
			{
				selected = preventionInCompanies[i];
			}
		}

		this.state={
			selectCountry1: this.props.defaultCountry.code,
			// selectCountry2: '',
			selectCountry2: this.props.defaultCountry2.code,
			defaultCountry2Selected: false,
			split: this.props.split,
			subMenuTabs: preventionInCompanies,
			selectMenu: [{ literalTab: '20679' }, { literalTab: '20683' }],
			selectChart: [{ literalTab: '20680' }, { literalTab: '20682' }],
			selectedTab: selected,
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
		this.props.setDefaultCountry2({
			code: callbackCountry2,
			isCookie : false
		})
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
		for (let i = 0; i < this.state.subMenuTabs.length; i++)
		{
			if (this.state.subMenuTabs[i].url == callback)
			{
				this.setState({ selectedTab: this.state.subMenuTabs[i] });
			}
		}
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
			this.callbackSelectedTab(this.props.indicator);
		}

		console.log("componentDidUpdate");

		if(prevProps.defaultCountry.code != this.props.defaultCountry.code){
			this.setState({ selectCountry1: this.props.defaultCountry.code });
		}

		if(!this.state.defaultCountry2Selected){
			this.setState({ 
				selectCountry2: this.props.defaultCountry2.code,
				defaultCountry2Selected: true
			});
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
					selectedTab={this.state.selectedTab.url} 
					//selectedSurvey={this.state.selectedSurvey} 
					subMenuTabs={this.state.subMenuTabs}
					locationPath={this.state.currentPath}
					selectCountry1={this.state.selectCountry1}
					selectCountry2= {this.state.selectCountry2}
				/>
				<div className="line background-main-light" />

				{(this.state.selectedTab.url == 'risk-assessment' || this.state.selectedTab.url == 'employees-participation-in-prevention') && (
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

				<div className="line background-main-light"></div>
				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text" >
					<div className="card--block--chart" >
						<div className="chart--block with-filter" >
							<div className="card--block--chart--wrapper" >
								{this.state.subMenuTabs.map((tab) => {
									if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab.url) {
										return (
											<div className="chart--wrapper" key={tab.literalTab} >
												{this.state.selectedTab.url == 'internal-or-external-ra' && (
													<MentalRiskCharts
														literals={this.props.literals}
														tabIndicator={tab.literalTab}
														chartType={tab.chartType}
														colors={['#7b7b7d', '#cbe2e3','#f6a400']}
														type={this.state.chartDimension}
														percentage={true}
														callbackLegend={this.callbackChartLegend}
														callbackSelectedSurvey={this.callbackSelectedSurvey}
													/>
												)}
												{this.state.selectedTab.url == 'training-in-osh' && (
													<MentalRiskCharts
														literals={this.props.literals}
														tabIndicator={tab.literalTab}
														chartType={tab.chartType}
														colors={['#7b7b7d', '#cbe2e3','#f6a400']}
														type={this.state.chartDimension}
														percentage={true}
														callbackLegend={this.callbackChartLegend}
														callbackSelectedSurvey={this.callbackSelectedSurvey}
													/>
												)}
												{this.state.selectedTab.url == 'risk-assessment' && (
													<PreventionChart
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
													/>
												)}
												{this.state.selectedTab.url == 'employees-participation-in-prevention' && (
													<PreventionChart
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
													/>
												)}
												{this.state.selectedTab.url == 'evaluated-aspects-in-risk-assessments' && (
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

				{this.state.selectedTab.url != 'evaluated-aspects-in-risk-assessments' && (
					<Methodology literals={this.props.literals} section={'Prevention in companies'} indicator={this.state.selectedTab.chartType[0].chartIndicator} />
				)}
				{/*<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","prevention-companies","risk-assessment"]} /> */}
			</div>
		)
	}
}
PreventionCompanies.displayName = 'PreventionCompanies';

function mapStateToProps(state){
    const {defaultCountry} = state;
	const {defaultCountry2} = state;
    return { defaultCountry: defaultCountry, defaultCountry2: defaultCountry2 };
}

// export default PreventionCompanies;
export default connect(mapStateToProps, { setDefaultCountry2 } )(PreventionCompanies);