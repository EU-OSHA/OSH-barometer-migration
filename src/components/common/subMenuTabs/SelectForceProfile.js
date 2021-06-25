import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router';
// import { Link, Route} from 'react-router-dom';


const SelectForceProfile = ({
		callbackSelect, 
		indicator, 
		locationPath, 
		selectedSurvey, 
		literals, 
		selectCountries,
		onCallbackCountry,
		filters }) => {
    const [selectedTab, setSelectedTab] = useState(indicator);
    const [disabled, setDisabled]= useState("disabled");
    const [select, setSelect]=useState("Median age of population");
    const [visible, setVisible]= useState(true);
    const [unselect, setUnselect]= useState(true);
    const [alert, setAlert] = useState("Not applied to Median Age");
	const [subIndicator, setSubIndicator]= useState('ageing-workers');
	const [openSelectCountries, setOpenSelectCountries] = useState(false);
	const countryDropdownRef = useRef();
		

    const history = useHistory();
    useEffect(() => {
        loadUrl();
    }, [selectedTab,subIndicator,indicator, selectedSurvey]);

	const loadUrl = ()=>{
		history.push({
			pathname: `${locationPath}${selectedTab}/${subIndicator}`
		})
	}

	useEffect(() => {
		addEventListener('mousedown', onHandleDropdown)

		return () => {
			removeEventListener('mousedown', onHandleDropdown);
		}
	}, [])

	const onClickCountry = (countryCode) => {
		return () => {
			onCallbackCountry(countryCode)
		}
	}

	const openSelect = () => {
		setOpenSelectCountries(!openSelectCountries)
	}

	const onHandleDropdown = (e) => {
		if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
			setOpenSelectCountries(false)
		}
	}

    /** TODO: Delete if not being in use */
	const refresh = ()=>{
		setVisible(!visible)
		setUnselect(!unselect)
	}

	const selection = (e)=>{
		const option = e.target.value;
		setSelect(option)
		callbackSelect(option);
		switch(option){
			case "employment-rate" :
				setDisabled("")
				setSelectedTab('employment-rate')
				break;
				case "ageing-workers" :
                setDisabled("")
				break;
			case "median-age":
				setDisabled("disabled")
				setSelectedTab('median-age')
				setAlert("Not applied to Media Age")
				setSubIndicator('ageing-workers')
			break;
			case "unemployment-rate":
				setDisabled("disabled")
				setSelectedTab('unemployment-rate')
				setAlert("Not applied to Unemployment rate")
				setSelect( 'Unemployment rate')
				setSubIndicator('ageing-workers')
				break
			case "Female":
				setSelect('Total, male and female employment rate - Female')
				setSubIndicator('female')
				break
			case "Male":
                setSelect('Total, male and female employment rate - Male')
				setSubIndicator('male')
				break
			case "Total":
                setSelect('Total, male and female employment rate - Total')
				setSubIndicator('total')
				break
		}
	}


    return (
        <div className="" >
			<ul className="indicators--group xs-row">
				<li id="filter1">
					<label htmlFor="indicatorSelect">{literals.L20623}</label> 
					<select onChange={selection} id="indicatorSelect" className="filter--dropdown--list">
						<option value="median-age">{literals.L294}</option>
						<option value="employment-rate">{literals.L20621}</option>
						<option value="unemployment-rate">{literals.L291}</option>
					</select>
				</li>
				<li id="filter2" className="disabled">
					<label htmlFor="employeeGroupSelect">{literals.L20622}</label> 
					{disabled ? (
						<select onChange={selection} id="employeeGroupSelect" className="filter--dropdown--list" disabled={disabled}>
							<option value="ageing-workers">{literals.L295}</option>
							{/* <option value="Female">{this.props.literals.L444}</option>
							<option value="Male">{this.props.literals.L443}</option>
							<option value="Total">{this.props.literals.L442}</option> */}
						</select>
					) : (
						<select onChange={selection} id="employeeGroupSelect" className="filter--dropdown--list" disabled={disabled}>
							<option value="ageing-workers">{literals.L295}</option>
							<option value="Female">{literals.L444}</option>
							<option value="Male">{literals.L443}</option>
							<option value="Total">{literals.L442}</option>
						</select>
					)}
					{disabled ? <label className="alert-disabled "> {alert} </label> : true}
				</li>
				{/* COUNTRY FILTER JUST IN < 1024 PX */}
				<li id="filter3" className={`filter--dropdown--wrapper ${openSelectCountries ? 'viewOptions' : ''} `}>
					<div className="filter--dropdown--list" ref={countryDropdownRef}>
						<p className="option-title" onClick={openSelect}>{literals.L20630}</p>
						<ul className="filter--dropdown--options">
							{selectCountries.map((country) => (
								<li key={country.countryCode} onClick={onClickCountry({code: country.countryCode, name: country.countryName, data: country.data})}>
									<input type="checkbox" checked={filters.countries.find((countryFilters) => countryFilters.code == country.countryCode) ? true : false} readOnly />
									<label>{country.countryCode == 'EU27_2020' ? '' : `(${country.countryCode})`} {country.countryName}</label>
								</li>
							)
						)}
						</ul>
					</div>
				</li>
			</ul>
		</div>
    )
}

export default SelectForceProfile;