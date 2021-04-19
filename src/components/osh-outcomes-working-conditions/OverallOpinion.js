import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
import Chart from '../common/charts/Chart';
import RiskChart from '../common/charts/RiskChart'
import SelectEconomic from '../common/select-filters/SelectEconomic'

const OverallOpinion = (props) =>{
		
	const [selectCountry1,setselectCountry1]=useState("AT");
	const [selectCountry2,steselectCountry2]=useState("");
	const [visible, setVisible]=useState(true)
	const [dimension, setDimension]= useState(window.innerWidth > 768 ? 'column' : 'bar')
	const [change, setChange]=useState(true)

useEffect(() => {
updateDimension();

window.addEventListener('resize', updateDimension);
//return ()=> window.removeEventListener('resize',updateDimension);
}, [])
 
const updateDimension = ()=>{
	if (window.innerWidth > 768 ){
		setDimension('column')
	}else{
		setDimension('bar'),
		setChange(false)
	}
}

		const handleJob = ()=>{
			setVisible(false)
		}

		const handleRisk = ()=>{
			setVisible(true)
		}

	const handleSearch = (selectCountry1) => {
		setselectCountry1(selectCountry1);
	}

	const handleSearch2 = (selectCountry2)=>{
		steselectCountry2(selectCountry2)
	}


		return(
			<div className="overall-opinion">
				<AdviceSection literals={props.literals} section={["osh-outcomes-working-conditions","overall-opinion"]} />
				

				
				<div className="">						
						<div>
						{visible ?<div>
								<div className="compare--block">
									<div className="submenu--block container">
										<ul className="submenu--items--wrapper">
											<li className="sub--item active">
												<a onClick={handleRisk} className="ng-bining active">Job satisfaction</a>
											</li>
											<li className="sub--item">
												<a onClick={handleJob} className="ng-bining ">Health at risk</a>
											</li>
										</ul>										
									</div>
									<div class="line background-main-light"></div>
								</div>
								<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
									<div className="card--block--chart">
										<div className="chart--block">
											<Chart
											title='How satisfied are you with working conditions in your main paid job?'
											colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e']}
											//showDataLabel={true}
											tick={20}
											percentage={true}
											type={dimension}
											stackingColumn='percent'
											//selectCountry1={'AT'}
											//selectCountry2={'0'}
											stacking={true}
											//reversed={true}
											chart={'20040'}
											indicator={'65'}
											/> 
										</div>
									</div>
								</div>								
							</div>
		
							:<div>
								<div className="compare--block">
									<div className="submenu--block container">
										<ul className="submenu--items--wrapper">
												<li className="sub--item">
												<a onClick={handleRisk} className="ng-bining">Job satisfaction</a>
											</li>
											<li className="sub--item active">
												<a onClick={handleJob} className="ng-bining active">Health at risk</a>
											</li>
										</ul>										
									</div>
									<div class="line background-main-light"></div>
								</div>
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
												title='Do you think your health or safety is at risk because of your work?'
												colors={['#f6a400','#003399','#cbe2e3','#ffe300','#449fa2','#f3c564','#16983e']}
												showDataLabel={true}
												tick={20}
												percentage={true}
												type={dimension}
												//stackingColumn='percent'
												selectCountry1={selectCountry1}
												selectCountry2={selectCountry2}
												//reversed={true}
												chart={'20041'}
												indicator={'66'}
												sector={[8,9,10,11,12,13]}
												gender={[1,2,3]}
												age={[1,2,3,4]}
											/> 
										</div>
									</div>
								</div>								
							</div>}			
		
						</div>
					</div>

		</div>
		)
	
}
OverallOpinion.displayName = 'OverallOpinion';
export default OverallOpinion;
