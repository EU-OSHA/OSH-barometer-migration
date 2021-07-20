import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useMatomo } from '@datapunt/matomo-tracker-react'
import $ from "jquery";
import { setCountry1 } from '../../../actions/';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CookiesComponent = (props) => {
    const [showPopUpMessage, setShowPopUpMessage] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['disclaimerCookie']);

    const dispatch = useDispatch();

    const { pushInstruction } = useMatomo();

    useEffect(() => {

        if(cookies.mtm_consent_removed === undefined && cookies.mtm_cookie_consent === undefined){
            // console.log("cookies for MTM not yet added");
            pushInstruction("rememberCookieConsentGiven",360);
        }

        if(cookies.selectedCountry != undefined && cookies.selectedCountry != '0'){
            dispatch(setCountry1(cookies.selectedCountry))
        }else{
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(function(position){
                        fetch('https://iplist.cc/api/')
                        .then(response => response.json())
                        .then(coordinates => {
                            // console.log("coordinates",coordinates);
                            const availableCountries = ["AT","BG","CH","CY","CZ","DE","DK","EE","EL","ES","FI","FR","HR","HU","IE","IS","IT","LT","LU","LV","MT","NL","NO","PL","PT","RO","SE","SI","SK"];
                            if (availableCountries.indexOf(coordinates.countrycode) > -1) {
                                dispatch(setCountry1(coordinates.countrycode));
                            }  
                        })
                        .catch(error => console.log(error.message));
                    }, () => { 
                        console.log("UNABLE TO RETRIEVE YOUR LOCATION");
                    });
                }
            }
    }, [])

    function consentDecline () {
        if ($('body').hasClass('hasCookies')) {
            $('body').removeClass('hasCookies');                            
        }
        $('#cookiesConsent').hide();
        setShowPopUpMessage(false);
        if(cookies.key){
            removeCookie('disclaimerCookie');
        }
    }

    function consentAgree () {
        if ($('body').hasClass('hasCookies')) {
            $('body').removeClass('hasCookies');                            
        }
        $('#cookiesConsent').hide();
        setShowPopUpMessage(false);
        var cookieLife = new Date();
        cookieLife.setDate(cookieLife.getDate() + 360);
        // console.log("cookieLife",cookieLife);
        setCookie("disclaimerCookie", true, {
            path: "/",
            expires: cookieLife,
            secure: true,
            sameSite: 'none',
        });
    }

    var popUp;
    if(showPopUpMessage && !cookies.disclaimerCookie){
        popUp = (
            <section id="cookiesConsent">
                <div className="text">
                    <p>{props.literals.L379}</p>
                </div>
                <div className="buttons">
                    <Link to="/privacy-notice"><button>{props.literals.L382}</button></Link>
                    <button id="consentCookies" onClick={consentDecline} className="decline">{props.literals.L381}</button>
                    <button id="consentCookies" onClick={consentAgree} className="accept">{props.literals.L380}</button>
                    {/* <button id="consentCookies" onClick="$consent.agree(); consentAgree();" className="accept">{this.props.literals.L380}</button> */}
                </div>
            </section>
        )
    }

    return (
        <div>
            {popUp}
        </div>
    )
}

export default CookiesComponent;