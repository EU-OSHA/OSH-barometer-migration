import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import CountryProfileTextTab from '../common/CountryProfileTextTab';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import Related from '../common/Related';

const API_ADDRESS = process.env.BASE_URL;
class CountryProfile extends Component
{
	constructor(props){
		super(props);
		this.state = {
			countryProfileData1: {}, 
			countryProfileData2: {}, 
			openListClass: "",
			tabIndicators: false,
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
		// Update the title of the page
		document.title = this.props.literals.L22007 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		this.retrieveCountryProfileData();
		console.log(this.state.country1)
	}

	componentDidUpdate(prevProps, prevState){

		if (prevState.country1 != this.state.country1 || prevState.country2 != this.state.country2) {
			window.history.replaceState(null, null, "/osh-steering/country-profile/"+this.state.indicator+"/"+this.state.country1+"/"+this.state.country2+"/")
		}

		if(prevState.country1 != this.state.country1 ){
			this.retrieveCountryProfileData();
		}

		if (prevState.country2 != this.state.country2) {
			this.retrieveCountryProfileData();
		}

	}

	openIndicatorsList = () => {
		if (window.innerWidth < 768) {
			this.setState({ tabIndicators: !this.state.tabIndicators })
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

	// Handle change event for the select box 1
	handleChangeSelect1 = (callbackCountry) => {
		this.setState({ country1: callbackCountry });
	}

	// Handle change event for the select box 2
	handleChangeSelect2 = (callbackCountry) => {
		this.setState({ country2: callbackCountry });
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
				<ul className={`submenu--items--wrapper ${this.state.tabIndicators ? 'open-list' : ''}`}>
					{
						this.state.indicators.map((indicator, index) => (
							<li key={index} onClick={this.openIndicatorsList} className={"submenu--item "+this.isActiveIndicator(indicator.literalID)}>
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
						<SelectEconomic 
							handleSearch={this.handleChangeSelect1}
							handleSearch2={this.handleChangeSelect2}
							selectedCountry1={this.state.country1}
							selectedCountry2={this.state.country2}
							literals={this.props.literals}
						/>
					</form>

					<div className="line background-main-light"></div>
				</div>

				<section className="container section--page full-tablet">
					{selectedTabContent}					
				</section>

				<Methodology />

				{(this.state.indicator == 'background' 
					|| this.state.indicator == 'actors-and-stakeholders' 
					|| this.state.indicator == 'resources-and-timeframe' 
					|| this.state.indicator == 'relationship-to-eu-strategic-framework') 
					&& (
					<Related literals={this.props.literals} section={["osh-steering", "country-profile", this.state.indicator]} />
				)}
				
			</div>
		)
	}
}
CountryProfile.displayName = 'CountryProfile';
export default CountryProfile;