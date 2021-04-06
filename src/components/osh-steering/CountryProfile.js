import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import CountrySelect from '../common/CountrySelect';
import CountryProfileTextTab from '../common/CountryProfileTextTab';

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
			this.setState({
				countryProfileData1: countryData1.resultset[0] || [],
				countryProfileData2: countryData2.resultset[0] || [],
				countriesSelect1: countrySelect1.resultset,
				countriesSelect2: countrySelect2.resultset,
				indicators: indicatorData.resultset
			});
		})
		.catch(error => console.log(error.message));
	}

	componentDidMount(){
		this.retrieveCountryProfileData();
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.country1 != this.state.country1 ){
				this.retrieveCountryProfileData();
		}

		if (prevState.country2 != this.state.country2) {
			this.retrieveCountryProfileData();
		}
	}

	openIndicatorsList = (event) => {
		
		if( window.innerWidth < 990 ){
			
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

		switch (this.state.indicator) {
			case 'basic-information':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text1} 
					country2Text={this.state.countryProfileData2.text1}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab1"} 
					tabName={"L303"} 
				/>
				)
				break;
			case 'background':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text2} 
					country2Text={this.state.countryProfileData2.text2}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab2"} 
					tabName={"L304"} 
				/>
				)
				break;
			case 'characteristics-and-objectives':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text3} 
					country2Text={this.state.countryProfileData2.text3}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab3"} 
					tabName={"L305"} 
				/>
				)
				break;
			case 'details-and-activity':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text4} 
					country2Text={this.state.countryProfileData2.text4}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab4"} 
					tabName={"L306"} 
				/>
				)
				break;
			case 'actors-and-stakeholders':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text5} 
					country2Text={this.state.countryProfileData2.text5}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab5"} 
					tabName={"L307"} 
				/>
				)
				break;
			case 'resources-and-timeframe':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text6} 
					country2Text={this.state.countryProfileData2.text6}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab6"} 
					tabName={"L445"} 
				/>
				)
				break;
			case 'evaluation':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text7} 
					country2Text={this.state.countryProfileData2.text7}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab7"} 
					tabName={"L308"} 
				/>
				)
				break;
			case 'relationship-to-eu-strategic-framework':
				selectedTabContent = (
					<CountryProfileTextTab 
					literals={this.props.literals} 
					country1Text={this.state.countryProfileData1.text8} 
					country2Text={this.state.countryProfileData2.text8}
					country1={this.state.countryProfileData1.country} 
					country2={this.state.countryProfileData2.country} 
					tab={"tab8"} 
					tabName={"L446"} 
				/>
				)
				break;
		
			default:
				selectedTabContent = (null);
				break;
		}

		if(this.state.indicators.length > 0){
			indicatorTabs = (
				<ul className={"submenu--items--wrapper "+this.state.openListClass}>
					{
						this.state.indicators.map((indicator, index) => (
							<li key={index} onClick={this.openIndicatorsList(this)} className={"submenu--item "+this.isActiveIndicator(indicator.literalID)}>
								<Link to={"/osh-steering/country-profile/"+this.props.literals['L'+indicator.literalID].toLowerCase().replace(/ /g, '-')+"/"
									+this.state.country1+"/"+(this.state.country2 != undefined ? this.state.country2 : "" )} 
									onClick={this.changeIndicator(this.props.literals['L'+indicator.literalID].toLowerCase().replace(/ /g, '-'))}
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

				<div className="compare--block">
					<div className="submenu--block container">
						{indicatorTabs}
					</div>
					
					<div className="line background-main-light"></div>

					{/* FILTERS */}
					<form className="compare--block--form container">
						<ul className="compare--list">
							{/*  1ST COUNTRY FILTER  */}
							<li>
								<label htmlFor="datafor">{this.props.literals.L20609}</label>
								<CountrySelect id="datafor" 
									countries={this.state.countriesSelect1} 
									country={this.state.country1} 
									handler ={this.countryChange} 
									currentPath={"/osh-steering/country-profile/"+this.state.indicator+"/"}
								/>
							</li>
							{/* 2ND COUNTRY FILTER  */}
							<li>
								<label htmlFor="comparewith">{this.props.literals.L20610}</label>
								<CountrySelect 
									id="comparewith" 
									countries={this.state.countriesSelect2} 
									country={this.state.country2} 
									handler ={this.countryChange}
									currentPath={"/osh-steering/country-profile/"+this.state.indicator+"/"+this.state.country1+"/"}
								/>
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