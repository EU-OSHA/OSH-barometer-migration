import React, { Component } from 'react';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import Related from '../common/Related.js';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import EnforcementCapacityChart from '../common/charts/EnforcementCapacityChart';
import { enforcementCapacityTabs } from '../../model/subMenuTabs';
import CountryProfileTextTab from '../common/CountryProfileTextTab';
import { getOSHData } from '../../api';


class EnforcementCapacity extends Component {

	constructor(props){
		super(props);

		this.state={
			selectCountry1: this.props.country1 != undefined ? this.props.country1 : 'AT'  ,
			selectCountry2: this.props.country2 != undefined ? this.props.country2 : '0',
			indicatorSubTabs: enforcementCapacityTabs,
			selectedTab: this.props.indicator,
			currentPath: '/osh-infrastructure/enforcement-capacity/',
			isSubMenuOpen: false,
			filters: {
				countries: [
					{code: this.props.country1 ? this.props.country1 : 'AT'}, {code: this.props.country2 ? this.props.country2 : '0'}
				]
			},
			countryText1: {},
			countryData1: {},
			countryText2: {},
			countryData2: {},
			noInfoTexts1: [],
			noInfoTexts2: []
		}
	}

	handleSearch = (callbackCountry1) => {
		this.setState({ selectCountry1: callbackCountry1 });
		this.setState({ filters: {countries: [{code: callbackCountry1}, this.state.filters.countries[1]]} })
	}

	handleSearch2 = (callbackCountry2) => {
		this.setState({ selectCountry2: callbackCountry2 });
		this.setState({ filters: { countries: [this.state.filters.countries[0], {code: callbackCountry2}]} })
	}

	callbackSelectedTab = (callback) => {
		this.setState({ selectedTab: callback })
	}

	getStrategiesData = () => {
		getOSHData('STRATEGY_ENFOR_CAPACITY', this.state.filters)
			.then((res) => {
				const countriesData = res.resultset;

				// If there's no Data on both selected countries on mount times
				if (countriesData.length == 0) {
					this.setState({ 
						countryText1: '', 
						countryData1: { code: this.state.selectCountry1, name: ''}, 
						countryText2: '', 
						countryData2: { code: this.state.selectCountry2, name: '' },
						noInfoTexts1: ['20706' ,'20740'],
						noInfoTexts2: ['20706' ,'20740']
					});
				} 
				else if (countriesData.length > 0 && this.state.selectCountry2 == '0') {
					this.setState({ countryText2: null, countryData2: undefined })
				}

				const indexCountry1 = countriesData.findIndex((element) => element.country.code == this.state.selectCountry1)
				const indexCountry2 = countriesData.findIndex((element) => element.country.code == this.state.selectCountry2)

				if (countriesData[indexCountry1] != undefined) {
					this.setState({ countryData1: countriesData[indexCountry1].country, noInfoTexts1: [] })
				} else {
					this.setState({ countryData1: { code: this.state.selectCountry1, name: ''}, countryText1: '', noInfoTexts1: ['20706' ,'20740'] })
				}

				if (countriesData[indexCountry2] != undefined) {
					this.setState({ countryData2: countriesData[indexCountry2].country, noInfoTexts2: [] })
				} else {
					this.setState({ countryData2: { code: this.state.selectCountry2, name: '' }, countryText2: '', noInfoTexts2: ['20706' ,'20740'] })
				}

				if (countriesData.length > 0) {
					if (this.state.selectedTab == 'authority') {
						if (countriesData[indexCountry1] != undefined) {
							this.setState({ countryText1: countriesData[indexCountry1].text1 })
						}
						if (countriesData[indexCountry2] != undefined) {
							this.setState({ countryText2: countriesData[indexCountry2].text1 })
						}
					} else if (this.state.selectedTab == 'scope-of-the-labor-inspection') {
						if (countriesData[indexCountry1] != undefined) {
							this.setState({ countryText1: countriesData[indexCountry1].text2 })
						}
						if (countriesData[indexCountry2] != undefined) {
							this.setState({ countryText2: countriesData[indexCountry2].text2 })
						}
					} else if (this.state.selectedTab == 'inspector-powers') {
						if (countriesData[indexCountry1] != undefined) {
							this.setState({ countryText1: countriesData[indexCountry1].text3 })
						}
						if (countriesData[indexCountry2] != undefined) {
							this.setState({ countryText2: countriesData[indexCountry2].text3 })
						}
					} else if (this.state.selectedTab == 'strategy-plan') {
						if (countriesData[indexCountry1] != undefined) {
							this.setState({ countryText1: countriesData[indexCountry1].text4 })
						}
						if (countriesData[indexCountry2] != undefined) {
							this.setState({ countryText2: countriesData[indexCountry2].text4 })
						}
					}
				}
			})
	}
	
