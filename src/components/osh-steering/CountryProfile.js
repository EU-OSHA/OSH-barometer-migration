import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import CountrySelect from '../common/CountrySelect';
import CountryProfileTextTab from '../common/CountryProfileTextTab';

// const API_ADDRESS = 'http://89.0.4.28:8080/barometer-data-server/api';
const API_ADDRESS = process.env.BASE_URL;

class CountryProfile extends Component
{
	constructor(props){
		super(props);
		this.state = {
			countryProfileData1: {}, 
			countryProfileData2: {}, 
			openListClass: "", 
			countriesSelect1: [], 
			countriesSelect2: [], 
			indicators: [],
			country1: this.props.country1,
			country2: this.props.country2,
			// indicator: "basic-information"
			indicator: this.props.indicator
		};
	}

	retrieveCountryProfileData = () => {
		Promise.all([
			fetch(`${API_ADDRESS}qualitative/getMatrixPageData?page=STRATEGY&country=${this.state.country1}`),
			fetch(`${API_ADDRESS}qualitative/getMatrixPageData?page=STRATEGY&country=${this.state.country2}`),
			fetch(`${API_ADDRESS}countries/getCountriesStrategiesPage?page=STRATEGY`),
			fetch(`${API_ADDRESS}countries/getCountriesStrategiesPage?page=STRATEGY&country=${this.state.country1}`),
			fetch(`${API_ADDRESS}qualitative/getStrategiesPageIndicators?page=STRATEGY`)
		])		.then(([countryDataResponse1,countryDataResponse2,countrySelectResponse1,countrySelectResponse2, indicatorsResponse]) => 
			Promise.all([countryDataResponse1.json(),countryDataResponse2.json(),countrySelectResponse1.json(),countrySelectResponse2.json(), indicatorsResponse.json()]))
		.then(([countryData1,countryData2,countrySelect1,countrySelect2,indicatorData]) => {
			// console.log('this.props.country2',this.props.country2);
			this.setState({
				countryProfileData1: countryData1.resultset[0],
				countryProfileData2: countryData2.resultset[0],
				countriesSelect1: countrySelect1.resultset,
				countriesSelect2: countrySelect2.resultset,
				indicators: indicatorData.resultset
			});
			// console.log('this.state', this.state);
		})
		.catch(error => console.log(error.message));
	}

	componentDidMount(){
		this.retrieveCountryProfileData();
	}

	componentDidUpdate(prevProps, prevState){
		// console.log('componentDidUpdate');
		// console.log('prevState',prevState);
		if(prevState.country1 != this.state.country1 || prevState.country2 != this.state.country2
			|| prevState.indicator != this.state.indicator){
				// console.log('Updating state in componentDidUpdate');
				this.retrieveCountryProfileData();
		}
	}

	openIndicatorsList = (event) => {
		if( window.innerWidth < 1090 ){
			if(event.target.nodeName == "A"){
			  var parentTag = event.target.offsetParent.nextSibling.parentNode.className;
			} else if( event.target.nodeName == "LI" ){
			  var parentTag = event.target.parentNode.className;
			} 

			if(parentTag.indexOf('open-list') < 0 ){
				this.setState({openListClass: "open-list"});
			} else {
				this.setState({openListClass: ""});
			}
		}
	}

	isActiveIndicator = (indicator) => {
		const anchor = this.props.literals['L'+indicator].toLowerCase().replace(/ /g, '-');		
		if(this.state.indicator === anchor){
			return "active";
		}else{
			return "";
		}
	}

	isOneCountrySelected = () => {
		if(this.state.country2 !== undefined && this.state.country2 !== null
			&& this.state.country2 !== ""){
			return "no-full";
		}else{
			return "full";
		}
	}

	countryChange = event => {
		// console.log('countryChange');
		if(event.target.id === "datafor"){
			this.setState({country1: event.target.value});
		}else{
			this.setState({country2: event.target.value});
		}
	}

	changeIndicator = indicatorSelected => () => {
		this.setState({indicator: indicatorSelected});
	}

