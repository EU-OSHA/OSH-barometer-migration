import React, { Component } from 'react';

import AdviceSection from '../common/AdviceSection';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';

const literals = require('../../model/Literals.json');
const subTabs = require('../../model/mentalHealth.json');
class MentalRisk extends Component
{
	constructor(props) {
		super(props);
		
		this.state = {
			indicatorTabs: subTabs,
			selectedTab: ''
		}
	}

	handleSelectedTab = (callback) => {
		this.setState({ selectedTab: callback })
	}
	
	render()
	{
		return(
			<div className="mental-risk">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk"]} />

				<SubMenuTabs literals={literals} onSelectedTab={this.handleSelectedTab}  subMenuTabs={this.state.indicatorTabs} />

				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text" >
					<div className="card--block--chart" >
						<div className="chart--block" >
							{this.state.indicatorTabs.map((tab) => {
								if (tab.literalTab == this.state.selectedTab) {
									return (
										<div key={tab.literalTab} >
											<MentalRiskCharts
												chartTitle={this.props.literals}
												tabIndicator={tab.literalTab}
												chartType={tab.chartType}
												colors={['#cbe2e3', '#f6a400','#7b7b7d']}
											/>
										</div>
									)
								}
							})}

						</div>
					</div>
				</div>
				
			</div>
		)
	}
}
MentalRisk.displayName = 'MentalRisk';
export default MentalRisk;