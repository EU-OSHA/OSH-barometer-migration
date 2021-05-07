import React, { Component } from 'react';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import Related from '../common/Related.js';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';


const subTabs = require('../../model/mentalHealth.json')

class EnforcementCapacity extends Component {

		constructor(props){
			super(props);

			this.state={
				selectCountry1: 'AT',
				selectCountry2: '',
				indicatorTabs: subTabs,
				indicatorSubTabs: [{ literalTab: '333' }, { literalTab: '334' },{ literalTab: '335' },{ literalTab: '20692' }],
				selectedTab: this.props.indicator,
				chartLegend: '',
				selectedSurvey:'',//osh-barometer/osh-infrastructure/enforcement-capacity/establishments-inspected
				currentPath: '/osh-barometer/osh-infrastructure/enforcement-capacity/establishments-inspected/',
				isSubMenuOpen: false,
				chartDimension: window.innerWidth > 768 ? 'column' : 'bar',
			}
		}

updateDimension = ()=>{
	if(window.innerWidth > 768){
		this.setState({chartDimesion: 'column' });
		}else{
		this.setState({chartDimesion: 'bar'})
	}
}


	handleSearch = (callbackCountry1) => {
		this.setState({ selectCountry1: callbackCountry1 })
	}

	handleSearch2 = (callbackCountry2) => {
		this.setState({ selectCountry2: callbackCountry2 })
	}
	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22017 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	render()
	{
		return(
			<div className="country--profile--page enforcement-capacity">
				<AdviceSection literals={this.props.literals} section={["osh-infrastructure","enforcement-capacity"]} />


				<div>
					{/* <SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorSubTabs1} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
						/>  */}
				</div>

				<div>

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


				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
						<div className="card--block--chart">
							<div className="chart--block with-filter" >
							<div className="card--block--chart--wrapper" >

							<div className="chart--block">
								{/* <Chart
									title={title}
									colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e']}
									//showDataLabel={true}
									tick={20}
									percentage={true}
									type={dimension}
									stackingColumn='percent'
									//selectCountry1={'AT'}
									//selectCountry2={'0'}
									stacking={true}
									//reversed={true}
									chart={'20040'}
									indicator={'65'}
									/>  */}
							</div>
								</div>
				 					</div>
									</div>
									</div>

				<Methodology />
				<Related literals={this.props.literals} section={["osh-infrastructure","enforcement-capacity","establishments-inspected"]} />
			</div>
		)
	}
}
EnforcementCapacity.displayName = 'EnforcementCapacity';
export default EnforcementCapacity;