import React, { Component } from 'react';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import HealthAwareness from '../common/charts/HealthAwareness';
import { oshCulture } from '../../model/subMenuTabs';
import ReactHtmlParser from 'react-html-parser';

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
	}

	componentDidUpdate(){
		// console.log(this.state, this.props.indicator);

		if(this.props.indicator != this.state.selectedTab.url){
			for (let i = 0; i < oshCulture.length; i++)
			{
				if (this.props.indicator == oshCulture[i].url)
				{
					this.setState({
						selectedTab: oshCulture[i]
					})
					
				}
			}
		}
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
							{this.state.indicatorTabs.map((tab) => {
								if (this.props.literals[`L${tab.literalTab}`].toLowerCase().replace(/ /g, '-') == this.state.selectedTab.url) {
									return (
										<div key={tab.literalTab}>
											<HealthAwareness
												literals={this.props.literals}
												tabIndicator={tab.literalTab}
												chartType={tab.chartType}
												colors={['#7b7b7d', '#cbe2e3','#f6a400']}
												percentage={true}
												callbackLegend={this.callbackChartLegend}
											/>
										</div>
									)
								}
							})}
						</div>
				</div>

					<div className="chart-legend">
						{ReactHtmlParser(this.props.literals[`L${this.state.chartLegend}`])}
					</div>
	
				</div>
				<Methodology literals={this.props.literals} section={'OSH culture and health awareness'} indicator={this.state.selectedTab.chartType[0].chartIndicator} />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","osh-culture", this.state.selectedTab.url]} />
			</div>
		)
	}
}
OSHCulture.displayName = 'OSHCulture';
export default OSHCulture;