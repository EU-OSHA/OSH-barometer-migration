import React, { Component, useState,useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser'
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import EmploymentRate from '../common/charts/EmploymentRate'
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import Chart from '../common/charts/Chart'
import ChartHuman from '../common/charts/ChartHuman';
import IncomerPercapital from '../common/charts/IncomePerCapita'

const EconomicSectorProfile = (props) => {

	//console.log('props', props);
	
	const [pais1,setPais1]=useState(props.country1);
	const [pais2,stePais2]=useState("");
	const [chart,setChart]=useState('20014');
	const [indicator,setIndicator]=useState('36');
	const [chart2,setChart2]=useState('20013');
	const [indicator2,setIndicator2]=useState('35');
	


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

	const handleSearch = (pais1) => {
		setPais1(pais1);
	}

	const handleSearch2 = (pais2)=>{
		stePais2(pais2)
	}

		return(
			<div className="economic--sector--profile">

				<AdviceSection literals={props.literals} section={["generic-information","economic-sector-profile"]} />

				<div className="compare--block container">
					{/* FILTERS */}
					<form className="compare--block--form">
						<ul className="compare--list">
							<SelectEconomic 
								handleSearch={handleSearch} 
								handleSearch2={handleSearch2} 
								charts={['20089', '20010', '20011', '20013', '20087', '20014' , '20088']}
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
									tick={20}
									percentage={true}
									type='bar'
									pais1={pais1}
									pais2={pais2}
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
									pais1={pais1}
									pais2={pais2}
									chart={'20010'}
									indicator={'32'}
									stacking='percent'
									reversed={false}
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
									pais1={pais1}
									pais2={pais2}
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
								{/* ngIf: chart == 'GDP' */}
								<select  className="ng-pristine ng-untouched " onChange={selectEuro2}>
									<option value="35">Purchasing Power Standards (PPS)</option>
									<option value="278">Euro (€)</option>
								</select>

								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper">
								{/* <ul className="chart--submenu"></ul> */}
								{/* <h2 className="title--card  ">GDP per capita in relation to EU27_2020 average</h2> */}

								<div className="chart--wrapper">
								<ChartHuman
									title='GDP per capita in ralation to EU27_2020 average'
									colors={['#ffae00','#529FA2','#003399']}
									showDataLabel={true}
									//tick={20}
									percentage='ft'
									type='column'
									pais1={pais1}
									pais2={pais2}
									chart={chart2}
									indicator={indicator2}									
									/>
									<div className="legend-text-block"></div>
								</div>
								</div>
							</div>
						</div>

						{/* INCOME PER CAPITA */}
						<div className="card--block--chart">
							<div className="select-filter-chart-wrapper">
								<div className="select-filter-chart"  >

								<select className="ng-pristine ng-untouched " onChange={selectEuro}>
									<option value="36">Purchasing Power Standards (PPS)</option>
									<option value="279">Euro (€)</option>
								</select>

								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper" >

								<ul className="chart--submenu " >
									{/* <li><a className="maximize-button" title="Maximize" role="button"><label className="sr-only " >Maximize</label></a></li>
									<li className="dropdown-toggle" ><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" >
										<li><a  className="">Export as image</a></li>
										<li><a className="">Download raw data</a></li>
									</ul> */}
								</ul>

								{/* <h2 className="title--card  ">Income per capita</h2> */}
								<div className="chart--wrapper">
								<IncomerPercapital
									title='Income per capita'
									colors={['#f6a400','#003399','#449fa2','#fcf230','#6ab8ba','#fcd986','#4ab265']}
									showDataLabel={true}
									tick={5000}
									percentage='€'
									type='line'
									pais1={pais1}
									pais2={pais2}
									chart={chart}
									indicator={indicator}
									/>


									<div className="legend-text-block">
									
									</div>
								</div>
								</div>
								{/* DATASETS 17 - 36 y 3 - 279 */}
							</div>
						</div>
						{/* END CONTENT */}
					</div>
				</section>
				
				<Methodology />
				
				<Related literals={props.literals} section={["generic-information","economic-sector-profile"]} />

			</div>
			
		)
	
}
EconomicSectorProfile.displayName = 'EconomicSectorProfile';
export default EconomicSectorProfile;