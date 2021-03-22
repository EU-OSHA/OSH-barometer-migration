import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';

import Cards from '../common/cards/Cards';
import Pagination from '../common/pagination/Pagination';
import SelectFilters from '../common/select-filters/SelectFilters';
import { getOSHCountries, getOSHData } from '../../api';


const literals = require('../../model/Literals.json');
class OSHAuthorities extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			countries: [],
			matrixPageData: [],
			pageOfItems: [],
			searchBarText: '',
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
		if (countryCallback != this.state.filters.countries.find((code) => code == countryCallback)) {
			this.setState({ filters: {...this.state.filters, countries: [...countryFilter, countryCallback]}});
		} else {
			const index = this.state.filters.countries.findIndex((code) => code == countryCallback);
			const newCountryFilters = this.state.filters.countries;
			newCountryFilters.splice(index, 1);
			this.setState({filters: {...this.state.filters, countries: newCountryFilters}});
		}
	}

	handleCallbackInstitution = (institutionCallback) => {
		const checkFilter = this.state.filters.checks.find((data) => data.id == institutionCallback.id);
		const checks = this.state.filters.checks;
		if (!checkFilter) {
			this.setState({ filters: {...this.state.filters, checks: [...checks, { ...institutionCallback, check: true }]}});
		} else {
			const index = this.state.filters.checks.findIndex((data) => data.id == institutionCallback.id);
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
	onSelectCountryTag = (country) => {
		return () => {
			const countryIndex = this.state.filters.countries.findIndex((code) => code == country);
			const newArray = this.state.filters.countries;
			newArray.splice(countryIndex, 1);
			this.setState({filters: {...this.state.filters, countries: newArray}});
		}
	}

	//whe institution is selected
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
		//  TODO: possible change to API folder with fetch code - here goes the function call only / Calls for countries
		this.setState({ ...this.state, isFetching: true });
		try {
			getOSHCountries('MATRIX_AUTHORITY', ['UK'])
				.then((res) => {
					this.setState({ countries: res.resultset });
				})
			getOSHData('MATRIX_AUTHORITY')
				.then((res) => {
					this.setState({ matrixPageData: res.resultset })
				})
		} catch (error) {
			console.log('Error fetching selector countries:', error)
		} finally {
			this.setState({ ...this.state, isFetching: false })
		}

	 }
	 componentDidUpdate(prevProps, prevState) {
		 // If any modification happens to the filter state, it updates with the new values
		if (prevState.filters != this.state.filters) {
			this.setState({ ...this.state, isFetching: true })
			try {
				getOSHData('MATRIX_AUTHORITY', this.state.filters)
					.then((res) => {
						this.setState({ matrixPageData: res.resultset })
					})
			} catch (error) {
				console.log('Error fetching data', error)
			} finally {
				this.setState({ ...this.state, isFetching: false })
			}
		}
	 }

	render() {
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["generic-information","osh-authorities"]} />

				{/* FILTERS COMPONENT */}
				<section className="container">
				
				<SelectFilters 
					selectCountries={this.state.countries} 
					literals={literals} 
					onClickCountry={this.handleCallbackCountry}
					onClickInstitution={this.handleCallbackInstitution}
					onSearchbarClick={this.handleCallbackSearch}
					selectedFilters={this.state.filters}
					filterCategory={'institution'}
				/>

				<div className="container">
					<div className="selected--tags-wrapper">
						{this.state.filters && (
							<div>
								{this.state.filters.countries.map((country) => <span key={country} className="selected-tag" onClick={this.onSelectCountryTag(country)}>{country}</span>)}
								{this.state.filters.checks.map((array) => {
									if (array.check) {
										return <span key={array.id} className="selected-tag" onClick={this.onSelectInstitutionTag(array.id)} > {this.props.literals[`L${array.literal}`]} </span>
									}
								} )}
							</div>
						)}
					</div>
					
					{/** Cards Component */}
					<div className="matrix--elements--wrapper">
						{this.state.pageOfItems.length > 0 ? (
							this.state.pageOfItems.map((data, index) => {
								const id = `${index}-${data.country.code}`
								return <Cards key={id} countryData={data} literals={literals} />
							})
						) : (<span>{this.props.literals.L20706}</span>)}
					</div>

					{/* PAGINATION */}
					<Pagination items={this.state.matrixPageData} onChangePage={this.onChangePage} />
					
					
				</div>
				<div className="modal fade" id="modalChart" tabIndex="-1" role="dialog" aria-labelledby="modalChart" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
							<p className="modal-title text-center"></p>
							</div>
							<div className="modal-body text-center"><img src="/img/img-not-available.png" alt="Image not available" /></div>
						</div>
					</div>
				</div>
				</section>

				<Methodology />
			</div>
		)
	}
}

export default OSHAuthorities;