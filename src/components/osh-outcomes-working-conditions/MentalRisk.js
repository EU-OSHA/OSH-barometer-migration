import React, { Component } from 'react';

import AdviceSection from '../common/AdviceSection';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';

const literals = require('../../model/Literals.json');

class MentalRisk extends Component
{
	constructor(props) {
		super(props);
		
		this.state = {
			indicatorTabs: [
				{ 
					literalTab: '340', 
					chartType: [
						{type: 'esener' ,chart: '20096', chartIndicator: '323', sector: '14', answers: ['1', '2']},
						{type: 'ewcs', chart: '20073', chartIndicator: '83', sector: '14', answers: ['14', '15', '16']}
					]
				},
				{ 
					literalTab: '341', 
					chartType: [
						{type: 'esener', chart: '20097', chartIndicator: '324', sector: '14', answers: ['1', '2'] },
						{type: 'ewcs', chart: '20074', chartIndicator: '84', sector: '14', answers: ['17'] },
					]
				},
				{ literalTab: '342', chart:'20075', chartIndicator: '85', sector: null, answers: ['18', '19', '20'] },
				{ 
					literalTab: '343',
					chartType: [
						{type: 'esener', chart: '20098', chartIndicator: '325', sector: '14', answers: ['1', '2']},
						{type: 'ewcs',chart: '20076', chartIndicator: '86', sector: '14', answers: ['21', '22', '23']}
					]
				},
				{ 
					literalTab: '344',
					chartType: [
						{chartType: 'esener' ,chart: '20099', chartIndicator: '326', sector: '14', answers: ['1', '2']},
						{chartType: 'ewcs', chart: '20077', chartIndicator: '87', sector: '14', answers: ['14', '15', '16']}
					]
				},
				{ 
					literalTab: '345',
					chartType: [
						{type: 'esener', chart: '20100', chartIndicator: '327', sector: '14', answers: ['24', '25']},
						{type: 'ewcs', chart: '20078', chartIndicator: '88', sector: '14', answers: ['24', '25']}
					]
				},
				{ literalTab: '346', chart:'20079', chartIndicator: '20079', chartIndicator: '89', sector: null, answers: ['1', '2'] },
			],
			selectedTab: ''
		}
	}

	handleSelectedTab = (callback) => {
		this.setState({ selectedTab: callback })
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.selectedTab != this.state.selectedTab) {
			console.log('trigger in update',this.state.selectedTab)
		}
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
												tabIndicator={tab.literalTab}
												chartType={tab.chartType}
												colors={['#cbe2e3', '#f6a400','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e','#003399']}
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