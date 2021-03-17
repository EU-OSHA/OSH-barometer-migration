import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
		window.onscroll = function() {myFunction()};
		var prevScrollpos = window.pageYOffset;

		function myFunction() {
		  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
			var gotopVisible = window.height + window.height/2;
			var currentScrollPos = window.pageYOffset;
			var resolution = screen.width;
			//console.log(prevScrollpos +'----------------'+ currentScrollPos);
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

			$('.go-to').css('display','block');			

		  } else {		

			$(".bar-header").addClass('show-header');
			$(".affix").addClass('show-header');
			$(".affix").removeClass('hide-header');
			$(".bar-header").removeClass('hide-header');

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
								<h1 className="main-title"><a to="home" title="OSH BAROMETER Home" href=""><span className="title">OSH BAROMETER</span> <span className="lead-title">Data Visualisation Tool</span></a></h1>
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
										<Link to="" ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex="2">
											<span data-ng-bind-html="i18n_literals[level0.name]" >Generic information</span> <i className="fa fa-angle-down" aria-hidden="true"></i> 
										</Link>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('osh-authorities')" >
												<Link className="header-link" accessKey="1" to="/generic-information/osh-authorities">OSH Authorities</Link>
											</li>									
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('economic-sector-profile')" >
												<Link className="header-link" accessKey="" to="/generic-information/economic-sector-profile/AT">Economic and Sector Profile</Link>
											</li>									
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('workforce-profile')" >
												<Link className="header-link" accessKey="" to="/generic-information/workforce-profile">Workforce Profile</Link>
											</li>								
										</ul>
									</li>							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('osh-steering')">
										<Link ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex="6">
											<span data-ng-bind-html="i18n_literals[level0.name]" >Steering of OSH</span> 
											<i className="fa fa-angle-down" aria-hidden="true"></i>
										</Link>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('regulation')" >
												<Link ng-if="level1.sref" to="/osh-steering/regulation" id="regulation" accessKey="2" >
													<span data-ng-bind-html="i18n_literals[level1.name]" >Regulation</span>
												</Link>
											</li>										
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('national-strategies')" >
												<Link ng-if="level1.sref" to="/osh-steering/national-strategies" id="national-strategies" accessKey="" >
													<span data-ng-bind-html="i18n_literals[level1.name]" >National strategies</span>
												</Link>
											</li>																			
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('social-dialogue')" >
												<Link ng-if="level1.sref" to="/osh-steering/social-dialogue" id="social-dialogue" accessKey="" >
													<span data-ng-bind-html="i18n_literals[level1.name]" >Social dialogue</span>
												</Link>
											</li>										
										</ul>
									</li>
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('osh-outcomes-working-conditions')">
										<Link ng-if="level0.levels &amp;&amp; level0.sref" to="" className="dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" tabIndex="10">
											<span data-ng-bind-html="i18n_literals[level0.name]" >OSH outcomes and working conditions</span> <i className="fa fa-angle-down" aria-hidden="true"></i> 
										</Link>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">

											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('work-accidents')" >
												<Link ng-if="level1.sref" to="/osh-outcomes-working-conditions/work-accidents" id="work-accidents" accessKey="3">
													<span data-ng-bind-html="i18n_literals[level1.name]" >Work accidents</span>
												</Link>
											</li>
											
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('health-perception-of-workers')" >
												<Link ng-if="level1.sref" to="/osh-outcomes-working-conditions/health-perception-of-workers" id="health-perception-of-workers" accessKey="">
													<span data-ng-bind-html="i18n_literals[level1.name]" >Health perception of the workers</span>
												</Link>
											</li>
											
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('osh-culture')" >
												<Link ng-if="level1.sref" to="/osh-outcomes-working-conditions/osh-culture" id="osh-culture" accessKey="">
													<span data-ng-bind-html="i18n_literals[level1.name]" >OSH culture and health awareness</span>
												</Link>
											</li>
											
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('working-conditions')" >
												<Link ng-if="level1.sref" to="/osh-outcomes-working-conditions/working-conditions" id="working-conditions" accessKey="" >
													<span data-ng-bind-html="i18n_literals[level1.name]" >Working conditions</span>
												</Link>
											</li>																
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('prevention-companies')" >
												<Link ng-if="level1.sref" to="/osh-outcomes-working-conditions/prevention-companies" id="prevention-companies" accessKey="" >
													<span data-ng-bind-html="i18n_literals[level1.name]" >Prevention in companies</span>
												</Link>
											</li>									
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('worker-involvement')" >
												<Link ng-if="level1.sref" to="/osh-outcomes-working-conditions/worker-involvement" id="worker-involvement" accessKey="">
													<span data-ng-bind-html="i18n_literals[level1.name]" >Worker involvement</span>
												</Link>
											</li>
										</ul>
									</li>							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('osh-infrastructure')">
										<Link ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex="17">
											<span data-ng-bind-html="i18n_literals[level0.name]" >OSH infrastructure</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
										</Link>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('enforcement-capacity')" >
												<Link ng-if="level1.sref" to="/osh-infrastructure/enforcement-capacity" id="enforcement-capacity" accessKey="4">
													<span data-ng-bind-html="i18n_literals[level1.name]" >Enforcement capacity</span>
												</Link>
											</li>
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('osh-statistics')" >
												<Link ng-if="level1.sref" to="/osh-infrastructure/osh-statistics" id="osh-statistics" accessKey="">
													<span data-ng-bind-html="i18n_literals[level1.name]" >OSH statistics, surveys and research</span>
												</Link>
											</li>
										</ul>
									</li>							
									<li className="dropdown ng-scope" ng-repeat="level0 in structure" ng-className="isCurrentStateMenu('about-tool')">
										<Link ng-if="level0.levels &amp;&amp; level0.target" className="dropdown-toggle ng-scope" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex="">
											<span data-ng-bind-html="i18n_literals[level0.name]" >About the system</span> <i className="fa fa-angle-down" aria-hidden="true"></i> 
										</Link>
										<ul className="dropdown-menu ng-scope" ng-if="level0.levels">
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('introduction')" >
												<Link ng-if="level1.sref" to="/about-the-system" id="introduction" accessKey="5">
													<span data-ng-bind-html="i18n_literals[level1.name]" >General information</span>
												</Link>
											</li>
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('detail-information')" >
													<Link ng-if="level1.sref" to="/about-the-system/methodology" id="detail-information" accessKey="21">
														<span data-ng-bind-html="i18n_literals[level1.name]" >Methodology</span>
													</Link>
											</li>
											<li ng-repeat="level1 in level0.levels" ng-className="isCurrentStateMenu('country-report')" >
												<Link ng-if="level1.sref" to="/country-report" id="country-report" accessKey="21">
													<span data-ng-bind-html="i18n_literals[level1.name]" >Country reports</span>
												</Link>
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
							<label data-ng-bind="i18n_literals.L369" >Share this on:</label>
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