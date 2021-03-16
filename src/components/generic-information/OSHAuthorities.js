import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';


class OSHAuthorities extends Component
{
	render()
	{
		return(
			<div>
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12">
							<h1 className="main-color left-text" data-ng-bind="i18nLiterals.L22002">OSH authorities</h1>
							<p data-ng-bind="i18nLiterals.L22025" className="">This indicator is an overview of OSH authorities and relevant OSH institutions in the different Member States and at EU level.</p>
							<span data-ng-bind="i18nLiterals.L20704" className="">For further information refer to</span>&nbsp;
							<span><Link data-ng-bind="i18nLiterals.L20705" ui-sref="about-tool-detail-page({pSection: 'generic-information', pSubsection: 'osh_authorities', pIndicator: '27'})" className="" to="/about-the-system/methodology">Methodology</Link></span>
						</div>
						<div className="icon--advice forum-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

				<section className="container">
				{/* FILTERS */}{/* SEARCH FILTER */}
				<form className="row block--filter--wrapper ng-pristine ng-valid">
					{/* COUNTRY FILTER */}
					<div id="filter2" className="filter--dropdown--wrapper" tabIndex="9">
						{/*<label className="main-color  dropdwon-open"></label>*/}
						<div className="filter--dropdown--list">
							<p className="option-title " data-ng-bind="i18nLiterals.L20630" ng-click="openSelect($event)">Country</p>
							<ul className="filter--dropdown--options">
							{/* ngRepeat: country in countries */}
							<li data-ng-repeat="country in countries" className="ng-scope">
								<input id="country-filter-264" ng-checked="(!!country.param &amp;&amp; country.param ==country.country_code) || pCountry == country.country_code" data-ng-click="toggleCountryClick($event, $index)" type="checkbox" ng-attr-value="{{::country}}" tabIndex="-1" value="{&quot;country&quot;:264,&quot;country_code&quot;:&quot;EU28&quot;}" /> 
								<label data-ng-if="country.country_code == 'EU28'" htmlFor="country-filter-264" data-ng-bind="i18nLiterals['L'+country.country]" className="">EU28</label>
							</li>
							</ul>
						</div>
					</div>
					{/* INSTITUTION TYPE FILTER */}
					<div id="filter1" className="filter--dropdown--wrapper" tabIndex="8">
						<div className="filter--dropdown--list">
							<p className="option-title" ng-click="openSelect($event)">Institution type</p>
							<ul className="filter--dropdown--options">
							<li><input id="institution-filter-1" type="checkbox" ng-click="toggleInstitutionClick($event);openSelect($event)" tabIndex="-1" /> <label htmlFor="institution-filter-1" data-ng-bind="i18nLiterals.L20614" className="">OSH authority</label></li>
							<li><input id="institution-filter-2" type="checkbox" ng-click="toggleInstitutionClick($event);openSelect($event)" tabIndex="-1" /> <label htmlFor="institution-filter-2" data-ng-bind="i18nLiterals.L20611" className="">	Compensation and insurance body</label></li>
							<li><input id="institution-filter-3" type="checkbox" ng-click="toggleInstitutionClick($event);openSelect($event)" tabIndex="-1" /> <label htmlFor="institution-filter-3" data-ng-bind="i18nLiterals.L20612" className="">Prevention institute</label></li>
							<li><input id="institution-filter-4" type="checkbox" ng-click="toggleInstitutionClick($event);openSelect($event)" tabIndex="-1" /> <label htmlFor="institution-filter-4" data-ng-bind="i18nLiterals.L20613" className="">Standardisation body</label></li>
							</ul>
						</div>
					</div>
					{/* SEARCH FILTER */}
					<div className="filter-text">
						<input data-ng-keypress="clickEnter($event)" ng-focus="closeSelect($event)" id="search-input" type="text" ng-attr-placeholder="{{i18nLiterals.L378}}" data-ng-model="searchText" tabIndex="7" className="ng-pristine ng-untouched ng-valid" placeholder="Search" /> <button data-ng-click="clickEnter($event)" id="policy-search" ng-attr-type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
					</div>
				</form>
				<div className="container">
					{/* CONTENT */}
					<div className="selected--tags-wrapper">
						{/*<span className="selected-tag" ng-click="deleteTag($event)">Auth</span><span className="selected-tag">AU</span>*/}
					</div>
					<div className="matrix--elements--wrapper">
						{/* MATRIX ELEMENTS */}{/* ngIf: amatrix.length <= 0 */}{/* ngRepeat: matrix in amatrix | limitTo:pageSize:elementsStart */}
						<div data-ng-repeat="matrix in amatrix | limitTo:pageSize:elementsStart" className="matrix--element clearfix">
							<div className="matrix--header--elements">
							<img className="flags--wrapper" src={require('../../style/img/flag/eu28.png')} />
							<h2 className="country  title-section main-color" data-ng-bind="i18nLiterals['L'+matrix.country_name]">EU28</h2>
							</div>
							<div className="matrix--content--elements">
							{/* ngIf: ::matrix.osh_authority==1 */}
							<h3 className="" ng-if="::matrix.osh_authority==1" data-ng-bind="i18nLiterals.L20614">OSH authority</h3>
							{/* end ngIf: ::matrix.osh_authority==1 */}{/* ngIf: ::matrix.compensation==1 */}{/* ngIf: ::matrix.prevention==1 */}{/* ngIf: ::matrix.standardisation==1 */}
							<p data-ng-bind-html="i18nLiterals['L'+matrix.name_authority]" className="institution-name ">European Commission</p>
							<div data-ng-bind-html="i18nLiterals['L'+matrix.link_authority]" className="">See more in its <a target="_blank" href="http://ec.europa.eu/social/main.jsp?langId=en&amp;catId=656">website</a> and in <a target="_blank" href="https://www.eurofound.europa.eu/country/eu-level">eurofound</a></div>

							<div className="partial-text " data-ng-bind-html="trimtext(i18nLiterals['L'+matrix.detail_authority], 300)">The European Commission is the politically independent executive arm of the European Union (EU). It is responsible for drawing up proposals for European legislation, and it implements the decisions of the European Parliament and the Council of the European Union. It is organised into<span className="dots">...</span></div>
							<div className="complete-text " data-ng-bind-html="i18nLiterals['L'+matrix.detail_authority]">The European Commission is the politically independent executive arm of the European Union (EU). It is responsible for drawing up proposals for European legislation, and it implements the decisions of the European Parliament and the Council of the European Union. It is organised into directorate-generals (DGs). DG Employment, Social Affairs and Inclusion is the main DG responsible for employment, social dialogue and working conditions.</div>

							<p data-ng-if="i18nLiterals['L'+matrix.detail_authority].length > 300" className="see--more--wrapper"><a ng-click="toggleText($event)" data-ng-bind="i18nLiterals.L480" className="see-more main-color ">See more</a> <a ng-click="toggleText($event)" data-ng-bind="i18nLiterals.L481" className="see-less main-color " >See less</a></p>

							<div className="">
								<p><a href="/pentaho/plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/modules/vertical/generic-information/osh-authorities/pdf/OSH authorities - EU28.pdf" className="btn--card main-color " title="i18nLiterals.L20563" data-ng-bind-html="i18nLiterals.L20563" target="_blank"><strong>Download the country data</strong></a></p>
								{/*<a href="" data-toggle="modal" data-target="#modalChart" data-ng-click="openModal(matrix)" className="btn--card main-color" title="Country infrastructure" data-ng-bind-html="i18nLiterals.L20563"></a>*/}
							</div>
							</div>
						</div>
						{/* end ngRepeat: matrix in amatrix | limitTo:pageSize:elementsStart */}
					</div>
					{/* PAGINATION */}
					<div className="pagination--wrapper" data-ng-if="!!amatrix.length">
						<div className="pagination--elements">
							<ul className="main-color">
							<li role="button" className="arrow firstpage invisible" data-ng-click="firstPage()" ng-className="(currentPage+1==numberOfPages() &amp;&amp; currentPage+1==1 || currentPage+1==1)?'invisible':''"><span aria-hidden="currentPage == 0"><i className="fa fa-angle-double-left" aria-hidden="true"></i></span></li>
							<li role="button" className="arrow previouspage invisible" data-ng-click="previousPage()" ng-className="(currentPage+1==numberOfPages() &amp;&amp; currentPage+1==1 || currentPage+1==1)?'invisible':''"><span aria-hidden="currentPage == 0"><i className="fa fa-angle-left" aria-hidden="true"></i></span></li>
							<li><span className="">1/42</span></li>
							<li role="button" className="arrow nextpage" data-ng-click="nextPage()" ng-className="(currentPage+1==numberOfPages() &amp;&amp; currentPage+1==numberOfPages())?'invisible':''"><span aria-hidden="currentPage >= results.length/pageSize - 1"><i className="fa fa-angle-right" aria-hidden="true"></i></span></li>
							<li role="button" className="arrow lastpage" data-ng-click="lastPage()" ng-className="(currentPage+1==numberOfPages() &amp;&amp; currentPage+1==numberOfPages())?'invisible':''"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i></span></li>
							</ul>
							{/* PAGINATION TEXT */}{/* ngIf: !!amatrix.length */}
							<div className="pag-numbers" data-ng-if="!!amatrix.length"><span data-ng-bind="paginationText" className="">Displaying 1-5 of 210</span></div>
							{/* end ngIf: !!amatrix.length */}
						</div>
					</div>
				</div>
				<div className="modal fade" id="modalChart" tabIndex="-1" role="dialog" aria-labelledby="modalChart" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
							<p className="modal-title text-center"></p>
							</div>
							<div className="modal-body text-center"><img src="/img/img-not-available.png" alt="Image not available" /></div>
						</div>
					</div>
				</div>
				</section>

				<Methodology />
			</div>
		)
	}
}

export default OSHAuthorities;