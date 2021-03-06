import React, { Component } from 'react';

import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Cards from '../common/cards/Cards';
import Pagination from '../common/pagination/Pagination';
import SelectFilters from '../common/select-filters/SelectFilters';
import { getOSHCountries, getOSHData } from '../../api';
import { connect } from 'react-redux';

// Countries Exceptions
import { oshAuthoritiesExceptions } from '../../model/countriesExceptions';

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
			defaultTags: false,
			filters: {
					countries: [],
					checks: [],
					searchBar: ''
			},
		}
	}

	handleCallbackCountry = (countryCallback) => {
		const countryFilter = this.state.filters.countries;
		const countryCode = this.state.filters.countries.find((country) => country?.code == countryCallback.code)
		if (countryCallback.code != countryCode?.code) {
			this.setState({ filters: {...this.state.filters, countries: [...countryFilter, countryCallback]} })
		} else {
			const index = this.state.filters.countries.findIndex((country) => country?.code == countryCallback.code);
			const newCountryFilters = this.state.filters.countries;
			newCountryFilters.splice(index, 1);
			this.setState({ filters: {...this.state.filters, countries: newCountryFilters} });
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
	onSelectCountryTag = (countryCode) => {
		return () => {
			const countryIndex = this.state.filters.countries.findIndex((country) => country.code == countryCode);
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
		// Update the title for the page
		document.title = this.props.literals.L22002 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		this.setState({ ...this.state, isFetching: true });
		try {
			getOSHCountries('MATRIX_AUTHORITY', ['UK'])
				.then((res) => {
					this.setState({ countries: res.resultset });
				})
			if (!this.props.lockedCountry) {
				getOSHData('MATRIX_AUTHORITY')
				.then((res) => {
					this.setState({ matrixPageData: res.resultset })
				})
			} else {
				const exceptions = oshAuthoritiesExceptions.find((element) => this.props.lockedCountry == element.code);
				if (!exceptions) {
					getOSHData('MATRIX_AUTHORITY', {countries: [this.props.lockedCountry]})
						.then((res) => {
							this.setState({ matrixPageData: res.resultset })
						});
				}
			}
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

		if(!this.state.defaultTags && this.state.countries.length != 0 && this.props.lockedCountry != ''){
			const exceptions = oshAuthoritiesExceptions.find((element) => this.props.lockedCountry == element.code);
			if (!exceptions) {
				const countryDefault = this.state.countries.find((country) => country.code == this.props.lockedCountry);
				this.setState({
					defaultTags: true,
					filters: {...this.state.filters, countries: [countryDefault]}
				});
			} else {
				const countryDefault = this.state.countries.find((country) => country.code == 'AT');
				this.setState({
					defaultTags: true,
					filters: {...this.state.filters, countries: [countryDefault]}
				});
			}		
		}	
	 }

	render() {
		return(
			<div className="osh-authority">
				<AdviceSection literals={this.props.literals} section={["generic-information","osh-authorities"]} methodologyData={{section: 'generic-information', subsection: 'OSH authorities', indicator: 27}}/>

				{/* FILTERS COMPONENT */}
				<section className="container">
				
				<SelectFilters 
					selectCountries={this.state.countries} 
					literals={this.props.literals} 
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
								{this.state.filters.countries.map((country) => (
									country && (<span key={country.code} className="selected-tag" onClick={this.onSelectCountryTag(country.code)}>{country.code == 'EU28' ? '' : `(${country.code})`} {country.name}</span>)
								))}
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
								const position = this.state.matrixPageData.findIndex((matrixData) => matrixData == data);
								const id = `${index}-${data.country.code}-${position}`

								return <Cards key={id} idCard={id} countryData={data} literals={this.props.literals} cardType={'institution'}/>
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
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">??</span></button>
							<p className="modal-title text-center"></p>
							</div>
							<div className="modal-body text-center"><img src="/img/img-not-available.png" alt="Image not available" /></div>
						</div>
					</div>
				</div>
				</section>

				<Methodology literals={this.props.literals} section={'OSH authorities'} />
			</div>
		)
	}
}
OSHAuthorities.displayName = 'OSHAuthorities';

function mapStateToProps(state){
	const { lockedCountry, selectedByUser } = state.selectCountries;
    return { lockedCountry, selectedByUser };
}

// export default OSHAuthorities;
export default connect(mapStateToProps)(OSHAuthorities);