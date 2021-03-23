import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';

class WorkforceProfile extends Component
{
	constructor(props)
	{
		super(props);
		console.log('props', props);
	}

	render()
	{
		return(
			<div className="workforce--page">

				<AdviceSection literals={this.props.literals} section={["generic-information","workforce-profile"]} />

				<div className="filter--indicator--block container">
					<ul className="indicators--group xs-row">
						<li id="filter1">
							<label htmlFor="indicatorSelect">{this.props.literals.L20623}</label> 
							<select id="indicatorSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-model="selectedIndicator" data-ng-change="selectChange()">
								<option value="median-age">{this.props.literals.L294}</option>
								<option value="employment-rate">{this.props.literals.L20621}</option>
								<option value="unemployment-rate">{this.props.literals.L291}</option>
							</select>
						</li>
						<li id="filter2" data-ng-className="{'disabled':selectedIndicator == 'median-age' || selectedIndicator == 'unemployment-rate'}" className="disabled">
							<label htmlFor="employeeGroupSelect" data-ng-bind="i18nLiterals.L20622">{this.props.literals.L20622}</label> 
							<select id="employeeGroupSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-disabled="selectedIndicator == 'median-age' || selectedIndicator== 'unemployment-rate'" data-ng-model="selectedSubIndicator" data-ng-change="selectChange()" disabled="disabled">
								<option data-ng-bind="i18nLiterals.L295" value="ageing-workers">{this.props.literals.L295}</option>
								<option value="Female">{this.props.literals.L444}</option>
								<option value="Male">{this.props.literals.L443}</option>
								<option value="Total">{this.props.literals.L442}</option>
							</select>

							<label data-ng-if="selectedIndicator == 'median-age'" className="alert-disabled ">{this.props.literals.L20694}</label>
						</li>
						{/* COUNTRY FILTER JUST IN < 1024 PX */}
						<li id="filter3" className="filter--dropdown--wrapper">
							<label htmlFor="countrySelect">{this.props.literals.L20630}:</label>
							{/*<label className="main-color  dropdwon-open" onClick="openSelect($event)"></label>*/}
							<div className="filter--dropdown--list">
								<p className="option-title" ng-click="openSelect($event)">{this.props.literals.L20630}</p>
								<ul className="filter--dropdown--options">
								<li data-ng-repeat="country in countries" className="">
									<input id="country-filter-822" defaultChecked="!!country.param &amp;&amp; country.param ==country.country_code" ng-click="toggleCountryClick($event, $index)" type="checkbox" value="{&quot;country_code&quot;:&quot;EU27_2020&quot;,&quot;country_name&quot;:822}" /> 
									<label data-ng-if="country.country_code == 'EU27_2020'" htmlFor="country-filter-822" data-ng-bind="i18nLiterals['L'+country.country_name]">EU27_2020</label>
								</li>
								</ul>
							</div>
						</li>
					</ul>
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
								<p className="help-text container ng-scope" data-ng-if="selectedCountry==''"><strong>Click on a country to compare</strong> the data <span className="exclamation" aria-hidden="true"></span></p>
								{/* end ngIf: selectedCountry=='' */}{/* ngIf: selectedCountry!='' */}
							</div>
						</div>
						<div className="map--block center-text container">
							{/*
							<h2 data-ng-bind="selectedIndicatorLiteral" className="ng-binding">Median age of population</h2>
							<p className="non-eu ng-binding" data-ng-bind="i18nLiterals.L22104">Non EU countries</p>
							<ul className="data-degraded">
								<li data-ng-repeat="step in steps" data-ng-bind="step | number:2" className="ng-binding ng-scope">36.40</li>
								<li data-ng-repeat="step in steps" data-ng-bind="step | number:2" className="ng-binding ng-scope">38.98</li>
								<li data-ng-repeat="step in steps" data-ng-bind="step | number:2" className="ng-binding ng-scope">41.55</li>
								<li data-ng-repeat="step in steps" data-ng-bind="step | number:2" className="ng-binding ng-scope">44.13</li>
								<li data-ng-repeat="step in steps" data-ng-bind="step | number:2" className="ng-binding ng-scope">46.70</li>
							</ul>
							<dvt-map country-key="EU" promise="dataPromises" country="EU" use-viewbox="true" x="0" y="0" css-className="dvt--map--block" is-colored="1" hover="false" group-list="groupList" group-color="groupColor" data="data" clickable="1" click-action="countryClick" className="ng-isolate-scope">
								<div data-ng-className="dvt--map--block" data-ng-attr-id="{{ id }}" id="dvt_map3">

								</div>
							</dvt-map>
							*/}
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
						</div>
					</section>
				</section>

				<Methodology />
				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents","non-fatal-work-accidents"]} />
				
			</div>
		)
	}
}
WorkforceProfile.displayName = 'WorkforceProfile';
export default WorkforceProfile;