import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import EmploymentRate from '../common/charts/EmploymentRate';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import Chart from '../common/charts/Chart'
import ChartHuman from '../common/charts/ChartHuman';
import IncomerPercapital from '../common/charts/IncomePerCapita';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry1, setCountry2 } from '../../actions/';

const EconomicSectorProfile = (props) => {
	// Get global state for the selects
	const { selectCountry, selectCountry2, selectedByUser, lockedCountry } = useSelector((state) => state.selectCountries);
	const [countryLocked, setCountryLocked] = useState(lockedCountry);
	const [chart,setChart]=useState('20014');
	const [indicator,setIndicator]=useState('36');
	const [chart2,setChart2]=useState('20013');
	const [indicator2,setIndicator2]=useState('35');
	const history = useHistory();

	// Hook for the dispatchs
	const dispatch = useDispatch();

	useEffect(() => {
		// Update the title of the page
		document.title = props.literals.L22003 +  " - " + props.literals.L22020 + " - " + props.literals.L363;

		if (selectedByUser) {
			return null
		} else {
			if (props.country1 != undefined && props.country1 != '') {
				dispatch(setCountry1(props.country1))
			}
		}

		if (props.country2 != undefined && props.country2 != '') {
			dispatch(setCountry2(props.country2))
		}
		
	},[])
	
	useEffect(() => {
		if (selectedByUser) {
			updateURL(countryLocked, selectCountry2);
		} else {
			updateURL(selectCountry, selectCountry2)
		}
	}, [selectCountry, selectCountry2, countryLocked, selectedByUser])

	const updateURL = (country1, country2) => {
		const url = '/generic-information/economic-sector-profile';
		let newUrl

		if (country1) {
			newUrl = `${url}/${country1}`
		}

		if (country2) {
			newUrl = `${url}/${country1}/${country2}` 
		}

		history.push({
			pathname: newUrl
		})
	}

	const selectEuro2 = (e) =>{
		const indicator = e.target.value
		if(indicator == "278"){
			const Chart =  "20087"
		setIndicator2("278");
		setChart2("20087");
		} else
		{
			const Chart = "20013"
			const indicator= "35"
			setChart2(Chart);
			setIndicator2(indicator);
		}  
   }
	

	const selectEuro = (e) =>{
		 const indicator = e.target.value
		if(indicator == "279"){
		 const Chart =  "20088"
		setIndicator("279");
		setChart("20088");
		} else
		{
			const Chart = "20014"
			const indicator= "36"
			setChart(Chart);
			setIndicator(indicator);
		}
	}

	const handleSearch = (selectCountry1) => {
		if (selectedByUser) {
			setCountryLocked(selectCountry1)
		} else {
			dispatch(setCountry1(selectCountry1))
		}
	}

	const handleSearch2 = (selectCountry2)=>{
		dispatch(setCountry2(selectCountry2))
	}

		return(
			<div className="economic--sector--profile">

				<AdviceSection literals={props.literals} section={["generic-information","economic-sector-profile"]} methodologyData={{section: 'generic-information', subsection: 'Economic and sector profile', indicator: 31}}/>

				<div className="compare--block container">
					{/* FILTERS */}
					<form className="compare--block--form">
						<ul className="compare--list">
							<SelectEconomic 
								handleSearch={handleSearch} 
								handleSearch2={handleSearch2} 
								charts={['20089', '20010', '20011', '20013', '20087', '20014' , '20088']}
								literals={props.literals}
								selectedCountry1={selectedByUser ? countryLocked : selectCountry}
								selectedCountry2={selectCountry2}	
							/>
						</ul>
					</form>
					
				</div>
				<div className="line background-main-light"></div>
				<section className="container section--page">
					<div className="card--grid xxs-w1 xs-w2 w3 center-text">
						{/* CONTENT */}{/* COMPANY SIZE */}
					
						<div className="card--block--chart">
							<div className="chart--block">
								<div className="card--block--chart--wrapper" >

								<ul className="chart--submenu " >
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
									</ul>
								</ul>
								{/* <h2  className="title--card ">Company size</h2> */}
								<div className="chart--wrapper">
								<Chart
									title='Company Size'
									colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e']}
									showDataLabel={true}
									tick={40}
									percentage={true}
									type='bar'
									selectCountry1={selectedByUser ? countryLocked : selectCountry}
									selectCountry2={selectCountry2}
									chart={'20089'}
									indicator={'31'}
									/>
								</div>
								</div>
							</div>
						</div>
						{/* EMPLOYMENT PER SECTOR */}
						<div className="card--block--chart">
							<div className="chart--block">
						
								<div className="card--block--chart--wrapper" width="300" height="400">
								{/* <ul className="chart--submenu "></ul> */}
								{/* <h2 className="title--card  ">Employment per sector</h2> */}
								<div className="chart--wrapper">
								<Chart
									title='Employment per sector'
									colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e']}
									showDataLabel={false}
									tick={20}
									percentage={true}
									type='bar'
									selectCountry1={selectedByUser ? countryLocked : selectCountry}
									selectCountry2={selectCountry2}
									chart={'20010'}
									indicator={'32'}
									stacking='percent'
									reversed={false}
									//reversedStacks={true}
									/>
								</div>
								</div>
							</div>
						</div>
						{/* EMPLOYMENT RATE */}
						<div className="card--block--chart">
							<div className="chart--block">
								<div className="card--block--chart--wrapper" >
								{/* <ul className="chart--submenu"></ul> */}
								{/* <h2 className="title--card  ">Employment Rate</h2> */}
								<div className="chart--wrapper">
								<EmploymentRate
									title='Employment Rate'
									colors={['#f6a400','#529FA2']}
									showDataLabel={true}
									tick={10}
									percentage={true}
									type='bar'
									selectCountry1={selectedByUser ? countryLocked : selectCountry}
									selectCountry2={selectCountry2}
									chart={'20011'}
									indicator={'33'}
									/>
								</div>
								</div>
							</div>
						</div>
						{/* GDP PER CAPITA IN RELATION TO EU27_2020 AVERAGE */}
						<div className="card--block--chart">
							<div className="select-filter-chart-wrapper">
								<div className="select-filter-chart">
									<select  className="ng-pristine ng-untouched " onChange={selectEuro2}>
										<option value="35">{props.literals.L20743}</option>
										<option value="278">{props.literals.L20742}</option>
									</select>
								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper">
									<div className="chart--wrapper">
										<ChartHuman
											title={props.literals.L22195}
											colors={['#ffae00','#529FA2','#003399']}
											showDataLabel={true}
											percentage='ft'
											type='column'
											selectCountry1={selectedByUser ? countryLocked : selectCountry}
											selectCountry2={selectCountry2}
											chart={chart2}
											indicator={indicator2}									
										/>
										<div className="legend-text-block" />
									</div>
								</div>
							</div>
						</div>

						{/* INCOME PER CAPITA */}
						<div className="card--block--chart">
							<div className="select-filter-chart-wrapper">
								<div className="select-filter-chart" >
									<select className="ng-pristine ng-untouched " onChange={selectEuro}>
										<option value="36">{props.literals.L20743}</option>
										<option value="279">{props.literals.L20742}</option>
									</select>
								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper" >
									<div className="chart--wrapper">
										<IncomerPercapital
											title={props.literals.L293}
											colors={['#f6a400','#529FA2','#003399']}
											showDataLabel={true}
											tick={5000}
											percentage='€'
											type='line'
											selectCountry1={selectedByUser ? countryLocked : selectCountry}
											selectCountry2={selectCountry2}
											chart={chart}
											indicator={indicator}
										/>
										<div className="legend-text-block" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				
				<Methodology literals={props.literals} section={'Economic and sector profile'} />
				
				<Related literals={props.literals} section={["generic-information","economic-sector-profile"]} />

			</div>
			
		)
	
}

EconomicSectorProfile.displayName = 'EconomicSectorProfile';
export default EconomicSectorProfile;