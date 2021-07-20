import React, { Component, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import $ from "jquery";
import { withCookies, useCookies } from 'react-cookie';
import { useMatomo } from '@datapunt/matomo-tracker-react'

// const footerPages = require('../../model/FP-i18n.json');

const PrivacyPolicy = props => 
{
	// constructor(props)
	// {
	// 	super(props);
	// 	this.state = {
    //         footerPages: footerPages
    //     }
	// }

	const [footerPages, setFooterPages] = useState(require('../../model/FP-i18n.json'));
	const { pushInstruction } = useMatomo();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [textBox, setTextBox] = useState(footerPages.optOutComplete);
    const [textCheck, setTextCheck] = useState(footerPages.textCheck2);
    const [checked, setChecked] = useState(true);

	useEffect(() => {
		// Update the title of the page
		document.title = props.literals.L359 +  " - " + props.literals.L22020 + " - " + props.literals.L363;

		var check = $('#box1 > div:nth-child(2) > input[type=checkbox]')[0];
        // console.log("cookies.mtm_cookie_consent",cookies.mtm_cookie_consent);
        // console.log("cookies.mtm_consent_removed",cookies.mtm_consent_removed);

		if(check != null){
            // if(cookies.mtm_cookie_consent === undefined && cookies.mtm_consent_removed === undefined){
            if(cookies.mtm_cookie_consent != undefined){
                // pushInstruction("rememberCookieConsentGiven",360);
                // console.log("MTM CONSENT");
                setChecked(true);
                setTextBox(footerPages.youMayChooseNot);
                setTextCheck(footerPages.textCheck1);
            }else{
                // console.log("MTM CONSENT DENIED");
                setChecked(false);
                setTextBox(footerPages.optOutComplete);
                setTextCheck(footerPages.textCheck2);
            }
        }
	},[])

	// componentDidMount()
	// {
	// 	// Update the title of the page
	// 	document.title = this.props.literals.L359 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	// }

	function toogleMatomo (val) {
        if(val==true) {
            pushInstruction("rememberCookieConsentGiven",360);
            pushInstruction("setConsentGiven");
            pushInstruction("setCookieConsentGiven");

            if(cookies.mtm_consent_removed != undefined){
                removeCookie("mtm_consent_removed");
            }
        } else {
            pushInstruction("forgetConsentGiven");
            pushInstruction("forgetCookieConsentGiven");
        }
    }

	function checkCookies (event) {
        //Functionality to check if cookie exists or not
        // console.log('event.target.checked',event.target.checked);
        if(event.target.checked){
            toogleMatomo(true);
            // console.log('Checkbox is checked');
            setChecked(!checked);
            setTextBox(footerPages.youMayChooseNot);
        	setTextCheck(footerPages.textCheck1);
        }else{
            toogleMatomo(false);
            // console.log('Checkbox is not checked');
            setChecked(!checked);
            setTextBox(footerPages.optOutComplete);
            setTextCheck(footerPages.textCheck2);
        }
    }

	return(
		<div className="mainBody">
			<h1 className="title-section second-color ng-binding text-center">
				{props.literals.L359}
			</h1>
			<div className="container legal--notice--block">
				<h2 className="title-section main-color">
					{ReactHtmlParser(footerPages.organizational)}
				</h2>
				<div>
					{ReactHtmlParser(footerPages.Andrew)}
				</div>
				
				<h2 className="title-section main-color">
					{ReactHtmlParser(footerPages.Purpose)}
				</h2>
				<div>
					{ReactHtmlParser(footerPages.forThe)}
				</div>
				
				<h2 className="title-section main-color" >
					{ReactHtmlParser(footerPages.Type)}
				</h2>
				<div>{ReactHtmlParser(footerPages.Those)}</div>
				<div className="list--tag--block">{ReactHtmlParser(footerPages.ulTypeData)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.LegalBasis)}</h2>
				<div>{ReactHtmlParser(footerPages.Council)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.Lawfulness)}</h2>
				<div>{ReactHtmlParser(footerPages.TheProcessing)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.DataRecipients)}</h2>
				<div>{ReactHtmlParser(footerPages.accessToPersonal)}</div>
				<div>{ReactHtmlParser(footerPages.DulyAppointed)}</div>
				<div>{ReactHtmlParser(footerPages.AllTheRecipients)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.Cookies)}</h2>
				<div>{ReactHtmlParser(footerPages.cookiesText)}</div>

				<div className="box">
					<div id='box1'>
						<div>{ReactHtmlParser(textBox)}</div>
						<div>
							<input type='checkbox' onChange={checkCookies} checked={checked} /> <strong>{ReactHtmlParser(textCheck)}</strong>
						</div>
					</div>
				</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.TheDataS)}</h2>
				<div>{ReactHtmlParser(footerPages.textDataSubjects)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.InformationConservation)}</h2>
				<div>{ReactHtmlParser(footerPages.TheInformation)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.SecurityMeasures)}</h2>
				<div>{ReactHtmlParser(footerPages.WeTakeAp)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.Request)}</h2>
				<div>{ReactHtmlParser(footerPages.ForAnyF)}</div>
				
				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.Recourse)}</h2>
				<div>{ReactHtmlParser(footerPages.DataSub)}</div>

				<h2 className="title-section main-color">{ReactHtmlParser(footerPages.Processing)}</h2>
				<div>{ReactHtmlParser(footerPages.DateAccess)}</div>
			</div>
		</div>
	)
}
PrivacyPolicy.displayName = 'PrivacyPolicy';
export default PrivacyPolicy;