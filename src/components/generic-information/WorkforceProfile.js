import React, { Component } from 'react';
import $ from "jquery";
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import { getCountryDataMap } from '../../api'
import MapChart from '../common/charts/MapChart';
import images from '../../style/img/flag/images'
import SelectForceProfile from '../common/subMenuTabs/SelectForceProfile'


class WorkforceProfile extends Component
{ 
	
	constructor(props){
		super(props);

		this.state = {
			currentPath:'/generic-information/workforce-profile/',
			indicator: this.props.indicator,
			title:"MEDIA AGE OF POPULATION",
			country: this.props.country,
			alert:"Not applied to Median Age",
			disabled:"disabled" ,
			unselect: true,
			visible: true,
			select:"Median age of population",
			countries:[],
			countryCode:"AT",
			countryName: "Austria",
			flag: '',
			data: {
				employment:"",
				mediaAge:"",
				unemployment:"",
				female:"",
				male:"",
				total:""
			},
			filters: {
				countries: []
			}
				
		};
		
	}

	handleSearch = (country) => {
		this.setState({countryName: country})
		this.setState({visible: false})
	}

	getLoadData = (countryName,country) => {

		getCountryDataMap(countryName, country)
			.then((res) => {
				const option = res.resultset.find((element) => element.countryName == countryName)
				const data = option.data
				this.setState({
					countries: res.resultset,
					countryName: option.countryName,
					countryCode: option.countryCode,
					flag: option.countryCode.toLowerCase(),
					data:{
						employment: data['Ageing workers (55 to 64) employment rate'],
						mediaAge: data['Median age of population'],
						unemployment: data['Unemployment rate'],
						female: data['Total, male and female employment rate - Female'],
						male: data['Total, male and female employment rate - Male'],
						total: data['Total, male and female employment rate - Total']
					}
				})
			})
	}

