import React, { Component } from 'react';

import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';

import { getOSHCountries, getOSHData } from '../../api/index';
import SelectFilters from '../common/select-filters/SelectFilters';
import Cards from '../common/cards/Cards';
import Pagination from '../common/pagination/Pagination';

const literals = require('../../model/Literals.json');

class EUChallengesResponse extends Component
{
	constructor(props) {
		super(props);

		this.state = {
			countries: [],
			pageData: [],
			pageOfItems: [],
			isFetching: false,
			filters: {
				countries: [],
				checks: [],
				searchBar: ''
			},
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
			this.setState({ filters: {...this.state.filters, countries: newCountryFilters} });
		}
	}
	
	handleCallbackCategory = (categoryCallback) => {
		const checkFilter = this.state.filters.checks.find((data) => data.id == categoryCallback.id);
		const checks = this.state.filters.checks;
		if (!checkFilter) {
			this.setState({ filters: {...this.state.filters, checks: [...checks, { ...categoryCallback, check: true }]}});
		} else {
			const index = this.state.filters.checks.findIndex((data) => data.id == categoryCallback.id);
			const newArray = this.state.filters.checks;
			newArray.splice(index, 1);
			this.setState({ filters: { ...this.state.filters, checks: newArray } });
		}
	}

	// Handles callback for the search bar on filters component
	handleCallbackSearch = (searchCallback) => {
		this.setState({ filters: { ...this.state.filters, searchBar: searchCallback } })
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

	//whe category is selected
	onSelectInstitutionTag = (institutionId) => {
		return () => {
			const institutionIndex = this.state.filters.checks.findIndex((institution) => institution.id == institutionId);
			const newArray = this.state.filters.checks;
			newArray.splice(institutionIndex, 1);
			this.setState({ filters: { ...this.state.filters, checks: newArray } })
		}
	}

	// Handles change of page when clicked on the next or prev
	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems });
	}

	componentDidMount() {
		// Update the title of the page
		document.title = this.props.literals.L22007 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		this.setState({ ...this.state, isFetching: true });
		try {
			getOSHCountries('MATRIX_STRATEGY', ['UK'])
			.then((res) => {
				if (res) {
					this.setState({ countries: res.resultset })
					const selectedCountry = this.state.countries.find((country) => country.code == this.props.match.params.country);
					this.setState({ filters: {...this.state.filters, countries: [selectedCountry]} })
				}
			})
			getOSHData('MATRIX_STRATEGY', this.state.filters)
				.then((res) => {
					this.setState({ pageData: res.resultset })
			});
		} catch(error) {
			console.log('Error getting data: ', error)
		} finally {
			this.setState({ ...this.state, isFetching: false })
		}
		
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.filters != this.state.filters) {
			this.setState({ ...this.state, isFetching: true});
			try {
				getOSHData('MATRIX_STRATEGY', this.state.filters)
					.then((res) => {
						this.setState({ pageData: res.resultset })
					})
			} catch (error) {
				console.log('Error fetching data', error)
			} finally {
				this.setState({ ...this.state, isFetching: false })
			}
		}
	}
	
	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-steering","eu-challenges-response"]} />

				<section className="container">

				<SelectFilters 
						selectCountries={this.state.countries} 
						literals={literals} 
						onClickCountry={this.handleCallbackCountry}
						onClickInstitution={this.handleCallbackCategory}
						onSearchbarClick={this.handleCallbackSearch}
						selectedFilters={this.state.filters}
						filterCategory={'challenges'}
				/>

				<div className="selected--tags-wrapper">
					{this.state.filters && (
						<div>
							{this.state.filters.countries.map((country) => (
								<span key={country.code} className="selected-tag" onClick={this.onSelectCountryTag(country.code)}>{country.code == 'EU28' ? '' : `(${country.code})`} {country.name}</span>
							))}
							{this.state.filters.checks.map((category) => {
								if (category.check) {
									return <span key={category.id} className="selected-tag" onClick={this.onSelectInstitutionTag(category.id)} >{this.props.literals[`L${category.literal}`]}</span>
								}
							})}
						</div>
					)}
				</div>

				<div className="container">
					{/** Cards Component */}
					<div className="matrix--elements--wrapper">
						{this.state.pageOfItems.length > 0 ? (
							this.state.pageOfItems.map((data, index) => {
								const position = this.state.pageData.findIndex((pageData) => pageData == data);
								const id = `${index}-${data.country.code}-${position}`
								return <Cards 
											key={id} 
											idCard={id}
											countryData={data} 
											literals={literals} 
											cardType={'challenges'} 
										/>
							})
						) : (<span>{this.props.literals.L20706}</span>)}
					</div>

					{/* PAGINATION */}
					<Pagination items={this.state.pageData} onChangePage={this.onChangePage} />
				</div>

				</section>

				<Methodology />
			</div>
		)
	}
}
EUChallengesResponse.displayName = 'EUChallengesResponse';
export default EUChallengesResponse;