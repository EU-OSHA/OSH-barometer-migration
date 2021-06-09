import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { withCookies } from 'react-cookie';
import $ from "jquery";
import Carousel from 'react-bootstrap/Carousel';
import { setDefaultCountry, setDefaultCountry2 } from '../../actions/';

const Home = props => {
	const store = useStore();
	const currentDefaultCountry = store.getState().defaultCountry;
	// console.log("currentDefaultCountry",currentDefaultCountry);
	const { cookies } = props;

	const [countryUnlocked, setCountryUnlocked] = useState(true);
	const [countrySelected, setCountrySelected] = useState(currentDefaultCountry.code != "0" && currentDefaultCountry.isCookie ? currentDefaultCountry.code : "0" );
	// const [countrySelected, setCountrySelected] = useState( "0" );
	const [selectDisabled, setSelectDisabled] = useState(cookies.get("selectedCountry") != undefined && countrySelected != "0" ? true : false);
	// console.log("countrySelected",countrySelected);
	
	// const [cookies, setCookie, removeCookie] = useCookies([]);
	// console.log("props",props);
	
	//Component did mount
	useEffect(() => {
		// console.log("Component did mount");
		
		// Update the title of the page
		document.title = 'OSH Barometer | Home';
      
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
   
		$(window).on("resize",function(e){
			var screenWidth = getWidth();		  
			createCarousel(screenWidth);
		}); 	

		function hideControls(items){
			if(items == 6){
				$(".carousel-control-group").css('visibility','hidden');
			} else {
				$(".carousel-control-group").css('visibility','visible');
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
			
			$("#carousel .carousel-control-next,#carousel .carousel-control-prev").wrapAll('<div class="carousel-control-group"></div>');
			$( "#carousel .carousel-control-group").appendTo( $( ".discover--charts--section" ) );
			hideControls(numItems);

			$('.carousel-showmanymoveone .carousel-item').each(function(){      
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
					// console.log('start');
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
	}, []);

	//Update when defaultCountrySelected (redux) changes
	useEffect(() => {
		// console.log("Component did update", cookies);
		// console.log("currentDefaultCountry",currentDefaultCountry);
		if(currentDefaultCountry.code != "0" && currentDefaultCountry.isCookie){
			setCountrySelected(currentDefaultCountry.code);
		}
	}, [store.getState().defaultCountry])

	//Update when countrySelected changes
	useEffect(() => {
		if(cookies.get("selectedCountry") != undefined && countrySelected != "0"){
			$("label.country-unlock").toggleClass('country-unlock').toggleClass('country-lock');
			setSelectDisabled(true);
			$("div.preferences--lock select").toggleClass('disabled');
		}
	}, [countrySelected])

    // function to trim the passed text
	function truncateText(str, limitNumber) {	
		if (str.length > limitNumber) {
			return `${str.substring(0, limitNumber).split(" ").slice(0, -1).join(" ")} <span class="dots" >...</span>`
		} else {			
			return str
		}
	}

	function changeCountry(event) {
		// console.log("changeCountry home",event.target.value);
		setCountrySelected(event.target.value);
	}

	function saveCountry(event) {
		var removed = false;
		// console.log("saveCountry home",event);
		setCountryUnlocked(!countryUnlocked);

		if(cookies.get("selectedCountry") != undefined){
			removed = true;
			// removeCookie('selectedCountry');
			cookies.remove("selectedCountry");
			props.setDefaultCountry({
				code: "0",
				isCookie : false,
				selectedByUser: false
			})
			setCountrySelected("0");
		}
		else if(currentDefaultCountry.code != "0" && event.target.className.indexOf("country-lock") != -1){
			removed = true;
			props.setDefaultCountry({
				code: "0",
				isCookie : false,
				selectedByUser: false
			})
			setCountrySelected("0");
		}

		$(event.currentTarget).toggleClass('country-unlock').toggleClass('country-lock');
		$("div.preferences--lock select").toggleClass('disabled');
		setSelectDisabled(!selectDisabled);

		if(!removed){
			props.setDefaultCountry({
				code: countrySelected,
				isCookie : true,
				selectedByUser: true
			})

			//TODO Implement redux for second country default
			if(props.countryDefault2 != undefined){
				if(props.countryDefault2.code != "0" && props.countryDefault2.code === countrySelected){
					props.setDefaultCountry2({
						code: "0",
						isCookie : false
					})
				}
			}			

			// if(defaultCountry2.code != "0" && defaultCountry2.code == event.target.value){
			// 	setDefaultCountry2({
			// 		code: "0",
			// 		isCookie : defaultCountry2.isCookie,
			// 		// selectedByUser: defaultCountry2.selectedByUser
			// 	})
			// }

			if(cookies.get("disclaimerCookie") === "true"){
				cookies.set("selectedCountry", countrySelected);
			}	
		}
	}

	return(
		<div className="home">
			<section className="advice-home container-fluid section--page eu-background">
				<div className="container column--grid--block">
					<div className="column--item">
						<h2 className="title--section second-color uppercase">{props.literals.L22122}</h2>
						<p className="main-title">
							<span className="title">{props.literals.L22020}</span> 
							<span className="subtitle">{props.literals.L22107}</span>
						</p>
						<div className="">							
						{ReactHtmlParser(props.literals.L22108)}
						</div>
						<p className="btn--block-full left-text">
							<a data-to="about-tool" className="btn-default btn-main-color ng-binding" href="about-the-system">{props.literals.L22110}</a>
						</p>
					</div>
					<div className="column--item valign eu-background">
						<p className="lead-title ng-binding">{props.literals.L22109}</p>
					</div>
				</div>
			</section>
			<section className="preferences-home container-fluid section--page">
				<div className="container preferences--lock">
					<h2 className="title-section main-color text-center ng-binding">{props.literals.L22111}</h2>
					<div className="preferences-text ng-binding">
						{ReactHtmlParser(props.literals.L22112)}
					</div>
					<form className="ng-pristine ng-valid">
						<div className="country-selected-wrapper">
							<select data-ng-model="pCountry1" onChange={changeCountry} 
								disabled={selectDisabled}
								// data-ng-disabled="selectDisabled" 
								className="ng-pristine ng-untouched ng-valid" value={countrySelected}>
								<option value="0" disabled="disabled" className="">{props.literals.L22113}</option>
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
							<label className={`${countryUnlocked ? "country-unlock" : "country-lock" } ${countrySelected === "0" ? "disabled" : "" }`} 
								onClick={saveCountry} disabled>
							{/* <label className="country-unlock disabled" data-ng-className="{disabled: pCountry1=='0'}" ng-click="pCountry1=='0' || saveCountry($event)" data-ng-disabled="true" disabled="disabled"> */}
								<i className="fa" aria-hidden="true"></i>
								<i className="fas fa-lock-open"></i>
								</label>
						</div>
						<div className="country-selected">
							{
								selectDisabled ? (
									<label>
										&nbsp; <i className="fa fa-check" aria-hidden="true"></i> 
										<span className="">{props.literals.L22186}
										</span>
									</label>
								) : ""
							}
						</div>
					</form>
				</div>
			</section>

			{/* CARROUSEL HOME */}
			<section className=" section--page carrousel-items background-main-lighter">
				<div className="container discover--charts--section">
					<h2 className="title-section main-color">{props.literals.L22119}</h2>
				</div>
				<Carousel slide className="carousel-showmanymoveone" id="carousel" interval={null}>					
				{/* <Carousel slide> */}
					<Carousel.Item className="carousel-item">
						<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
							<div className="content">
								{/* <Link className="icon--card economic-chart-icon" to="economic-sector-profile ({pCountry:pCountry1})"> */}
								<Link className="icon--card economic-chart-icon" to={"/generic-information/economic-sector-profile/"+currentDefaultCountry.code}>
								</Link>
								<h3 className="title--card">
									{/*<Link to="economic-sector-profile ({pCountry:pCountry1})">*/}
									<Link to={"/generic-information/economic-sector-profile/"+currentDefaultCountry.code}>
									{props.literals.L22003}
									</Link>
								</h3>
								<p className="content-text">{ReactHtmlParser(truncateText(props.literals.L22028,100))}</p>
							</div>
							<p className="btn--card--carousel">
								{/* <Link to="economic-sector-profile ({pCountry:pCountry1})" className="btn-default btn-main-color btn-full"> */}
								<Link to={"/generic-information/economic-sector-profile/"+currentDefaultCountry.code} className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
							</p>
						</div>
					</Carousel.Item>
					<Carousel.Item className="carousel-item">
						<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
							<div className="content">
								{/* <Link className="icon--card national-icon" to="national-strategies"> */}
								<Link className="icon--card national-icon" to="/osh-steering/national-strategies">
								</Link>
								<h3 className="title--card">
									<Link to="/osh-steering/national-strategies">
									{props.literals.L22007}
									</Link>
								</h3>
								<p className="content-text">{ReactHtmlParser(truncateText(props.literals.L22038,100))}</p>
							</div>
							<p className="btn--card--carousel">
								{/*<Link ng-if="strategyCountrySelected != '0'" to="country-profile({pIndicator: 'basic-information', pCountry1: strategyCountrySelected, pCountry2: 0})" className="btn-default btn-main-color btn-full">*/}
								<Link to="/osh-steering/national-strategies" className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
								{/*
								<Link ng-if="strategyCountrySelected == '0'" to="national-strategies" className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
								*/}
							</p>
						</div>
					</Carousel.Item>
					<Carousel.Item className="carousel-item">
						<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
							<div className="content">
								{/* <Link className="icon--card work-accidents-icon" to="work-accidents ({pCountry1:pCountry1})"> */}
								<Link className="icon--card work-accidents-icon" to="/osh-outcomes-working-conditions/work-accidents">
								</Link>
								<h3 className="title--card">
									{/* <Link to="work-accidents ({pCountry1:pCountry1})"> */}
									<Link to="/osh-outcomes-working-conditions/work-accidents">
									{props.literals.L22010}
									</Link>
								</h3>
								<p className="content-text">{ReactHtmlParser(truncateText(props.literals.L22050,100))}</p>
							</div>
							<p className="btn--card--carousel">
								{/* <Link to="work-accidents ({pCountry1:pCountry1})" className="btn-default btn-main-color btn-full"> */}
								<Link to="/osh-outcomes-working-conditions/work-accidents" className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
							</p>
						</div>
					</Carousel.Item>
					<Carousel.Item className="carousel-item">
						<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
							<div className="content">
								{/* <Link className="icon--card statistics-icon" to="osh-statistics"> */}
								<Link className="icon--card statistics-icon" to="/osh-infrastructure/osh-statistics/">
								</Link>
								<h3 className="title--card">
									<Link to="/osh-infrastructure/osh-statistics/">
									{props.literals.L22018}
									</Link>
								</h3>
								<p className="content-text">{ReactHtmlParser(truncateText(props.literals.L22065,100))}</p>
							</div>
							<p className="btn--card--carousel">
								{/* <Link ng-if="statisticsCountrySelected != '0'" to="osh-statistics({pCountry: statisticsCountrySelected})" className="btn-default btn-main-color btn-full"> */}
								<Link to="/osh-infrastructure/osh-statistics/" className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
								{/*
								<Link ng-if="statisticsCountrySelected == '0'" to="osh-statistics" className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
								*/}
							</p>
						</div>
					</Carousel.Item>
					<Carousel.Item className="carousel-item">
						<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
							<div className="content">
								{/* <Link className="icon--card working-conditons-icon" to="working-conditions"> */}
								<Link className="icon--card working-conditons-icon" to="/osh-outcomes-working-conditions/working-conditions">
								</Link>
								<h3 className="title--card">
									<Link to="/osh-outcomes-working-conditions/working-conditions">
									{props.literals.L22013}
									</Link>
								</h3>
								<p className="content-text">{ReactHtmlParser(truncateText(props.literals.L22054,100))}</p>
							</div>
							<p className="btn--card--carousel">
								<Link to="/osh-outcomes-working-conditions/working-conditions" className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
							</p>
						</div>
					</Carousel.Item>
					<Carousel.Item className="carousel-item">
						<div className="col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2">
							<div className="content">
								{/* <Link className="icon--card people-group-icon" to="workforce-profile"> */}
								<Link className="icon--card people-group-icon" to="/generic-information/workforce-profile">
								</Link>
								<h3 className="title--card">
									<Link to="/generic-information/workforce-profile" >
									{props.literals.L22004}
									</Link>
								</h3>
								<p className="content-text">{ReactHtmlParser(truncateText(props.literals.L22030,100))}</p>
							</div>
							<p className="btn--card--carousel">
								<Link to="/generic-information/workforce-profile" className="btn-default btn-main-color btn-full">
								{props.literals.L22026}
								</Link>
							</p>
						</div>
					</Carousel.Item>
				</Carousel>

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
					<h2 className="">{props.literals.L22114}</h2>
					<h3 className="">{props.literals.L22115}</h3>
					<p className="">{props.literals.L22116}</p>
					<p className="btn--wrapper btn--block-arrow">
						<a to="about-tool-detail-page({pSection: father, pSubsection: section.toLowerCase(), pIndicator: pIndicatorID})" className="btn-default btn-main-color text-center ng-binding" href="/about-the-system/methodology">{props.literals.L22117}</a>
					</p>
				</div>
			</section>
		</div>
	)
}

function mapStateToProps(state){
    const {defaultCountry} = state;
	const {defaultCountry2} = state;
    return { defaultCountry: defaultCountry, defaultCountry2: defaultCountry2 };
}

Home.displayName ='Home';

// export default Home;
export default withCookies(connect(mapStateToProps, { setDefaultCountry, setDefaultCountry2 })(Home));