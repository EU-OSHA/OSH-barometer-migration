import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import images from '../../style/img/flag/images';
import SeeMore from './SeeMore';

class CountryProfileTextTab extends Component
{
    constructor(props){
        super(props);
        this.state = {
            maxCharacters: this.props.maxCharacters ? this.props.maxCharacters : 200,
			country1: this.props.country1 != undefined ? this.props.country1 : { code: 'AT', name: 'Austria' },
			country2: this.props.country2 != undefined ? this.props.country2 : { code: 'BE', name: 'Belgium' }
        }
    }

	// const country1 = this.props.country1 != undefined ? this.props.country1 : { code: "AT", name: "Austria" };
		// const country2 = this.props.country2 != undefined ? this.props.country2 : { code: "BE", name: "Belgium" };

	componentDidUpdate(prevProps) {
		if (prevProps.country1 != this.props.country1) {
			this.setState({ country1: this.props.country1 })
		}

		if (prevProps.country2 != this.props.country2) {
			this.setState({ country2: this.props.country2 })
		}
	}

    isOneCountrySelected = () => {
		if(this.props.country2 !== undefined && this.props.country2 !== null
			&& this.props.country2 !== ""){
				if (this.props.country2.code != '') {
					return "no-full";
				} else {
					return "full"
				}
		}else{
			return "full";
		}
	}

    trimText = (pVal) => {
		var shortText = pVal;
		var newMaxCharacter = this.state.maxCharacters;
		var pNumCharacters = this.state.maxCharacters;
  
		if(shortText != null){
			var firstSplit =  shortText.substring(0, newMaxCharacter);

			if(firstSplit.match('<a')){
				pNumCharacters += 150;
			}

			var indexStart = shortText.indexOf('<a');
			var indexEnd = shortText.indexOf('>', indexStart);

			if(indexStart != -1){
				while (indexStart != -1){
					var link = shortText.substring(indexStart, indexEnd);
					newMaxCharacter = newMaxCharacter + link.length;
					indexStart = shortText.indexOf('<a', indexEnd);
					indexEnd = shortText.indexOf('>', indexStart);
				}
			}

			if (shortText.length > newMaxCharacter ) {
				shortText = shortText.trim().substring(0, pNumCharacters).split(" ").slice(0, -1).join(" ") + "<span class='dots'>...</span>";
			}
			return ReactHtmlParser(shortText);
		}
	}

    toggleText = event => () => {
		// console.log('event.target.nodeName',event.target.nodeName);

		var completeText = "";
		var partialText = "";
		var seeMore = "";
		var seeLess = "";

		if(event.target.nodeName === "A"){
			completeText = event.target.parentNode.parentNode.previousSibling;
			partialText = event.target.parentNode.parentNode.previousSibling.previousSibling;
			seeMore = event.target.previousSibling !== null ? event.target.previousSibling: event.target;
			seeLess = event.target.nextSibling !== null ? event.target.nextSibling: event.target;

			// seeLess.style.display === "none" ? seeLess.style.display = "block" : seeLess.style.display = "none" ;
			// (completeText.style.display === "block" || completeText.style.display === "") ? completeText.style.display = "none": completeText.style.display = "block";
			// (partialText.style.display === "block" || partialText.style.display === "") ? partialText.style.display = "none": partialText.style.display = "block";
		} 
		else if(event.target.nodeName === "FONT")
		{
			completeText = event.target.parentNode.parentNode.parentNode.parentNode.previousSibling;
			partialText = event.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling;
			seeMore = event.target.parentNode.parentNode.previousSibling !== null ? event.target.parentNode.parentNode.previousSibling: event.target.parentNode.parentNode;
			seeLess = event.target.parentNode.parentNode.nextSibling !== null ? event.target.parentNode.parentNode.nextSibling: event.target.parentNode.parentNode;
		}
		else if(event.target.nodeName === "I")
		{
			completeText = event.target.parentNode.parentNode.parentNode.previousSibling;
			partialText = event.target.parentNode.parentNode.parentNode.previousSibling.previousSibling;
			seeMore = event.target.parentNode.previousSibling !== null ? event.target.parentNode.previousSibling: event.target.parentNode;
			seeLess = event.target.parentNode.nextSibling !== null ? event.target.parentNode.nextSibling: event.target.parentNode;
		}

		completeText.classList.toggle("complete-text");
		partialText.classList.toggle("hide");
		
		seeMore.classList.toggle("hide");
		seeLess.style.display === "none" ? seeLess.style.display = "inline" : seeLess.style.display = "none" ;
	}

