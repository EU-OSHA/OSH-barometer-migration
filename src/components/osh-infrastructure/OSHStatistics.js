import React, { Component } from 'react';

import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import Cards from '../common/cards/Cards';
import Pagination from '../common/pagination/Pagination';
import SelectFilters from '../common/select-filters/SelectFilters';
import { getOSHCountries, getOSHData } from '../../api';

import { connect } from 'react-redux';

class OSHStatistics extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			countries: [],
			matrixPageData: [],
			pageOfItems: [],
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
		document.title = this.props.literals.L22018 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		this.setState({ ...this.state, isFetching: true});
		try {
			getOSHCountries('MATRIX_STATISTICS' ,['UK'])
				.then((res) => {
					this.setState({ countries: res.resultset })
				});
			
			if (!this.props.lockedCountry) {
				getOSHData('MATRIX_STATISTICS')
					.then((res) => {
						this.setState({ matrixPageData: res.resultset })
					});
			} else {
				getOSHData('MATRIX_STATISTICS', {countries: [this.props.lockedCountry]})
				.then((res) => {
					this.setState({ matrixPageData: res.resultset })
				});
			}
		} catch(error) {
			console.log('Error getting data: ', error)
		} finally {
			this.setState({ ...this.state, isFetching: false })
		}

	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.filters != this.state.filters) {
			this.setState({ ...this.state, isFetching: true })
			try {
				getOSHData('MATRIX_STATISTICS', this.state.filters)
					.then((res) => {
						this.setState({ matrixPageData: res.resultset })
					})
			} catch (error) {
				console.log('Error Fetching data', error)
			} finally {
				this.setState({ ...this.state, isFetching: false })
			}
		}

		if(!this.state.defaultTags && this.state.countries.length != 0 && this.props.lockedCountry != ""){
			const countryDefault = this.state.countries.find((country) => country.code == this.props.lockedCountry);
			this.setState({
				defaultTags: true,
				filters: {...this.state.filters, countries: [countryDefault]}
			});
		}

		if(prevProps.lockedCountry != this.props.lockedCountry && this.props.selectedByUser){
			let countryDefault = this.state.countries.find((country) => country.code == this.props.lockedCountry);
			if(countryDefault != undefined){
				this.setState({
					filters: {...this.state.filters, countries: [countryDefault]}
				});
			}
		}
	}

	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-infrastructure","osh-statistics"]} methodologyData={{section: 'osh-infrastructure', subsection: 'OSH statistics, surveys and research', indicator: 80}} />

				<section className="container">

					<SelectFilters 
						selectCountries={this.state.countries} 
						literals={this.props.literals} 
						onClickCountry={this.handleCallbackCountry}
						onClickInstitution={this.handleCallbackCategory}
						onSearchbarClick={this.handleCallbackSearch}
						selectedFilters={this.state.filters}
						filterCategory={'category'}
					/>

					<div className="container">
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
						
					{/** Cards Component */}
					<div className="matrix--elements--wrapper">
						{this.state.pageOfItems.length > 0 ? (
							this.state.pageOfItems.map((data, index) => {
								const position = this.state.matrixPageData.findIndex((matrixData) => matrixData == data);
								const id = `${index}-${data.country.code}-${position}`
								return <Cards key={id} idCard={id} countryData={data} literals={this.props.literals} cardType={'statistics'} />
							})
						) : (<span>{this.props.literals.L20706}</span>)}
					</div>
						
					{/* PAGINATION */}
					<Pagination items={this.state.matrixPageData} onChangePage={this.onChangePage} />

					</div>
				</section>

				<Methodology literals={this.props.literals} section={'OSH statistics, surveys and research'} />
			</div>
		)
	}
}
OSHStatistics.displayName = 'OSHStatistics';

function mapStateToProps(state){
	const { lockedCountry, selectedByUser } = state.selectCountries;
    return { lockedCountry, selectedByUser };
}

// export default OSHStatistics;
export default connect(mapStateToProps, null )(OSHStatistics);