import React, { Component } from 'react';

class IndividualCountrySelect extends Component {
    constructor(props){
        super(props);
        this.state = {
            countryDropdownRef: React.createRef(),
            isCountryDropdown: false
        }
    }

    componentDidMount() {
        // Open a listener for and mousedown event on body page to close any of the dropdowns
		document.addEventListener('mousedown', this.onHandleDropdown);
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

    // sends country code to parent component
    onClickCountry = (countryCode) => {
        return () => {
            this.props.onClickCountry(countryCode);
        }
    }

    render(){
        return (
            <div id="filter1" className={`filter--dropdown--wrapper ${this.state.isCountryDropdown ? 'viewOptions' : null}`} tabIndex="-1">
                <div className="filter--dropdown--list" ref={this.state.countryDropdownRef}>
                    <p className="option-title " onClick={this.onClickCountryDropdown}>{this.props.literals.L20630}</p>
                    <ul className="filter--dropdown--options ">
                        {this.props.selectCountries.map((country) => (
                            <li key={country.code} onClick={this.onClickCountry(country.code)} >
                                <input type="checkbox" checked={this.props.selectedFilters.countries.includes(country.code)} readOnly />
                                <label >{country.name == 'EU28' ? '' : `(${country.code})`} {country.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default IndividualCountrySelect;