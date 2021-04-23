import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
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
				indicatorTabs: subTabs,
				//indicatorTabs: [{ literalTab: '20654' }, { literalTab: '20655' },{ literalTab: '20656' }],
				indicatorSubTabs: [{ literalTab: '328' }, { literalTab: '329' },{ literalTab: '330' },{ literalTab: '331' }],
				selectedTab: this.props.indicator,
				chartLegend: '',
				selectedSurvey:'smoke,-powder-or-dust',
				currentPath: '/osh-outcomes-working-conditions/physical-risk/',
				isSubMenuOpen: false,
				chartDimension: window.innerWidth > 768 ? 'column' : 'bar',
				visible: true,
				
			}
			
		}



	handleSearch = (callbackCountry1) => {
		this.setState({ selectCountry1: callbackCountry1 })
	}

	handleSearch2 = (callbackCountry2) => {
		this.setState({ selectCountry2: callbackCountry2 })
	}

	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend });
	}

	callbackSelectedSurvey = (callback) => {
		this.setState({ selectedSurvey: callback });
	}

	callbackSelectedTab = (callback) => {
		//console.log(this.state.selectedSurvey)

		if (callback.replace(/-/g, ' ') == this.props.literals.L20655.toLowerCase()){
				this.setState({visible: !this.state.visible})
				//this.setState({selectedTab: callback})
				//this.setState({selectedSurvey: this.state.selectedSurvey})
			}else{
				//this.setState({visible: !this.state.visible})
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

		console.log(this.state.indicatorTabs)
	}

	componentDidUpdate(prevProps) {
	
		if (prevProps.dataset != this.props.dataset) {
			this.setState({ selectedSurvey: this.props.dataset })
		}

		if (prevProps.indicator != this.props.indicator) {
			this.setState({ selectedTab: this.props.indicator })
		}
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
					{/* <SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorTabs} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
						/> */}
					</div>
					<div>
					<div className="line background-main-light" />
												{/******  Segundo subMenu***********/}

					
					 <SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab}
						selectedSurvey={this.state.selectedSurvey} 
						callbackSelectedTab={this.callbackSelectedTab}
						callbackSelectedSurvey={this.callbackSelectedSurvey}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorSubTabs} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
						/> 
						

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

						<MentalRiskCharts
						literals={this.props.literals}
						tabIndicator={"328"}
						chartType={[{"type": "ewcs", "chart":"20053", "title": "22143", "chartIndicator": "71", "sector": null, "anwers": ["20","27"], "legend": "20598"}
					]}
						colors={['#7b7b7d', '#cbe2e3','#f6a400']}
						type={this.state.chartDimension}
						percentage={true}
						callbackLegend={this.callbackChartLegend}
						callbackSelectedSurvey={this.callbackSelectedSurvey}
						/>

						{/* {this.state.visible ? <div className="chart--block">
						
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
													//callbackSelectedSurvey={this.callbackSelectedSurvey}
												/>
											</div>
										)
									}
								})}
							</div>
							</div>: null} */}

						</div>
							</div>
		

					</form>

					{/* <Methodology />

						<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents", this.props.indicator ]} /> */}


			</div>
		)
	}
}
PhysicalRisk.displayName = 'PhysicalRisk';
export default PhysicalRisk;