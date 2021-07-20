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
import { connect } from 'react-redux';
import { setCountry1, setCountry2 } from '../../actions/';

class EnforcementCapacity extends Component {
	constructor(props){
		super(props);

		let selected = '';
		for (let i = 0; i < enforcementCapacityTabs.length; i++)
		{
			if (enforcementCapacityTabs[i].url == props.indicator)
			{
				selected = enforcementCapacityTabs[i];
			}
		}

		this.state={
			lockedCountry: (this.props.lockedCountry != 'CH' && this.props.lockedCountry != 'HR' && this.props.lockedCountry != 'IS'
				&& this.props.lockedCountry != 'LU'  && this.props.lockedCountry != 'NO'  && this.props.lockedCountry != 'RO') ? this.props.lockedCountry : 'AT',
			indicatorSubTabs: enforcementCapacityTabs,
			selectedTab: selected,
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
		if (!this.props.selectedByUser) {
			this.props.setCountry1(callbackCountry1);
		} else {
			this.setState({
				lockedCountry: callbackCountry1
			});
		}
		this.setState({ filters: {countries: [{code: callbackCountry1}, this.state.filters.countries[1]]} })
	}

	handleSearch2 = (callbackCountry2) => {
		this.props.setCountry2(callbackCountry2);
		this.setState({ filters: { countries: [this.state.filters.countries[0], {code: callbackCountry2}]} })
	}

	callbackSelectedTab = (callback) => {
		for (let i = 0; i < this.state.indicatorSubTabs.length; i++)
		{
			if (this.state.indicatorSubTabs[i].url == callback)
			{
				this.setState({ selectedTab: this.state.indicatorSubTabs[i] });
			}
		}
		// this.setState({ selectedTab: callback })
	}

	getStrategiesData = () => {
		getOSHData('STRATEGY_ENFOR_CAPACITY', this.state.filters)
			.then((res) => {
				const countriesData = res.resultset;

				// If there's no Data on both selected countries on mount times
				if (countriesData.length == 0) {
					this.setState({ 
						countryText1: '', 
						countryData1: { code: this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry, name: ''}, 
						countryText2: '', 
						countryData2: { code: this.props.selectCountry2, name: '' },
						noInfoTexts1: ['20706' ,'20740'],
						noInfoTexts2: ['20706' ,'20740']
					});
				} 
				else if (countriesData.length > 0 && this.props.selectCountry2 == '0') {
					this.setState({ countryText2: null, countryData2: undefined })
				}

				const specificCountry = this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry ;
				const indexCountry1 = countriesData.findIndex((element) => element.country.code == specificCountry)
				const indexCountry2 = countriesData.findIndex((element) => element.country.code == this.props.selectCountry2)

				if (countriesData[indexCountry1] != undefined) {
					this.setState({ countryData1: countriesData[indexCountry1].country, noInfoTexts1: [] })
				} else {
					this.setState({ countryData1: { code: this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry, name: ''}, countryText1: '', noInfoTexts1: ['20706' ,'20740'] })
				}

				if (countriesData[indexCountry2] != undefined) {
					this.setState({ countryData2: countriesData[indexCountry2].country, noInfoTexts2: [] })
				} else {
					this.setState({ countryData2: { code: this.props.selectCountry2, name: '' }, countryText2: '', noInfoTexts2: ['20706' ,'20740'] })
				}

				if (countriesData.length > 0) {
					if (this.state.selectedTab.url == 'authority') {
						if (countriesData[indexCountry1] != undefined) {
							this.setState({ countryText1: countriesData[indexCountry1].text1 })
						}
						if (countriesData[indexCountry2] != undefined) {
							this.setState({ countryText2: countriesData[indexCountry2].text1 })
						}
					} else if (this.state.selectedTab.url == 'scope-of-the-labor-inspection') {
						if (countriesData[indexCountry1] != undefined) {
							this.setState({ countryText1: countriesData[indexCountry1].text2 })
						}
						if (countriesData[indexCountry2] != undefined) {
							this.setState({ countryText2: countriesData[indexCountry2].text2 })
						}
					} else if (this.state.selectedTab.url == 'inspector-powers') {
						if (countriesData[indexCountry1] != undefined) {
							this.setState({ countryText1: countriesData[indexCountry1].text3 })
						}
						if (countriesData[indexCountry2] != undefined) {
							this.setState({ countryText2: countriesData[indexCountry2].text3 })
						}
					} else if (this.state.selectedTab.url == 'strategy-plan') {
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
		if (this.state.selectedTab.url == 'authority' 
			|| this.state.selectedTab.url == 'scope-of-the-labor-inspection' 
			|| this.state.selectedTab.url == 'inspector-powers' 
			|| this.state.selectedTab.url == 'strategy-plan') {
				this.getStrategiesData();
			}

		if (this.props.country1 != undefined && this.props.country2 != undefined) {
			this.props.setCountry1(this.props.country1);
			this.props.setCountry2(this.props.country2);
		}
		
		// Update the title of the page
		document.title = this.props.literals.L22017 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.selectedTab != this.state.selectedTab 
			|| prevProps.selectCountry != this.props.selectCountry 
			|| prevProps.selectCountry2 != this.props.selectCountry2
			|| prevState.lockedCountry != this.state.lockedCountry) {
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
						selectedTab={this.state.selectedTab.url}
						callbackSelectedTab={this.callbackSelectedTab}
						locationPath={this.state.currentPath}
						subMenuTabs={this.state.indicatorSubTabs} 
						selectCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
						selectCountry2={this.props.selectCountry2}
						/>
				</div>

				<div className="line background-main-light"></div>

				<div>
					<SelectEconomic 
						handleSearch={this.handleSearch} 
						handleSearch2={this.handleSearch2}
						literals={this.props.literals}
						selectedCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
						selectedCountry2={this.props.selectCountry2}
						/>
				</div>

				<div className="line background-main-light"></div>

				<div className="container section--page card--grid xxs-w1 xs-w1 w1">
					{this.state.indicatorSubTabs.map((element) => {
						let auxText;
						const propLiteral = this.props.literals[`L${element.literalTab}`].replace(/[ :/]/g, '-').toLowerCase();
						if (propLiteral == '%-of-establishments-inspected') {
							auxText = propLiteral.slice(5);
						} else {
							auxText = propLiteral
						}
						if (auxText == this.state.selectedTab.url) {
							if (this.state.selectedTab.url == 'establishments-inspected') {
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
														tick={20}
														percentage={true}
														type={'column'}
														selectCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
														selectCountry2={this.props.selectCountry2}
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
											tabName={element.literalTab}
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

				<Methodology literals={this.props.literals} section={'Enforcement capacity'} indicator={this.state.selectedTab.chartType != undefined ? this.state.selectedTab.chartType[0].chartIndicator : this.state.selectedTab.indicator }/>
				<Related literals={this.props.literals} section={["osh-infrastructure","enforcement-capacity","establishments-inspected"]} country1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry} country2={this.props.selectCountry2} />
			</div>
		)
	}
}
EnforcementCapacity.displayName = 'EnforcementCapacity';

function mapStateToProps(state){
	const { selectCountry, selectCountry2, selectedByUser, lockedCountry } = state.selectCountries;
    return { selectCountry, selectCountry2, selectedByUser, lockedCountry };
}

function mapDispatchToProps(dispatch) {
	return {
		setCountry1: (country) => dispatch(setCountry1(country)),
		setCountry2: (country2) => dispatch(setCountry2(country2))
	}
}

// export default EnforcementCapacity;
export default connect(mapStateToProps, mapDispatchToProps )(EnforcementCapacity);