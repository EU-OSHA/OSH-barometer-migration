import React, { Component } from 'react';

class SelectFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutionTypes: [
				{id: '1', literal: '20614'},
				{id: '2', literal: '20611'},
				{id: '3', literal: '20612'},
				{id: '4', literal: '20613'}
			],
            categoryTypes: [
                {id: '1', literal: '20614'},
                {id: '2', literal: '20715'},
                {id: '3', literal: '20716'}
            ],
            challengesTypes: [
                {id: '1', literal: '20631'},
                {id: '2', literal: '20632'},
                {id: '3', literal: '20633'}
            ],
            countryDropdownRef: React.createRef(),
			institutionDropdownRef: React.createRef(),
            isCountryDropdown: false,
			isInstitutionDropdown: false,
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

    // sends country code to parent component
    onClickCountry = (countryCode) => {
        return () => {
            this.props.onClickCountry(countryCode);
        }
    }

    // send institution id to parent component
    onClickInstitution = (institutionId) => {
        return () => {
            this.props.onClickInstitution(institutionId);
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

    //handles change event of search bar
    onHandleChange = (e) => {
		this.setState({ searchBarText: e.target.value });
	}

    // handles on click on search bar either on icon or by enter keydown
    onSearchClick = (e, text) => {
		if (e.keyCode == 13) {
			e.preventDefault();
            this.props.onSearchbarClick(text);
		}

		if (e.type == 'click') {
            this.props.onSearchbarClick(text);
		}
	}

    componentDidMount() {

        // Open a listener for and mousedown event on body page to close any of the dropdowns
		document.addEventListener('mousedown', this.onHandleDropdown);
    }

    componentWillUnmount() {

        // Clears a listener when component is unmounted
        document.removeEventListener('mousedown', this.onHandleChange);
    }

    render() {
        return (
            <form className="row block--filter--wrapper ">
            {/* FILTERS */}
                {/* COUNTRY FILTER */}
                <div id="filter2" className={`filter--dropdown--wrapper ${this.state.isCountryDropdown ? 'viewOptions' : null}`} tabIndex="9">
                    <div className="filter--dropdown--list" ref={this.state.countryDropdownRef}>
                        <p className="option-title " onClick={this.onClickCountryDropdown}  >{this.props.literals.L20630}</p>
                        <ul className="filter--dropdown--options ">
                            {this.props.selectCountries.map((country) => (
                                <li key={country.code} onClick={this.onClickCountry(country)} >
                                    <input type="checkbox" checked={this.props.selectedFilters.countries.find((countryFilter) => countryFilter.code == country.code) ? true : false} readOnly />
                                    <label >{country.name == 'EU28' ? '' : `(${country.code})`} {country.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* INSTITUTION TYPE FILTER || CATEGORY TYPE FILTER || CHALLENGES TYPE FILTER */}
                <div id="filter1" className={`filter--dropdown--wrapper ${this.state.isInstitutionDropdown ? 'viewOptions' : null}`} tabIndex="8">
                    <div className="filter--dropdown--list" ref={this.state.institutionDropdownRef}>
                        <p className="option-title" onClick={this.onClickInstitutionDropdown} > {this.props.filterCategory == 'institution' && 'Institution Type'} {this.props.filterCategory == 'category' && this.props.literals.L20651} {this.props.filterCategory == 'challenges' && this.props.literals.L20629} </p>
                        <ul className="filter--dropdown--options">
                        
                        {this.props.filterCategory == 'institution' && (
                            this.state.institutionTypes.map((institution) => (
                                <li key={institution.id} onClick={this.onClickInstitution({id: institution.id, literal: institution.literal})} >
                                    <input type="checkbox" checked={this.props.selectedFilters.checks.find((array) => array.id == institution.id) ? true : false}  readOnly tabIndex="-1" />
                                    <label className="" >{this.props.literals[`L${institution.literal}`]}</label>
                                </li>)
                            )
                        )}

                        {this.props.filterCategory == 'category' && (
                            this.state.categoryTypes.map((category) => (
                                <li key={category.id} onClick={this.onClickInstitution({id: category.id, literal: category.literal})} >
                                    <input type="checkbox" checked={this.props.selectedFilters.checks.find((array) => array.id == category.id) ? true : false}  readOnly tabIndex="-1" />
                                    <label className="" >{this.props.literals[`L${category.literal}`]}</label>
                                </li>)
                            )
                        )}

                        {this.props.filterCategory == 'challenges' && (
                            this.state.challengesTypes.map((category) => (
                                <li key={category.id} onClick={this.onClickInstitution({id: category.id, literal: category.literal})} >
                                    <input type="checkbox" checked={this.props.selectedFilters.checks.find((array) => array.id == category.id) ? true : false}  readOnly tabIndex="-1" />
                                    <label className="" >{this.props.literals[`L${category.literal}`]}</label>
                                </li>)
                            )
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
        );
    }
}

export default SelectFilters;