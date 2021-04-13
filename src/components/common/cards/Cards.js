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
			const url = `/generic-information/osh-authorities/OSH authorities - ${countryName}.pdf`
			window.open(url, "_blank")
		}
	}
    
    // function to trim the passed text
	truncateText = (str, limitNumber) => {
		const replacedText = str.replace(/<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/img)

		if (replacedText.length > limitNumber) {
			return `${str.substring(0, limitNumber).split(" ").slice(0, -1).join(" ")} <span class="dots" >...</span>`
		} else {
			return str
		}
	}

    render() {
		const { literals, countryData, cardType, idCard } = this.props
		const replacedText = countryData.text2 && literals[`L${countryData.text2}`].replace(/<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/img);
        return (
			<div className="matrix--element clearfix" >
				<div className="matrix--header--elements">
					<img className="flags--wrapper" src={images[countryData.country.code.toLowerCase()]} />
					<h2 className="country title-section main-color">{literals[`L${countryData.country.literalID}`] }</h2>
				</div>
				<div className="matrix--content--elements">
					<h3 className="">
						{cardType == 'institution' && (
							literals[countryData.check1 && 'L20614' || countryData.check2 && 'L20611' || countryData.check3 && 'L20612' || countryData.check4 && 'L20613']
						)}
						{cardType == 'statistics' && (
							literals[countryData.check1 && 'L20714' || countryData.check2 && 'L20715' || countryData.check3 && 'L20716']
						)}
						{cardType == 'challenges' && (
							literals[countryData.check1 && 'L20631' || countryData.check2 && 'L20632' || countryData.check3 && 'L20633']
						)}
					</h3>				
					{cardType == 'institution' && (
						<React.Fragment>
							<p className="institution-name">{literals[`L${countryData.text1 && countryData.text1}`]}</p>
							{countryData.text2 && ReactHtmlParser(literals[`L${countryData.text2}`])}
							<div className="partial-text" >
								{this.state.selectedId == idCard ? (
									countryData.text3 && ReactHtmlParser(literals[`L${countryData.text3}`])
								) : (
									null
								)}
								{this.state.selectedId != idCard ? (
									countryData.text3 && ReactHtmlParser(this.truncateText(literals[`L${countryData.text3}`], 300))
								) : null}
							</div>
						</React.Fragment>
					)}

					{(cardType == 'statistics' || cardType == 'challenges') && (
						<React.Fragment>
							{ReactHtmlParser(literals[`L${countryData.text1}`])}
							{this.state.selectedId == idCard ? (
								ReactHtmlParser(literals[`L${countryData.text2}`])
							) : (
								null
							)}
							{this.state.selectedId != idCard ? (
								countryData.text2 && ReactHtmlParser(this.truncateText(literals[`L${countryData.text2}`], 350))
							) : (
								null
							)}
						</React.Fragment>
					)}
					
					{(countryData.text3 && literals[`L${countryData.text3}`].length > 300 || countryData.text2 && replacedText.length > 350) && (
						<p className="see--more--wrapper" onClick={this.onToggleShowMore(idCard)}>
							{this.state.toggleShowMore ? <a className='see-less main-color'> {this.props.literals.L481} </a> : null }
							{!this.state.toggleShowMore ? <a className='see-more main-color'> {this.props.literals.L480} </a> : null }
						</p>
					)}

					{cardType == 'institution' && (
						<p><a onClick={this.onPDFClick(countryData.country.name)} className="btn--card main-color" target="_blank">{ReactHtmlParser(this.props.literals.L20563)}</a></p>
					)}
				</div>

				{cardType == 'challenges' && (
					<div>
						<p>
							<Link className="btn--card main-color" 
								to={{pathname: `/osh-steering/country-profile/basic-information/${this.props.countryData.country.code}`}} >{this.props.literals.L20626}</Link>
						</p>
					</div>
				)}
				
			</div>
		)
    }
}

export default Cards;