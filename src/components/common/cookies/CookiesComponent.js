import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useMatomo } from '@datapunt/matomo-tracker-react'
import $ from "jquery";

const CookiesComponent = (props) => {
    const [showPopUpMessage, setShowPopUpMessage] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['disclaimerCookie']);

    const { pushInstruction } = useMatomo();

    useEffect(() => {
        // console.log("cookies CookiesComponent",cookies);

        if(cookies.mtm_consent_removed === undefined && cookies.mtm_cookie_consent === undefined){
            // console.log("cookies for MTM not yet added");
            pushInstruction("rememberCookieConsentGiven",360);
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
            expires: cookieLife
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
                    <a href={"/osh-barometer/privacy-notice"}><button>{props.literals.L382}</button></a>
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