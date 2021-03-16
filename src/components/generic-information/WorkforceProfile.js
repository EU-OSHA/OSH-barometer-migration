import React, { Component } from 'react';

import Methodology from '../common/Methodology';

class WorkforceProfile extends Component
{
	render()
	{
		return(
			<div className="workforce--page">
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12 nopadding">
							<h1 className="main-color left-text ng-binding" data-ng-bind="i18nLiterals.L22004">Workforce profile</h1>
							<p data-ng-bind="i18nLiterals.L22030" className="ng-binding">This indicator includes a few key data on ageing workers and the workforce: median age, employment rate of different age groups, total and sex.</p>
							<span data-ng-bind="(i18nLiterals.L20696)+(' ')+(i18nLiterals.L20704)" className="">Source: EUROSTAT. For further information refer to</span> <span><a data-ng-bind="i18nLiterals.L20705" ui-sref="about-tool-detail-page({pSection: 'generic-information', pSubsection: 'workforce_profile', pIndicator: '37'})" className="" href="#!/about-the-system/methodology">Methodology</a></span>
						</div>
						<div className="icon--advice people-group-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

				<div className="filter--indicator--block container">
					<ul className="indicators--group xs-row">
						<li id="filter1">
							<label htmlFor="indicatorSelect" data-ng-bind="i18nLiterals.L20623" className="ng-binding">SELECT THE INDICATOR</label> 
							<select id="indicatorSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-model="selectedIndicator" data-ng-change="selectChange()">
								<option value="median-age" data-ng-bind="i18nLiterals.L294" className="ng-binding">Median age of population</option>
								<option value="employment-rate" data-ng-bind="i18nLiterals.L20621" className="ng-binding">Employment rate</option>
								<option value="unemployment-rate" data-ng-bind="i18nLiterals.L291" className="ng-binding">Unemployment rate</option>
							</select>
						</li>
						<li id="filter2" data-ng-className="{'disabled':selectedIndicator == 'median-age' || selectedIndicator == 'unemployment-rate'}" className="disabled">
							<label htmlFor="employeeGroupSelect" data-ng-bind="i18nLiterals.L20622" className="ng-binding">EMPLOYEE GROUP</label> 
							<select id="employeeGroupSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-disabled="selectedIndicator == 'median-age' || selectedIndicator== 'unemployment-rate'" data-ng-model="selectedSubIndicator" data-ng-change="selectChange()" disabled="disabled">
								<option data-ng-bind="i18nLiterals.L295" value="ageing-workers" className="ng-binding">Ageing workers</option>
								<option data-ng-repeat="gender in genders" value="Female" data-ng-bind="i18nLiterals['L'+gender.gender_name]" className="ng-binding ">Female</option>
								<option data-ng-repeat="gender in genders" value="Male" data-ng-bind="i18nLiterals['L'+gender.gender_name]" className="ng-binding ">Male</option>
								<option data-ng-repeat="gender in genders" value="Total" data-ng-bind="i18nLiterals['L'+gender.gender_name]" className="ng-binding ">Total</option>
							</select>

							<label data-ng-if="selectedIndicator == 'median-age'" className="alert-disabled " data-ng-bind="i18nLiterals.L20694">Not applied to Median Age</label>
						</li>
						{/* COUNTRY FILTER JUST IN < 1024 PX */}
						<li id="filter3" className="filter--dropdown--wrapper">
							<label htmlFor="countrySelect">Country:</label>
							{/*<label className="main-color  dropdwon-open" onClick="openSelect($event)"></label>*/}
							<div className="filter--dropdown--list">
								<p className="option-title" data-ng-bind="i18nLiterals.L20630" ng-click="openSelect($event)">Country</p>
								<ul className="filter--dropdown--options">
								<li data-ng-repeat="country in countries" className="">
									<input id="country-filter-822" defaultChecked="!!country.param &amp;&amp; country.param ==country.country_code" ng-click="toggleCountryClick($event, $index)" type="checkbox" value="{&quot;country_code&quot;:&quot;EU27_2020&quot;,&quot;country_name&quot;:822}" /> 
									<label data-ng-if="country.country_code == 'EU27_2020'" htmlFor="country-filter-822" data-ng-bind="i18nLiterals['L'+country.country_name]" className="ng-binding ">EU27_2020</label>
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
									<h2 className="country ng-binding title-section main-color">EU27_2020</h2>
								</div>
								<ul className="matrix--elements--data">
									<li>
										<label data-ng-bind="i18nLiterals['L20615']" className="ng-binding">Median age of population:</label>
										<div><span className="data ng-binding" data-ng-bind="data.medianAge['EU27_2020'].value">43.7</span> <span className="data-text ng-binding" data-ng-bind="i18nLiterals['L20620']">years</span></div>
									</li>
									<li>
										<label data-ng-bind="i18nLiterals['L20616']" className="ng-binding">Employment rate (55 - 64):</label>
										<div><span className="data ng-binding" data-ng-bind="data.ageingWorkers['EU27_2020'].value">59.1</span> <span className="data-text">%</span></div>
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
			</div>
		)
	}
}

export default WorkforceProfile;