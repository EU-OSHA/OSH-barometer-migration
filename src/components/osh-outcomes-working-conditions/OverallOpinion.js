import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import Related from '../common/Related';
import AdviceSection from '../common/AdviceSection';
import Chart from '../common/charts/Chart';
import RiskChart from '../common/charts/RiskChart';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SubMenuTabs from '../common/subMenuTabs/SubMenuTabs';

const OverallOpinion = (props) => {

	// Update the title of the page
	document.title = props.literals.L22013 +  " - " + props.literals.L22020 + " - " + props.literals.L363;
		
	const [selectCountry1,setSelectCountry1]=useState('AT');
	const [selectCountry2,setSelectCountry2]=useState('');
	const [visible, setVisible]=useState(true)
	const [dimension, setDimension] = React.useState(window.innerWidth > 768 ? 'column' : 'bar')
	const [change, setChange]=useState(true)
	const [title, setTitle] = React.useState('')
	const [selectedTab, setSelectedTab] = useState(props.indicator);
    const [indicatorTabs, setIndicatorTabs] = useState([{ literalTab: '322' }, { literalTab: '323' }]);
	const [currentPath,setCurrentPath]=useState('/osh-outcomes-working-conditions/overall-opinion/');
	const [isSubMenuOpen,setIsSubMenuOpen]= useState(false)
	const [sector, setSector]= useState('sector')
	const [legend,setLegend]=useState(props.literals.L20582)

useEffect(() => {
updateDimension();
window.addEventListener('resize',updateDimension);
return ()=> window.removeEventListener('resize',updateDimension);
}, [window.innerWidth])

 
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


const callbackSelectedTab = (callback) => {
	setSelectedTab( callback )

}
	const handleSector =(sector)=> {
		if(sector == 'sector'){
			setLegend(props.literals.L20582)
		}else if(sector == 'age'){
			setLegend(props.literals.L20583)
		}else{
			setLegend(props.literals.L20581)
		}
		console.log(legend)
	}
	const handleSearch = (selectCountry1) => {
		setSelectCountry1(selectCountry1);
	}

	const handleSearch2 = (selectCountry2)=>{
		setSelectCountry2(selectCountry2)
	}


		return(
			<div className="overall-opinion">
				<AdviceSection literals={props.literals} section={["osh-outcomes-working-conditions","overall-opinion"]} />
				
				<SubMenuTabs 
					literals={props.literals}
					selectedTab={selectedTab}
					callbackSelectedTab={callbackSelectedTab}
					locationPath={currentPath}
					subMenuTabs={indicatorTabs}
					selectCountry1={selectCountry1}
					selectCountry2={selectCountry2}
					sector={sector}
				/>
				
				 <div className="">						
						<div>
						{(selectedTab == 'job-satisfaction') ?<div>

								<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
									<div className="card--block--chart">
										<div className="chart--block">
											<Chart
											title={title}
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
									<div className="chart-legend">
											{props.literals.L20580}
											</div>
								</div>								
							</div>
		
							:<div>
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
												handleSector={handleSector}
											/> 
										</div>
									</div>
									<div className="chart-legend">
											{legend}
											</div>
								</div>								
							</div>}			
		
						</div>
						
				</div> 

				<Methodology />

				<Related literals={props.literals} section={["osh-outcomes-working-conditions","overall-opinion",props.indicator]} />
		</div>
		)
	
}
OverallOpinion.displayName = 'OverallOpinion';
export default OverallOpinion;
