import React, { Component, useState,useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser'

import Methodology from '../common/Methodology';
import EmploymentPerSector from './EmploymentPerSector'
import SelectEconomic from '../common/models/SelectEconomic';
import Chart from '../common/models/Chart'
import EmploymentRate from './EmploymentRate';

const EconomicSectorProfile = (props) => {

	const [pais1,setPais1]=useState(props.country1);
	const [pais2,stePais2]=useState("");

	const handleSearch = (pais1) => {
		setPais1(pais1);
	}

	const handleSearch2 = (pais2)=>{
		stePais2(pais2)
	}

		return(
			<div>
				<section id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page ng-scope">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12 nopadding">
							<h1 className="main-color left-text ng-binding">{ReactHtmlParser(props.literals.L22003)}</h1>
							<p className="ng-binding">
							{ReactHtmlParser(props.literals.L22028)}
							</p><span className="ng-binding">c  {ReactHtmlParser(props.literals.L20704)}</span> <span><a className="ng-binding" href="#!/about-the-system/methodology">{ReactHtmlParser(props.literals.L20705)}</a></span>
						</div>
						<div className="icon--advice economic-chart-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

				<div className="compare--block container">
					{/* FILTERS */}
					<form className="compare--block--form">
						<ul className="compare--list">
							<SelectEconomic  handleSearch={handleSearch} handleSearch2={handleSearch2}/>
						</ul>
					</form>
					
				</div>
				<section className="container section--page">
					<div className="card--grid xxs-w1 xs-w2 w3 center-text">
						{/* CONTENT */}{/* COMPANY SIZE */}
					
						<div className="card--block--chart">
							<div className="chart--block">
								<div className="card--block--chart--wrapper ng-isolate-scope" >

								<ul className="chart--submenu " >
									{/* <li><a className="maximize-button" title="Maximize"><label className="sr-only " >Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" ><a href=""><label className="sr-only">Download</label></a></li> */}
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										{/* <li><a className="">Export as image</a></li>
										<li><a className="">Download raw data</a></li> */}
									</ul>
								</ul>

								{/* <h2  className="title--card ">Company size</h2> */}

								<div className="chart--wrapper">
								<Chart
									title='Economic Sector'
									colors={['orange','aqua','grey','green','grey']}
									showDataLabel={true}
									tick={20}
									percentage={true}
									type='bar'
									pais1={pais1}
									pais2={pais2}
									chart={'20089'}
									indicator={'31'}
									/>
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>
						{/* EMPLOYMENT PER SECTOR */}
						<div className="card--block--chart">
							<div className="chart--block">
						
								<div className="card--block--chart--wrapper ng-isolate-scope" width="300" height="400">

								<ul className="chart--submenu ">
									{/* <li><a className="maximize-button" title="Maximize"><label className="sr-only " >Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" ><a href=""><label className="sr-only">Download</label></a></li>
									 <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a className="">Export as image</a></li>
										<li><a className="">Download raw data</a></li>
									</ul>  */}
								</ul>

								{/* <h2 className="title--card  ">Employment per sector</h2> */}

								<div className="chart--wrapper">
									<EmploymentPerSector
									 title='Employment Per Sector'
									type='bar'
							   		colors={['orange','blue','yellow','green','grey']}
									showDataLabel={true}
							   		tick={20}
							   		percentage={true}
							   		pais1={pais1}
									   pais2={pais2}
								  		 />
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>
						{/* EMPLOYMENT RATE */}
						<div className="card--block--chart">
							<div className="chart--block">
								<div className="card--block--chart--wrapper ng-isolate-scope" >

								<ul className="chart--submenu" >
									{/* <li><a className="maximize-button" ><label className="sr-only ">Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" ><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a className="">Export as image</a></li>
										<li><a className="">Download raw data</a></li>
									</ul> */}
								</ul>

								{/* <h2 className="title--card  ">Employment Rate</h2> */}

								<div className="chart--wrapper">

								<EmploymentRate
								title='Employment Rate '
							   colors={['orange','red','yellow','green','grey']}
							   showDataLabel={true}
							   tick={20}
							   percentage={true}
							   type='bar'
							   pais1={pais1}
							   pais2={pais2
							}
								   />
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>
						{/* GDP PER CAPITA IN RELATION TO EU27_2020 AVERAGE */}
						<div className="card--block--chart">
							<div className="select-filter-chart-wrapper">
								<div className="select-filter-chart ng-isolate-scope ng-valid">
								{/* ngIf: chart == 'GDP' */}
								<select  className="ng-pristine ng-untouched ng-valid ">
									<option value="35">Purchasing Power Standards (PPS)</option>
									<option value="278">Euro (€)</option>
								</select>

								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper ng-isolate-scope">

								<ul className="chart--submenu " ng-if="!isMaximized">
									<li><a className="maximize-button" title="Maximize" ><label className="sr-only " >Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" ><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a className=""></a></li>
										<li><a className="">Download raw data</a></li>
									</ul>
								</ul>

								<h2 className="title--card  ">GDP per capita in relation to EU27_2020 average</h2>

								<div className="chart--wrapper">
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>

						{/* INCOME PER CAPITA */}
						<div className="card--block--chart">
							<div className="select-filter-chart-wrapper">
								<div className="select-filter-chart ng-isolate-scope ng-valid"  >

								<select className="ng-pristine ng-untouched ng-valid ">
									<option value="36">Purchasing Power Standards (PPS)</option>
									<option value="279">Euro (€)</option>
								</select>

								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper ng-isolate-scope" >

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
								<Chart
									 title='Income Per Capita'
							   		colors={['blue','red','yellow','green','grey']}
									showDataLabel={true}
							   		tick={20}
							   		percentage={true}
							   		type='line'
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

				<section className="container-full section--page section--related--content ng-isolate-scope" items="relatedItems">
					<div className="container related--content--wrapper">
						<h2 className="title-related-content ng-binding" >{ReactHtmlParser(props.literals.L20712)}</h2>
						<div className="related-content-items">
							{/*  ngRepeat: item in items */}
							<div className="related-content-item ng-scope">
								<div className="icon-related-item hide-mobile people-group-icon" ></div>
								<div className="content-related-item">
								<h3 className="title-related-item ng-binding" >Workforce profile</h3>
								<p className="text-related-item ng-binding" >This indicator includes a few key data on ageing workers and the workforce:<span className="dots">...</span></p>
								<p className="button-related-item btn--block-full left-text"><a className="btn-default btn-main-color" href="#!/generic-information/workforce-profile/median-age/ageing-workers">See more</a></p>
								</div>
							</div>
							{/* end ngRepeat: item in items */}
							<div className="related-content-item ng-scope">
								<div className="icon-related-item hide-mobile prevention-icon" ></div>
								<div className="content-related-item">
								<h3 className="title-related-item ng-binding" >Prevention in companies</h3>
								<p className="text-related-item ng-binding" >This indicator visualises data on how OSH is implemented on company/enterprise<span className="dots">...</span></p>
								<p className="button-related-item btn--block-full left-text"><a className="btn-default btn-main-color" href="#!/osh-outcomes-working-conditions/prevention-companies/risk-assessment/sector">See more</a></p>
								</div>
							</div>
							{/*  end ngRepeat: item in items */}
						</div>
					</div>
				</section>

			</div>
			
		)
	}


export default EconomicSectorProfile;