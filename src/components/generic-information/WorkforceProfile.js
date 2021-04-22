import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import { getCountryDataMap } from '../../api'
import MapChart from '../common/charts/MapChart';
import images from '../../style/img/flag/images'
import SelectForceProfile from '../common/subMenuTabs/SelectForceProfile'


class WorkforceProfile extends Component
{ 
	
	constructor(props)
	{
		super(props);
		//this.handleSearch = this.handleSearch.bind()
		const {country} = this.props
		
		
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
			flag:"AT",
			data:{
				employment:"",
				mediaAge:"",
				unemployment:"",
				female:"",
				male:"",
				total:""
				}
				
		};
		
	}

	handleSearch = (country) => {
		this.setState({countryName: country})
		this.setState({visible: false})
	}


	getLoadData = (countryName,country) => {
		
		getCountryDataMap(countryName,country)
			.then((response)=> response)
			.then((res) => {
			
			//console.log(res.resultset)
			const option =	res.resultset.find((element)=> { return element.countryName == countryName })
			const data = option.data
			//console.log(data)
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
			}
			);
		
	}

	componentDidMount() {
		// Update the title of the page
		document.title = this.props.literals.L22004 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363

		this.getLoadData(this.state.countryName);
	}

	componentDidUpdate(prevProps,prevState){
		if(prevState.countryName != this.state.countryName){
			this.getLoadData(this.state.countryName)
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

				<AdviceSection literals={this.props.literals} section={["generic-information","workforce-profile"]} />
				
				<div className="filter--indicator--block container">
					<SelectForceProfile 
					callbackSelect={this.callbackSelect}
					locationPath={this.state.currentPath}
					literals={this.props.literals}
					indicator={this.props.indicator} 
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
										<label data-ng-bind="i18nLiterals['L20615']">{this.props.literals.L20615}</label>
										<div><span className="data" data-ng-bind="data.medianAge['EU27_2020'].value">43.7</span> <span className="data-text" data-ng-bind="i18nLiterals['L20620']">years</span></div>
									</li>
									<li>
										<label data-ng-bind="i18nLiterals['L20616']" className="ng-binding">Employment rate (55 - 64):</label>
										<div><span className="data" data-ng-bind="data.ageingWorkers['EU27_2020'].value">59.1</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label data-ng-bind="i18nLiterals['L20619']" className="ng-binding">Employment rate (female):</label>
										<div><span className="data ng-binding" data-ng-bind="data.femaleEmployment['EU27_2020'].value">67.3</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label data-ng-bind="i18nLiterals['L20618']" className="ng-binding">Employment rate (male):</label>
										<div><span className="data ng-binding" data-ng-bind="data.maleEmployment['EU27_2020'].value">79</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label data-ng-bind="i18nLiterals['L20617']" className="ng-binding">Employment rate (total):</label>
										<div><span className="data ng-binding" data-ng-bind="data.totalEmployment['EU27_2020'].value">73.1</span> <span className="data-text">%</span></div>
									</li>
									<li>
										<label data-ng-bind="i18nLiterals['L22125']" className="ng-binding">Unemployment rate:</label>
										<div><span className="data ng-binding" data-ng-bind="data.unemploymentRate['EU27_2020'].value">6.7</span> <span className="data-text">%</span></div>
									</li>
								</ul>
								</div>
								
							</div>
							<div className="legend--block">
								{/* ngIf: selectedCountry=='' */}

							
							
								{ this.state.visible ? <div> <p className="help-text container ng-scope" data-ng-if="selectedCountry==''"><strong>Click on a country to compare</strong> the data <span className="exclamation" aria-hidden="true">
								</span></p> </div> : false}
		
											{ this.state.visible ? false :
											<div className="map--legend--block map--countries--legend container">
											<div className="matrix--header--elements">
												<img className="flags--wrapper" src={images[this.state.flag]} />
												
												<h2 className="country title-section main-color">{this.state.countryName}</h2>
											</div>
											<ul className="matrix--elements--data">
												<li>
													<label data-ng-bind="i18nLiterals['L20615']">{this.props.literals.L20615}</label>
													<div><span className="data" data-ng-bind="data.medianAge['EU27_2020'].value">{this.state.data.mediaAge}</span> <span className="data-text" data-ng-bind="i18nLiterals['L20620']">years</span></div>
												</li>
												<li>
													<label data-ng-bind="i18nLiterals['L20616']" className="ng-binding">Employment rate (55 - 64):</label>
													<div><span className="data" data-ng-bind="data.ageingWorkers['EU27_2020'].value">{this.state.data.employment}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label data-ng-bind="i18nLiterals['L20619']" className="ng-binding">Employment rate (female):</label>
													<div><span className="data ng-binding" data-ng-bind="data.femaleEmployment['EU27_2020'].value">{this.state.data.female}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label data-ng-bind="i18nLiterals['L20618']" className="ng-binding">Employment rate (male):</label>
													<div><span className="data ng-binding" data-ng-bind="data.maleEmployment['EU27_2020'].value">{this.state.data.male}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label data-ng-bind="i18nLiterals['L20617']" className="ng-binding">Employment rate (total):</label>
													<div><span className="data ng-binding" data-ng-bind="data.totalEmployment['EU27_2020'].value">{this.state.data.total}</span> <span className="data-text">%</span></div>
												</li>
												<li>
													<label data-ng-bind="i18nLiterals['L22125']" className="ng-binding">Unemployment rate:</label>
													<div><span className="data ng-binding" data-ng-bind="data.unemploymentRate['EU27_2020'].value">{this.state.data.unemployment}</span> <span className="data-text">%</span></div>
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
						<div className="selected--tags-wrapper"></div>
						<div className="matrix--elements--wrapper">
							{/* ngRepeat: country in matrix */}
							<div className="matrix--element eu27_2020" data-ng-repeat="country in matrix">
								<div className="matrix--header--elements">
								<img className="flags--wrapper" src={require("../../style/img/flag/eu27_2020.png")} />
								<h2 className="country ng-binding title-section main-color" data-ng-bind="i18nLiterals['L'+data.medianAge[country.country_code].country_name]">EU27_2020</h2>
								</div>
								<div className="matrix--content--elements"></div>
								<ul className="matrix--elements--data">
								<li>
									<label data-ng-bind="i18nLiterals['L20615']" className="ng-binding">Median age of population:</label>
									<div><span className="data ng-binding" data-ng-bind="data.medianAge[country.country_code].value">43.7</span> <span className="data-text ng-binding" data-ng-bind="i18nLiterals['L20620']">years</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20616']" className="ng-binding">Employment rate (55 - 64):</label>
									<div><span className="data ng-binding" data-ng-bind="data.ageingWorkers[country.country_code].value">59.1</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20617']" className="ng-binding">Employment rate (total):</label>
									<div><span className="data ng-binding" data-ng-bind="data.totalEmployment[country.country_code].value">73.1</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20618']" className="ng-binding">Employment rate (male):</label>
									<div><span className="data ng-binding" data-ng-bind="data.maleEmployment[country.country_code].value">79</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20619']" className="ng-binding">Employment rate (female):</label>
									<div><span className="data ng-binding" data-ng-bind="data.femaleEmployment[country.country_code].value">67.3</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L22125']" className="ng-binding">Unemployment rate:</label>
									<div>
										{/* ngIf: data.unemploymentRate[country.country_code].value != undefined */}<span data-ng-if="data.unemploymentRate[country.country_code].value != undefined" className="data ng-binding ng-scope" data-ng-bind="data.unemploymentRate[country.country_code].value">6.7</span>{/* end ngIf: data.unemploymentRate[country.country_code].value != undefined */} {/* ngIf: data.unemploymentRate[country.country_code].value == undefined */}<span className="data-text">%</span>
									</div>
								</li>
								</ul>
							</div>
							{/* end ngRepeat: country in matrix */}
						
							<div>{this.state.countries.map((item,id) =>( item.countryName != 'EU27_2020' ?
								<div key={id} className="matrix--element eu27_2020" data-ng-repeat="country in matrix">
								<div className="matrix--header--elements">
								<img className="flags--wrapper" src={images[item.countryCode.toLowerCase()]} />
								<h2 className="country ng-binding title-section main-color" data-ng-bind="i18nLiterals['L'+data.medianAge[country.country_code].country_name]">{item.countryName}</h2>
								</div>
								<div className="matrix--content--elements"></div>
								<ul className="matrix--elements--data">
								<li>
									<label data-ng-bind="i18nLiterals['L20615']" className="ng-binding">Median age of population:</label>
									<div><span className="data ng-binding" data-ng-bind="data.medianAge[country.country_code].value">{item.data['Median age of population']}</span> <span className="data-text ng-binding" data-ng-bind="i18nLiterals['L20620']">years</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20616']" className="ng-binding">Employment rate (55 - 64):</label>
									<div><span className="data ng-binding" data-ng-bind="data.ageingWorkers[country.country_code].value">{item.data['Ageing workers (55 to 64) employment rate']}</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20617']" className="ng-binding">Employment rate (total):</label>
									<div><span className="data ng-binding" data-ng-bind="data.totalEmployment[country.country_code].value">{item.data['Total, male and female employment rate - Total']}</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20618']" className="ng-binding">Employment rate (male):</label>
									<div><span className="data ng-binding" data-ng-bind="data.maleEmployment[country.country_code].value">{item.data['Total, male and female employment rate - Male']}</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L20619']" className="ng-binding">Employment rate (female):</label>
									<div><span className="data ng-binding" data-ng-bind="data.femaleEmployment[country.country_code].value">{item.data['Total, male and female employment rate - Female']}</span> <span className="data-text">%</span></div>
								</li>
								<li>
									<label data-ng-bind="i18nLiterals['L22125']" className="ng-binding">Unemployment rate:</label>
									<div>
										{/* ngIf: data.unemploymentRate[country.country_code].value != undefined */}<span data-ng-if="data.unemploymentRate[country.country_code].value != undefined" className="data ng-binding ng-scope" data-ng-bind="data.unemploymentRate[country.country_code].value">{item.data['Unemployment rate']}</span>{/* end ngIf: data.unemploymentRate[country.country_code].value != undefined */} {/* ngIf: data.unemploymentRate[country.country_code].value == undefined */}<span className="data-text">%</span>
									</div>
								</li>
								</ul>
							</div> : null
							))}</div>
							
						</div>
					</section>
				</section>
				<Methodology />			
			</div>
		)
	}
}
WorkforceProfile.displayName = 'WorkforceProfile';
export default WorkforceProfile;






