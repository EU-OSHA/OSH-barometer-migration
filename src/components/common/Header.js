import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon} from 'react-share';
import $ from "jquery";
import ReactHtmlParser from 'react-html-parser';

const menu = require('../../model/menu.json');
const breadcrumb = require('../../model/breadcrumb.json');

function googleTranslateElementInit () {
	new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element')
}

function setTitleShare (props) {
	return 'OSH Barometer | Data Visualisation';
}

class Header extends Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {
            menu: menu,
			breadcrumb: breadcrumb
        }
	}

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
	}
	print(){
		window.print();
	}

	componentDidMount(){
		window.onscroll = function() {myFunction()};
		var prevScrollpos = window.pageYOffset;

		document.addEventListener('click', this.closeModalOnClick, true);

		function myFunction() {
		  	if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
				var gotopVisible = window.height + window.height/2;
				var currentScrollPos = window.pageYOffset;
				var resolution = screen.width;
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

		$("button.navbar-toggle").click(function() {
			$(this).toggleClass("exposed");
			$(".bar-main-menu").toggleClass("exposed");
			$(".navbar-collapse").toggleClass("collapse").toggleClass("exposed")
		});
		$("a.dropdown-toggle").click(function(){
			//console.log(window.location.pathname );
			if($(this).parent().attr('class').indexOf("open")<=0){
				$('.navbar-nav li').removeClass('open');
			}
			$(this).parent().toggleClass("open");
		});
		$(".dropdown-menu > li > a").click(function(){
			$("button.navbar-toggle").toggleClass("exposed");
			$(".bar-main-menu").toggleClass("exposed");
			$(".navbar-collapse").toggleClass("collapse").toggleClass("exposed");
		});

		// Add the script to load the Google Translate Element
		var addScript = document.createElement('script');
		addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
		document.body.appendChild(addScript);
		window.googleTranslateElementInit = googleTranslateElementInit;
	}

	/*
	* Functions to show/hide the Google Translate Modal
	*/
	showModal()
	{
		$("#gTranslate-modal").fadeIn('fast');
	}

	closeModal()
	{
		$("#gTranslate-modal").fadeOut('fast');
	}

    closeModalOnClick(event) {
		const modal = document.getElementById('gTranslate-modal');
		if (event.path.indexOf(modal) == -1)
		{
            $("#gTranslate-modal").fadeOut('fast');
        }
    }

	isCurrent(pID)
	{
		// Get the current pathname in an array
		let pathname = location.pathname.split("/");
		if (pID === pathname[2] || (pathname[2] == '' && pID == 'home') || (pathname[2] == 'country-report' && pID == "about-the-system"))
		{
			return 'main-menu-selected';
		}
		return '';
	}

	firstLevelMenuElement(pMenuElement)
	{
		if (pMenuElement.levels && pMenuElement.target)
		{
			// The element has children, so it needs to open
			return (								
				<a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" target="_self" aria-expanded="false" tabIndex={pMenuElement.tabindex}>
					<span>{this.props.literals[pMenuElement.name]} </span>
					<i className="fa fa-angle-down" aria-hidden="true"></i>
				</a>
			);
		}
		else if (!pMenuElement.levels && pMenuElement.link)
		{
			// The element does not have children and it taks to a certain page
			if (pMenuElement.id == 'home')
			{
				// The link is for the home page
				return (	
					<Link to={pMenuElement.link} accessKey={pMenuElement.accesskey} tabIndex={pMenuElement.tabindex}>
						<span>{ReactHtmlParser(pMenuElement.name)}</span>						
					</Link>
				)
			}
			else
			{
				return (	
					<Link to={pMenuElement.link} accessKey={pMenuElement.accesskey} tabIndex={pMenuElement.tabindex}>
						<span>{this.props.literals[pMenuElement.name]}</span>
					</Link>
				)
			}
		}
	}

	secondLevelMenuElement(pLevels)
	{
		if (pLevels == null)
		{
			return null;
		}
		return (
			<ul className="dropdown-menu">
				{pLevels.filter(level=>level.link!=undefined).map(level=>
					<li>
						<Link to={level.link} id={level.id} accessKey={level.accesskey}>
							<span>{this.props.literals[level.name]}</span>
						</Link>
					</li>
				)}
			</ul>
		)		
	}

	

	breadcrumbItem(pBreadcrumbElement, pIndex)
	{
		if (pBreadcrumbElement.link)
		{
			return [
				<Link to={pBreadcrumbElement.link}>{pBreadcrumbElement.text}</Link>,
				<i className='fa fa-angle-right' aria-hidden='true'></i>
			]
		}
		else
		{
			return [
				<span> {pBreadcrumbElement.text} </span>,
				<i className='fa fa-angle-right' aria-hidden='true'></i>
			]
		}
	}

	getBreadcrumb()
	{
		let breadcrumb = this.state.breadcrumb[this.props.child];
		let breadcrumbElems = [];
		if(breadcrumb){
			if (breadcrumb.tree)
			{
				for (let i = 0; i < breadcrumb.tree.length; i++)
				{
					breadcrumbElems.push(this.state.breadcrumb[breadcrumb.tree[i]]);
				}			
			}
			return (
				<p className="path" id="breadCrumbs">
					{breadcrumbElems.map((elem, i) => 
						this.breadcrumbItem(elem, i)
					)}
					<span>{breadcrumb.text}</span>
				</p>
			);
		}
		
	}

	render()
	{
		return(
			<div id="header">
				<header>
					<section className="bar-header container-fluid">
						<div className="header--top">
							<div className="osh-barometer-legend">
								<h1 className="main-title"><a to="home" title="OSH BAROMETER Home" href="/"><span className="title">OSH BAROMETER</span> <span className="lead-title">Data Visualisation Tool</span></a></h1>
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
										<div id="google_translate_element"  title={this.props.literals.L368}></div>
										<span className="google_translate_span">(machine translation)</span>
										<span className="gtranslator-info" onMouseEnter={this.showModal}>Info-icon</span>
										<div id="gTranslate-modal" className="gtranslator-msg" style={{display:'none'}} onMouseLeave={this.closeModal} ref={this.modalRef}>
											{ReactHtmlParser(this.props.literals.L22081)}
										</div>
									</li>
								</ul>
							</nav>
						</div>
						<nav className="bar-main-menu navbar">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#main-menu" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span> 
								<span className="icon-bar bar1"></span> <span className="icon-bar bar2"></span> 
								<span className="icon-bar bar3"></span></button>
							</div>
							<div className="collapse navbar-collapse" id="main-menu">
								<ul className="nav navbar-nav">
									{/* MENU ITEMS */}
									{this.state.menu.map(element =>
										<li className={"dropdown "+this.isCurrent(element.id)}>
											{this.firstLevelMenuElement(element)}
											{this.secondLevelMenuElement(element.levels)}
										</li>
									)}
								</ul>
							</div>
						</nav>
					</section>
					<section className="breadcrumbs--social--network">
						<div className="breadcrumbs">
							{this.getBreadcrumb()}
						</div>
						<div className="social--network--nav" id="osha-menu-social">
							<label>{this.props.literals.L369}</label>
							<ul>
								<li title={this.props.literals.L370}>
									<TwitterShareButton url={window.location.href} title={setTitleShare(this.props)}>
										<TwitterIcon size={40} bgStyle={{fill: 'transparent'}} iconFillColor={'#529FA2'} />
									</TwitterShareButton>
								</li>
								<li title={this.props.literals.L371}>
									<FacebookShareButton url={window.location.href} quote={setTitleShare(this.props)} >
										<FacebookIcon size={40} bgStyle={{fill: 'transparent'}} iconFillColor={'#529FA2'} />
									</FacebookShareButton>
								</li>
								<li title={this.props.literals.L372}>
									<LinkedinShareButton url={window.location.href} title={setTitleShare(this.props)} >
										<LinkedinIcon size={40} bgStyle={{fill: 'transparent'}} iconFillColor={'#529FA2'} />
									</LinkedinShareButton>
								</li>
							</ul>
						</div>
					</section>
				</header>
			</div>
		)
	}
}

export default Header;