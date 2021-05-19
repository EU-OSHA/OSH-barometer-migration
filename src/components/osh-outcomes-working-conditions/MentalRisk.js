import React, { Component } from 'react';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import { mentalRisk } from '../../model/subMenuTabs';

class MentalRisk extends Component
{
	constructor(props) {
		super(props);

		let selected = '';
		let indicator = '';
		for (let i = 0; i < mentalRisk.length; i++)
		{
			if (mentalRisk[i].url == props.indicator)
			{
				selected = mentalRisk[i];
				for (let j = 0; j < selected.chartType.length; j++)
				{
					if (props.dataset == selected.chartType[j].type)
					{
						indicator = selected.chartType[j].chartIndicator;
					}
				}
			}
		}
		
		this.state = {
			indicatorTabs: mentalRisk,
			selectedTab: selected,
			selectedSurvey: this.props.dataset,
			indicatorSubTabs: mentalRisk,
			chartLegend: '',
			chartDimension: window.innerWidth > 768 ? 'column' : 'bar',
			currentPath: '/osh-outcomes-working-conditions/mental-risk/',
			methodologyIndicator: indicator
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

		for (let i = 0; i < this.state.selectedTab.chartType.length; i++)
		{
			if (this.state.selectedTab.chartType[i].type == callback)
			{
				this.setState({ methodologyIndicator: this.state.selectedTab.chartType[i].chartIndicator });
			}
		}
	}

	callbackSelectedTab = (callback) => {
		for (let i = 0; i < this.state.indicatorTabs.length; i++)
		{
			if (callback == this.state.indicatorTabs[i].url)
			{
				this.setState({ selectedTab: this.state.indicatorTabs[i] });
			}
		}
	}

	componentDidMount() {
		// Update the title of the page
		document.title = this.props.literals.L22013 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
		window.addEventListener('resize', this.updateDimension);
	}

	componentDidUpdate(prevProps) {

		if (prevProps.dataset != this.props.dataset) {
			this.callbackSelectedSurvey(this.props.dataset);
		}

		if (prevProps.indicator != this.props.indicator) {
			this.callbackSelectedTab(this.props.indicator);
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
					selectedTab={this.state.selectedTab.url} 
					selectedSurvey={this.state.selectedSurvey} 
					subMenuTabs={this.state.indicatorTabs}
					locationPath={this.state.currentPath}
				/>

				<div className="line background-main-light"></div>
				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text" >
					<div className="card--block--chart" >
						<div className="chart--block with-filter" >
							<div className="card--block--chart--wrapper" >
								{/*this.state.indicatorTabs.map((tab) => {
									if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab) {
									return (*/}
											<div className="chart--wrapper" >
												<MentalRiskCharts
													literals={this.props.literals}
													tabIndicator={this.state.selectedTab.literalTab}
													chartType={this.state.selectedTab.chartType}
													colors={['#7b7b7d', '#cbe2e3','#f6a400']}
													type={this.state.chartDimension}
													percentage={true}
													callbackLegend={this.callbackChartLegend}
													callbackSelectedSurvey={this.callbackSelectedSurvey}
												/>
											</div>
										{/*})
									}
								})*/}
							</div>
						</div>
					</div>
					<div className="chart-legend">
						{this.props.literals[`L${this.state.chartLegend}`]}
					</div>
				</div>
				
				<Methodology literals={this.props.literals} section={'Working conditions - Mental risk'} indicator={this.state.methodologyIndicator} />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk", this.state.selectedTab.url]} />
			</div>
		)
	}
}
MentalRisk.displayName = 'MentalRisk';
export default MentalRisk;