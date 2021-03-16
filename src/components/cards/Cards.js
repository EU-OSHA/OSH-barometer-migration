import React, { Component } from 'react';

import ReactHtmlParser from 'react-html-parser';

import images from '../../style/img/flag/images';

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
		if (str.length > limitNumber) {
			return `${str.substring(0, 300).split(" ").slice(0, -1).join(" ")} <span class="dots" >...</span>`
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
				<div className="matrix--content--elements">
					<h3 className="" >
					{this.props.literals[
					(countryData.check1 && 'L20614' 
					    || countryData.check2 && 'L20611' 
						|| countryData.check3 && 'L20612' 
						|| countryData.check && 'L20613'
						)]}
                    </h3>
					<p className="institution-name">{`${this.props.literals[`L${countryData.text1}`]}`}</p>
					{ReactHtmlParser(this.props.literals[`L${countryData.text2}`])}
					<div className={this.state.toggleShowMore ? 'complete-text' : 'partial-text'}>
					    {this.state.selectedId == countryID ? ReactHtmlParser(this.props.literals[`L${countryData.text3}`]) : ReactHtmlParser(this.truncateText(this.props.literals[`L${countryData.text3}`], 300))}				
					</div>
					{this.props.literals[`L${countryData.text3}`].length > 300 && (                            
					<p className="see--more--wrapper" onClick={this.onToggleShowMore(countryID)} >
						<a className={this.state.toggleShowMore ? 'see-less main-color' : 'see-more main-color' }>{ this.state.toggleShowMore  ? this.props.literals.L481 : this.props.literals.L480 }</a>
					</p>
					)}
						<div className="">
							<p><a onClick={this.onPDFClick(countryData.country.name)} className="btn--card main-color"><strong>Download the country data</strong></a></p>
					</div>
				</div>
			</div>
		);
    }
}

export default Cards;