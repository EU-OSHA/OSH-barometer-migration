import React, { Component } from 'react';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import HealthAwareness from '../common/charts/HealthAwareness';
import { oshCulture } from '../../model/subMenuTabs';

const literals = require('../../model/Literals.json');
const subTabs = require('../../model/healthAwareness.json');
class OSHCulture extends Component
{
	constructor(props) {
		super(props);

		let selectedTab = '';
		for (let i = 0; i < oshCulture.length; i++)
		{
			if (this.props.indicator == oshCulture[i].url)
			{
				selectedTab = oshCulture[i];
			}
		}

		this.state = {
			indicatorTabs: oshCulture,
			selectedTab: selectedTab,
			chartDimension: window.innerWidth > 768 ? 'column' : 'bar',
			currentPath: '/osh-outcomes-working-conditions/osh-culture/',
			chartLegend:'',
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
		this.setState({ chartLegend: legend })
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

	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend });
	}
	
	componentDidMount() {
		// Update the title of the page
		document.title = this.props.literals.L22012 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		window.addEventListener('resize', this.updateDimension);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimension)
	}
	
	render()
	{
		return(
			<div className="osh-culture">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","osh-culture"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'OSH culture and health awareness', indicator: 63}} />

				<SubMenuTabs 
					literals={this.props.literals} 
					callbackSelectedTab={this.callbackSelectedTab} 
					subMenuTabs={this.state.indicatorTabs}
					selectedTab={this.state.selectedTab.url}
					locationPath={this.state.currentPath}
				/>

				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
					<div className="card--block--chart" >
						<div className="chart--block">
							<div>
								<HealthAwareness
									chartTitle={this.props.literals[`L${this.state.selectedTab.chartType[0].title}`]}
									tabIndicator={this.state.selectedTab.literalTab}
									chartType={this.state.selectedTab.chartType}
									colors={['#7b7b7d', '#cbe2e3','#f6a400']}
									type={this.state.chartDimension}
									percentage={true}
									callbackLegend={this.callbackChartLegend}
								/>
							</div>
							{/* {this.state.indicatorTabs.map((tab) => {
								if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab) {
									return (
										<div key={tab.literalTab}>
											<HealthAwareness
												chartTitle={this.props.literals}
												tabIndicator={tab.literalTab}
												chartType={tab.chartType}
												colors={['#7b7b7d', '#cbe2e3','#f6a400']}
												type={this.state.chartDimension}
												percentage={true}
												callbackLegend={this.callbackChartLegend}
											/>
										</div>
									)
								}
							})} */}
						</div>
					</div>

					{this.state.indicatorTabs.map((tab) => {
								if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab) {
									return (
										<div key={tab.literalTab}>
											{this.props.literals[`L${tab.legend}`]}
											{tab.chartType.map((element) =>{
												return (
											<div className="chart-legend">{this.props.literals[`L${element.legend}`]} </div>	
												)
											})}
										</div>
									)
								}
							})}
						
				</div>
				<Methodology literals={literals} section={'OSH culture and health awareness'} indicator={this.state.selectedTab.chartType[0].chartIndicator} />

				<Related literals={literals} section={["osh-outcomes-working-conditions","osh-culture", this.state.selectedTab.url]} />
			</div>
		)
	}
}
OSHCulture.displayName = 'OSHCulture';
export default OSHCulture;