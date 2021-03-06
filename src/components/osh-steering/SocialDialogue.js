import React, { Component } from 'react';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import EUCountryCard from '../common/cards/EUCountryCard';
import CountryCards from '../common/cards/CountryCards';
import Pagination from '../common/pagination/Pagination';
import { getSocialDialogueCountries, getSocialDialogueData } from '../../api';
import IndividualCountrySelect from '../common/select-filters/IndividualCountrySelect';

class SocialDialogue extends Component
{
	constructor(props){
		super(props);
		this.state = {
			euData: {},
			countriesData: [],
			countryList: [],
			pageOfItems: [],
			pageSize: 15,
			filters: {
				countries: []
			}
		}
	}

	/* sortArray(countriesData){
		var sortedArray = []

		countriesData.resultset.filter(country => country.countryCode != "EU27_2020").map(filteredCountry => {
			sortedArray.push(filteredCountry);
		})
		
		sortedArray.sort(function (a, b) {
			if (a.countryCode < b.countryCode) return -1;
			else if (a.countryCode > b.countryCode) return 1;
			return 0;
		});

		this.setState({
			countriesData: sortedArray
		})
	} */

	componentDidMount(){
		// Update the title of the page
		document.title = this.props.literals.L22008 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		// Open a listener for and mousedown event on body page to close any of the dropdowns
		document.addEventListener('mousedown', this.onHandleDropdown);
		getSocialDialogueCountries()
			.then((res) => {
				this.setState({countryList: res.resultset});
			});
		getSocialDialogueData(this.state.filters)
			.then((res) => {
				res.resultset.filter(country => country.countryCode === 'EU27_2020').map(filteredCountry => {
					this.setState({euData: filteredCountry});
				})
				
				// Set the array with the countries as the array without EU27_2020
				this.setState({
					countriesData: res.resultset.filter(country => country.countryCode != 'EU27_2020')
				})
			});
	}

	componentDidUpdate(prevProps, prevState) {
		// If any modification happens to the filter state, it updates with the new values
		if (prevState.filters != this.state.filters) {
			getSocialDialogueData(this.state.filters)
				.then((res) => {
				
					// Set the array with the countries as the array without EU27_2020
					this.setState({
						countriesData: res.resultset.filter(country => country.countryCode != 'EU27_2020')
					})
				})
		}
	}

	handleCallbackCountry = (countryCallback) => {
		const countryFilter = this.state.filters.countries;
		const countryCode = this.state.filters.countries.find((country) => country.code == countryCallback.code)
        if (countryCallback.code != countryCode?.code) {
            this.setState({ filters: {...this.state.filters, countries: [...countryFilter, countryCallback]} })
		} else {
			const index = this.state.filters.countries.findIndex((country) => country.code == countryCallback.code);
			const newCountryFilters = this.state.filters.countries;
			newCountryFilters.splice(index, 1);
			this.setState({filters: {...this.state.filters, countries: newCountryFilters}});
		}
	}

	//when country is selected
	onSelectCountryTag = (countryCode) => {
		return () => {
			const countryIndex = this.state.filters.countries.findIndex((country) => country.code == countryCode);
			const newArray = this.state.filters.countries;
			newArray.splice(countryIndex, 1);
			this.setState({filters: {...this.state.filters, countries: newArray}});
		}
	}

	// Handles change of page when clicked on the next or prev
	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems });
	}

	render()
	{
		return(
			<div className="social-dialogue">
				<AdviceSection literals={this.props.literals} section={["osh-steering","social-dialogue"]} methodologyData={{section: 'osh-steering', subsection: 'Social dialogue', indicator: 354}} />

				<EUCountryCard literals={this.props.literals} euData={this.state.euData} page={'socialDialogue'}/>

				<section className="container ">
					{/*  FILTERS */}
					<form className="row block--filter--wrapper">
						{/*  COUNTRY FILTER */}
						<IndividualCountrySelect literals={this.props.literals} selectCountries={this.state.countryList} 
							onClickCountry={this.handleCallbackCountry} selectedFilters={this.state.filters} />
					</form>

					<div className="container">
						<div className="selected--tags-wrapper">
							{this.state.filters && (
								<div>
									{this.state.filters.countries.map((country) => (
										<span key={country.code} className="selected-tag" onClick={this.onSelectCountryTag(country.code)}>{country.code == 'EU28' ? '' : `(${country.code})`} {country.name}</span>
									))}
								</div>
							)}
						</div>
						<div className="card--grid xxs-w1 xs-w2 w3 center-text">
							{
								this.state.pageOfItems.map((countryData) => (
									<div className="card--block--chart" key={countryData.countryCode}>
										<CountryCards literals={this.props.literals} countryData={countryData} page={'socialDialogue'}/>
									</div>
								))
							}
						</div>

						<Pagination items={this.state.countriesData} onChangePage={this.onChangePage} pageSize={this.state.pageSize}/>
					</div>
				</section>

				<Methodology literals={this.props.literals} section={'Social dialogue'} />
			</div>
		)
	}
}
SocialDialogue.displayName = 'SocialDialogue';
export default SocialDialogue;