// <ul className="indicators--group xs-row">
// 						<li id="filter1">
// 							<label htmlFor="indicatorSelect">{this.props.literals.L20623}</label> 
// 							<select onChange={this.select} id="indicatorSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-model="selectedIndicator" data-ng-change="selectChange()">
// 								<option value="median-age">{this.props.literals.L294}</option>
// 								<option value="employment-rate">{this.props.literals.L20621}</option>
// 								<option value="unemployment-rate">{this.props.literals.L291}</option>
// 							</select>
// 						</li>
// 						<li id="filter2" data-ng-className="{'disabled':selectedIndicator == 'median-age' || selectedIndicator == 'unemployment-rate'}" className="disabled">
// 							<label htmlFor="employeeGroupSelect" data-ng-bind="i18nLiterals.L20622">{this.props.literals.L20622}</label> 
							
// 							{this.state.disabled ? <select onChange={this.select} id="employeeGroupSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-disabled="selectedIndicator == 'median-age' || selectedIndicator== 'unemployment-rate'" data-ng-model="selectedSubIndicator" data-ng-change="selectChange()" disabled={this.state.disabled}>
// 								<option data-ng-bind="i18nLiterals.L295" value="ageing-workers">{this.props.literals.L295}</option>
// 								{/* <option value="Female">{this.props.literals.L444}</option>
// 								<option value="Male">{this.props.literals.L443}</option>
// 								<option value="Total">{this.props.literals.L442}</option> */}
// 							</select>
							
