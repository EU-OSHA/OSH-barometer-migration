import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class GeneralInformation extends Component
{
	render()
	{
		return(
			<div class="about-tool">
				<div data-ng-if="currentState == 'about-tool'" className="container">
					<h1 className="title-section second-color text-center">{this.props.literals.L22019}</h1>
					<h2>{this.props.literals.L20735}</h2>
					<section data-ng-bind-html="i18nLiterals.L20737" className="about-tool-content">
						{ReactHtmlParser(this.props.literals.L20737)}
					</section>
					<p className="btn--wrapper text-center">
						<a ui-sref="about-tool-detail-page" className="btn-default btn-main-color text-center">{this.props.literals.L20736}</a>
					</p>
				</div>

				<div data-ng-if="currentState == 'about-tool-detail-page'" className="container">
					<h1 className="title-section second-color text-center">{this.props.literals.L22019}</h1>
					{/*  SECTION MENU  */}
					<ul className="indicators--list--wrapper">
						<li className="indicators-item" data-ng-repeat="section in sections" data-ng-className="{'active':(section.id == pSection)}">
							<a ui-sref="about-tool-detail-page({pSection: section.id, pSubsection: section.firstSubsection, pIndicator: section.firstIndicatorId})" href data-ng-bind="i18nLiterals[section.name]" data-ng-click="changeSection(section.id)">{this.props.literals.L22007}</a>
							<div className="caret"></div>
						</li>
					</ul>

					{/*  SUBSECTION MENU  */}			
					<ul className="indicators--submenu--wrapper" id="indicatorsSubmenu" data-ng-click ="openIndicatorsList($event)">
						<li data-ng-className="{'active':(pSubsection == subsection.database_name),'multiline':(i18nLiterals[subsection.name].length > 20 )}" data-ng-repeat="subsection in subsections" className="submenu--item">
							<a ui-sref="about-tool-detail-page({pSection: pSection, pSubsection: subsection.database_name, pIndicator: subsection.firstIndicatorId})" href data-ng-bind="i18nLiterals[subsection.name]">{this.props.literals.L22007}</a>
						</li>
					</ul>

					{/*  DROPDOWN LIST WITH INDICATORS  */}
					<form className="indicators--wrapper">
						<label htmlFor="indicators">{this.props.literals.L20623}</label>
						<div className="indicators-select">
							<select id="indicators" data-ng-model="pIndicator" data-ng-selected="pIndicator" data-ng-change="changeIndicator(pIndicator)">
								<option data-ng-repeat="indicator in indicators" data-ng-bind="i18nLiterals['L'+indicator.text]" value="{{indicator.id}}"></option>
							</select>
						</div>
					</form>


					<section className="methodology--grid--wrapper" data-ng-className="indicatorIcons(pSubsection)">
						{/*  Diagram  */}
						<h3 data-ng-if="i18nLiterals['L'+data.diagram] != 'null'">{this.props.literals.L20720}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.diagram]" data-ng-if="i18nLiterals['L'+data.diagram] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Description  */}
						<h3 data-ng-if="i18nLiterals['L'+data.description] != 'null'">{this.props.literals.L20721}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.description]" data-ng-if="i18nLiterals['L'+data.description] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Datasource  */}
						<h3 data-ng-if="data.datasource != 'null'">{this.props.literals.L20722}</h3>
						<p data-ng-if="i18nLiterals['L'+data.datasource] != 'null'" data-ng-bind-html="i18nLiterals['L'+data.datasource]">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Specific table / Question  */}
						<h3 data-ng-if="i18nLiterals['L'+data.specific_table] != 'null'">{this.props.literals.L20723}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.specific_table]" data-ng-if="i18nLiterals['L'+data.specific_table] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  URL / Source file  */}
						<h3 data-ng-if="i18nLiterals['L'+data.url] != 'null'">{this.props.literals.L20724}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.url]" data-ng-if="i18nLiterals['L'+data.url] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Filtering options applied  */}
						<h3 data-ng-if="i18nLiterals['L'+data.options_applied] != 'null'">{this.props.literals.L20728}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.options_applied]" data-ng-if="i18nLiterals['L'+data.options_applied] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Reference year / period  */}
						<h3 data-ng-if="i18nLiterals['L'+data.reference_year] != 'null'">{this.props.literals.L20725}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.reference_year]" data-ng-if="i18nLiterals['L'+data.reference_year] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Last update  */}
						<h3 data-ng-if="i18nLiterals['L'+data.last_update] != 'null'">{this.props.literals.L20726}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.last_update]" data-ng-if="i18nLiterals['L'+data.last_update] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Coverage  */}
						<h3 data-ng-if="i18nLiterals['L'+data.coverage] != 'null'">{this.props.literals.L20727}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.coverage]" data-ng-if="i18nLiterals['L'+data.coverage] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Unit of measure  */}
						<h3 data-ng-if="i18nLiterals['L'+data.unit_measure] != 'null'">{this.props.literals.L20730}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.unit_measure]" data-ng-if="i18nLiterals['L'+data.unit_measure] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Calculations on the data source  */}
						<h3 data-ng-if="i18nLiterals['L'+data.calculations] != 'null'">{this.props.literals.L20729}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.calculations]" data-ng-if="i18nLiterals['L'+data.calculations] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Visualisation  */}
						<h3 data-ng-if="i18nLiterals['L'+data.visualisation] != 'null'">{this.props.literals.L20731}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.visualisation]" data-ng-if="i18nLiterals['L'+data.visualisation] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
						{/*  Additional comments  */}
						<h3 data-ng-if="i18nLiterals['L'+data.additional_comments] != 'null'">{this.props.literals.L20732}</h3>
						<p data-ng-bind-html="i18nLiterals['L'+data.additional_comments]" data-ng-if="i18nLiterals['L'+data.additional_comments] != 'null'">{ReactHtmlParser(this.props.literals.L356)}</p>
					</section>
				</div>
			</div>
		)
	}
}

export default GeneralInformation;