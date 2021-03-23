import React, { Component } from 'react';
import AdviceSection from '../common/AdviceSection';
import EUCountryCard from '../common/cards/EUCountryCard';
import CountryCards from '../common/cards/CountryCards';
import Pagination from '../common/pagination/Pagination';
import { getSocialDialogueData } from '../../api';

const API_ADDRESS = 'http://89.0.4.28:8080/barometer-data-server/api';

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
			countryDropdownRef: React.createRef(),
			filters: {
				countries: []
			}
		}
	}

	sortArray(countriesData){
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
	}

	componentDidMount(){
		// Open a listener for and mousedown event on body page to close any of the dropdowns
		document.addEventListener('mousedown', this.onHandleDropdown);
        Promise.all([
			fetch(`${API_ADDRESS}/quantitative/getCountryCardData?chart=20090`),
			fetch(`${API_ADDRESS}/countries/getIndicatorCountries?chart=20090`)
		])
		.then(([countriesDataResponse,countryListResponse]) => 
			Promise.all([countriesDataResponse.json(),countryListResponse.json()]))
		.then(([countriesData,countryList]) => {
			countriesData.resultset.filter(country => country.countryCode === 'EU27_2020').map(filteredCountry => {
				this.setState({euData: filteredCountry});
			});

			this.sortArray(countriesData);
			
			this.setState({
				countryList: countryList.resultset
			});
			
			// console.log('this.state', this.state);
		})
		.catch(error => console.log(error.message));
	}

	componentDidUpdate(prevProps, prevState) {
		// If any modification happens to the filter state, it updates with the new values
		if (prevState.filters != this.state.filters) {
			getSocialDialogueData(this.state.filters)
				.then((res) => {
					this.sortArray(res);
				})
		}
	}

	// Handle dropdown when clicked outside of their container
	onHandleDropdown = e => {
		if (this.state.countryDropdownRef.current && !this.state.countryDropdownRef.current.contains(e.target)) {
			this.setState({ isCountryDropdown: false });
		}
	}
	
	// Dropdown for country selector
	onClickCountryDropdown = () => {
		this.setState({ isCountryDropdown: !this.state.isCountryDropdown });
	}

	onClickCountry = (countryCallback) => () => {
		const countryFilter = this.state.filters.countries;
		if (countryCallback != this.state.filters.countries.find((code) => code == countryCallback)) {
			this.setState({ filters: {...this.state.filters, countries: [...countryFilter, countryCallback]}});
		} else {
			const index = this.state.filters.countries.findIndex((code) => code == countryCallback);
			const newCountryFilters = this.state.filters.countries;
			newCountryFilters.splice(index, 1);
			this.setState({filters: {...this.state.filters, countries: newCountryFilters}});
		}
	}

	//when country is selected
	onSelectCountryTag = (country) => {
		return () => {
			const countryIndex = this.state.filters.countries.findIndex((code) => code == country);
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
				<AdviceSection literals={this.props.literals} section={["osh-steering","social-dialogue"]} />

				<EUCountryCard literals={this.props.literals} euData={this.state.euData} page={'socialDialogue'}/>

				<section className="container ">
					{/*  FILTERS */}
					<form className="row block--filter--wrapper">
						{/*  COUNTRY FILTER */}
						<div id="filter1" className={`filter--dropdown--wrapper ${this.state.isCountryDropdown ? 'viewOptions' : null}`} tabIndex="-1">
							<div className="filter--dropdown--list" ref={this.state.countryDropdownRef}>
								<p className="option-title " onClick={this.onClickCountryDropdown}>{this.props.literals.L20630}</p>
								<ul className="filter--dropdown--options ">
									{this.state.countryList.map((country) => (
										<li key={country.code} onClick={this.onClickCountry(country.code)} >
											<input type="checkbox" checked={this.state.filters.countries.includes(country.code)} readOnly />
											<label >{country.name == 'EU28' ? '' : `(${country.code})`} {country.name}</label>
										</li>
									))}
								</ul>
							</div>
						</div>
					</form>

					<div className="container">
						<div className="selected--tags-wrapper">
							{this.state.filters && (
								<div>
									{this.state.filters.countries.map((country) => <span key={country} className="selected-tag" onClick={this.onSelectCountryTag(country)}>{country}</span>)}
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

			</div>
		)
	}
}

export default SocialDialogue;