// 							 : <select onChange={this.select} id="employeeGroupSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-disabled="selectedIndicator == 'median-age' || selectedIndicator== 'unemployment-rate'" data-ng-model="selectedSubIndicator" data-ng-change="selectChange()" disabled={this.state.disabled}>
// 								<option data-ng-bind="i18nLiterals.L295" value="ageing-workers">{this.props.literals.L295}</option>
// 								<option value="Female">{this.props.literals.L444}</option>
// 								<option value="Male">{this.props.literals.L443}</option>
// 								<option value="Total">{this.props.literals.L442}</option>
// 							</select>}
// 							{this.state.disabled ?<label data-ng-if="selectedIndicator == 'median-age'" className="alert-disabled ">{this.state.alert}</label>: true}
// 						</li>
// 						{/* COUNTRY FILTER JUST IN < 1024 PX */}
// 						<li id="filter3" className="filter--dropdown--wrapper">
// 							<label htmlFor="countrySelect">{this.props.literals.L20630}:</label>
// 							{/*<label className="main-color  dropdwon-open" onClick="openSelect($event)"></label>*/}
// 							<div className="filter--dropdown--list">
// 								<p className="option-title" ng-click="openSelect($event)">{this.props.literals.L20630}</p>
// 								<ul className="filter--dropdown--options">
// 								<li data-ng-repeat="country in countries" className="">
// 									<input id="country-filter-822" defaultChecked="!!country.param &amp;&amp; country.param ==country.country_code" ng-click="toggleCountryClick($event, $index)" type="checkbox" value="{&quot;country_code&quot;:&quot;EU27_2020&quot;,&quot;country_name&quot;:822}" /> 
// 									<label data-ng-if="country.country_code == 'EU27_2020'" htmlFor="country-filter-822" data-ng-bind="i18nLiterals['L'+country.country_name]">EU27_2020</label>
// 								</li>
// 								</ul>
// 							</div>
// 						</li>
// 					</ul>