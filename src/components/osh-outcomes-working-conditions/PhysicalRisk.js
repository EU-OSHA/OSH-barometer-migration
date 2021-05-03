import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import SpiderChart from '../common/charts/SpiderChart';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';

const subTabs = require('../../model/mentalHealth.json')



class PhysicalRisk extends Component{
		constructor(props){
			super(props);
			this.state= {
				selectCountry1: 'AT',
				selectCountry2: '',
				chart:'20049',
				indicatorTabs: subTabs,
				indicatorSubTabs1: [{ literalTab: '20654' }, { literalTab: '20655' },{ literalTab: '20656' }],
				indicatorSubTabs: [{ literalTab: '328' }, { literalTab: '329' },{ literalTab: '330' },{ literalTab: '331' }],
				selectedTab: this.props.indicator,
				chartLegend: '',
				selectedSurvey:'',
				currentPath: '/osh-outcomes-working-conditions/physical-risk/',
				isSubMenuOpen: false,
				chartDimension: window.innerWidth > 768 ? 'column' : 'bar',
				visible: false,
				
			}
			
		}



	handleSearch = (callbackCountry1) => {
		this.setState({ selectCountry1: callbackCountry1 })
	}

	handleSearch2 = (callbackCountry2) => {
		this.setState({ selectCountry2: callbackCountry2 })
	}

	callbackSelectedSurvey = (callback) => {
	
		this.setState({ selectedSurvey: callback });
	}


	callbackSelectedTab = (callback) => {
		switch (callback) {
			case 'exposure-to-dangerous-substances':
				this.setState({visible: true})
				this.setState({selectedTab: 'smoke,-powder-or-dust'})
				this.setState({ chartLegend: '20598' });
				break;
			case 'vapours':
				this.setState({selectedTab: callback});
				this.setState({ chartLegend: '20599' });
				break;
			case 'chemical-products':
				this.setState({selectedTab: callback});
				this.setState({ chartLegend: '20600' });
				break;
			case 'infectious-materials':
				this.setState({selectedTab: callback});
				this.setState({ chartLegend: '20601' });
				break;
				case 'ergonomic-risks':
					this.setState({visible: false})
					this.setState({ chartLegend: '' });
					this.setState({selectedTab: callback});
				break;
				case 'vibrations,-loud-noise-and-temperature':
					this.setState({visible: false})
					this.setState({selectedTab: callback});
				break;
			default:
				break;
		}
		
	}


	updateDimension = ()=>{
		if(window.innerWidth > 768){
			this.setState({chartDimesion: 'column' });
		}else{
			this.setState({chartDimesion: 'bar'})
		}
	}

	

	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22013 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
		window.addEventListener('resize', this.updateDimension);
		if(this.state.selectedTab == 'smoke,-powder-or-dust'){
			this.setState({visible: true})
			this.setState({selectedTab: 'smoke,-powder-or-dust'})
			this.setState({ chartLegend: '20598' });
		}
	}

	componentDidUpdate(prevProps) {
	
		// if (prevProps.dataset != this.props.dataset) {
		// //	this.setState({ selectedSurvey: this.props.dataset })
		// }

		// if (prevProps.indicator != this.props.indicator) {
		// 	this.setState({ selectedTab: this.props.indicator })
		// }
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.updateDimension)
	}

	render()
	{
		return(
			<div className="physical-risk">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","physical-risk"]} />
					<form className="compare--block--form">

					<div>
					

					{this.state.visible == false  ? <SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorSubTabs1} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
						/>  : <SubMenuTabs 
						literals={this.props.literals}
						selectedTab={'exposure-to-dangerous-substances'}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorSubTabs1} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
						/>}
					</div>
					<div>
					<div className="line background-main-light" />
												{/******  Segundo subMenu***********/}

					
					{ this.state.visible ? <SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab}
						selectedSurvey={this.state.selectedSurvey} 
						callbackSelectedTab={this.callbackSelectedTab}
						callbackSelectedSurvey={this.callbackSelectedSurvey}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorSubTabs} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
						/> : null }
						

						{this.state.visible ? null :<SelectEconomic 
						handleSearch={this.handleSearch} 
						handleSearch2={this.handleSearch2} 
						//charts={['20022']}
						//indicator={'53'}
						literals={this.props.literals}
						selectedCountry1={this.state.selectCountry1}
						selectedCountry2={this.state.selectCountry2}
						/>}

					</div>

					<div className="line background-main-light" />

					<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
						<div className="card--block--chart with-filters">

						{this.state.visible ? <div className="chart--block">
						
						<div className="card--block--chart--wrapper" >
								{this.state.indicatorTabs.map((tab) => {
									if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab) {
										return (
											<div className="chart--wrapper" key={tab.literalTab} >
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
											</div>
										)
									}
								})}
							</div>
							
							</div>: null}
							{this.state.indicatorTabs.map((tab)=>{
								if(this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab)
								{
									return (
										<div className="chart--wrapper" key={tab.literalsTab}>
										{this.state.visible == false && (<div className="chart--wrapper">
										<SpiderChart
										literals={this.props.literals}
										tabIndicator={tab.literalTab}
										selectCountry1={this.state.selectCountry1}
										selectCountry2={this.state.selectCountry2}
										showDataLabel={true}
										colors={['#f6a400','#003399','#cbe2e3']}
										selectedTab={this.state.selectedTab}
										indicatorTabs={this.state.indicatorTabs}
										chartType={tab.chartType}
										//callbackLegend={this.callbackChartLegend}
										callbackSelectedSurvey={this.callbackSelectedSurvey}
										/>
								</div>)}
										</div>
									)
								}
							})} 

						</div>

						<div className="chart-legend">
						{this.props.literals[`L${this.state.chartLegend}`]}
						
					</div>
					</div>
		

					</form>

					<Methodology />

						{this.state.visible ? <Related literals={this.props.literals} section={["osh-outcomes-working-conditions","physical-risk", "exposure-to-dangerous-substances" ]} /> : null}

			</div>
		)
	}
}
PhysicalRisk.displayName = 'PhysicalRisk';
export default PhysicalRisk;