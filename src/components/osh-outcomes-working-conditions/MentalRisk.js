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
			selectedTab: '',
			chartDimension: 'column'
		}
	}

	updateDimension = () => {
		if (window.innerWidth > 768) {
			this.setState({ chartDimension: 'column' });
		} else {
			this.setState({ chartDimension: 'bar' })
		}
	}

	handleSelectedTab = (callback) => {
		this.setState({ selectedTab: callback })
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimension);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimension)
	}

	render()
	{
		return(
			<div className="mental-risk">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk"]} />

				<SubMenuTabs literals={literals} onSelectedTab={this.handleSelectedTab}  subMenuTabs={this.state.indicatorTabs} />
				<div class="line background-main-light"></div>
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
												type={this.state.chartDimension}
												percentage={true}
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