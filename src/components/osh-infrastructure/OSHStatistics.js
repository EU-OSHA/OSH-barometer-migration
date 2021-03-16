import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import Pagination from '../pagination/Pagination';
import { getOSHCountries, getOSHStatistic } from '../../api';
import Cards from '../cards/Cards';

const literals = require('../../model/Literals.json');

class OSHStatistics extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			countries: [],
			matrixPageData: [],
			pageOfItems: [],
			institutionTypes: [
				{id: '', literal: ''},
				{id: '', literal: ''},
				{id: '', literal: ''}
			],
			countryDropdownRef: React.createRef(),
			institutionDropdownRef: React.createRef(),
			searchBarText: '',
			isFetching: false,
			filters: {
				countries: [],
				checks: [
					{id: '1', boolean: false},
					{id: '2', boolean: false},
					{id: '3', boolean: false},
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

	// On selected country
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

	// Dropdown for country selector
	onClickCountryDropdown = () => {
		this.setState({ isCountryDropdown: !this.state.isCountryDropdown });
	}

	// Handles change of page when clicked on the next or prev
	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems });
	}

	componentDidMount() {
		this.setState({ ...this.state, isFetching: true});
		try {
			getOSHCountries(['UK', 'EU28'])
				.then((res) => {
					this.setState({ countries: res.resultset })
				});
			getOSHStatistic()
				.then((res) => {
					console.log('data:', res.resultset);
					this.setState({ matrixPageData: res.resultset })
				});
		} catch(error) {
			console.log('Error getting data: ', error)
		} finally {
			this.setState({ ...this.state, isFetching: false })
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.filters != this.state.filters) {
			console.log(this.state.fil)
		}
	}

	render()
	{
		return(
			<div>
				<AdviceSection />

				<section className="container">
					<form className="row block--filter--wrapper">
						{/*  COUNTRY FILTER */}
						<div id="filter2" className={`filter--dropdown--wrapper ${this.state.isCountryDropdown ? 'viewOptions' : null}`} tabIndex="9">
							<div className="filter--dropdown--list" ref={this.state.countryDropdownRef}>
								<p className="option-title" onClick={this.onClickCountryDropdown} >{this.props.literals.L20630}</p>
								<ul className="filter--dropdown--options">
									{this.state.countries.map((country) => (
										<li key={country.code} onClick={this.onSelectedCountry(country.code)} >
											<input type="checkbox" checked={this.state.filters.countries.includes(country.code)} readOnly />
											<label >{`(${country.code})`} {country.name}</label>
										</li>
									))}
								</ul>
							</div>
						</div> 
						{/*  CATEGORY TYPE FILTER */}
						<div id="filter1" className="filter--dropdown--wrapper" tabIndex="8">
							<div className="filter--dropdown--list">
								<p className="option-title" ng-click="openSelect($event)" >{this.props.literals.L20651}</p>
								<ul className="filter--dropdown--options">
									<li>
										<input id='category-filter-1' type="checkbox" ng-click="toggleCategoryClick($event);openSelect($event)" tabIndex="-1"/>
										<label htmlFor='category-filter-1' >{this.props.literals.L20714}</label>
									</li>
									<li>
										<input id='category-filter-2' type="checkbox" ng-click="toggleCategoryClick($event);openSelect($event)" tabIndex="-1"/>
										<label htmlFor='category-filter-2' >{this.props.literals.L20715}</label>
									</li>
									<li>
										<input id='category-filter-3' type="checkbox" ng-click="toggleCategoryClick($event);openSelect($event)" tabIndex="-1"/>
										<label htmlFor='category-filter-3' >{this.props.literals.L20716}</label>
									</li>
								</ul>
							</div>
						</div>
						{/*  SEARCH FILTER */}
						<div className="filter-text">
							<input ng-keypress="clickEnter($event)" ng-focus="closeSelect($event)" id="search-input" type="text" tabIndex="7" placeholder={this.props.literals.L378} />
							<button onClick="clickEnter($event)"  id="policy-search" type="button">
							<i className="fa fa-search" aria-hidden="true"></i>
							</button>
						</div>
					</form>
					<div className="container">
						{/* CONTENT */}
						<div className="selected--tags-wrapper"></div>
						
						{/** Cards Component */}
					<div className="matrix--elements--wrapper">
						{this.state.pageOfItems.length > 0 ? (
							this.state.pageOfItems.map((data, index) => {
								const id = `${index}-${data.country.code}`
								// console.log(data)
								return <Cards key={id} countryData={data} literals={literals} />
							})
						) : (<span>{this.props.literals.L20706}</span>)}
					</div>
						
						{/* PAGINATION */}
						<Pagination items={this.state.matrixPageData} onChangePage={this.onChangePage} />

					</div>
				</section>

				<Methodology />
			</div>
		)
	}
}

export default OSHStatistics;