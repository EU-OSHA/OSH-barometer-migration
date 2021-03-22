import React, { Component } from 'react';

import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import images from '../../../style/img/flag/images';

class Cards extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedId: '',
            toggleShowMore: null,
        }
    }

    // Toggle show more/less of the selected card
	onToggleShowMore = (selectedId) => {
		return () => {
            if (selectedId != this.state.selectedId) {
                this.setState({ selectedId, toggleShowMore: true })
			} else {
                this.setState({ selectedId: null, toggleShowMore: false })
			}
		}
	}

	// Opens PDF to a specific Country
    onPDFClick = (countryName) => {
		return () => {
			const url = `pentaho/plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/modules/vertical/generic-information/osh-authorities/pdf/OSH authorities - ${countryName}.pdf`
			window.open(url, "_blank")
		}
	}
    
    // function to trim the passed text
	truncateText = (str, limitNumber) => {
		let maxCharacters = limitNumber;

		if (str.match('<a') || str.match('<p')) {
			maxCharacters += 150;
		}

		if (str.length > limitNumber) {
			return `${str.substring(0, maxCharacters).split(" ").slice(0, -1).join(" ")} <span class="dots" >...</span>`
		} else {
			return str
		}
	}
    
    render() {
		const countryData = this.props.countryData;
        const countryID = `id-${countryData.country.code}`;
        return (
			<div className="matrix--element clearfix" >
				<div className="matrix--header--elements">
					<img className="flags--wrapper" src={`${images[countryData.country.code.toLowerCase()]}`} />
					<h2 className="country  title-section main-color" >{` ${this.props.literals[`L${countryData.country.literalID}`]} `}</h2>
				</div>
				<h3 className="" > {this.props.literals[
					(countryData.check1 && 'L20614' 
					    || countryData.check2 && 'L20611' 
						|| countryData.check3 && 'L20612' 
						|| countryData.check && 'L20613'
						)]}
                </h3>

				<p className="institution-name">{ReactHtmlParser(this.props.literals[`L${countryData.text1}`])}</p>
				{ countryData.text2 && countryData.text3 && (
					ReactHtmlParser(this.props.literals[`L${countryData.text2}`])
				)}

				{!countryData.text3 && 
					this.state.selectedId == countryID ? 
						countryData.text2 && ReactHtmlParser(this.props.literals[`L${countryData.text2}`]) 
					   :
					   countryData.text2 && ReactHtmlParser(this.truncateText(this.props.literals[`L${countryData.text2}`], 320)) 
			   }

			   <div className={'partial-text'}>
					{countryData.text3 && (
						this.state.selectedId == countryID ? 
							ReactHtmlParser(this.props.literals[`L${countryData.text3}`])
							: 
							ReactHtmlParser(this.truncateText(this.props.literals[`L${countryData.text3}`], 300))
					)}
				</div>

				{countryData.text3 && this.props.literals[`L${countryData.text3}`].length > 300 || countryData.text2 && this.props.literals[`L${countryData.text2}`].length > 320 && (
					<p className="see--more--wrapper" onClick={this.onToggleShowMore(countryID)}>
						<a className={this.state.toggleShowMore ? 'see-less main-color' : 'see-more main-color'} > {this.state.toggleShowMore ? this.props.literals.L481 : this.props.literals.L480} </a>
					</p>
				)}

				{countryData.text3 && (
					<div className="">
						<p><a onClick={this.onPDFClick(countryData.country.name)} className="btn--card main-color">{ReactHtmlParser(this.props.literals.L20563)}</a></p>
					</div>
				)}

				{this.props.categoryType == 'challenges' && <div>
					<p><Link className="btn--card main-color" to={{pathname: `/osh-steering/country-profile/basic-information/${this.props.countryData.country.code}`}} >{this.props.literals.L20626}</Link></p>
				</div>}
			</div>
		)
    }
}

export default Cards;