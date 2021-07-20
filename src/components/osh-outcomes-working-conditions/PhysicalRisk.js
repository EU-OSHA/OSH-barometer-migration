import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import SpiderChart from '../common/charts/SpiderChart';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import { physicalRiskTabs } from '../../model/subMenuTabs';
import { connect } from 'react-redux';
import { setCountry1, setCountry2 } from '../../actions/';

class PhysicalRisk extends Component{
	
	constructor(props){
		super(props);

		let selectedTab='', selectedSubTab='', secondLevelTabs='';
		for (let i = 0; i < physicalRiskTabs.length; i++)
		{
			if (physicalRiskTabs[i].url == props.tab)
			{
				selectedTab = physicalRiskTabs[i];
			}
		}

		// If the current tab has sub-tabs, set the selected one
		if (selectedTab.subTabs != undefined)
		{
			secondLevelTabs = selectedTab.subTabs;
			for (let i = 0; i < selectedTab.subTabs.length; i++)
			{
				if (selectedTab.subTabs[i].url == props.indicator)
				{
					selectedSubTab = selectedTab.subTabs[i];
				}
			}
		}

		this.state= {
			lockedCountry: this.props.lockedCountry,
			chart:'20049',
			firstLevelTabs: physicalRiskTabs,
			secondLevelTabs: secondLevelTabs,
			selectedTab: selectedTab,
			secondLevelSelectedTab: selectedSubTab,
			chartLegend: '',
			selectedSurvey:'',
			currentPath: '/osh-outcomes-working-conditions/physical-risk/',
			isSubMenuOpen: false,
			chartDimension: window.innerWidth > 768 ? 'column' : 'bar',
			showSecondLevel: secondLevelTabs == '' ? false : true,
			dataset: props.dataset,
			secondLevelIndicator: props.indicator ? props.indicator : 'vapours'
		}
	}

	handleSearch = (callbackCountry1) => {
		if (!this.props.selectedByUser) {
			this.props.setCountry1(callbackCountry1)
		} else {
			this.setState({
				lockedCountry: callbackCountry1
			});
		}
	}

	handleSearch2 = (callbackCountry2) => {
		this.props.setCountry2(callbackCountry2)
	}

	callbackSelectedSurvey = (callback) => {
		this.setState({ dataset: callback });
	}

