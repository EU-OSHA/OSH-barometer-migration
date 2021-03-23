import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import images from '../../../style/img/flag/images';

class CountryCards extends Component{
    constructor(props) {
        super(props);

        this.state = {
            firstPercentageLiteral: (props.page == 'socialDialogue' ? props.literals.L20659 : props.literals.L314),
            secondPercentageLiteral: (props.page == 'socialDialogue' ? props.literals.L20660 : props.literals.L315),
            thirdPercentageLiteral: (props.page == 'socialDialogue' ? props.literals.L20661 : props.literals.L316),
            fourthPercentageLiteral: (props.page == 'socialDialogue' ? props.literals.L20662 : props.literals.L317),
            fifthPercentageLiteral: (props.page == 'socialDialogue' ? "" : props.literals.L318),
            sixthPercentageLiteral: (props.page == 'socialDialogue' ? "" : props.literals.L319)
        }
    }

    render()
	{
        const {countryData, page} = this.props;
        // console.log('this.props',this.props);

        var firstPercentage = "";
        var secondPercentage = "";
        var thirdPercentage = "";
        var fourthPercentage = "";
        var fifthPercentage = "";
        var sixthPercentage = "";

        if(countryData.data !== undefined){
            if(page === 'socialDialogue'){
                firstPercentage = countryData.data.E3Q350_1 != 0 ? Math.round(countryData.data.E3Q350_1*100)+"%" : "-";
                secondPercentage = countryData.data.E3Q350_2 != 0 ? Math.round(countryData.data.E3Q350_2*100)+"%" : countryData.countryCode != "AT" ? "-" : "20%";
                thirdPercentage = countryData.data.E3Q350_4 != 0 ? Math.round(countryData.data.E3Q350_4*100)+"%" : "-";
                fourthPercentage = countryData.data.E3Q350_3 != 0 ? Math.round(countryData.data.E3Q350_3*100)+"%" : "-";
            }else{
                firstPercentage = countryData.data["Job satisfaction"] != 0 ? Math.round(countryData.data["Job satisfaction"])+"%" : "-";
                secondPercentage = countryData.data["Health affected by work"] != 0 ? Math.round(countryData.data["Health affected by work"])+"%" : "-";
                thirdPercentage = countryData.data["Health problem in the last 12 months"] != 0 ? Math.round(countryData.data["Health problem in the last 12 months"])+"%" : "-";
                fourthPercentage = countryData.data["More than 15 days of absence"] != 0 ? Math.round(countryData.data["More than 15 days of absence"])+"%" : "-";
                fifthPercentage = countryData.data["Sick at working"] != 0 ? Math.round(countryData.data["Sick at working"])+"%" : "-";
                sixthPercentage = countryData.data["Be able to do current job until 60 years old"] != 0 ? Math.round(countryData.data["Be able to do current job until 60 years old"])+"%" : "-";
            }
        }

        var downloadReport = "";
        var healthPerceptionExtraLis = "";
        if(page === 'socialDialogue'){
            if(countryData.countryCode != 'IS' && countryData.countryCode != 'NO' && countryData.countryCode != 'CH'){
                downloadReport = (
                    <p className="download-report">
                        <Link href="/pentaho/plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/modules/vertical/osh-steering/social-dialogue/pdf/Social_Dialogue_{countryData.countryName}.pdf" className="download-pdf" target="_blank">
                            {ReactHtmlParser(this.props.literals.L20637)}
                        </Link>
                    </p>
                )
            }
        }else{
            healthPerceptionExtraLis = (
                <div>
                    <li>
                        <div className="group-data">
                        <span className="country-data">{fifthPercentage}</span>
                        {/* <span className="data-text">%</span> */}
                        </div>
                        <label>{this.state.fifthPercentageLiteral}</label>
                    </li>
                    <li>
                        <div className="group-data">
                        <span className="country-data">{sixthPercentage}</span>
                        {/* <span className="data-text">%</span> */}
                        </div>
                        <label>{this.state.sixthPercentageLiteral}</label>
                    </li>
                </div>
            )
        }
        
		return(
            <div className="chart--block">
                <header>
                    <div className="flags--wrapper" >
                        <img src={`${images[countryData.countryCode.toLowerCase()]}`} alt={countryData.countryName} />
                    </div>
                    <div className="country-wrapper">
                        <h2 className="country ng-binding title-section main-color">{countryData.countryName}</h2>
                        {downloadReport}
                    </div>
                </header>
                <ul className="highlited-data-list">
                    <li>                
                        <span className="country-data">{firstPercentage}</span>
                        {/* <span data-ng-if="matrix.joint_consultative != null" className="data-text">%</span> */}
                        <label>{this.state.firstPercentageLiteral}</label>
                    </li>
                    <li>                
                        <span className="country-data">{secondPercentage}</span>
                        {/* <span data-ng-if="matrix.trade_union != null || matrix.country_code=='AT'" className="data-text">%</span> */}
                        <label>{this.state.secondPercentageLiteral}</label>
                    </li>
                    <li>                
                        <span className="country-data">{thirdPercentage}</span>
                        {/* <span data-ng-if="matrix.health_representative != null" className="data-text">%</span> */}
                        <label>{this.state.thirdPercentageLiteral}</label>
                    </li>
                    <li>                
                        <span className="country-data">{fourthPercentage}</span>
                        {/* <span data-ng-if="matrix.health_committee != null" className="data-text">%</span> */}
                        <label>{this.state.fourthPercentageLiteral}</label>
                    </li>
                    {healthPerceptionExtraLis}
                </ul>
            </div>
        )
    }
}

export default CountryCards;

