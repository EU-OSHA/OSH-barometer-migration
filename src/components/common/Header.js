import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import $ from "jquery";

class Header extends Component
{

	zoomSmall() {
		$('html').css('font-size','8px');
		$('body').removeClass('plus').addClass('minor');
	  }
	  zoomMedium(){
		$('html').css('font-size','10px');
		$('body').removeClass('plus');
		$('body').removeClass('minor');
	}
	zoomBig(){
		$('html').css('font-size','12px');
		$('body').removeClass('minor');
		$('body').addClass('plus');
		console.log('zoomBig');
	}
	print(){
		window.print();
	}

	componentDidMount(){

		$(window).onscroll = function() {
			console.log('onscroll');
			var currentScrollPos = $window.pageYOffset;
			// currentScrollPos should be greater than 90 to solved a iphone 6 issue
			if( currentScrollPos > 90 ){
				if (prevScrollpos > currentScrollPos) {
					$(".bar-header").addClass('show-header');
					$(".affix").addClass('show-header');
					$(".affix").removeClass('hide-header');
					$(".bar-header").removeClass('hide-header');
				} else {
					$(".bar-header").addClass('hide-header');
					$(".affix").addClass('hide-header');
					$(".affix").removeClass('show-header');
					$(".bar-header").removeClass('show-header');
				}

				prevScrollpos = currentScrollPos;

				if( $('.advice--block-not-home').length > 0 ){
					if( prevScrollpos <= $('.advice--icon--block').offset().top + $('.advice--icon--block')[0].clientHeight){
						$(".compare--block.regulation-page").removeClass('show-header');
					}
				}                                
			}
			var gotopVisible = $(window).height() + $(window).height()/2;
			if( resolution <= 1024 ){
				if( currentScrollPos > gotopVisible )
				{
					$('.go-to').css('display','block');
				}
				else
				{
					$('.go-to').css('display','none');
				}
			} else {
				$('.go-to').css('display','none');
			}
		} 
	}