	callbackSelectedTab = (callback) => {
		if (callback == 'exposure-to-dangerous-substances')
		{
			this.setState({showSecondLevel: true});
			for (let i = 0; i < this.state.firstLevelTabs.length; i++)
			{
				if (callback == this.state.firstLevelTabs[i].url)
				{
					let selectedTab = this.state.firstLevelTabs[i];
					this.setState({ selectedTab: selectedTab });
					this.setState({ secondLevelTabs: selectedTab.subTabs });
					if (this.state.secondLevelSelectedTab == undefined || this.state.secondLevelSelectedTab == '')
					{
						this.setState({ secondLevelSelectedTab: selectedTab.subTabs[0] });
					}
				}
			}
		}
		else
		{
			this.setState({showSecondLevel: false});
			for (let i = 0; i < this.state.firstLevelTabs.length; i++)
			{
				if (callback == this.state.firstLevelTabs[i].url)
				{
					this.setState({ selectedTab: this.state.firstLevelTabs[i] });
				}
			}
		}	
	}
	
	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend });
	}

	callbackSelectedIndicator = (callback) => {
		// This function will be called when changing the indicator for Exposure to Dangerous Substances
		this.setState({secondLevelIndicator: callback});
		for (let i = 0; i < this.state.secondLevelTabs.length; i++)
		{
			if (callback == this.state.secondLevelTabs[i].url)
			{
				this.setState({ secondLevelSelectedTab: this.state.secondLevelTabs[i] });
			}
		}
	}

	updateDimension = ()=>{
		if(window.innerWidth > 768){
			this.setState({chartDimesion: 'column' });
		}else{
			this.setState({chartDimesion: 'bar'})
		}
	}

	componentDidMount() {
		if (this.props.country1 != undefined && this.props.country2 != undefined) {
			this.props.setCountry1(this.props.country1)
			this.props.setCountry2(this.props.country2)
		}

		// Update the title of the page
		document.title = this.props.literals.L22013 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
		window.addEventListener('resize', this.updateDimension);
		if(this.state.selectedTab == 'smoke,-powder-or-dust'){
			this.setState({showSecondLevel: true})
			this.setState({selectedTab: 'smoke,-powder-or-dust'})
			this.setState({ chartLegend: '20598' });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log('Previous', prevState.dataset);
		// console.log('Current', this.state.dataset);

		// if(prevProps.defaultCountry.code != this.props.defaultCountry.code && !this.props.country1){
		// 	this.setState({ selectCountry1: this.props.defaultCountry.code });
		// }

		// if(prevProps.defaultCountry2.code != this.props.defaultCountry2.code && !this.props.country2){
		// 	this.setState({ selectCountry2: this.props.defaultCountry2.code });
		// }
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.updateDimension)
	}

	render()
	{
		let currentChart = this.state.selectedTab.chartType.length == 1 ? this.state.selectedTab.chartType[0].chart : this.state.selectedTab.chartType.find((element) => element.type == this.state.dataset).chart;
		let currentIndicator = this.state.selectedTab.chartType.length == 1 ? this.state.selectedTab.chartType[0].chartIndicator : this.state.selectedTab.chartType.find((element) => element.type == this.state.dataset).chartIndicator;
		return(
			<div className="physical-risk">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","physical-risk"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'Working conditions - Physical risk', indicator: 67}} />
				<div>
					{<SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab.url}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.firstLevelTabs} 
						selectCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
						selectCountry2={this.props.selectCountry2}
						selectedSurvey={this.state.dataset}
					/>}
				</div>
				<div>
					<div className="line background-main-light" />
					{/* If the current tab has another menu inside, display the menu. If not, show the Country Selects for Comparison*/}			
					{ this.state.showSecondLevel ? <SubMenuTabs 
							literals={this.props.literals}
							selectedTab={this.state.secondLevelSelectedTab.url}
							selectedSurvey={this.state.selectedSurvey} 
							callbackSelectedTab={this.callbackSelectedIndicator}
							locationPath={`${this.state.currentPath}exposure-to-dangerous-substances/`}
							subMenuTabs={this.state.secondLevelTabs} 
						/> : <SelectEconomic 
							handleSearch={this.handleSearch} 
							handleSearch2={this.handleSearch2} 
							charts={[currentChart]}
							indicator={currentIndicator}
							literals={this.props.literals}
							selectedCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
							selectedCountry2={this.props.selectCountry2}
						/> 
					}
				</div>

				<div className="line background-main-light" />

				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
					<div className="card--block--chart with-filters">

						{ this.state.showSecondLevel ? <div className="chart--block">
						
								<div className="card--block--chart--wrapper" >
									<div className="chart--wrapper" >
										{<MentalRiskCharts
											literals={this.props.literals}
											tabIndicator={this.state.secondLevelSelectedTab.literalTab}
											chartType={this.state.secondLevelSelectedTab.chartType}
											colors={['#7b7b7d', '#cbe2e3','#f6a400']}
											type={this.state.chartDimension}
											percentage={true}
											callbackLegend={this.callbackChartLegend}
											callbackSelectedSurvey={this.callbackSelectedSurvey}
											exportingEnabled={true}
											showSelect={true}
										/>}
									</div>
								</div>							
							</div> : <div className="chart--wrapper" >
									{<SpiderChart
										literals={this.props.literals}
										tabIndicator={this.state.selectedTab.literalTab}
										selectCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
										selectCountry2={this.props.selectCountry2}
										showDataLabel={true}
										colors={['#f6a400','#003399','#cbe2e3']}
										selectedTab={this.state.selectedTab.url}
										indicatorTabs={this.state.indicatorTabs}
										chartType={this.state.selectedTab.chartType}
										//callbackLegend={this.callbackChartLegend}
										callbackSelectedSurvey={this.callbackSelectedSurvey}
										dataset={this.state.dataset}
										exportingEnabled={true}
										showSelect={this.state.selectedTab.chartType.length > 1}
									/>}
								</div>
						}
					</div>
					<div className="chart-legend">
						{ReactHtmlParser(this.props.literals[`L${this.state.chartLegend}`])}						
					</div>
				</div>

				<Methodology literals={this.props.literals} section={'Working conditions - Physical risk'} indicator={this.state.showSecondLevel ? this.state.secondLevelSelectedTab.chartType[0].chartIndicator : null} 
					dataset={this.state.showSecondLevel ? null : this.state.dataset} subsection={this.state.showSecondLevel ? null : this.props.tab} />

				{this.state.showSecondLevel ? 
					<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","physical-risk", "exposure-to-dangerous-substances" ]} /> 
					: null
				}
			</div>
		)
	}
}
PhysicalRisk.displayName = 'PhysicalRisk';

function mapStateToProps(state){
	const { selectCountry, selectCountry2, selectedByUser, lockedCountry } = state.selectCountries;
    return { selectCountry, selectCountry2, selectedByUser, lockedCountry};
}

function mapDispatchToProps(dispatch) {
	return {
		setCountry1: (country) => dispatch(setCountry1(country)),
		setCountry2: (country2) => dispatch(setCountry2(country2))
	}
}

// export default PhysicalRisk;
export default connect(mapStateToProps, mapDispatchToProps )(PhysicalRisk);