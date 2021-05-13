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
			subMenuTabs: [{ literalTab: '20669' }, { literalTab: '20670' }, { literalTab: '20671' },{ literalTab: '20672' }, { literalTab: '20673' },{ literalTab: '20674' },{ literalTab: '20675' }],
			selectedTab: this.props.indicator,
			selectedSurvey: this.props.dataset,
			indicatorSubTabs: [{ literalTab: '340' }, { literalTab: '341' },{ literalTab: '342' },{ literalTab: '343' },{ literalTab: '344' },{ literalTab: '345' }],
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
		// Update the title of the page
		document.title = this.props.literals.L22013 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
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
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'Working conditions - Mental risk', indicator: 83}} />

				<SubMenuTabs 
					literals={this.props.literals} 
					callbackSelectedTab={this.callbackSelectedTab} 
					selectedTab={this.state.selectedTab} 
					selectedSurvey={this.state.selectedSurvey} 
					subMenuTabs={this.state.indicatorSubTabs}
					locationPath={this.state.currentPath}
				/>

				<div className="line background-main-light"></div>
				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text" >
					<div className="card--block--chart" >
						<div className="chart--block with-filter" >
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
						</div>
					</div>
					<div className="chart-legend">
						{this.props.literals[`L${this.state.chartLegend}`]}
					</div>
				</div>
				
				<Methodology literals={this.props.literals} section={'Working conditions - Mental risk'} />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk", this.props.indicator]} />
			</div>
		)
	}
}
MentalRisk.displayName = 'MentalRisk';
export default MentalRisk;