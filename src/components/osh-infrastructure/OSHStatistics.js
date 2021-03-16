import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';

class OSHStatistics extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection />

				<section className="container">
					<form className="row block--filter--wrapper">
						{/*  COUNTRY FILTER */}
						<div id="filter2"className="filter--dropdown--wrapper" tabIndex="9">
							<div className="filter--dropdown--list">
							<p className="option-title" ng-click="openSelect($event)">{this.props.literals.L20630}</p>
							<ul className="filter--dropdown--options">
								<li data-ng-repeat='country in countries'>
									<input id='country-filter-{{::country.country}}' ng-checked="(!!country.param && country.param ==country.country_code) || pCountry == country.country_code" onClick="toggleCountryClick($event, $index);openSelect($event)" type="checkbox" value="{{::country}}" tabIndex="-1" />
									<label htmlFor="country-filter-{{::country.country}}" data-ng-bind="('(')+(country.country_code)+(') ')+(i18nLiterals['L'+country.country])"></label>
								</li>
							</ul>
							</div>
						</div> 
						{/*  CATEGORY TYPE FILTER */}
						<div id="filter1" className="filter--dropdown--wrapper" tabIndex="8">
							<div className="filter--dropdown--list">
								<p className="option-title" ng-click="openSelect($event)" >{this.props.literals.L20651}</p>
								<ul className="filter--dropdown--options">
									<li>
										<input id='category-filter-1' type="checkbox" ng-click="toggleCategoryClick($event);openSelect($event)" tabIndex="-1"/>
										<label htmlFor='category-filter-1' >{this.props.literals.L20714}</label>
									</li>
									<li>
										<input id='category-filter-2' type="checkbox" ng-click="toggleCategoryClick($event);openSelect($event)" tabIndex="-1"/>
										<label htmlFor='category-filter-2' >{this.props.literals.L20715}</label>
									</li>
									<li>
										<input id='category-filter-3' type="checkbox" ng-click="toggleCategoryClick($event);openSelect($event)" tabIndex="-1"/>
										<label htmlFor='category-filter-3' >{this.props.literals.L20716}</label>
									</li>
								</ul>
							</div>
						</div>
						{/*  SEARCH FILTER */}
						<div className="filter-text">
							<input ng-keypress="clickEnter($event)" ng-focus="closeSelect($event)" id="search-input" type="text" placeholder="{{i18nLiterals.L378}}" data-ng-model="searchText" tabIndex="7" />
							<button onClick="clickEnter($event)"  id="policy-search" type="button">
							<i className="fa fa-search" aria-hidden="true"></i>
							</button>
						</div>
					</form>
					<div className="container">
						{/* CONTENT */}
						<div className="selected--tags-wrapper"></div>
						<div className="matrix--elements--wrapper">
							{/* MATRIX ELEMENTS */} 
							<div ng-if="amatrix.length <= 0">
								<span>{this.props.literals.L20706}</span>
							</div>
							<div data-ng-repeat="matrix in amatrix | limitTo:pageSize:elementsStart" className="matrix--element clearfix">
								<div className="matrix--header--elements">
									<img  className="flags--wrapper" src={require('../../style/img/flag/eu28.png')} ng-src="../../style/img/flag/{{::matrix.country_code.toLowerCase()}}.png" />
									<h2 className="country ng-binding title-section main-color" data-ng-bind="i18nLiterals['L'+matrix.country_name]"></h2>
								</div>

								<div className="matrix--content--elements">
									<h3 className="" ng-if="::matrix.osh_statistics==1" >{this.props.literals.L20714}</h3>
									<h3 className="" ng-if="::matrix.surveys==1" >{this.props.literals.L20715}</h3>
									<h3 className="" ng-if="::matrix.research_institutes==1" >{this.props.literals.L20716}</h3>

									<div data-ng-bind-html="i18nLiterals['L'+matrix.name_institution]"></div>
									<div className="partial-text" data-ng-bind-html="trimText(i18nLiterals['L'+matrix.detail_institution], 300)"></div>
									<div className="complete-text" data-ng-bind-html="trimText(i18nLiterals['L'+matrix.detail_institution], 1)"></div>
									<p data-ng-if="i18nLiterals['L'+matrix.detail_institution].length > newMaxCharacter" className="see--more--wrapper"> 
										<a ng-click='toggleText($event)' className="see-more main-color">{this.props.literals.L480}</a>
										<a ng-click='toggleText($event)' className="see-less main-color" style={{display:'none'}}>{this.props.literals.L481}</a>
									</p>
								</div>
							</div>
						</div>
						
						{/* PAGINATION */}
						<div className="pagination--wrapper" data-ng-if="!!amatrix.length" >
							<div className="pagination--elements">
							<ul className="main-color">
								<li role='button' className="arrow firstpage" onClick="firstPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==1 || currentPage+1==1)?'invisible':''">
									<span aria-hidden="currentPage == 0">
										<i className="fa fa-angle-double-left" aria-hidden="true"></i>
									</span>
								</li>
								<li role='button' className="arrow previouspage" onClick="previousPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==1 || currentPage+1==1)?'invisible':''">
									<span aria-hidden="currentPage == 0"><i className="fa fa-angle-left" aria-hidden="true"></i></span>
								</li>
								<li>
									<span>currentPage+1/numberOfPages</span>
								</li>
								<li role='button' className="arrow nextpage" onClick="nextPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==numberOfPages())?'invisible':''">
									<span aria-hidden="currentPage >= results.length/pageSize - 1"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
								</li>
								<li role='button' className="arrow lastpage" onClick="lastPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==numberOfPages())?'invisible':''">
									<span><i className="fa fa-angle-double-right" aria-hidden="true"></i></span>
								</li>
							</ul>
							{/* PAGINATION TEXT */}
							<div className="pag-numbers" data-ng-if="!!amatrix.length">
								<span>{this.props.paginationText}</span>
							</div>
							</div>
						</div>
					</div>
				</section>

				<Methodology />
			</div>
		)
	}
}

export default OSHStatistics;