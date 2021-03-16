import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import Methodology from '../common/Methodology';

class CountryProfile extends Component
{
	render()
	{
		return(
			<div>
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12  nopadding">
						<h1 className="main-color left-text">{this.props.literals.L20378}</h1>
						<p>{this.props.literals.L22038}</p>
							<span data-ng-bind="i18nLiterals.L20704"> </span> 
							<span>
								<Link to="about-tool-detail-page({pSection: 'osh-steering', pSubsection: 'structure_strategy', pIndicator: '46'})">{this.props.literals.L20705}</Link>
							</span>
						</div>
						<div className="icon--advice national-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

				<div className="container">
					<p className="btn--block-full left-text">
						<Link to="EU-challenges-response" className="btn-default btn-main-color" title="{this.props.literals.L20625}">{this.props.literals.L20625}</Link>
					</p>
				</div>

				<div className="compare--block regulation-page">
					<div className="submenu--block container">
						<label className="submenu-indicator" >Select the indicator</label>
						<ul className="submenu--items--wrapper">
							{/* INDICATORS */}
							<li data-ng-repeat="indicator in indicators" data-ng-click ="openIndicatorsList($event)" data-ng-class="{'active' : indicator.anchor == pIndicator }" className="submenu--item">
							<Link to="/" data-ng-click="changeIndicator($event,indicator.anchor)" data-ng-bind="i18nLiterals['L'+indicator.text]" data-ng-class="{'active' : indicator.anchor == pIndicator }" >Basic information</Link>
							</li>
						</ul>
					</div>
					
					<div className="line background-main-light"></div>

					{/* FILTERS */}
					<form className="compare--block--form container">
						<ul className="compare--list">
							{/*  1ST COUNTRY FILTER  */}
							<li>
								<label htmlFor="datafor">{this.props.literals.L20609}</label>
								<select id="datafor" data-ng-cloak ng-model="pCountry1" parameter="pCountry1" params="[['pCountry', pCountry2]]"
									listen-to="['pCountry2']" query="getStrategiesCountriesSelect" cda="{::cdaGenericInformation }" placeholder="0" data-ng-change="countryChange()">
								</select>  
							</li>
							{/* 2ND COUNTRY FILTER  */}
							<li>
								<label htmlFor="comparewith">{this.props.literals.L20610}</label>
								<select id="comparewith" data-ng-cloak ng-model="pCountry2" parameter="pCountry2" params="[['pCountry', pCountry1]]"
									listen-to="['pCountry1']" query="getStrategiesCountriesSelect" cda="{::cdaGenericInformation }" 
									placeholder="{pCountry2=='0'?1:0}" data-ng-change="countryChange()">
								</select> 
							</li>
						</ul>
					</form>

					<div className="line background-main-light"></div>
				</div>

				<section className="container section--page full-tablet">
					{ /*  Basic Information */}
					<div className="column--grid--block" id="tab1" data-ng-if="pIndicator == 'basic-information'">
					<div className="column--item first"  ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]" >
						<div className="">
							<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L303}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text1], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text1]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text1].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L303}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text1], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text1]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text1].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>
					</div>

					{ /*  Background */}
					<div className="column--grid--block" id="tab2" data-ng-if="pIndicator == 'background'">
					<div className="column--item first"  ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L304}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text2], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text2]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text2].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L304}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text2], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text2]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text2].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>
					</div>

					{ /*  Characteristics and objectives */}
					<div className="column--grid--block" id="tab3" data-ng-if="pIndicator == 'characteristics-and-objectives'">
					<div className="column--item first" ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L305}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text3], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text3]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text3].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L305}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text3], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text3]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text3].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
						
					</div>
					</div>

					{ /*  Details and activity */}
					<div className="column--grid--block" id="tab4" data-ng-if="pIndicator == 'details-and-activity'">
					<div className="column--item first" ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L306}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text4], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text4]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text4].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L306}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text4], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text4]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text4].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>
					</div>

					{ /*  Actors and stakeholders */}
					<div className="column--grid--block" id="tab6" data-ng-if="pIndicator == 'actors-and-stakeholders'">
					<div className="column--item first" ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L307}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text5], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text5]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text5].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>       
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L307}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text5],maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text5]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text5].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>
					</div>

					{ /*  Resources and Timeframe */}
					<div className="column--grid--block" id="tab5" data-ng-if="pIndicator == 'resources-and-timeframe'">
					<div className="column--item first" ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L20251}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text6], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text6]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text6].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>       
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L20251}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text6],maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text6]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text6].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>
					</div>

					{ /*  Evaluation */}
					<div className="column--grid--block" id="tab7" data-ng-if="pIndicator == 'evaluation'">
					<div className="column--item first" ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L308}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text7], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text7]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text7].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L308}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text7],maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text7]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text7].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>
					</div>

					{ /*  Relationship to EU Strategic Framework */}
					<div className="column--grid--block" id="tab8" data-ng-if="pIndicator == 'relationship-to-eu-strategic-framework'">
					<div className="column--item first" ng-class="{true: 'full', false: 'no-full'}[pCountry2 == 0]">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country1Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L20253}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country1Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country1Data.text8], maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country1Data.text8]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country1Data.text8].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>

					<div className="column--item second" data-ng-if="pCountry2 != 0">
						<div className="">
						<img  className="flags--wrapper" ng-src="../../style/img/flag/{::country2Data.country_code.toLowerCase()}.png" />
						</div>
						<h2>{this.props.literals.L20253}</h2>
						<div className="columm--item--content">
						{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
						<p className="download-report">
							<Link to="/osh-steering/country-profile/pdf/National-Strategies-Mapping_{i18nLiterals['L'+country2Data.country_name]}.pdf" className="download-pdf" data-ng-bind-html="i18nLiterals.L20640" target="_blank"></Link>
						</p>
						<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+country2Data.text8],maxCharacters)"></div>
						<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text8]"></div>
						<p className="see-more" data-ng-if="i18nLiterals['L'+country2Data.text8].length > maxCharacters">
							<Link to="/" ng-click='toggleText($event)' className="see-more">{this.props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
							<Link to="/" ng-click='toggleText($event)' className="see-less" style={{display:'none'}}>{this.props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
						</p>
						</div>
					</div>
					</div>
				</section>

				<Methodology />
			</div>
		)
	}
}

export default CountryProfile;