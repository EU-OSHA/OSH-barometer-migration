import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import WorkAccidentsChart from '../common/charts/WorkAccidentsChart';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import { largeSize, mediumSize } from '../common/utils/chartConfig';
import { workAccidents } from '../../model/subMenuTabs';
import { connect } from 'react-redux';
import { setDefaultCountry2 } from '../../actions/';

class WorkAccidents extends Component
{
	constructor(props) {
		super(props)

		let selectedTab = '';
		for (let i = 0; i < workAccidents.length; i++)
		{
			if (workAccidents[i].url == props.indicator)
			{
				selectedTab = workAccidents[i];
			}
		}

		let country1 = props.country1 ? props.country1 : props.defaultCountry ? props.defaultCountry.code : 'AT';
		let country2 = props.country2 ? props.country2 : props.defeultCountry2 ? props.defaultCountry2.code : '0';

		this.state = {
			// selectCountry1: 'AT',
			selectCountry1: country1,
			// selectCountry2: '',
			selectCountry2: country2,
			defaultCountry2Selected: false,
			indicatorTabs: workAccidents,
			selectedTab: selectedTab,
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
		this.props.setDefaultCountry2({
			code: callbackCountry2,
			isCookie : false
		})
	}

	callbackSelectedTab = (callback) => {
		for (let i = 0; i < this.state.indicatorTabs.length; i++)
		{
			if (this.state.indicatorTabs[i].url == callback)
			{
				this.setState({ selectedTab: this.state.indicatorTabs[i] })
			}
		}		
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

	componentDidUpdate(prevProps) {
		if(prevProps.defaultCountry.code != this.props.defaultCountry.code && !this.props.country1){
			this.setState({selectCountry1: this.props.defaultCountry.code});
		}

		if(!this.state.defaultCountry2Selected && !this.props.country2){
			this.setState({ 
				selectCountry2: this.props.defaultCountry2.code,
				defaultCountry2Selected: true
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimension)
	}

	render()
	{
		let indicatorID = this.state.selectedTab.url == 'non-fatal-work-accidents' ? 53 : 54;
		return(
			<div className="work-accidents">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'Work accidents', indicator: 53}} />
				<form className="compare--block--form">
					<SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab.url}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorTabs} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
					/>
				<div className="line background-main-light" />

				{this.state.selectedTab.url == 'non-fatal-work-accidents' && (
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
						{this.state.selectedTab.url == 'non-fatal-work-accidents' ? (
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
						<p>{ this.state.selectedTab.url == 'non-fatal-work-accidents' ? this.props.literals.L20565 : ReactHtmlParser(this.props.literals.L20566) }</p>
					</div>
				</div>

			</form>
				<Methodology literals={this.props.literals} section={'Work accidents'} indicator={indicatorID} />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents", this.props.indicator ]} />
				
		</div>
		)
	}
}

function mapStateToProps(state){
    const { defaultCountry } = state;
	const { defaultCountry2 } = state;
    return { defaultCountry: defaultCountry, defaultCountry2: defaultCountry2 };
}

WorkAccidents.displayName = 'WorkAccidents';
// export default WorkAccidents;
export default connect(mapStateToProps, { setDefaultCountry2 } )(WorkAccidents);