import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import $ from "jquery";

class Home extends Component
{
	componentDidMount(){
      
		function getWidth(){
			if (typeof window.innerWidth != 'undefined') {
				return window.innerWidth;
			}
			else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
				return document.documentElement.clientWidth;
			}
			else {
				return document.getElementsByTagName('body')[0].clientWidth;
			}
		}
   
		var screenWidth = getWidth();
		createCarousel(screenWidth);
   
		$(window).on("resize scroll",function(e){
			var screenWidth = getWidth();		  
			createCarousel(screenWidth);
		});   
   
		function hideControls(items){
			if(items == 6){
				$('.carousel-control-group').addClass('hide');
			} else {
				$('.carousel-control-group').removeClass('hide');
			}
		}
   
		function createCarousel(screenWidth){      
			if( screenWidth >= 1919){
				var numItems = 6;
			}
			else if( screenWidth >= 1600 && screenWidth < 1919 ){
				var numItems =5;
			}
			else if( screenWidth >= 1200 && screenWidth < 1600 ){
				var numItems =4;
			}
			else if( screenWidth >= 992 && screenWidth < 1200  ){
				var numItems = 3;
			}
			else if(  screenWidth >= 768 && screenWidth < 992 ){
				var numItems = 2;
			}
			else if( screenWidth < 768 && screenWidth > 420){
				var numItems = 1;
			} else {
				var numItems = 1;
			}
			hideControls(numItems);

			$('.carousel-showmanymoveone .item').each(function(){      
				var itemToClone = $(this);	
				$('>div.cloned',this).remove();					

				for (var i=1;i<numItems;i++) {				  	
					itemToClone = itemToClone.next();
					// wrap around if at end of item collection
					if (!itemToClone.length) {
						itemToClone = $(this).siblings(':first');	        
					}
					// grab item, clone, add marker class, add to collection
					itemToClone.children(':first-child').clone().addClass("cloned").addClass("cloneditem-"+(i)).appendTo($(this));	    
				}
			});
		}
		$(".carousel").on("touchstart", function(event){
			if( numItems != 6){				   
			   	var xClick = event.originalEvent.touches[0].pageX;

			   	$(this).one("touchmove", function(event){
					var xMove = event.originalEvent.touches[0].pageX;
					if( Math.floor(xClick - xMove) > 5 ){
						$(this).carousel('next');
					}
					else if( Math.floor(xClick - xMove) < -5 ){
						$(this).carousel('prev');
					}
			   	});

				$(".carousel").on("touchend", function(){
					$(this).off("touchmove");
				});
			}
		});
	}
	render()
	{
		return(
			<div>
				<section className="advice-home container-fluid section--page eu-background">
					<div className="container column--grid--block">
						<div className="column--item">
							<h2 className="title--section second-color uppercase">{this.props.literals.L22122}</h2>
							<p className="main-title">
								<span className="title">{this.props.literals.L22020}</span> 
								<span className="subtitle">{this.props.literals.L22107}</span>
							</p>
							<div className="">							
							{ReactHtmlParser(this.props.literals.L22108)}
							</div>
							<p className="btn--block-full left-text">
								<a data-to="about-tool" className="btn-default btn-main-color ng-binding" data-ng-bind="i18n.L22110" href="about-the-system">Discover the tool</a>
							</p>
						</div>
						<div className="column--item valign eu-background">
							<p className="lead-title ng-binding">{this.props.literals.L22109}</p>
						</div>
					</div>
				</section>
				<div className="container preferences--lock">
					<h2 className="title-section main-color text-center ng-binding">{this.props.literals.L22111}</h2>
					<div className="preferences-text ng-binding">
						{ReactHtmlParser(this.props.literals.L22112)}
					</div>
					<form className="ng-pristine ng-valid">
						<div className="country-selected-wrapper">
							<select data-ng-model="pCountry1" data-ng-change="changeCountry()" data-ng-disabled="selectDisabled" className="ng-pristine ng-untouched ng-valid">
								<option value="0" disabled="disabled" className="">{this.props.literals.L22113}</option>
								<option value="AT">(AT) Austria</option>
								<option value="BE">(BE) Belgium</option>
								<option value="BG">(BG) Bulgaria</option>
								<option value="CH">(CH) Switzerland</option>
								<option value="CY">(CY) Cyprus</option>
								<option value="CZ">(CZ) Czechia</option>
								<option value="DE">(DE) Germany</option>
								<option value="DK">(DK) Denmark</option>
								<option value="EE">(EE) Estonia</option>
								<option value="EL">(EL) Greece</option>
								<option value="ES">(ES) Spain</option>
								<option value="FI">(FI) Finland</option>
								<option value="FR">(FR) France</option>
								<option value="HR">(HR) Croatia</option>
								<option value="HU">(HU) Hungary</option>
								<option value="IE">(IE) Ireland</option>
								<option value="IS">(IS) Iceland</option>
								<option value="IT">(IT) Italy</option>
								<option value="LT">(LT) Lithuania</option>
								<option value="LU">(LU) Luxembourg</option>
								<option value="LV">(LV) Latvia</option>
								<option value="MT">(MT) Malta</option>
								<option value="NL">(NL) Netherlands</option>
								<option value="NO">(NO) Norway</option>
								<option value="PL">(PL) Poland</option>
								<option value="PT">(PT) Portugal</option>
								<option value="RO">(RO) Romania</option>
								<option value="SE">(SE) Sweden</option>
								<option value="SI">(SI) Slovenia</option>
								<option value="SK">(SK) Slovakia</option>
							</select>
							<label className="country-unlock disabled" data-ng-className="{disabled: pCountry1=='0'}" ng-click="pCountry1=='0' || saveCountry($event)" data-ng-disabled="true" disabled="disabled">
								<i className="fa" aria-hidden="true"></i>
								<i className="fas fa-lock-open"></i>
								</label>
						</div>
						<div className="country-selected">
							<label data-ng-show="selectDisabled" className="ng-hide">
								&nbsp; <i className="fa fa-check" aria-hidden="true"></i> 
								<span className="">{this.props.literals.L22186}
								</span>
							</label>
						</div>
					</form>
				</div>

				{/* CARROUSEL HOME */}
				<section className=" section--page carrousel-items background-main-lighter">
					<div className="container discover--charts--section">
						<h2 className="title-section main-color"></h2>
						<div className="carousel-control-group">
							<Link className="left carousel-control" href="#carousel-tilenav" data-slide="next">
								<i className="fa fa-angle-right" aria-hidden="true"></i>
							</Link>
							<Link className="right carousel-control" href="#carousel-tilenav" data-slide="prev">
								<i className="fa fa-angle-left" aria-hidden="true"></i>
							</Link>
						</div>
					</div>
					<div className="carousel carousel-showmanymoveone slide" id="carousel-tilenav" data-interval="false">
						<div className="carousel-inner">
							<div className="item active">
								<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
									<div className="content">
										<Link className="icon--card economic-chart-icon" to="economic-sector-profile ({pCountry:pCountry1})">
										</Link>
										<h3 className="title--card">
											<Link to="economic-sector-profile ({pCountry:pCountry1})">
											{this.props.literals.L22003}
											</Link>
										</h3>
										<p className="content-text">{ReactHtmlParser(this.props.literals.L22028)}</p>
									</div>
									<p className="btn--card--carousel">
										<Link to="economic-sector-profile ({pCountry:pCountry1})" className="btn-default btn-main-color btn-full">
										{this.props.literals.L22026}
										</Link>
									</p>
								</div>
							</div>
							<div className="item">
							<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
								<div className="content">
									<Link className="icon--card national-icon" to="national-strategies">
									</Link>
									<h3 className="title--card">
										<Link to="national-strategies">
										{this.props.literals.L22007}
										</Link>
									</h3>
									<p className="content-text">{ReactHtmlParser(this.props.literals.L22038)}</p>
								</div>
								<p className="btn--card--carousel">
									<Link ng-if="strategyCountrySelected != '0'" to="country-profile({pIndicator: 'basic-information', pCountry1: strategyCountrySelected, pCountry2: 0})" className="btn-default btn-main-color btn-full">
									{this.props.literals.L22026}
									</Link>
									<Link ng-if="strategyCountrySelected == '0'" to="national-strategies" className="btn-default btn-main-color btn-full">
									{this.props.literals.L22026}
									</Link>
								</p>
							</div>
							</div>
							<div className="item">
								<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
									<div className="content">
										<Link className="icon--card work-accidents-icon" to="work-accidents ({pCountry1:pCountry1})">
										</Link>
										<h3 className="title--card">
											<Link to="work-accidents ({pCountry1:pCountry1})">
											{this.props.literals.L22010}
											</Link>
										</h3>
										<p className="content-text">{ReactHtmlParser(this.props.literals.L22050)}</p>
									</div>
									<p className="btn--card--carousel">
										<Link to="work-accidents ({pCountry1:pCountry1})" className="btn-default btn-main-color btn-full">
										{this.props.literals.L22026}
										</Link>
									</p>
								</div>
							</div>
							<div className="item">
								<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
									<div className="content">
										<Link className="icon--card statistics-icon" to="osh-statistics">
										</Link>
										<h3 className="title--card">
											<Link to="osh-statistics">
											{this.props.literals.L22018}
											</Link>
										</h3>
										<p className="content-text">{ReactHtmlParser(this.props.literals.L22065)}</p>
									</div>
									<p className="btn--card--carousel">
										<Link ng-if="statisticsCountrySelected != '0'" to="osh-statistics({pCountry: statisticsCountrySelected})" className="btn-default btn-main-color btn-full">
										{this.props.literals.L22026}
										</Link>
										<Link ng-if="statisticsCountrySelected == '0'" to="osh-statistics" className="btn-default btn-main-color btn-full">
										{this.props.literals.L22026}
										</Link>
									</p>
								</div>
							</div>
							<div className="item">
								<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
									<div className="content">
										<Link className="icon--card working-conditons-icon" to="working-conditions">
										</Link>
										<h3 className="title--card">
											<Link to="working-conditions">
											{this.props.literals.L22013}
											</Link>
										</h3>
										<p className="content-text">{ReactHtmlParser(this.props.literals.L22054)}</p>
									</div>
									<p className="btn--card--carousel">
										<Link to="working-conditions" className="btn-default btn-main-color btn-full">
										{this.props.literals.L22026}
										</Link>
									</p>
								</div>
							</div>
							<div className="item">
								<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
									<div className="content">
										<Link className="icon--card people-group-icon" to="workforce-profile">
										</Link>
										<h3 className="title--card">
											<Link to="workforce-profile" >
											{this.props.literals.L22004}
											</Link>
										</h3>
										<p className="content-text">{ReactHtmlParser(this.props.literals.L22030)}</p>
									</div>
									<p className="btn--card--carousel">
										<Link to="workforce-profile" className="btn-default btn-main-color btn-full">
										{this.props.literals.L22026}
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* CARROUSEL HOME */}

				<section className="section--page section--our--methodology">
					<div className="agencies--logos--block">
						<ul>
							<li><a href="https://ec.europa.eu/eurostat/" title="visit the  web" target="_blank">
								<img src={require("../../style/img/eurostat-logo.png")} /></a>
							</li>
							<li><a href="https://www.eurofound.europa.eu/" title="visit the  web" target="_blank">
								<img src={require("../../style/img/eurofound-logo.png")} /></a>
							</li>
							<li>
								<a href="https://osha.europa.eu/" title="visit the  web" target="_blank">
								<img src={require("../../style/img/logo.png")} /></a>
							</li>
							<li>
								<a href="https://visualisation.osha.europa.eu/esener#!/en" title="visit the web" target="_blank">
								<img src={require("../../style/img/esener-logo.png")} /></a>
							</li>
						</ul>
					</div>
					<div className="content-methodology">
						<h2 className="">{this.props.literals.L22114}</h2>
						<h3 className="">{this.props.literals.L22115}</h3>
						<p className="">{this.props.literals.L22116}</p>
						<p className="btn--wrapper btn--block-arrow">
							<a to="about-tool-detail-page({pSection: father, pSubsection: section.toLowerCase(), pIndicator: pIndicatorID})" className="btn-default btn-main-color text-center ng-binding" href="#!/about-the-system/methodology">{this.props.literals.L22117}</a>
						</p>
					</div>
				</section>
			</div>
		)
	}
}

export default Home;