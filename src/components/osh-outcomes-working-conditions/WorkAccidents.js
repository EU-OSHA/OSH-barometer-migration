import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import WorkAccidentsChart from '../common/charts/WorkAccidentsChart';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import { largeSize, mediumSize } from '../common/utils/chartConfig';

class WorkAccidents extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			selectCountry1: 'AT',
			selectCountry2: '',
			indicatorTabs: [{ literalTab: '310' }, { literalTab: '311' }],
			selectedTab: this.props.indicator,
			currentPath: '/osh-outcomes-working-conditions/work-accidents/',
			isSubMenuOpen: false,
			chartDimension: window.innerWidth > 768 ? 'column' : 'bar'
		}
	}
	handleSearch = (callbackCountry1) => {
		this.setState({ selectCountry1: callbackCountry1 })
	}

	handleSearch2 = (callbackCountry2) => {
		this.setState({ selectCountry2: callbackCountry2 })
	}

	callbackSelectedTab = (callback) => {
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
		// Update the title of the page
		document.title = this.props.literals.L22010 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		window.addEventListener('resize', this.updateDimension);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimension)
	}

	render()
	{
		return(
			<div className="work-accidents">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'Work accidents', indicator: 53}} />
				<form className="compare--block--form">
					<SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorTabs} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
					/>
				<div className="line background-main-light" />

				{this.state.selectedTab == 'non-fatal-work-accidents' && (
					<SelectEconomic 
						handleSearch={this.handleSearch} 
						handleSearch2={this.handleSearch2} 
						charts={['20022']}
						indicator={'53'}
						literals={this.props.literals}
						selectedCountry1={this.state.selectCountry1}
						selectedCountry2={this.state.selectCountry2}
					/>
				)}
				<div className="line background-main-light" />

				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
					<div className="card--block--chart no-filters">
						<div className="chart--block">
						{this.state.selectedTab == 'non-fatal-work-accidents' ? (
							<WorkAccidentsChart 
							title={this.props.literals.L310}
							showDataLabel={true}
							percentage={true}
							type={'line'}
							chart={'20022'}
							indicator={'53'}
							selectedCountry1={this.state.selectCountry1}
							selectedCountry2={this.state.selectCountry2}
							colors={['#f6a400','#529FA2','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e','#003399']}
							chartSize={mediumSize}
							/>
						) : (
							<WorkAccidentsChart 
							title={this.props.literals.L22196}
							showDataLabel={true}
							type={this.state.chartDimension}
							chart={'20023'}
							indicator={'54'}
							colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e','#003399']}
							chartSize={largeSize}
							/>
						)}
						</div>
					</div>

					<div className="chart-legend">
						<p>{ this.state.selectedTab == 'non-fatal-work-accidents' ? this.props.literals.L20565 : ReactHtmlParser(this.props.literals.L20566) }</p>
					</div>
				</div>

			</form>
				<Methodology />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents", this.props.indicator ]} />
				
		</div>
		)
	}
}

WorkAccidents.displayName = 'WorkAccidents';
export default WorkAccidents;