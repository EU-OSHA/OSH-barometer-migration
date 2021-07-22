import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import $ from "jquery";
import Carousel from 'react-bootstrap/Carousel';
import { setCountry1, setCountry2, setLockedCountry, setMethodology } from '../../actions/';
import CarouselCards from '../common/cards/CarouselCards';

import { carouselDataCard } from '../../model/carouselItemData';

const Home = props => {
	// Global States
	const { lockedCountry, isCookie, selectedByUser, selectCountry2 } = useSelector((state) => state.selectCountries);
	// Cookies
	const { cookies } = props;

	const [countrySelected, setCountrySelected] = useState('0');
	const [selectDisabled, setSelectDisabled] = useState(lockedCountry ? true : false);

	// Action Dispatcher
	const dispatch = useDispatch();
	
	//Component did mount
	useEffect(() => {

		// set Methodology
		dispatch(setMethodology('generic-information', 'OSH authorities', 27));

		// Update the title of the page
		document.title = 'OSH Barometer | Home';
	}, []);

	useEffect(() => {
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
   
		const screenWidth = getWidth();
		createCarousel(screenWidth);
   
		$(window).on("resize",function(e){
			const screenWidth = getWidth();		  
			createCarousel(screenWidth);
		}); 	

		function hideControls(items){
			if(items == 6){
				$(".carousel-control-group").css('visibility','hidden');
			} else {
				$(".carousel-control-group").css('visibility','visible');
			}
		}

		$('.carousel-showmanymoveone .carousel-item').each(function(index){
			
			for (let i=0;i<$(this).children().length;i++) {
				$(this).children(':nth-child('+(i+1)+')').addClass('cloneditem-'+i);				
			}
			switch(index+1) {					
				case 1:
					break;
				case 2:
					$(this).children(':nth-child(1)').appendTo( $(this) );
				break;
				case 3:
					$('.cloneditem-0',this).appendTo( $(this) );
					$('.cloneditem-1',this).appendTo( $(this) );

				break;
				case 4:
					$('.cloneditem-0',this).appendTo( $(this) );
					$('.cloneditem-1',this).appendTo( $(this) );
					$('.cloneditem-2',this).appendTo( $(this) );
					break;
				case 5:
					$('.cloneditem-0',this).appendTo( $(this) );
					$('.cloneditem-1',this).appendTo( $(this) );
					$('.cloneditem-2',this).appendTo( $(this) );
					$('.cloneditem-3',this).appendTo( $(this) );
					break;
				case 6:
					$('.cloneditem-0',this).appendTo( $(this) );
					$('.cloneditem-1',this).appendTo( $(this) );
					$('.cloneditem-2',this).appendTo( $(this) );
					$('.cloneditem-3',this).appendTo( $(this) );
					$('.cloneditem-4',this).appendTo( $(this) );
					break;
				default:
				// code block
			}
		});
  
		function createCarousel(screenWidth){  
			let numItems;    
			if( screenWidth >= 1919){
				numItems = 6;	
			}
			else if( screenWidth >= 1600 && screenWidth < 1919 ){
				numItems =5;
			}
			else if( screenWidth >= 1200 && screenWidth < 1600 ){
				numItems =4;
			}
			else if( screenWidth >= 992 && screenWidth < 1200  ){
				numItems = 3;
			}
			else if(  screenWidth >= 768 && screenWidth < 992 ){
				numItems = 2;
			}
			else if( screenWidth < 768 && screenWidth > 420){
				numItems = 1;
			} else {
				numItems = 1;
			}
			
			$("#carousel .carousel-control-next,#carousel .carousel-control-prev").wrapAll('<div class="carousel-control-group"></div>');
			$( "#carousel .carousel-control-group").appendTo( $( ".discover--charts--section" ) );
			hideControls(numItems);

			$('.carousel-showmanymoveone .carousel-item').each(function(index){	

				for (let i=0;i<$(this).children().length;i++) {					
					if(i < numItems){
						$(this).children(':nth-child('+(i+1)+')').css('display','');
					}else {
						$(this).children(':nth-child('+(i+1)+')').css('display','none');
					}
				}

			});
		}

	}, [])

	//Update when defaultCountrySelected (redux) changes
	useEffect(() => {
		if (selectedByUser && isCookie) {
			setCountrySelected(lockedCountry);
		}
	}, [selectedByUser, isCookie])

	useEffect(() => {
		if(cookies.get("disclaimerCookie") === "true"){
			cookies.set("selectedCountry", countrySelected);
		}
	}, [cookies]);

    // function to trim the passed text
	function truncateText(str, limitNumber) {	
		if (str.length > limitNumber) {
			return `${str.substring(0, limitNumber).split(" ").slice(0, -1).join(" ")} <span class="dots" >...</span>`
		} else {			
			return str
		}
	}

	function changeCountry(event) {
		setCountrySelected(event.target.value);
	}

	function saveCountry() {
		if (countrySelected != '0') {
			setSelectDisabled(!selectDisabled);

			if (!selectDisabled) {
				if (countrySelected == selectCountry2) {
					dispatch(setCountry2(''));
					dispatch(setLockedCountry(countrySelected, true, true));
					dispatch(setCountry1(countrySelected));
				} else {
					dispatch(setLockedCountry(countrySelected, true, true))
					dispatch(setCountry1(countrySelected));
				}
	
				if (cookies.get('disclaimerCookie') == 'true') {
					cookies.set("selectedCountry", countrySelected);
				}
			} else {
				setCountrySelected('0')
				dispatch(setLockedCountry('', false, false))
				dispatch(setCountry1('AT'));
				if (selectCountry2 == 'AT')
				{
					dispatch(setCountry2(''));
				}
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
					<form className="">
						<div className="country-selected-wrapper">
							<select onChange={changeCountry} 
								disabled={selectDisabled}
								className="" value={countrySelected}>
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
							<label className={`${!selectDisabled ? "country-unlock" : "country-lock" } ${countrySelected === "0" ? "disabled" : "" }`} 
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
				{/** Start if Items */}
				{carouselDataCard.map((cardItem, index) => (
						<Carousel.Item className={`carousel-item`} key={index} >
							{carouselDataCard.map((itemData) => {
								return (
									<CarouselCards
										pos={index}
										literals={props.literals} 
										cardItem={itemData}  
									/>
								)
							})}
							{/**
							{carouselDataCard.map((itemData) => (
								<CarouselCards
								pos={index}
								literals={props.literals} 
								cardItem={cardItem}  
								/>
							))} */}
						</Carousel.Item>
						))}
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
						<Link className="btn-default btn-main-color text-center ng-binding" to="/about-the-system/methodology">{props.literals.L22117}</Link>
					</p>
				</div>
			</section>
		</div>
	)
}

Home.displayName ='Home';
export default withCookies(Home);