	render()
	{
		return(
			<div id="header">
				<header data-ng-className="getPageSetClass()" className="ng-isolate-scope">
					<section className="bar-header container-fluid">
						<div className="header--top">
							<div className="osh-barometer-legend">
								<h1 className="main-title"><a ui-sref="home" title="OSH BAROMETER Home" href=""><span className="title">OSH BAROMETER</span> <span className="lead-title">Data Visualisation Tool</span></a></h1>
							</div>
							<div className="eu-osha-logo">
								<a href="https://osha.europa.eu" role="link" title="EUOSHA corporate website" tabIndex="0" >
									<picture>
										<source media="(max-width:619px)" srcSet={require("../../style/img/EU-OSHA-en-x2.png")} />
										<img src={require("../../style/img/EU-OSHA-en.png")} alt="European Agency for Safety and Health at Work" />
									</picture>
								</a>
							</div>
							<nav className="menu-tools-top">
								<ul className="menu-tools-top--items list-inline">
								<li className="search--block">
									<i className="fa fa-search icon-glass-tablet tablet-show" aria-hidden="true"></i>
									<form action="" className="search--form ng-pristine ng-valid">
									<div className="form-group has-feedback"><label htmlFor="search" className="sr-only ng-binding" data-ng-bind="i18n_literals.L378">Search</label> <input type="text" className="form-control" name="search" id="search" placeholder="Search" /> <i className="fa fa-search form-control-feedback" aria-hidden="true"></i></div>
									</form>
								</li>
								<li className="zoom--text">
									<span className="a_small"><a onClick={this.zoomSmall} title="Smaller text">a&nbsp;</a></span> 
									<span className="a_medium"><a onClick={ this.zoomMedium } title="Optimised defaults">a&nbsp;</a></span> 
									<span className="a_big"><a onClick={ this.zoomBig } title="Bigger text">a&nbsp;</a></span></li>
								<li className="print--block"><a title="Print page" onClick={ this.print }><i className="fa fa-print" aria-hidden="true"></i><label htmlFor="search" className="sr-only ng-binding" data-ng-bind="i18n_literals.L364">Print page</label></a></li>
								<li id="google_translate_element_wrapper">
								</li>
								</ul>
							</nav>
						</div>
						<nav className="bar-main-menu navbar">
							<div className="navbar-header"><button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#main-menu" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span> 
								<span className="icon-bar bar1"></span> <span className="icon-bar bar2"></span> 
								<span className="icon-bar bar3"></span></button>
							</div>
							<div className="collapse navbar-collapse" id="main-menu">
								<ul className="nav navbar-nav">
									<li className="dropdown ng-scope main-menu-selected" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('home')">
										<NavLink className="header-link" accessKey="0" tabIndex="1" to="/">
											<span ng-if="level0.id == 'home'" data-ng-bind-html="level0.name">
												<i className="fa fa-home"></i> <span>Home</span>
											</span>
										</NavLink>
									</li>							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('generic-information')">
										<a ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex="2"><span data-ng-bind-html="i18n_literals[level0.name]" className="ng-binding">Generic information</span> <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('osh-authorities')" className="ng-scope">
												<NavLink className="header-link" accessKey="1" to="/generic-information/osh-authorities">OSH Authorities</NavLink>
											</li>									
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('economic-sector-profile')" className="ng-scope">
												<NavLink className="header-link" accessKey="" to="/generic-information/economic-sector-profile">Economic and Sector Profile</NavLink>
											</li>									
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('workforce-profile')" className="ng-scope">
												<NavLink className="header-link" accessKey="" to="/generic-information/workforce-profile">Workforce Profile</NavLink>
											</li>								
										</ul>
									</li>							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('osh-steering')">
										<a ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex="6">
											<span data-ng-bind-html="i18n_literals[level0.name]" className="ng-binding">Steering of OSH</span> 
											<i className="fa fa-angle-down" aria-hidden="true"></i>
										</a>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('regulation')" className="ng-scope">
												<a ng-if="level1.sref" ui-sref="regulation" id="regulation" accessKey="2" className="ng-scope" href="/osh-steering/regulation"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Regulation</span></a>
											</li>										
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('national-strategies')" className="ng-scope">
												<a ng-if="level1.sref" ui-sref="national-strategies" id="national-strategies" accessKey="" className="ng-scope" href="/osh-steering/national-strategies"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">National strategies</span></a>
											</li>										
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('structure-strategy')" className="ng-scope hidden">
											</li>										
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('response-strategy')" className="ng-scope hidden">
											</li>										
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('social-dialogue')" className="ng-scope">
												<a ng-if="level1.sref" ui-sref="social-dialogue" id="social-dialogue" accessKey="" className="ng-scope" href="/osh-steering/social-dialogue"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Social dialogue</span></a>
											</li>										
										</ul>
									</li>
							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('osh-outcomes-working-conditions')">
								<a ng-if="level0.levels &amp;&amp; level0.sref" ui-sref="osh-outcome" className="dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" tabIndex="10"><span data-ng-bind-html="i18n_literals[level0.name]" className="ng-binding">OSH outcomes and working conditions</span> <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
								<ul className="dropdown-menu ng-scope" ng-if="level0.levels">

								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('work-accidents')" className="ng-scope">
									<a ng-if="level1.sref" ui-sref="work-accidents" id="work-accidents" accessKey="3" className="ng-scope" href="osh-outcomes-working-conditions/work-accidents/non-fatal-work-accidents"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Work accidents</span></a>
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('health-perception-of-workers')" className="ng-scope">
									<a ng-if="level1.sref" ui-sref="health-perception-of-workers" id="health-perception-of-workers" accessKey="" className="ng-scope" href="osh-outcomes-working-conditions/health-perception-of-workers"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Health perception of the workers</span></a>
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('osh-culture')" className="ng-scope">
									<a ng-if="level1.sref" ui-sref="osh-culture" id="osh-culture" accessKey="" className="ng-scope" href="osh-outcomes-working-conditions/osh-culture/health-and-safety-discussed"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">OSH culture and health awareness</span></a>
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('working-conditions')" className="ng-scope">
									<a ng-if="level1.sref" ui-sref="working-conditions" id="working-conditions" accessKey="" className="ng-scope" href="osh-outcomes-working-conditions/working-conditions"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Working conditions</span></a>
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('overall-opinion')" className="ng-scope hidden">
									
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('mental-risk')" className="ng-scope hidden">
									
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('physical-risk')" className="ng-scope hidden">
									
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('prevention-companies')" className="ng-scope">
									<a ng-if="level1.sref" ui-sref="prevention-companies({pIndicator: 'risk-assessment', pSplit: 'sector'})" id="prevention-companies" accessKey="" className="ng-scope" href="osh-outcomes-working-conditions/prevention-companies/risk-assessment/sector"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Prevention in companies</span></a>
								</li>
								
								<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('worker-involvement')" className="ng-scope">
									<a ng-if="level1.sref" ui-sref="worker-involvement" id="worker-involvement" accessKey="" className="ng-scope" href="osh-outcomes-working-conditions/worker-involvement/esener"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Worker involvement</span></a>
									</li>
								</ul>
							</li>
							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('osh-infrastructure')">
										<a ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex="17"><span data-ng-bind-html="i18n_literals[level0.name]" className="ng-binding">OSH infrastructure</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
										</a>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('enforcement-capacity')" className="ng-scope">
												<a ng-if="level1.sref" ui-sref="enforcement-capacity({pIndicator: 'establishments-inspected'})" id="enforcement-capacity" accessKey="4" className="ng-scope" href="osh-infrastructure/enforcement-capacity/establishments-inspected"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Enforcement capacity</span></a>
											</li>
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('osh-statistics')" className="ng-scope">
												<a ng-if="level1.sref" ui-sref="osh-statistics" id="osh-statistics" accessKey="" className="ng-scope" href="osh-infrastructure/osh-statistics/"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">OSH statistics, surveys and research</span></a>
											</li>
										</ul>
									</li>							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('about-tool')">
										<a ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex=""><span data-ng-bind-html="i18n_literals[level0.name]" className="ng-binding">About the system</span> <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('introduction')" className="ng-scope">
												<a ng-if="level1.sref" ui-sref="about-tool" id="introduction" accessKey="5" className="ng-scope" href="about-the-system"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">General information</span></a>
											</li>
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('detail-information')" className="ng-scope">
													<a ng-if="level1.sref" ui-sref="about-tool-detail-page" id="detail-information" accessKey="21" className="ng-scope" href="about-the-system/methodology"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Methodology</span></a>
											</li>
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('country-report')" className="ng-scope">
												<a ng-if="level1.sref" ui-sref="country-report" id="country-report" accessKey="21" className="ng-scope" href="country-report"><span data-ng-bind-html="i18n_literals[level1.name]" className="ng-binding">Country reports</span></a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</nav>
					</section>
					<section className="breadcrumbs--social--network">
						<div className="breadcrumbs">
							<p className="path ng-binding" data-ng-bind-html="breadCrumb" id="breadCrumbs"><span className="current-page">Home</span></p>
						</div>
						<div className="social--network--nav" id="osha-menu-social">
							<label data-ng-bind="i18n_literals.L369" className="ng-binding">Share this on:</label>
							<ul>
							<li><a className="main-color" target="_blank" title="Twitter" socialshare-text="Home - OSH Barometer | Data Visualisation" href="https://twitter.com/intent/tweet?url=https://visualisation.osha.europa.eu/osh-barometer"><i className="fa fa-lg fa-twitter" aria-hidden="true"></i><span className="sr-only ng-binding" data-ng-bind="(i18n_literals.L369) + (i18n_literals.L370)">Share this on:Twitter</span></a></li>
							<li><a className="main-color" target="_blank" socialshare="" socialshare-provider="facebook" title="Facebook" socialshare-url="https://visualisation.osha.europa.eu/osh-barometer"><i className="fa fa-lg fa-facebook" aria-hidden="true"></i><span className="sr-only ng-binding" data-ng-bind="(i18n_literals.L369) + (i18n_literals.L371)">Share this on:Facebook</span></a></li>
							<li><a className="main-color" target="_blank" socialshare="" socialshare-provider="linkedin" title="LinkedIn" socialshare-url="https://visualisation.osha.europa.eu/osh-barometer"><i className="fa fa-lg fa-linkedin" aria-hidden="true"></i><span className="sr-only ng-binding" data-ng-bind="(i18n_literals.L369) + (i18n_literals.L372)">Share this on:LinkedIn</span></a></li>
							</ul>
						</div>
					</section>
				</header>
			</div>
		)
	}
}

export default Header;