	componentDidMount() {
		// Update the title of the page
		document.title = this.props.literals.L22004 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363

		this.getLoadData(this.state.countryName);

		
		$(window).scroll(function(){
			var element = $( ".survey--map--block" );
			var offset = element.offset();       
			if($(this).scrollTop()>=offset.top){
			  $( ".survey--map--block" ).addClass('fixed');
			} else {
			  $( ".survey--map--block" ).removeClass('fixed');
			}
			
		});
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('body').addClass('mobile-device');
			$('.print--block').addClass('hide');
			$('.zoom--text').addClass('hide');
		} else {
			$('body').removeClass('mobile-device');
			$('.print--block').removeClass('hide');
			$('.zoom--text').removeClass('hide');
		}
	}

	componentDidUpdate(prevProps,prevState){
		if(prevState.countryName != this.state.countryName){
			this.getLoadData(this.state.countryName)
		}
	}

	handleCallbackCountry = (countryCallback) => {
		const countryFilter = this.state.filters.countries;
		const countryCode = this.state.filters.countries.find((country) => country.code == countryCallback.code)

		if (countryCode?.code != countryCallback.code) {
			this.setState({ filters: {...this.state.filters, countries: [...countryFilter, countryCallback]} })
		} else {
			const index = this.state.filters.countries.findIndex((country) => country.code == countryCallback.code);
			const newCountryFilters = this.state.filters.countries;
			newCountryFilters.splice(index, 1);
			this.setState({ filters: {...this.state.filters, countries: newCountryFilters} });
		}
	}

	onSelectCountryTag = (countryCode) => {
		return () => {
			const countryIndex = this.state.filters.countries.findIndex((country) => country.code == countryCode);
			const newArray = this.state.filters.countries;
			newArray.splice(countryIndex, 1);
			this.setState({ filters: {...this.state.filters, countries: newArray} })
		}
	}

	refresh = ()=>{
		
		this.setState({
			visible:!this.state.visible, 
			unselect: !this.state.unselect})
	}

	callbackSelect = (option)=>{
		
		this.setState({select: option})
		switch(option){
			case "employment-rate" :
				this.setState({disabled:""})
				this.setState({title:'EMPLOYMENT RATE - AGEING WORKERS'})
				this.setState({select: 'Ageing workers (55 to 64) employment rate'})
				this.setState({indicator: 'employment-rate'})
				break;
				case "ageing-workers" :
				this.setState({disabled:""})
				this.setState({title:'EMPLOYMENT RATE - AGEING WORKERS'})
				this.setState({select: 'Ageing workers (55 to 64) employment rate'})
				break;
			case "median-age":
				this.setState({disabled:"disabled"})
				this.setState({title:'MEDIA AGE OF POPULATION'})
				this.setState({alert:"Not applied to Media Age"})
				this.setState({select: 'Median age of population'})
			break;
			case "unemployment-rate":
				this.setState({disabled:"disabled"})
				this.setState({title:'UNEMPLOYMENT RATE'})
				this.setState({alert:"Not applied to Unemployment rate"})
				this.setState({select: 'Unemployment rate'})
				this.setState({indicator: 'Unemployment-rate'})
				break
			case "Female":
				this.setState({select: 'Total, male and female employment rate - Female'})
				this.setState({title:'EMPLOYMENT RATE - FEMALE'})
				break
			case "Male":
				this.setState({select: 'Total, male and female employment rate - Male'})
				this.setState({title:'EMPLOYMENT RATE - MALE'})
				break
			case "Total":
				this.setState({select: 'Total, male and female employment rate - Total'})
				this.setState({title:'EMPLOYMENT RATE - TOTAL'})
				break
		}
	}

	

	render()
	{ 
		
		return(
			<div className="workforce--page">

				<AdviceSection literals={this.props.literals} section={["generic-information","workforce-profile"]} methodologyData={{section: 'generic-information', subsection: 'Workforce profile', indicator: 37}} />
				
				<div className="filter--indicator--block container">
					<SelectForceProfile 
					selectCountries={this.state.countries}
					callbackSelect={this.callbackSelect}
					locationPath={this.state.currentPath}
					literals={this.props.literals}
					indicator={this.props.indicator}
					filters={this.state.filters}
					onCallbackCountry={this.handleCallbackCountry}
					/>
				</div>
				<div className="line background-main-light"></div>
				
				<section className="container-full nopadding">
					<section className="survey--map--block">
						<div className="sticky--wraper">
							<div className="legend--block eu">
								<div className="map--legend--block map--eu--legend container">
								<div className="matrix--header--elements">
									<img className="flags--wrapper" src={require("../../style/img/flag/eu28.png")} />
									<h2 className="country title-section main-color">{this.props.literals.L822}</h2>
								</div>
								<ul className="matrix--elements--data">
									<li>
										<label>{this.props.literals.L20615}</label>
										<div><span className="data">43.7</span> <span className="data-text">years</span></div>
									</li>
									<li>
										<label className="">Employment rate (55 - 64):</label>
										<div><span className="data">59.1</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label className="">Employment rate (female):</label>
										<div><span className="data">67.3</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label className="">Employment rate (male):</label>
										<div><span className="" >79</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label className="">Employment rate (total):</label>
										<div><span className="data" >73.1</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label className="">Unemployment rate:</label>
										<div><span className="data">6.7</span> <span className="data-text">%</span></div>
									</li>
								</ul>
								</div>
								
							</div>
							<div className="legend--block">
								{ this.state.visible ? <div> <p className="help-text container"><strong>Click on a country to compare</strong> the data <span className="exclamation" aria-hidden="true">
								</span></p> </div> : false}
											{ this.state.visible ? false :
											<div className="map--legend--block map--countries--legend container">
											<div className="matrix--header--elements">
												<img className="flags--wrapper" src={images[this.state.flag]} />
												
												<h2 className="country title-section main-color">{this.state.countryName}</h2>
											</div>
											<ul className="matrix--elements--data">
												<li>
													<label>{this.props.literals.L20615}</label>
													<div><span className="data">{this.state.data.mediaAge}</span> <span className="data-text">years</span></div>
												</li>
												<li>
													<label className="">Employment rate (55 - 64):</label>
													<div><span className="data">{this.state.data.employment}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label className="">Employment rate (female):</label>
													<div><span className="data">{this.state.data.female}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label className="">Employment rate (male):</label>
													<div><span className="data" >{this.state.data.male}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label className="">Employment rate (total):</label>
													<div><span className="data">{this.state.data.total}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label className="">Unemployment rate:</label>
													<div><span className="data">{this.state.data.unemployment}</span> <span className="data-text">%</span></div>
												</li>
											</ul>
											<span className="close-legend" onClick={this.refresh}><i className="fa fa-times" ></i></span>
											</div>	}

							</div>
						</div>
						<div className="map--block center-text container">
													
							<MapChart 
							handleSearch={this.handleSearch} 
							unselect={this.state.unselect} 
							select={this.state.select} 
							title={this.state.title}/>
							
						</div>
					</section>
					<section className="survey--map--block-mobile">
						<div className="selected--tags-wrapper">
							{/** TODO: Add selected tags in here */}
							{this.state.filters && (
								<div>
									{this.state.filters.countries.map((country) => (
										<span key={country.code} className="selected-tag" onClick={this.onSelectCountryTag(country.code)}>{country.code == 'EU27_2020' ? '' : `${country.code}`} {country.name}</span>
									))}
								</div>
							)}
						</div>
						<div className="matrix--elements--wrapper">
							<div>
								{this.state.filters.countries.length > 0 ? (
									/** It prints that are being selected */
									this.state.filters.countries.map((item) => (
										<div key={item.code} className="matrix--element eu27_2020">
											<div className="matrix--header--elements">
												<img className="flags--wrapper" src={images[item.code.toLowerCase()]} />
												<h2 className="country title-section main-color">{item.name}</h2>
											</div>
											<div className="matrix--content--elements">
												<ul className="matrix--elements--data">
													<li>
														<label className="">{this.props.literals.L20615}</label>
														<div><span className="data">{item.data['Median age of population']}</span> <span className="data-text">years</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20616}</label>
														<div><span className="data" >{item.data['Ageing workers (55 to 64) employment rate']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20617}</label>
														<div><span className="data" >{item.data['Total, male and female employment rate - Total']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20618}</label>
														<div><span className="data" >{item.data['Total, male and female employment rate - Male']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20619}</label>
														<div><span className="data">{item.data['Total, male and female employment rate - Female']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L291}</label>
														<div><span className="data">{item.data['Unemployment rate']}</span> <span className="data-text">%</span></div>
													</li>
												</ul>
											</div>
										</div>
									))
								) : (
									/** It print all countries when there are no countries selected */
									this.state.countries.map((item) => (
										<div key={item.countryCode} className="matrix--element eu27_2020">
											<div className="matrix--header--elements">
												<img className="flags--wrapper" src={images[item.countryCode.toLowerCase()]} />
												<h2 className="country title-section main-color">{item.countryName}</h2>
											</div>
											<div className="matrix--content--elements">
												<ul className="matrix--elements--data">
													<li>
														<label className="">{this.props.literals.L20615}</label>
														<div><span className="data">{item.data['Median age of population']}</span> <span className="data-text">years</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20616}</label>
														<div><span className="data" >{item.data['Ageing workers (55 to 64) employment rate']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20617}</label>
														<div><span className="data" >{item.data['Total, male and female employment rate - Total']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20618}</label>
														<div><span className="data" >{item.data['Total, male and female employment rate - Male']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L20619}</label>
														<div><span className="data">{item.data['Total, male and female employment rate - Female']}</span> <span className="data-text">%</span></div>
													</li>
													<li>
														<label className="">{this.props.literals.L291}</label>
														<div><span className="data">{item.data['Unemployment rate']}</span> <span className="data-text">%</span></div>
													</li>
												</ul>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</section>
				</section>
				<Methodology literals={this.props.literals} section={'Workforce profile'} />			
			</div>
		)
	}
}
WorkforceProfile.displayName = 'WorkforceProfile';
export default WorkforceProfile;