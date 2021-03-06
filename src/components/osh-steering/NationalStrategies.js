import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import images from '../../style/img/flag/images';
import AdviceSection from '../common/AdviceSection';
import { getNationalStrategiesCountries } from '../../api';
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
		// Update the title of the page
		document.title = this.props.literals.L22007 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		getNationalStrategiesCountries()
			.then((res) => {
				// this.setState({ countries: res.resultset });
				this.setState({countries: res.resultset.sort((a, b) => a.name < b.name ? -1 : 1)});
				this.filterCountries();
				this.createLetterNavigation();
			})
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
		var temporalArray = [];
		if(this.state.alphabetFiltered.length === 0){
			temporalArray = this.state.countries;

			/*temporalArray.sort(function (a, b) {
				if (a.name < b.name) return -1;
				else if (a.name > b.name) return 1;
				return 0;
			});*/
			
			// this.setState({countriesFiltered: temporalArray});
			// console.log('No countries filtered. Showing all countries');
		}else{
			this.state.countries.filter(country => this.state.alphabetFiltered.indexOf(country.name.charAt(0)) != -1).map(filteredCountry => {
				temporalArray.push(filteredCountry);
			});

			/*temporalArray.sort(function (a, b) {
				if (a.name < b.name) return -1;
				else if (a.name > b.name) return 1;
				return 0;
			});*/

			// this.setState({countriesFiltered: temporalArray});
		}

		this.setState({countriesFiltered: temporalArray});
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
				<AdviceSection literals={this.props.literals} section={["osh-steering","national-strategies"]} methodologyData={{section: 'osh-steering', subsection: 'Structure of each National strategy', indicator: 46}}/>

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
							<button onClick={this.resetFilter} className="btn-default btn-main-color btn-reset">{this.props.literals.L20628}</button>	
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