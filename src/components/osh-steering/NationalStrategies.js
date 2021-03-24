import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import images from '../../style/img/flag/images';
import AdviceSection from '../common/AdviceSection';
const API_ADDRESS = process.env.BASE_URL;

class NationalStrategies extends Component
{
	constructor(props){
		super(props);
		this.state = { countries: [], countriesFiltered: [], alphabetFiltered: [], alphabet: []};
	}

	createLetterNavigation = () => {
		var letter = "";
		var index = "";
		var temporalArray = [];
		for(var i=0;i<this.state.countries.length;i++){
			if(this.state.countries[i] != null){
				letter = this.state.countries[i].name.charAt(0);
				index = temporalArray.indexOf(letter);

				if(index === -1){
					temporalArray.push(letter);
				}
			}
		}
		temporalArray.sort();
		this.setState({alphabet: temporalArray});
	}

	componentDidMount(){
        fetch(`${API_ADDRESS}countries/getCountriesStrategiesPage?page=STRATEGY`)
            .then(response => response.json())
            .then(json => {
				this.setState({countries: json.resultset});
				this.filterCountries();
				this.createLetterNavigation();
            })
            .catch(error => console.log(error.message));
	}

	resetFilter = () => {
		this.setState({alphabetFiltered: [], countriesFiltered: this.state.countries});
	}

	addLetter = (letter) => () => {
		var temporalArray = this.state.alphabetFiltered;
		if (temporalArray.indexOf(letter) == -1)
        {
			temporalArray.push(letter); 
        }
        else
        {
			temporalArray.splice(temporalArray.indexOf(letter), 1);
        }
		
		this.setState({alphabetFiltered: temporalArray});
		this.filterCountries();
	}

	filterCountries = () => {
		if(this.state.alphabetFiltered.length === 0){
			this.setState({countriesFiltered: this.state.countries});
			console.log('No countries filtered. Showing all countries');
		}else{
			var temporalArray = [];
			this.state.countries.filter(country => this.state.alphabetFiltered.indexOf(country.name.charAt(0)) != -1).map(filteredCountry => {
				temporalArray.push(filteredCountry);
			});
			this.setState({countriesFiltered: temporalArray});
		}
	}

	filterAlphabet = (letter) => {
		if (this.state.alphabetFiltered.indexOf(letter) == -1)
        {
			return "";
		}else{
			return "active";
		}
	}

	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-steering","national-strategies"]} />

				<section className="filter--letter--section container">
					<ul className="filter--letter--list">
						{/* FILTER BY LETTER */}
						{
							this.state.alphabet.map((letter, index) => (
								<li className="filter-letter-item" key={index}>
									<a onClick={this.addLetter(letter)} className={this.filterAlphabet(letter)}>{letter}</a>
								</li>
							))
						}

						<li className="reset-item">
							<Link onClick={this.resetFilter} className="btn-default btn-main-color btn-reset">{this.props.literals.L20628}</Link>
						</li>
					</ul>
				</section>

				<div className="line background-main-light"></div>
				<section className="national--card--section">
					<div className="card--grid xxs-w1 xs-w3 md-w3 w4 container">
						{
							this.state.countriesFiltered.map((country,index) => (
								<div className="card--block--rounded national--card--item" key={index}>
									<div className="resources-item">
										<p className="nopadding additional-img text-center">
											<img className="flags--wrapper" src={`${images[country.code.toLowerCase()]}`} alt={country.name} />
										</p>
										<h2 className="text-center">{country.name}</h2>
										<p className="btn--block-full left-text">
											<Link to={"/osh-steering/country-profile/basic-information/"+country.code} className="btn-default btn-main-color btn-full" title={this.props.literals.L20626}>{this.props.literals.L20626}</Link>
											{/* <Link to="country-profile({pIndicator: 'basic-information', pCountry1:country.country_code, pCountry2: 0})" className="btn-default btn-main-color btn-full" title={this.props.literals.L20626}>{this.props.literals.L20626}</Link> */}
										</p>
										<p className="btn--block-full left-text">
											<Link to={"/osh-steering/eu-challenges-response/"+country.code} className="btn-default btn-main-color btn-full" title={this.props.literals.L20625} >{this.props.literals.L20625}</Link>
											{/* <Link to="EU-challenges-response({pCountry:country.country_code})" className="btn-default btn-main-color btn-full" title={this.props.literals.L20625} >{this.props.literals.L20625}</Link> */}
										</p>
									</div>
								</div>
							))
						}
					</div>
				</section>

			</div>
		)
	}
}
NationalStrategies.displayName = 'NationalStrategies';
export default NationalStrategies;