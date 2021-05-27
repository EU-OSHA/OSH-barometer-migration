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
import { connect } from 'react-redux';
import { setDefaultCountry2 } from '../../actions/';

const EconomicSectorProfile = (props) => {

	// Update the title of the page
	document.title = props.literals.L22003 +  " - " + props.literals.L22020 + " - " + props.literals.L363;

	const history = useHistory();

	const [selectCountry1, setSelectCountry1] = useState(props.defaultCountry.code);
	const [selectCountry2, setSelectCountry2] = useState(props.defaultCountry2.code);
	const [chart,setChart]=useState('20014');
	const [indicator,setIndicator]=useState('36');
	const [chart2,setChart2]=useState('20013');
	const [indicator2,setIndicator2]=useState('35');

	useEffect(() => {
		console.log('In use effect', props);
		if (props.country1)
		{
			setSelectCountry1(props.country1);
		}
		else if (props.defaultCountry.code != '0')
		{
			setSelectCountry1(props.defaultCountry.code);
		}
	
		if (props.country2)
		{
			setSelectCountry2(props.country2);
		}
		else
		{
			setSelectCountry2(props.defaultCountry2.code);
		}
	}, [props.defaultCountry.code])

	const updateURL = (country1, country2) =>
	{
		let url = '/generic-information/economic-sector-profile';
		if (country1)
		{
			url = `${url}/${country1}`;
		}
		if (country2 && country2 != '0')
		{
			url = `${url}/${country2}`;
		}
		history.push({
			pathname: url
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
		setSelectCountry1(selectCountry1);
		updateURL(selectCountry1, selectCountry2);
	}

	const handleSearch2 = (selectCountry2)=>{
		setSelectCountry2(selectCountry2);
		props.setDefaultCountry2({
			code: selectCountry2,
			isCookie : false
		});
		updateURL(selectCountry1, selectCountry2);
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
								selectedCountry1={selectCountry1}
								selectedCountry2={selectCountry2}	
								/>
						</ul>
					</form>
					
				</div>
				<div class="line background-main-light"></div>
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
									selectCountry1={selectCountry1}
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
									selectCountry1={selectCountry1}
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
									tick={20}
									percentage={true}
									type='bar'
									selectCountry1={selectCountry1}
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
											selectCountry1={selectCountry1}
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
											colors={['#ffae00','#003399','#529FA2','#fcf230','#6ab8ba','#fcd986','#4ab265']}
											showDataLabel={true}
											tick={5000}
											percentage='€'
											type='line'
											selectCountry1={selectCountry1}
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

function mapStateToProps(state){
    const { defaultCountry } = state;
	const { defaultCountry2 } = state;
    return { defaultCountry: defaultCountry, defaultCountry2: defaultCountry2 };
}

EconomicSectorProfile.displayName = 'EconomicSectorProfile';
// export default EconomicSectorProfile;
export default connect(mapStateToProps, { setDefaultCountry2 } )(EconomicSectorProfile);