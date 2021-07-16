import React, { useState, useEffect } from 'react';
import Methodology from '../common/Methodology';
import Related from '../common/Related';
import AdviceSection from '../common/AdviceSection';
import RiskChart from '../common/charts/RiskChart';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';
import MentalRiskCharts from '../common/charts/MentalRiskCharts';
import { overallOpinion } from '../../model/subMenuTabs';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry1, setCountry2, setLockedCountry } from '../../actions/';
import ReactHtmlParser from 'react-html-parser';

const OverallOpinion = (props) => {
	let selected = '';
	for (let i = 0; i < overallOpinion.length; i++)
	{
		if (overallOpinion[i].url == props.indicator)
		{
			selected = overallOpinion[i];
		}
	}

	// state from redux
	const { selectCountry, selectCountry2, selectedByUser, lockedCountry } = useSelector((state) => state.selectCountries);

	const [selectCountry1, setSelectCountry1] = useState(selectedByUser ? lockedCountry : selectCountry);
	// const [countryLocked, setCountryLocked] = useState(lockedCountry);
	const [dimension, setDimension] = useState(window.innerWidth > 768 ? 'column' : 'bar');
	const [change, setChange]=useState(true)
	const [title, setTitle] = useState('')
	const [legend, setLegend] = useState('')
	const [subMenuTabs, setSubMenuTabs] = useState(overallOpinion)
	const [selectedTab, setSelectedTab] = useState(selected);
	console.log("selectedTab",selectedTab);
	const [currentPath,setCurrentPath]=useState('/osh-outcomes-working-conditions/overall-opinion/');
	const [sector, setSector]= useState('sector')
	const [legend2,setLegend2]=useState(props.literals.L20582)
	// dispatcher
	const dispatch = useDispatch();

	useEffect(() => {
		updateDimension();
		window.addEventListener('resize',updateDimension);
		return () => window.removeEventListener('resize',updateDimension);
	}, [window.innerWidth])

	useEffect(() => {
		if (selectedByUser && props.country1) {
			dispatch(setLockedCountry(props.country1))
		} else if (!selectedByUser && props.country1) {
			dispatch(setCountry1(props.country1))
		}

		if (props.country2) {
			dispatch(setCountry2(props.country2))
		}
		
		// Update the title of the page
		document.title = props.literals.L22013 +  " - " + props.literals.L22020 + " - " + props.literals.L363;
	},[])

 
	const updateDimension = () =>{
		if (window.innerWidth > 768 ){
			setDimension('column')
			setTitle('How satisfied are you with working conditions in your main paid job?')
		}else{
			setDimension('bar'),
			setChange(false)
			setTitle('Job satisfaction')
		}
	}

	const callbackChartLegend = (legend) => {
		setLegend( legend );
	}

	const callbackSelectedSurvey = (callback) => {
		//this.setState({ selectedSurvey: callback });
	}


	const callbackSelectedTab = (callback) => {
		for (let i = 0; i < subMenuTabs.length; i++)
		{
			if (subMenuTabs[i].url == callback)
			{
				setSelectedTab(subMenuTabs[i]);
			}
		}
	}

	const handleSector =(sector)=> {
		if(sector == 'sector'){
			setLegend(props.literals.L20582)
		}else if(sector == 'age'){
			setLegend(props.literals.L20583)
		}else{
			setLegend(props.literals.L20581)
		}
	}

	const handleSearch = (selectCountry1) => {
		setSelectCountry1(selectCountry1);
		// if (selectedByUser) {
		// }
		//  else {
		// 	setCountryLocked(selectCountry1)
		// }
	}

	const handleSearch2 = (selectCountry2)=>{
		dispatch(setCountry2(selectCountry2));
	}

	return(
		<div className="overall-opinion">
			<AdviceSection literals={props.literals} section={["osh-outcomes-working-conditions","overall-opinion"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'Working conditions - Overall opinion', indicator: 65}} />
				
			<SubMenuTabs 
				literals={props.literals}
				selectedTab={selectedTab.url}
				callbackSelectedTab={callbackSelectedTab}
				locationPath={currentPath}
				subMenuTabs={subMenuTabs}
				selectCountry1={selectCountry1}
				selectCountry2={selectCountry2}
				sector={sector}
			/>

			<div className="line background-main-light" />
				
			<div className="">						
				<div>
					{(selectedTab.url == 'job-satisfaction') ? (
						<div>
							<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
								<div className="card--block--chart">
									<div className="chart--block with-filter" >
										<div className="card--block--chart--wrapper" >
											<div className="chart--wrapper" >
												<MentalRiskCharts
													literals={props.literals}
													tabIndicator={selectedTab.literalTab}
													chartType={selectedTab.chartType}
													colors={['#ffe400','#7b7b7d', '#cbe2e3','#f6a300']}
													type={dimension}
													percentage={true}
													callbackLegend={callbackChartLegend}
													callbackSelectedSurvey={callbackSelectedSurvey}
													exportingEnabled={true}
													showSelect={true}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="chart-legend">
									{ReactHtmlParser(props.literals.L20580)}
								</div>
							</div>
						</div>
					):(
						<div>
							<div className="compare--block">
								<SelectEconomic 
									handleSearch={handleSearch} 
									handleSearch2={handleSearch2} 
									charts={['20089', '20010', '20011', '20013', '20087', '20014' , '20088']}
									literals={props.literals}
									selectedCountry1={selectCountry1}
									selectedCountry2={selectCountry2}
								/>
							</div>
							<div class="line background-main-light"></div>
							<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
								<div className="card--block--chart">
									<div className="chart--block">
										<RiskChart
											title={props.literals.L22135}
											colors={['#f6a400','#003399']}
											showDataLabel={true}
											tick={20}
											percentage={true}
											type={dimension}
											selectCountry1={selectCountry1}
											selectCountry2={selectCountry2}
											chart={'20041'}
											indicator={'66'}
											sector={[8,9,10,11,12,13]}
											gender={[1,2,3]}
											age={[1,2,3,4]}
											handleSector={handleSector}
											showSelect={true}
											exportingEnabled={true}
										/>
									</div>
								</div>
								<div className="chart-legend">
									{ReactHtmlParser(legend2)}
								</div>
							</div>
						</div>
					)}						
				</div>
			</div>
			<Methodology literals={props.literals} section={'Working conditions - Overall opinion'} indicator={selectedTab.indicator} />

				<Related literals={props.literals} section={["osh-outcomes-working-conditions","overall-opinion",props.indicator]} />
		</div>
		)
	
}

OverallOpinion.displayName = 'OverallOpinion';
export default OverallOpinion;
