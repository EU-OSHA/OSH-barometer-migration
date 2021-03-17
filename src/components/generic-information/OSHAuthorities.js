import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Methodology from '../common/Methodology';
import Cards from '../cards/Cards';
import Pagination from '../pagination/Pagination';
import AdviceSection from '../common/AdviceSection';

const literals = require('../../model/Literals.json');
class OSHAuthorities extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			countries: [],
			matrixPageData: [],
			pageOfItems: [],
			institutionTypes: [
				{id: '1', literal: '20614'},
				{id: '2', literal: '20611'},
				{id: '3', literal: '20612'},
				{id: '4', literal: '20613'}
			],
			countryDropdownRef: React.createRef(),
			institutionDropdownRef: React.createRef(),
			isCountryDropdown: false,
			isInstitutionDropdown: false,
			searchBarText: '',
			isFetching: false,
			filters: {
					countries: [],
					checks: [
						{id: '1', boolean: false},
						{id: '2', boolean: false},
						{id: '3', boolean: false},
						{id: '4', boolean: false},
					],
					searchBar: ''
			},
		}
	}

	// Handle dropdown when clicked outside of their container
	onHandleDropdown = e => {
		if (this.state.countryDropdownRef.current && !this.state.countryDropdownRef.current.contains(e.target)) {
			this.setState({ isCountryDropdown: false });
		}

		if(this.state.institutionDropdownRef.current && !this.state.institutionDropdownRef.current.contains(e.target)) {
			this.setState({ isInstitutionDropdown: false });
		}
	}

	// Dropdown for country selector
	onClickCountryDropdown = () => {
		this.setState({ isCountryDropdown: !this.state.isCountryDropdown });
	}

	// Dropdown for institution selector
	onClickInstitutionDropdown = () => {
			this.setState({ isInstitutionDropdown: !this.state.isInstitutionDropdown });
	}

	//when country is selected
	onSelectedCountry = (country) => {
		return () => {
			const countryState = this.state.filters.countries;
			if (country != this.state.filters.countries.find((code) => code == country )) {
				this.setState({filters: {...this.state.filters, countries: [...countryState, country]}});
			} else {
				const index = this.state.filters.countries.findIndex((code) => code == country);
				const newArray = this.state.filters.countries;
				newArray.splice(index, 1);
				this.setState({filters: {...this.state.filters, countries: newArray}});
			}
		}
	}

	//whe institution is selected
	onSelectedInstitution = (institutionId) => {
		return () => {
			const institutionIndex = this.state.filters.checks.findIndex((institution) => institution.id == institutionId);
			const newArray = this.state.filters.checks[institutionIndex];
			newArray.boolean = !newArray.boolean;
			if (institutionIndex >= 0) {
				this.setState({ filters: {...this.state.filters, checks: [...this.state.filters.checks]} })
			}
		}
	}

	// Handles change of page when clicked on the next or prev
	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems });
	}

	//handles change event of search bar
	onHandleChange = (e) => {
		this.setState({ searchBarText: e.target.value });
	}

	// handles on click on search bar either on icon or by enter keydown
	onSearchClick = (e, text) => {
		if (e.keyCode == 13) {
			e.preventDefault();
			this.setState({ filters: { ...this.state.filters, searchBar: text } });
		}

		if (e.type == 'click') {
			this.setState({ filters: { ...this.state.filters, searchBar: text } });
		}
	}

	// 	TODO: possible change to API folder with fetch code - here goes the function call only / Calls for matrix Data
	getMatrixPageData(filters = null) {
		const urlWithParams = new URL('http://89.0.4.28:8080/barometer-data-server/api/qualitative/getMatrixPageData?page=MATRIX_AUTHORITY');

		if (filters != null) {
			// Checks for Countries array to add to the query params
			if (filters.countries) {
				filters.countries.map((country) => urlWithParams.searchParams.append('country', country));
			}

			// Checks if any of the check filters are true and adds them to the query params
			if (filters.checks != null) {
				if (filters.checks.map((array) => {
					if (array.boolean) {
						urlWithParams.searchParams.append(`check${array.id}`, array.boolean);
					}
				})) {
				}
			}

			if (filters.searchBar != null) {
				urlWithParams.searchParams.append('search', filters.searchBar);
			}
		}

		return urlWithParams.href
	}

	 componentDidMount() {
		//  TODO: possible change to API folder with fetch code - here goes the function call only / Calls for countries
		this.setState({ ...this.state, isFetching: true });
		fetch(`http://89.0.4.28:8080/barometer-data-server/api/countries/getCountriesMatrixPage?page=MATRIX_AUTHORITY&country=UK`)
			.then(response => response.json())
			.then(result => {
				this.setState({ countries: result.resultset, isFetching: false });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ ...this.state, isFetching: false });
			})

			// TODO: Move to api base folder when it gets created - first LoadPage
		this.setState({ ...this.state, isFetching: true });
		fetch(this.getMatrixPageData())
			.then(response => response.json())
			.then(result => {
				this.setState({ matrixPageData: result.resultset, isFetching: false });
			})
			.catch((err) => {
				console.log(err)
				this.setState({ ...this.state, isFetching: false })
			});

			// Listen for and mousedown event on body page to close any of the dropdowns
			document.addEventListener('mousedown', this.onHandleDropdown);
	 }
	 componentDidUpdate(prevProps, prevState) {
		 // If any modification happens to the filter state, it updates with the new values
		if (prevState.filters != this.state.filters) {
			fetch(this.getMatrixPageData(this.state.filters))
				.then((response) => response.json())
				.then((result) => {
					this.setState({ matrixPageData: result.resultset, isFetching: false })
				})
				.catch((err) => {
					console.log(err)
					this.setState({ ...this.state, isFetching: false})
				})
		}
	 }

	render() {
		return(
			<div>
				{/* <section id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12">
							<h1 className="main-color left-text">{this.props.literals.L22002}</h1>
							<p className="">{this.props.literals.L22025}</p>
							<span className="">{this.props.literals.L20704}</span>&nbsp;
							<span><Link ui-sref="about-tool-detail-page({pSection: 'generic-information', pSubsection: 'osh_authorities', pIndicator: '27'})" className="" to="/about-the-system/methodology">{this.props.literals.L20705}</Link></span>
						</div>
						<div className="icon--advice forum-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section> */}
				<AdviceSection />

				<section className="container">
				{/* FILTERS */}{/* SEARCH FILTER */}
				<form className="row block--filter--wrapper ">
					{/* COUNTRY FILTER */}
					<div id="filter2" className={`filter--dropdown--wrapper ${this.state.isCountryDropdown ? 'viewOptions' : null}`} tabIndex="9">
						<div className="filter--dropdown--list" ref={this.state.countryDropdownRef}>
							<p className="option-title " onClick={this.onClickCountryDropdown}  >{this.props.literals.L20630}</p>
							<ul className="filter--dropdown--options ">
							{this.state.countries.map((country) => (
								<li key={country.code} onClick={this.onSelectedCountry(country.code)} >
									<input type="checkbox" checked={this.state.filters.countries.includes(country.code)} readOnly />
									<label >{country.name == 'EU28' ? '' : `(${country.code})`} {country.name}</label>
								</li>
							))}
							</ul>
						</div>
					</div>
					{/* INSTITUTION TYPE FILTER */}
					<div id="filter1" className={`filter--dropdown--wrapper ${this.state.isInstitutionDropdown ? 'viewOptions' : null}`} tabIndex="8">
						<div className="filter--dropdown--list" ref={this.state.institutionDropdownRef}>
							<p className="option-title" onClick={this.onClickInstitutionDropdown} >Institution type</p>
							<ul className="filter--dropdown--options">
								{this.state.institutionTypes.map((institution) => (
									<li key={institution.id} onClick={this.onSelectedInstitution(institution.id)}>
										<input type="checkbox" checked={this.state.filters.checks.find((array) => array.id == institution.id).boolean} readOnly tabIndex="-1" />
										<label className="" >{this.props.literals[`L${institution.literal}`]}</label>
									</li>)
								)}
							</ul>
						</div>
					</div>
					{/* SEARCH FILTER */}
					<div className="filter-text">
						<input onKeyDown={(e) => this.onSearchClick(e, this.state.searchBarText)} onChange={this.onHandleChange} id="search-input" type="text" tabIndex="7" className="" placeholder={this.props.literals.L378} />
						<button onClick={(e) => this.onSearchClick(e, this.state.searchBarText)} id="policy-search" type="button">
							<i className="fa fa-search" aria-hidden="true"></i>
						</button>
					</div>
				</form>
				<div className="container">
					<div className="selected--tags-wrapper">
						{this.state.filters && (
							<div>
								{this.state.filters.countries.map((country) => <span key={country} className="selected-tag" onClick={this.onSelectedCountry(country)}>{country}</span>)}
								{this.state.filters.checks.map((array) => {
									if (array.boolean) {
										const institutionIndex = this.state.institutionTypes.findIndex((institution) => array.id == institution.id);
										if (institutionIndex >= 0) {
											return <span key={`id-${institutionIndex}`} className="selected-tag" onClick={this.onSelectedInstitution(array.id)}>{this.props.literals[`L${this.state.institutionTypes[institutionIndex].literal}`]}</span>
										}
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