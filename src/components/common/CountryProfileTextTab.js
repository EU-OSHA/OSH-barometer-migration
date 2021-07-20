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
			country2: this.props.country2 != undefined ? this.props.country2 : { code: 'BE', name: 'Belgium' },
			toggleSeeMore: false,
			toggleSeeMore2: false
        }
    }

	componentDidUpdate(prevProps) {
		if (prevProps.country1 != this.props.country1) {
			this.setState({ country1: this.props.country1 })
		}

		if (prevProps.country2 != this.props.country2) {
			this.setState({ country2: this.props.country2 })
		}

		if (prevProps.tabName != this.props.tabName) {
			this.setState({
				toggleSeeMore: false,
				toggleSeeMore2: false
			})
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

	toggleText = (callback) => {
		this.setState({
			toggleSeeMore: callback
		})
	}

	toggleText2 = (callback) => {
		this.setState({
			toggleSeeMore2: callback
		})
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
							<div className="complete-text" style={{ display: this.state.toggleSeeMore2 ? 'block' : 'none' }} >
								{ReactHtmlParser(this.props.literals['L'+this.props.country2Text])}
							</div>
							<div className="partial-text" style={{ display: this.state.toggleSeeMore2 ? 'none' : 'block' }}>{this.trimText(this.props.literals['L'+this.props.country2Text])}</div>	
							<SeeMore 
								text={this.props.literals['L'+this.props.country2Text]} 
								maxCharacters={this.state.maxCharacters} 
								toggleSeeMore={this.state.toggleSeeMore2} 
								onCallbackToggle={this.toggleText2} 
								tabName={this.props.tabName}
								literals={this.props.literals} 
								/>
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
                        <div className="partial-text" style={{ display: !this.state.toggleSeeMore ? 'block' : 'none' }} >{this.trimText(this.props.literals['L'+this.props.country1Text])}</div>
                        <div className="complete-text" style={{ display: this.state.toggleSeeMore ? 'block' : 'none' }} >{ReactHtmlParser(this.props.literals['L'+this.props.country1Text])}</div>
                        <SeeMore 
							text={this.props.literals['L'+this.props.country1Text]} 
							maxCharacters={this.state.maxCharacters}
							toggleSeeMore={this.state.toggleSeeMore}
							onCallbackToggle={this.toggleText}
							tabName={this.props.tabName}
                            literals={this.props.literals}
							/>
                    </div>
                </div>
                {secondCountryContainer}
            </div>
        )
    }
}

export default CountryProfileTextTab;