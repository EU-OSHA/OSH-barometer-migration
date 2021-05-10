import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SpiderChart from '../common/charts/SpiderChart';

const subTabs = require('../../model/mentalHealth.json')

class WorkerInvolvement extends Component {
		constructor(props){
			super(props);
			this.state = {
				selectCountry1: 'AT',
				selectCountry2: '',
				indicatorTabs: subTabs,
				chartLegend: '',

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
	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend });
	}

	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22015 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
		console.log(this.state.indicatorTabs)
	}

	render()
	{
		return(
			<div className="worker-involvement">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","worker-involvement"]} />

				<form className="compare--block--form">

					<div>
					{/* <div className="line background-main-light" /> */}
						<SelectEconomic 
						handleSearch={this.handleSearch} 
						handleSearch2={this.handleSearch2} 
						//charts={['20022']}
						//indicator={'53'}
						literals={this.props.literals}
						selectedCountry1={this.state.selectCountry1}
						selectedCountry2={this.state.selectCountry2}
						/>

					</div>

					<div className="line background-main-light" />

					<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
						<div className="card--block--chart with-filters">

						 <div className="chart--block">

						 {this.state.indicatorTabs.map((tab)=>{
											 
								if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == 'worker-involvement') {
									return (
										<div className="chart--wrapper" key={tab.literalsTab}>
											
										<SpiderChart
										literals={this.props.literals}
										tabIndicator={tab.literalTab}
										selectCountry1={this.state.selectCountry1}
										selectCountry2={this.state.selectCountry2}
										showDataLabel={true}
										colors={['#f6a400','#003399','#cbe2e3']}
										selectedTab={'worker-involvemen'}
										indicatorTabs={this.state.indicatorTabs}
										chartType={tab.chartType}
										callbackLegend={this.callbackChartLegend}
										callbackSelectedSurvey={this.callbackSelectedSurvey}
										/>
										</div>
									)
								}
								
							})} 

						</div>

							<div className="chart-legend">
							{this.props.literals[`L${this.state.chartLegend}`]} </div>

							{/* {this.state.indicatorTabs.map((tab)=>{
								if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == 'worker-involvement') {
								
								return (
									<div className="chart--wrapper" key={tab.literalsTab}>
											 {tab.literalTab} 
											 </div>
								)}
								})} */}
						
					</div>
					</div>
		

					</form>



			</div>
		)
	}
}
WorkerInvolvement.displayName = 'WorkerInvolvement';
export default WorkerInvolvement;