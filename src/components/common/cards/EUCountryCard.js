import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

class EUCountryCard extends Component{
    constructor(props) {
        super(props);
    }

    render()
	{
        const { euData, page } = this.props;
        // console.log('euData',euData);

        var firstPercentage = "";
        var secondPercentage = "";
        var thirdPercentage = "";
        var fourthPercentage = "";
        var fifthPercentage = "";
        var sixthPercentage = "";

        if(euData.data !== undefined){
            if(page === 'socialDialogue'){
                firstPercentage = Math.round(euData.data.E3Q350_1*100);
                secondPercentage = Math.round(euData.data.E3Q350_2*100);
                thirdPercentage = Math.round(euData.data.E3Q350_3*100);
                fourthPercentage = Math.round(euData.data.E3Q350_4*100);
            }else{
                firstPercentage = Math.round(euData.data["Job satisfaction"]);
                secondPercentage = Math.round(euData.data["Health affected by work"]);
                thirdPercentage = Math.round(euData.data["Health problem in the last 12 months"]);
                fourthPercentage = Math.round(euData.data["More than 15 days of absence"]);
                fifthPercentage = Math.round(euData.data["Sick at working"]);
                sixthPercentage = Math.round(euData.data["Be able to do current job until 60 years old"]);
            }
        }

        var socialDialogueLink = "";
        var healthPerceptionExtraLis = "";
        if(page === 'socialDialogue'){
            socialDialogueLink = (
                <p className="download-report" >
                    <Link href="./osh-steering/social-dialogue/pdf/Social_Dialogue_{euData.countryCode}.pdf" className="download-pdf" target="_blank">
                        {ReactHtmlParser(this.props.literals.L20637)}
                    </Link>
                </p>
            )
        }else{
            healthPerceptionExtraLis = (
                <div>
                    <li>
                        <div className="group-data">
                            <span className="country-data">{fifthPercentage}</span>
                            <span className="data-text">%</span>
                        </div>
                        <label>{this.props.literals.L318}</label>
                    </li>
                    <li>
                        <div className="group-data">
                            <span className="country-data">{sixthPercentage}</span>
                            <span className="data-text">%</span>
                        </div>
                        <label>{this.props.literals.L319}</label>
                    </li>
                </div>
            )
        }
        
		return(
            <div className="highlited--data--section">
                <div className="highlited--data--block container">
                    <div className="highlited-data-item">
                        <div className="flags--wrapper">
                        <img src={require("../../../style/img/flag/eu28.png")} width="94px" />
                        </div>
                        <div className="eu-data">
                            <h2 className="country title-section main-color">{euData.countryName}</h2>
                            {socialDialogueLink}
                        </div>
                    </div>
                    <div className="highlited-data-item">
                        <ul className="highlited-data-list">
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{firstPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(this.props.page === "socialDialogue") ? this.props.literals.L20659 : this.props.literals.L314 }</label>
                            </li>
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{secondPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(this.props.page === "socialDialogue") ? this.props.literals.L20660 : this.props.literals.L315}</label>
                            </li>
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{thirdPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(this.props.page === "socialDialogue") ? this.props.literals.L20661 : this.props.literals.L316}</label>
                            </li>
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{fourthPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(this.props.page === "socialDialogue") ? this.props.literals.L20662 : this.props.literals.L317}</label>
                            </li>
                            {healthPerceptionExtraLis}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default EUCountryCard;