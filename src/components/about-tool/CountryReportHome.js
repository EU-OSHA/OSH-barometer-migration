import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';

class CountryReportHome extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection />

				<section className="filter--letter--section container">
					<ul className="filter--letter--list">
						{/*  FILTER BY LETTER  */}
						<li data-ng-repeat="letter in alphabet" className="filter-letter-item">
							<a href data-ng-click="addLetter(letter)" data-ng-className="{'active': countryFilter.indexOf(letter)!=-1}">{this.props.literals.letter}</a>
						</li>
						<li className="reset-item">
							<a data-ng-click="resetFilter()" className="btn-default btn-main-color btn-reset">{this.props.literals.L20628}</a></li>
					</ul>
				</section>
				<div className="line background-main-light"></div>
				<section className="national--card--section">
					<div className="card--grid xxs-w1 xs-w3 md-w3 w4 container">
					<div data-ng-repeat="country in countries" className="card--block--rounded national--card--item">
						<div className="resources-item">
						<p className="nopadding additional-img text-center">
							<img  className="flags--wrapper" ng-src="/pentaho/plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/img/flag/{{::country.country_code.toLowerCase()}}.png" />
						</p>
						<h2 className="text-center" data-ng-bind="i18nLiterals['L'+country.country]"></h2>
						<p className="btn--block-full left-text download">
							<a href="about-tool/country-report-home/pdf/country-report_{{i18nLiterals['L'+country.country].replace(' ', '_')}}.pdf" className="btn-default btn-main-color btn-full" title={this.props.literals.L22188} target="_blank" >{this.props.literals.L22188}</a>
						</p>
						</div>
					</div>
					</div>
				</section>
			</div>
		)
	}
}

export default CountryReportHome;