	componentDidMount() {
		if (this.state.selectedTab == 'authority' 
			|| this.state.selectedTab == 'scope-of-the-labor-inspection' 
			|| this.state.selectedTab == 'inspector-powers' 
			|| this.state.selectedTab == 'strategy-plan') {
				this.getStrategiesData();
			} 
		
		// Update the title of the page
		document.title = this.props.literals.L22017 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevState.selectedTab != this.state.selectedTab 
			|| prevState.selectCountry1 != this.state.selectCountry1 
			|| prevState.selectCountry2 != this.state.selectCountry2) {
				this.getStrategiesData();
			}
	}

	render()
	{
		return(
			<div className="country--profile--page enforcement-capacity">
				<AdviceSection literals={this.props.literals} section={["osh-infrastructure","enforcement-capacity"]} methodologyData={{section: 'osh-infrastructure', subsection: 'Enforcement capacity', indicator: 285}} />

				<div>
					<SubMenuTabs 
						literals={this.props.literals}
						selectedTab={this.state.selectedTab}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorSubTabs} 
						selectCountry1={this.state.selectCountry1}
						selectCountry2={this.state.selectCountry2}
						/>
				</div>

				<div>
					<SelectEconomic 
						handleSearch={this.handleSearch} 
						handleSearch2={this.handleSearch2}
						literals={this.props.literals}
						selectedCountry1={this.state.selectCountry1}
						selectedCountry2={this.state.selectCountry2}
						/>
				</div>

				<div className="container section--page card--grid xxs-w1 xs-w1 w1">
					{this.state.indicatorSubTabs.map((element) => {
						let auxText;
						const propLiteral = this.props.literals[`L${element.literalTab}`].replace(/[ :/]/g, '-').toLowerCase();
						if (propLiteral == '%-of-establishments-inspected') {
							auxText = propLiteral.slice(5);
						} else {
							auxText = propLiteral
						}
						if (auxText == this.state.selectedTab) {
							if (this.state.selectedTab == 'establishments-inspected') {
								return (
									<div key={element.literalTab} className="card--block--chart">
										<div className="chart--block with-filter" >
											<div className="card--block--chart--wrapper" >
												<div className="chart--block">
													<EnforcementCapacityChart
														title={this.props.literals[`L${element.chartType[0].title}`]}
														subtitle={this.props.literals[`L${element.chartType[0].subTitle}`]}
														colors={['#f6a400','#f3c564', '#449fa2', '#cbe2e3']}
														// showDataLabel={false}
														// tick={20}
														percentage={true}
														type={'column'}
														selectCountry1={this.state.selectCountry1}
														selectCountry2={this.state.selectCountry2}
														chart={element.chartType[0].chart}
														indicator={element.chartType[0].chartIndicator}
														sector={element.chartType[0].sector}
														answers={element.chartType[0].answers}
														stackingColumn={'normal'}
														/>
												</div>
											</div>
										</div>
									</div>
								)
							} else {
								return (
									<div key={element.literalTab} className="container section--page full-tablet" >
										<CountryProfileTextTab 
											literals={this.props.literals}
											country1Text={this.state.countryText1}
											country2Text={this.state.countryText2}
											country1={this.state.countryData1}
											country2={this.state.countryData2}
											noInfoMsg1={this.state.noInfoTexts1}
											noInfoMsg2={this.state.noInfoTexts2}
											maxCharacters={400}
											page={'enforcement'}
											/>
									</div>
								)
							}
						}
					})}	
				</div>

				<Methodology literals={this.props.literals} section={'Enforcement capacity'} />
				<Related literals={this.props.literals} section={["osh-infrastructure","enforcement-capacity","establishments-inspected"]} />
			</div>
		)
	}
}
EnforcementCapacity.displayName = 'EnforcementCapacity';
export default EnforcementCapacity;