import React, { Component,useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
import Chart from '../common/charts/Chart';
import RiskChart from '../common/charts/RiskChart'
import SelectEconomic from '../common/select-filters/SelectEconomic'

const OverallOpinion = (props) =>{
		
	const [pais1,setPais1]=useState("AT");
	const [pais2,stePais2]=useState("");
	const [visible, setVisible]=useState(true)
	// const [chart,setChart]=useState('20014');
	// const [indicator,setIndicator]=useState('36');
	// const [chart2,setChart2]=useState('20013');
	// const [indicator2,setIndicator2]=useState('35');

		const handleJob = ()=>{
			setVisible(false)

		}

		const handleRisk = ()=>{
			setVisible(true)
		}

	const handleSearch = (pais1) => {
		setPais1(pais1);
	}

	const handleSearch2 = (pais2)=>{
		stePais2(pais2)
	}

		// handleClickJob=()=>{
		// 	//this.setState({optionJob: true});
		// 	console.log("opcion Job")
		// }

		// handleClickRisk = ()=>{
		// 	//this.setState({optionJob: false})
		// 	console.log("opcion Health")
		// }

		// handleClickRisk = (pais1)=>{
		// 	setState
		// }

		return(
			<div className="overall-opinion">
				<AdviceSection literals={props.literals} section={["osh-outcomes-working-conditions","overall-opinion"]} />
				

				
				<div className="container">
						
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
								</div>
									<div className="container">
									<Chart
								title='How satisfied are you with working conditions in your main paid job?'
								colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e']}
								showDataLabel={true}
								tick={20}
								percentage={true}
								type='column'
								stackingColumn='percent'
								//pais1={'AT'}
								//pais2={'0'}
								reversed={true}
								//legend={true}
								chart={'20040'}
								indicator={'65'}
								/>  </div>
								
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
								</div>
									<div className="compare--block">
										<SelectEconomic handleSearch={handleSearch} handleSearch2={handleSearch2}/>
									</div>
									<div className="container">
									 <RiskChart
									title='Do you think your health or safety is at risk because of your work?'
									colors={['#f6a400','#003399','#cbe2e3','#ffe300','#449fa2','#f3c564','#16983e']}
									showDataLabel={true}
									tick={20}
									percentage={true}
									type='column'
									//stackingColumn='percent'
									pais1={pais1}
									pais2={pais2}
									//reversed={true}
									chart={'20041'}
									indicator={'66'}
									sector={[8,9,10,11,12,13]}
									gender={[1,2,3]}
									age={[1,2,3,4]}
									/> </div>
								
							</div>}
				
		
						</div>
					</div>

		</div>
		)
	
}
OverallOpinion.displayName = 'OverallOpinion';
export default OverallOpinion;