	render()
	{
		var indicatorTabs = "";
		var selectedTabContent = "";

		if(this.state.indicator === "basic-information"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text1} country2Text={this.state.countryProfileData2.text1}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab1"} tabName={"L303"} />
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text1}
						country1={this.state.countryProfileData1.country} tab={"tab1"} tabName={"L303"} />
				)
			}
			
		}else if(this.state.indicator === "background"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text2} country2Text={this.state.countryProfileData2.text2}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab2"} tabName={"L304"}/>
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text2}
						country1={this.state.countryProfileData1.country} tab={"tab2"} tabName={"L304"}/>
				)
			}
			
		}else if(this.state.indicator === "characteristics-and-objectives"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text3} country2Text={this.state.countryProfileData2.text3}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab3"} tabName={"L305"}/>
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text3}
						country1={this.state.countryProfileData1.country} tab={"tab3"} tabName={"L305"}/>
				)
			}
		}else if(this.state.indicator === "details-and-activity"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text4} country2Text={this.state.countryProfileData2.text4}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab4"} tabName={"L306"}/>
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text4}
						country1={this.state.countryProfileData1.country} tab={"tab4"} tabName={"L306"}/>
				)
			}
		}else if(this.state.indicator === "actors-and-stakeholders"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text5} country2Text={this.state.countryProfileData2.text5}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab5"} tabName={"L307"}/>
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text5}
						country1={this.state.countryProfileData1.country} tab={"tab5"} tabName={"L307"}/>
				)
			}
		}else if(this.state.indicator === "resources-and-timeframe"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text6} country2Text={this.state.countryProfileData2.text6}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab6"} tabName={"L20251"}/>
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text6}
						country1={this.state.countryProfileData1.country} tab={"tab6"} tabName={"L20251"}/>
				)
			}
			
		}else if(this.state.indicator === "evaluation"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text7} country2Text={this.state.countryProfileData2.text7}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab7"} tabName={"L308"}/>
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text7}
						country1={this.state.countryProfileData1.country} tab={"tab7"} tabName={"L308"}/>
				)
			}
		}else if(this.state.indicator === "relationship-to-eu-strategic-framework"){
			if(this.props.country2 != undefined && this.state.countryProfileData2 != undefined){
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text8} country2Text={this.state.countryProfileData2.text8}
						country1={this.state.countryProfileData1.country} country2={this.state.countryProfileData2.country} tab={"tab8"} tabName={"L20253"}/>
				)
			}else{
				selectedTabContent = (
					<CountryProfileTextTab literals={this.props.literals} country1Text={this.state.countryProfileData1.text8}
						country1={this.state.countryProfileData1.country} tab={"tab8"} tabName={"L20253"}/>
				)
			}
			
		}

		if(this.state.indicators.length > 0){
			indicatorTabs = (
				<ul className={"submenu--items--wrapper "+this.state.openListClass}>
					{
						this.state.indicators.map((indicator, index) => (
							<li key={index} onClick={this.openIndicatorsList()} className={"submenu--item "+this.isActiveIndicator(indicator.literalID)}>
								<Link to={"/osh-steering/country-profile/"+this.props.literals['L'+indicator.literalID].toLowerCase().replace(/ /g, '-')+"/"
									+this.state.country1+"/"+(this.state.country2 != undefined ? this.state.country2 : "" )} 
									onClick={this.changeIndicator(this.props.literals['L'+indicator.literalID].toLowerCase().replace(/ /g, '-'))}
									// data-ng-click="changeIndicator($event,indicator.anchor)" 
									className={this.isActiveIndicator(indicator.literalID)}>{this.props.literals['L'+indicator.literalID]}</Link>
							</li>
						))
					}
				</ul>	
			)
		}

		return(
			<div className="country--profile--page">
				<AdviceSection literals={this.props.literals} section={["osh-steering","country-profile"]} />

				<div className="container">
					<p className="btn--block-full left-text">
						<Link to={"/osh-steering/eu-challenges-response/"+this.state.country1} className="btn-default btn-main-color" 
							title={this.props.literals.L20625}>{this.props.literals.L20625}</Link>
					</p>
				</div>

				<div className="compare--block regulation-page">
					<div className="submenu--block container">
						{/* <label className="submenu-indicator" >Select the indicator</label> */}
						{indicatorTabs}
					</div>
					
					<div className="line background-main-light"></div>

					{/* FILTERS */}
					<form className="compare--block--form container">
						<ul className="compare--list">
							{/*  1ST COUNTRY FILTER  */}
							<li>
								<label htmlFor="datafor">{this.props.literals.L20609}</label>
								<CountrySelect id="datafor" countries={this.state.countriesSelect1} country={this.state.country1} 
									handler ={this.countryChange} currentPath={"/osh-steering/country-profile/"+this.state.indicator+"/"}/>
								{/* <select id="datafor" data-ng-cloak ng-model="pCountry1" parameter="pCountry1" params="[['pCountry', pCountry2]]"
									listen-to="['pCountry2']" query="getStrategiesCountriesSelect" cda="{::cdaGenericInformation }" placeholder="0" data-ng-change="countryChange()">
								</select>   */}
							</li>
							{/* 2ND COUNTRY FILTER  */}
							<li>
								<label htmlFor="comparewith">{this.props.literals.L20610}</label>
								<CountrySelect id="comparewith" countries={this.state.countriesSelect2} country={this.state.country2} handler ={this.countryChange}
									currentPath={"/osh-steering/country-profile/"+this.state.indicator+"/"+this.state.country1+"/"}/>
								{/* <select id="comparewith" data-ng-cloak ng-model="pCountry2" parameter="pCountry2" params="[['pCountry', pCountry1]]"
									listen-to="['pCountry1']" query="getStrategiesCountriesSelect" cda="{::cdaGenericInformation }" 
									placeholder="{pCountry2=='0'?1:0}" data-ng-change="countryChange()">
								</select>  */}
							</li>
						</ul>
					</form>

					<div className="line background-main-light"></div>
				</div>

				<section className="container section--page full-tablet">
					{selectedTabContent}					
				</section>

				<Methodology />
			</div>
		)
	}
}
CountryProfile.displayName = 'CountryProfile';
export default CountryProfile;