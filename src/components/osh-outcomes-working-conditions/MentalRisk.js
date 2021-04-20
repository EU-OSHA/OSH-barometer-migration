import React, { Component } from 'react';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';

const subTabs = require('../../model/mentalHealth.json');

class MentalRisk extends Component
{
	constructor(props) {
		super(props);
		
		this.state = {
			indicatorTabs: subTabs,
			selectedTab: this.props.indicator,
			selectedSurvey: this.props.dataset,
			chartLegend: '',
			chartDimension: window.innerWidth > 768 ? 'column' : 'bar',
			currentPath: '/osh-outcomes-working-conditions/mental-risk/'
		}
	}

	updateDimension = () => {
		if (window.innerWidth > 768) {
			this.setState({ chartDimension: 'column' });
		} else {
			this.setState({ chartDimension: 'bar' })
		}
	}

	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend });
	}

	callbackSelectedSurvey = (callback) => {
		this.setState({ selectedSurvey: callback });
	}

	callbackSelectedTab = (callback) => {
		this.setState({ selectedTab: callback })
	}

	componentDidMount() {
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
			<div className="mental-risk">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk"]} />

				<SubMenuTabs 
					literals={this.props.literals} 
					callbackSelectedTab={this.callbackSelectedTab} 
					selectedTab={this.state.selectedTab} 
					selectedSurvey={this.state.selectedSurvey} 
					subMenuTabs={this.state.indicatorTabs}
					locationPath={this.state.currentPath}
				/>

				<div classname="line background-main-light"></div>
				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text" >
					<div className="card--block--chart" >
						<div className="chart--block with-filter" >
							<div className="card--block--chart--wrapper" >
								{this.state.indicatorTabs.map((tab) => {
									if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab) {
										return (
											<div className="chart--wrapper" key={tab.literalTab} >
												<MentalRiskCharts
													chartTitle={this.props.literals}
													tabIndicator={tab.literalTab}
													chartType={tab.chartType}
													selectedSurvey={this.state.selectedSurvey}
													colors={['#7b7b7d', '#cbe2e3','#f6a400']}
													type={this.state.chartDimension}
													percentage={true}
													callbackLegend={this.callbackChartLegend}
													callbackSelectedSurvey={this.callbackSelectedSurvey}
													selectedTab={this.state.selectedTab}
												/>
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
				
				<Methodology />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk", this.props.indicator]} />
			</div>
		)
	}
}
MentalRisk.displayName = 'MentalRisk';
export default MentalRisk;