import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

class SocialDialogue extends Component
{
	render()
	{
		return(
			<div className="social-dialogue">
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12 ">
						<h1 className="main-color left-text">{this.props.literals.L22008}</h1>
						<p data-ng-bind="i18nLiterals.L22041">{this.props.literals.L22041}</p>
						<span>{this.props.literals.L20704} </span> 
						<span>
							<Link to="/about-tool-detail-page({pSection: 'osh-steering', pSubsection: 'social_dialogue', pIndicator: '354'})">
								{this.props.literals.L20705}
							</Link>
						</span>
						</div>
						<div className="icon--advice dialogue-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

				<div className="highlited--data--section">
					<div className="highlited--data--block container">
					<div className="highlited-data-item">
						<div className="flags--wrapper">
						<img src={require("../../style/img/flag/eu28.png")} width="94px" />
						</div>
						<div className="eu-data">
							<h2 className="country title-section main-color" data-ng-bind="i18nLiterals['L'+EUData.country_name]">EU27_2020</h2>
							<p className="download-report" >
								<Link href="./osh-steering/social-dialogue/pdf/Social_Dialogue_{{EUData.country_code}}.pdf" className="download-pdf" target="_blank">
									{ReactHtmlParser(this.props.literals.L20637)}
								</Link>
							</p>
						</div>
					</div>
					<div className="highlited-data-item">
						<ul className="highlited-data-list">
						<li>
							<div className="group-data">                
							<span className="country-data" data-ng-bind="EUData.joint_consultative"></span>
							<span className="data-text">%</span>
							</div>
							<label>{this.props.literals.L20659}</label>
						</li>
						<li>
							<div className="group-data">                
							<span className="country-data" data-ng-bind="EUData.trade_union"> </span>
							<span className="data-text">%</span>
							</div>
							<label>{this.props.literals.L20660}</label>
						</li>
						<li>
							<div className="group-data">                
							<span className="country-data" data-ng-bind="EUData.health_representative"></span>
							<span className="data-text">%</span>
							</div>
							<label>{this.props.literals.L20661}</label>
						</li>
						<li>
							<div className="group-data">                
							<span className="country-data" data-ng-bind="EUData.health_committee"></span>
							<span className="data-text">%</span>
							</div>
							<label>{this.props.literals.L20662}</label>
						</li>
						</ul>
					</div>
					</div>
				</div>

				<section className="container ">
					{/*  FILTERS */}
					<form className="row block--filter--wrapper">
					{/*  COUNTRY FILTER */}
					<div id="filter1"className="filter--dropdown--wrapper">
						{/* <label className="main-color  dropdwon-open" data-ng-bind="i18nLiterals.L20630"></label> */}
						<div className="filter--dropdown--list">
						<p className="option-title" data-ng-bind="i18nLiterals.L20630" ng-click="openSelect($event)"></p>
						<ul className="filter--dropdown--options">
							<li data-ng-repeat='country in countries'>
							<input id='country-filter-{{::country.country}}' ng-checked="!!country.param && country.param ==country.country_code"
								data-ng-click="toggleCountryClick($event, $index)" type="checkbox" value="{{::country}}" tabindex="-1" />
							<label for="country-filter-{{::country.country}}" data-ng-bind="('(')+(country.country_code)+(') ')+(i18nLiterals['L'+country.country])"></label>
							</li>
						</ul>
						{/* <p className="btn--block-filter" data-ng-click="openSelect($event)"><a className="btn-main-color btn-full" ng-click="confirmCountrySelection($event)" data-ng-bind="i18nLiterals.L20636"></a></p> */}
						</div>
					</div>  
					</form>

					<div className="container">
						{/*  CONTENT */}
						<div className="selected--tags-wrapper"></div>
						<div className="card--grid xxs-w1 xs-w2 w3 center-text">
							<div className="card--block--chart" data-ng-repeat="matrix in amatrix | limitTo:pageSize:elementsStart">
								<div className="chart--block">
									<header>
										<div className="flags--wrapper" >
											<img  ng-src="../../style/img/flag/{{::matrix.country_code.toLowerCase()}}.png" />
										</div>
										<div className="country-wrapper">
											<h2 className="country ng-binding title-section main-color" data-ng-bind="i18nLiterals['L'+matrix.country_name]"></h2>
											<p className="download-report" ng-if="matrix.country_code != 'IS' && matrix.country_code != 'NO' && matrix.country_code != 'CH'">
											<Link href="/pentaho/plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/modules/vertical/osh-steering/social-dialogue/pdf/Social_Dialogue_{{i18nLiterals['L'+matrix.country_name]}}.pdf" className="download-pdf" target="_blank">
											{ReactHtmlParser(this.props.literals.L20637)}
											</Link>
											</p>
											<p ng-if="matrix.country_code == 'IS' || matrix.country_code == 'NO' || matrix.country_code == 'CH'"></p>
										</div>
									</header>
									<ul className="highlited-data-list">
										<li>                
											<span className="country-data" data-ng-bind="matrix.joint_consultative != null ? (matrix.joint_consultative) : '-'"></span>
											<span data-ng-if="matrix.joint_consultative != null" className="data-text">%</span>
											<label>{this.props.literals.L20659}</label>
										</li>
										<li>                
											<span className="country-data" data-ng-bind="matrix.trade_union != null ? (matrix.trade_union) : matrix.country_code == 'AT'?'20':'-'"> %</span>
											<span data-ng-if="matrix.trade_union != null || matrix.country_code=='AT'" className="data-text">%</span>
											<label>{this.props.literals.L20660}</label>
										</li>
										<li>                
											<span className="country-data" data-ng-bind="matrix.health_representative != null ? (matrix.health_representative) : '-'"></span>
											<span data-ng-if="matrix.health_representative != null" className="data-text">%</span>
											<label>{this.props.literals.L20661}</label>
										</li>
										<li>                
											<span className="country-data" data-ng-bind="matrix.health_committee != null ? (matrix.health_committee) : '-'"></span>
											<span data-ng-if="matrix.health_committee != null" className="data-text">%</span>
											<label>{this.props.literals.L20662}</label>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/*  PAGINATION */}
						<div className="pagination--wrapper" data-ng-if="!!amatrix.length" >
							<div className="pagination--elements">
								<ul className="main-color">
									<li role="button" className="arrow firstpage" data-ng-click="firstPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==1 || currentPage+1==1)?'invisible':''">
									<span aria-hidden="currentPage == 0"><i className="fa fa-angle-double-left" aria-hidden="true"></i></span>
									</li>
									<li role="button" className="arrow previouspage" data-ng-click="previousPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==1 || currentPage+1==1)?'invisible':''">
									<span aria-hidden="currentPage == 0"><i className="fa fa-angle-left" aria-hidden="true"></i></span>
									</li>
									<li>
									<span>currentPage+1/numberOfPages()</span>
									</li>
									<li role="button" className="arrow nextpage" data-ng-click="nextPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==numberOfPages())?'invisible':''">
									<span aria-hidden="currentPage >= results.length/pageSize - 1"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
									</li>
									<li role="button" className="arrow lastpage" data-ng-click="lastPage()" ng-className="(currentPage+1==numberOfPages() && currentPage+1==numberOfPages())?'invisible':''">
									<span><i className="fa fa-angle-double-right" aria-hidden="true"></i></span>
									</li>
								</ul>
								{/*  PAGINATION TEXT */}
								<div className="pag-numbers" data-ng-if="!!amatrix.length">
									<span data-ng-bind="paginationText"></span>
								</div>
							</div>
						</div>
					</div>
				</section>

			</div>
		)
	}
}

export default SocialDialogue;