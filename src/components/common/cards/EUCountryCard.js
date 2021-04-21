import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class EUCountryCard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            firstPercentage: '',
            secondPercentage: '',
            thirdPercentage: '',
            fourthPercentage: '',
            fifthPercentage: '',
            sixthPercentage: '',
            socialDialogueLink: '',
        }
    }

    componentDidMount() {
        if (this.props.page == 'socialDialogue') {
            this.setState({
                socialDialogueLink: 
                <p className="download-report" >
                    <a href={"/osh-steering/social-dialogue/Social_Dialogue_"+this.props.euData.countryCode+".pdf"} className="download-pdf" target="_blank">
                        {ReactHtmlParser(this.props.literals.L20637)}
                    </a>
                </p>
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.euData != this.props.euData) {
            if (this.props.euData.data !== undefined) {
                if (this.props.page == 'socialDialogue') {
                    this.setState({ 
                        firstPercentage: Math.round(this.props.euData.data.E3Q350_1),
                        secondPercentage: Math.round(this.props.euData.data.E3Q350_2),
                        thirdPercentage: Math.round(this.props.euData.data.E3Q350_4),
                        fourthPercentage: Math.round(this.props.euData.data.E3Q350_3),
                     })
                } else {
                    this.setState({
                        firstPercentage: Math.round(this.props.euData.data["Job satisfaction"]),
                        secondPercentage: Math.round(this.props.euData.data["Health affected by work"]),
                        thirdPercentage: Math.round(this.props.euData.data["Health problem in the last 12 months"]),
                        fourthPercentage: Math.round(this.props.euData.data["More than 15 days of absence"]),
                        fifthPercentage: Math.round(this.props.euData.data["Sick at working"]),
                        sixthPercentage: Math.round(this.props.euData.data["Be able to do current job until 60 years old"])
                    })
                }
            }
        }
    }

    render()
	{
        const { euData, page } = this.props;

		return(
            <div className="highlited--data--section">
                <div className="highlited--data--block container">
                    <div className="highlited-data-item">
                        <div className="flags--wrapper">
                        <img src={require("../../../style/img/flag/eu28.png")} width="94px" />
                        </div>
                        <div className="eu-data">
                            <h2 className="country title-section main-color">{euData.countryName}</h2>
                            {this.state.socialDialogueLink}
                        </div>
                    </div>
                    <div className="highlited-data-item">
                        <ul className="highlited-data-list">
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{this.state.firstPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(page === "socialDialogue") ? this.props.literals.L20659 : this.props.literals.L314 }</label>
                            </li>
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{this.state.secondPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(page === "socialDialogue") ? this.props.literals.L20660 : this.props.literals.L315}</label>
                            </li>
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{this.state.thirdPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(page === "socialDialogue") ? this.props.literals.L20661 : this.props.literals.L316}</label>
                            </li>
                            <li>
                                <div className="group-data">                
                                    <span className="country-data">{this.state.fourthPercentage}</span>
                                    <span className="data-text">%</span>
                                </div>
                                <label>{(page === "socialDialogue") ? this.props.literals.L20662 : this.props.literals.L317}</label>
                            </li>

                            {page != 'socialDialogue' && (
                                <React.Fragment>
                                    <li>
                                        <div className="group-data">
                                            <span className="country-data">{this.state.fifthPercentage}</span>
                                            <span className="data-text">%</span>
                                        </div>
                                        <label>{this.props.literals.L318}</label>
                                    </li>
                                    <li>
                                        <div className="group-data">
                                            <span className="country-data">{this.state.sixthPercentage}</span>
                                            <span className="data-text">%</span>
                                        </div>
                                        <label>{this.props.literals.L319}</label>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default EUCountryCard;