import React, { Component } from 'react';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import HealthAwareness from '../common/charts/HealthAwareness';

const literals = require('../../model/Literals.json');
const subTabs = require('../../model/healthAwareness.json');
class OSHCulture extends Component
{
	constructor(props) {
		super(props);

		this.state = {
			indicatorTabs: subTabs,
			selectedTab: '',
			chartDimension: window.innerWidth > 768 ? 'column' : 'bar'
		}
		
	}

	handleSelectedTab = (callback) => {
		this.setState({ selectedTab: callback })
	}

	updateDimension = () => {
		if (window.innerWidth > 768) {
			this.setState({ chartDimension: 'column' });
		} else {
			this.setState({ chartDimension: 'bar' })
		}
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
			<div className="osh-culture">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","osh-culture"]} />

				<SubMenuTabs literals={this.props.literals} onSelectedTab={this.handleSelectedTab} subMenuTabs={this.state.indicatorTabs} />

				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
					<div className="card--block--chart" >
						<div className="chart--block">
							{this.state.indicatorTabs.map((tab) => {
								if (tab.literalTab == this.state.selectedTab) {
									return (
										<div key={tab.literalTab}>
											<HealthAwareness
												chartTitle={this.props.literals}
												tabIndicator={tab.literalTab}
												chartType={tab.chartType}
												colors={['#7b7b7d', '#cbe2e3','#f6a400']}
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
				
				<Methodology />
				<Related literals={literals} section={["osh-outcomes-working-conditions","osh-culture","health-and-safety-discussed"]} />
			</div>
		)
	}
}
OSHCulture.displayName = 'OSHCulture';
export default OSHCulture;