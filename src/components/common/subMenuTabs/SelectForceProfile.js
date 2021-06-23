import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link, Route} from 'react-router-dom';


const SelectForceProfile = ({callbackSelect, indicator, subMenuTabs, selectCountry1, selectCountry2,locationPath, selectedSurvey, literals, props}) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(indicator);
    const [indicatorTabs, setIndicatorTabs] = useState(subMenuTabs);
    const [country1,setCountry1]= useState(selectCountry1);
    const [country2, setCountry2]= useState(selectCountry2);
    const [disabled, setDisabled]= useState("disabled");
    const [select,setSelect]=useState("Median age of population");
    const [visible, setVisible]= useState(true);
    const [unselect,setUnselect]= useState(true);
    const [alert, setAlert]= useState("Not applied to Median Age");
	const [subIndicator,setSubIndicator]= useState('ageing-workers')
		

    const history = useHistory();
    useEffect(() => {
        //setSelectedTab(props.indicator)
        loadUrl();
    }, [selectedTab,subIndicator,indicator, selectedSurvey]);



const loadUrl = ()=>{
		history.push({
            pathname: `${locationPath}${selectedTab}/${subIndicator}`
        	})
}


    useEffect(() => {
        if (window.innerWidth > 990) {
            setIsSubMenuOpen(false);
        }
    }, [window.innerWidth])

    const onClickIndicator = (e, indicator) => {
		e.preventDefault();

        const newIndicator = literals[`L${indicator}`].toLowerCase().replace(/ /g, '-');
        setSelectedTab(newIndicator);
        callbackSelectedTab(newIndicator);
        
        if (newIndicator != selectedTab) {
            if (selectedSurvey) {
                history.push({
                    pathname: `${locationPath}${newIndicator}/${selectedSurvey}`
                });
            } else {
                history.push({
                    pathname: `${locationPath}`
                });
            }
        }
	}

    // const literalClass = (literal) => {
    //     const translateLiteral = props.literals[`L${literal}`].toLowerCase().replace(/ /g, '-');
    //     if (selectedTab == translateLiteral) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // const onClickSubMenu = (e) => {
	// 	e.preventDefault();
    //     if (window.innerWidth <= 990) {
    //         setIsSubMenuOpen(!isSubMenuOpen);
    //     }
	// }

    
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
							<select onChange={selection} id="indicatorSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-model="selectedIndicator" data-ng-change="selectChange()">
								<option value="median-age">{literals.L294}</option>
								<option value="employment-rate">{literals.L20621}</option>
								<option value="unemployment-rate">{literals.L291}</option>
							</select>
						</li>
						<li id="filter2" data-ng-className="{'disabled':selectedIndicator == 'median-age' || selectedIndicator == 'unemployment-rate'}" className="disabled">
							<label htmlFor="employeeGroupSelect" data-ng-bind="i18nLiterals.L20622">{literals.L20622}</label> 
							
							{disabled ? <select onChange={selection} id="employeeGroupSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-disabled="selectedIndicator == 'median-age' || selectedIndicator== 'unemployment-rate'" data-ng-model="selectedSubIndicator" data-ng-change="selectChange()" disabled={disabled}>
								<option data-ng-bind="i18nLiterals.L295" value="ageing-workers">{literals.L295}</option>
								{/* <option value="Female">{this.props.literals.L444}</option>
								<option value="Male">{this.props.literals.L443}</option>
								<option value="Total">{this.props.literals.L442}</option> */}
							</select>
							
							 : <select onChange={selection} id="employeeGroupSelect" className="filter--dropdown--list ng-pristine ng-untouched ng-valid" data-ng-disabled="selectedIndicator == 'median-age' || selectedIndicator== 'unemployment-rate'" data-ng-model="selectedSubIndicator" data-ng-change="selectChange()" disabled={disabled}>
								<option data-ng-bind="i18nLiterals.L295" value="ageing-workers">{literals.L295}</option>
								<option value="Female">{literals.L444}</option>
								<option value="Male">{literals.L443}</option>
								<option value="Total">{literals.L442}</option>
							</select>}
							{disabled ?<label data-ng-if="selectedIndicator == 'median-age'" className="alert-disabled ">{alert}</label>: true}
						</li>
						{/* COUNTRY FILTER JUST IN < 1024 PX */}
						<li id="filter3" className="filter--dropdown--wrapper">
							<label htmlFor="countrySelect">{literals.L20630}:</label>
							{/*<label className="main-color  dropdwon-open" onClick="openSelect($event)"></label>*/}
							<div className="filter--dropdown--list">
								<p className="option-title" ng-click="openSelect($event)">{literals.L20630}</p>
								<ul className="filter--dropdown--options">
								<li data-ng-repeat="country in countries" className="">
									<input id="country-filter-822" defaultChecked="!!country.param &amp;&amp; country.param ==country.country_code" ng-click="toggleCountryClick($event, $index)" type="checkbox" value="{&quot;country_code&quot;:&quot;EU27_2020&quot;,&quot;country_name&quot;:822}" /> 
									<label data-ng-if="country.country_code == 'EU27_2020'" htmlFor="country-filter-822" data-ng-bind="i18nLiterals['L'+country.country_name]">EU27_2020</label>
								</li>
								</ul>
							</div>
						</li>
					</ul>
		</div>
    )
}

export default SelectForceProfile;