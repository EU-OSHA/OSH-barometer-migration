import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getIndicatorCountries } from '../../api';
import images from '../../style/img/flag/images';
import AdviceSection from '../common/AdviceSection';

class CountryReportHome extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			isFetching: false,
			countries: [],
			alphabet: [],
			countriesFiltered: [],
			alphabetFiltered: []
		}
	}

	onPDFClick = (country) => {
		return () => {
			const url = `country-report/country-report_${country}.pdf`;
			window.open(url, "_blank")
		}
	}

	onAddLetter = (letter) => {
		return () => {
			const country = this.state.alphabetFiltered.find((country) => country == letter)
			if (!country) {
				this.setState({ alphabetFiltered: [...this.state.alphabetFiltered, letter] })
			} else {
				const index = this.state.alphabetFiltered.findIndex((country) => country == letter);
				const newArray = [...this.state.alphabetFiltered];
				newArray.splice(index, 1);
				this.setState({ alphabetFiltered: newArray });
			}
		}
	}

	createLetterNavigation = () => {
		let letter = '';
		let index = '';
		let temporalArray = [];

		for (let i = 0; i < this.state.countries.length; i++) {
			if (this.state.countries[i] != null) {
				letter = this.state.countries[i].name.charAt(0);
				index = temporalArray.indexOf(letter);

				if (index == -1) {
					temporalArray.push(letter)
				}
			}
		}
		temporalArray.sort();
		this.setState({ alphabet: temporalArray })
	}

	resetFilter = () => {
		this.setState({ alphabetFiltered: [], countriesFiltered: this.state.countries })
	}

	filterCountries = () => {
		if (this.state.alphabetFiltered.length == 0) {
			const sortedCountries = [...this.state.countries].sort((a, b) => a.name < b.name ? -1 : 1);
			this.setState({ countriesFiltered: sortedCountries });
		} else {
			const countriesFiltered = [...this.state.countries]
				.sort((a, b) => a.name < b.name ? -1 : 1)
				.filter((country) => this.state.alphabetFiltered.find((letter) => letter == country.name.charAt(0)))
				.map((filteredCountries) => {
					return filteredCountries
				})
				this.setState({ countriesFiltered })
		}
	}

	componentDidMount() {
		// Update the title of the page
		document.title = this.props.literals.L22019 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		try {
			this.setState({ ...this.state, isFetching: true })
			getIndicatorCountries()
				.then((res) => {
					this.setState({ countries: res.resultset });
					this.filterCountries();
					this.createLetterNavigation();
				})
		} catch (error) {
			console.log('Error fetching data: ', error)
		} finally {
			this.setState({ ...this.state, isFetching: false })
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.alphabetFiltered != this.state.alphabetFiltered) {
			this.filterCountries();
		}
	}

	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["about-tool","country-report"]} />

				<section className="filter--letter--section container">
					<ul className="filter--letter--list">
						{/*  FILTER BY LETTER  */}
						{this.state.alphabet.map((letter) => (
							<li className="filter-letter-item" key={letter}>
								<a onClick={this.onAddLetter(letter)} className={this.state.alphabetFiltered.indexOf(letter) == -1 ? '' : 'active'} > {letter} </a>
							</li>
						))}
						<li className="reset-item">
							<a onClick={this.resetFilter} className="btn-default btn-main-color btn-reset">{this.props.literals.L20628}</a>
						</li>
					</ul>
				</section>
				<div className="line background-main-light"></div>
				<section className="national--card--section">
					<div className="card--grid xxs-w1 xs-w3 md-w3 w4 container">
							{this.state.countriesFiltered.map((country) => (
								<div className="card--block--rounded national--card--item" key={country.code} >
									<div className="resources-item">
										<p className="nopadding additional-img text-center" >
											<img className="flags--wrapper" src={images[country.code.toLowerCase()]} />
										</p>
										<h2 className="text-center" >{this.props.literals[`L${country.literalID}`]}</h2>
									</div>
									<p className="btn--block-full left-text download" >
										<a onClick={this.onPDFClick(country.name)} className="btn-default btn-main-color btn-full" >{this.props.literals.L22188}</a>
									</p>
								</div>
							))}
					</div>
				</section>
			</div>
		)
	}
}

CountryReportHome.displayName = 'CountryReportHome';
export default CountryReportHome;