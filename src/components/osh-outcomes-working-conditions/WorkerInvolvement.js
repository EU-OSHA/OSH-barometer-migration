import React, { Component, Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SpiderChart from '../common/charts/SpiderChart';
import { workerInvolvementTabs } from '../../model/subMenuTabs';

// This component will take care of updating the URL for the current page if necessary
const ChangeDataset = props => {
	const history = useHistory();
	const url ='/osh-outcomes-working-conditions/worker-involvement/';

	const loadUrl = () => {
		let newUrl = props.country2 ? `${url}${props.dataset}/${props.country1}/${props.country2}` : `${url}${props.dataset}/${props.country1}`;
		// Check if the URL needs to be changed
		if (history.location.pathname != newUrl)
		{
			history.push({
				pathname: `${newUrl}`
			})
		}
	}

	loadUrl();
	return (
		null
	)
}

class WorkerInvolvement extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			selectCountry1: 'AT',
			selectCountry2: '',
			indicatorTabs: workerInvolvementTabs[0],
			chartLegend: '',
			dataset: props.split ? props.split : 'esener'
		}

	}

	handleSearch = (callbackCountry1) => {
		this.setState({ selectCountry1: callbackCountry1 })
	}

	handleSearch2 = (callbackCountry2) => {
		this.setState({ selectCountry2: callbackCountry2 })
	}

	callbackSelectedSurvey = (callback) => {
		this.setState({ dataset: callback });
	}

	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend });
	}

	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22015 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	render()
	{
		return(
			<div className="worker-involvement">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","worker-involvement"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'Worker involvement', indicator: 75}} />

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
								<div className="chart--wrapper" >
									<ChangeDataset dataset={this.state.dataset} country1={this.state.selectCountry1} country2={this.state.selectCountry2} />
									<SpiderChart
										literals={this.props.literals}
										tabIndicator={this.state.indicatorTabs.literalTab}
										selectCountry1={this.state.selectCountry1}
										selectCountry2={this.state.selectCountry2}
										showDataLabel={true}
										colors={['#f6a400','#003399','#cbe2e3']}
										chartType={this.state.indicatorTabs.chartType}
										callbackLegend={this.callbackChartLegend}
										callbackSelectedSurvey={this.callbackSelectedSurvey}
										dataset={this.state.dataset}
									/>
								</div>
							</div>
							<div className="chart-legend">
								{this.props.literals[`L${this.state.chartLegend}`]} 
							</div>						
						</div>
					</div>
				</form>
				<Methodology literals={this.props.literals} section={'Worker involvement'} dataset={this.state.dataset} />
			</div>
		)
	}
}
WorkerInvolvement.displayName = 'WorkerInvolvement';
export default WorkerInvolvement;