    render () {
        const tabName = this.props.tabName;
        
        var secondCountryContainer =  "";

        if(this.props.country2 != undefined){
			if (this.props.country2.code != '') {
				secondCountryContainer = (
					<div className="column--item second">
						<div className="">
							{this.props.page == 'enforcement' && (<img className="flags--wrapper" src={`${this.props.country2.code && images[this.props.country2.code.toLowerCase()]}`} alt={this.props.country2.name} />)}
							{!this.props.page && (<img className="flags--wrapper" src={`${this.props.country2 && images[this.props.country2.code.toLowerCase()]}`} alt={this.props.country2 && this.props.country2.name} />)}
						</div>
						<h2>{this.props.literals[`L${tabName}`]}</h2>
						<div className="columm--item--content">
							{ /* <p className="download-report" data-ng-bind="i18nLiterals.L20639"></p>*/}
							<p className="download-report">
								{!this.props.page && (
									<a href={`/osh-barometer/osh-steering/country-profile/National-Strategies-Mapping_${this.state.country2.name}.pdf`}
									className="download-pdf" target="_blank">{this.props.literals.L20640}</a> 
								)}
							</p>
							{this.props.page == 'enforcement' && this.props.noInfoMsg2 && (this.props.noInfoMsg2.map((element, index) => <div key={`${index}-${element}`} className="partial-text-profile"> {this.props.literals[`L${element}`]} </div>))}
							<div className="partial-text">{this.trimText(this.props.literals['L'+this.props.country2Text])}</div>
							<div className="complete-text" data-ng-bind-html="i18nLiterals['L'+country2Data.text1]">
								{ReactHtmlParser(this.props.literals['L'+this.props.country2Text])}
							</div>
							<SeeMore text={this.props.literals['L'+this.props.country2Text]} maxCharacters={this.state.maxCharacters} 
								literals={this.props.literals} toggleText={this.toggleText} />
						</div>
					</div>
				)
			} 
        }

        return (
            <div className="column--grid--block" id={this.props.tab}>
                <div className={"column--item first "+this.isOneCountrySelected()}>
                    <div className="">
						{this.props.page == 'enforcement' && (<img className="flags--wrapper" src={`${this.props.country1.code && images[this.props.country1.code.toLowerCase()]}`} alt={this.props.country1.name} />)}
						{!this.props.page && (<img className="flags--wrapper" src={`${this.props.country1 && images[this.props.country1.code.toLowerCase()]}`} alt={this.props.country1 && this.props.country1.name} />)}
                    </div>
                    <h2>{this.props.literals[`L${tabName}`]}</h2>
                    <div className="columm--item--content">
                        {!this.props.page && (
							<p className="download-report">
								<a href={`/osh-barometer/osh-steering/country-profile/National-Strategies-Mapping_${this.state.country1.name}.pdf`} 
									className="download-pdf" target="_blank">{this.props.literals.L20640}</a>
                        	</p>
						)}
						{this.props.page == 'enforcement' && this.props.noInfoMsg1 && (this.props.noInfoMsg1.map((element, index) => <div key={`${index}-${element}`} className="partial-text-profile"> {this.props.literals[`L${element}`]} </div>))}
                        <div className="partial-text" >{this.trimText(this.props.literals['L'+this.props.country1Text])}</div>
                        <div className="complete-text" >{ReactHtmlParser(this.props.literals['L'+this.props.country1Text])}</div>
                        <SeeMore text={this.props.literals['L'+this.props.country1Text]} maxCharacters={this.state.maxCharacters} 
                            literals={this.props.literals} toggleText={this.toggleText} />
                    </div>
                </div>
                {secondCountryContainer}
            </div>
        )
    }
}

export default CountryProfileTextTab;