import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getSpiderChart} from '../../../api'
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

class SpiderChart extends Component{
	constructor(props) {
		super(props);

		this.state = {
			chartConfig: {
				colors: this.props.colors,
					chart: {
				polar: true,
				type: 'line'
				},
					title: {
				text: `<h2>Ergonomic risks</h2><br/>`,
				align: 'left'
				//x: -180
					},
					
					pane: {
							size: '100%'
					},
		
					xAxis: {
						categories: ['Vibrations from tools or machinery','Loud noise','High temperatures','Low temperatures'],
						tickmarkPlacement: 'on',
						lineWidth: 0
					},
					plotOptions: {
						series: {
							colors: this.props.colors,
						}
					},
		
					yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				min: 0
					},
		
					tooltip: {
							shared: true,
							pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y} %</b><br/>',
							headerFormat: '<b>hoallalala</b><br>',
							//pointFormat: '{point.x} cm, {point.y} kg',
							//clusterFormat: 'Clustered points: {point.clusterPointsAmount}'
					},
		
					series: [{pointPlacement: 'on', color: '#f6a400'}, 
					{pointPlacement: 'on',color: '#003399'},{pointPlacement: 'on',color: '#cbe2e3'}],
				
			},
			selectedTab:this.props.selectedTab,
			selectedTypeChart: ['20049','20080','20101']
			

		}
	}

	onChangeSelect = (e) => {
        this.setState({ selectedTypeChart: e.target.value });
        //this.props.callbackSelectedSurvey(e.target.value);

        // const serie = this.props.chartType.find((chart) => chart.type == e.target.value);
        // if (window.innerWidth > 768 ) {
        //     this.setState({ chartConfig: {...this.state.chartConfig, title: {...this.state.chartConfig.title, text: "<h2 class='title--card'>"+this.props.literals[`L${serie.title}`]+"</h2>" } } })
        // }
    }

	getLoadData = (chart, country1, country2) =>{
		let categories =[];
		if (chart == '20080'){
		categories =['Positions','Sitting','Loads','Movements','Lifting and moving']
		}else if (chart == '20049'){
		categories =['Vibrations from tools or machinery','Loud noise','High temperatures','Low temperatures']
		}else {
		categories =['Positions','Loads','Movements','Sitting']
		}
		let auxSeries = [];
		let series = [];

		getSpiderChart(chart, country1, country2)
		.then((res)=>{

			res.resultset.forEach(element => {
				// if (categories.indexOf(element.countryCode) == -1){
				// 	categories.push(element.data)
				// }
				let split = element.countryCode;
				if (!(split in auxSeries)) {
					auxSeries[split] = []
				}
					if(chart == '20080'){
						auxSeries[split].push(
							element.data['Does your work involve tiring or painful positions?'],
							element.data['Does your work involve sitting?'],
							element.data['Does your work involve carrying or moving heavy loads?'],
							element.data['Does your work involve repetitve hand or arm movements?'],
							element.data['Does your work involve lifting or moving people?']
							)
					}else if(chart == '20049'){
						auxSeries[split].push(
							element.data['Are you exposed to vibrations from tools or machinery?'],
							element.data['Are you exposed to loud noise?'],
							element.data['Are you exposed to high temperatures?'],
							element.data['Are you exposed to low temperatures?'],
							)
					}else{
						auxSeries[split].push(
							element.data['Tiring or painful positions'],
							element.data['Lifting or moving people or heavy loads'],
							element.data['Repetitive hand or arm movements'],
							element.data['Prolonged sitting'],
							)
					}
			});

			for (let serie in auxSeries){
				series.push({ name: serie, pointPlacement: 'on', data: auxSeries[serie] })
			}
			console.log(series)
			
			this.setState({ chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series}})
		})

	}


	componentDidMount(){
		this.getLoadData(this.props.chart, this.props.selectCountry1, this.props.selectCountry2)
		console.log(this.props.chart)
	}

	componentDidUpdate(prevProps,prevState){
		if(prevProps.selectCountry1 != this.props.selectCountry1){
			this.getLoadData(this.props.chart, this.props.selectCountry1, this.props.selectCountry2)
		}
		if(prevProps.selectCountry2 != this.props.selectCountry2){
			this.getLoadData(this.props.chart, this.props.selectCountry1, this.props.selectCountry2)
		}
		if (prevProps.chart != this.props.chart){
			this.getLoadData(this.props.chart, this.props.selectCountry1, this.props.selectCountry2)
		}
	}

	render()
	{
		return (
			<>
			{/* {this.state.selectedTypeChart && (
                        <div className="select-filter-chart-wrapper">
                            {this.state.typeCharts.length > 1 && (
                                <div className="select-filter-chart">
                                    <select onChange={this.onChangeSelect} value={this.state.selectedTypeChart} >
                                        {this.state.typeCharts.map((type) => {
                                            return <option key={type} value={type} > {type.toUpperCase()} </option>
                                        })}
                                    </select>
                                </div>
                            )}
                        </div>
                    )} */}
				<div>
					<HighchartsReact
					highcharts={Highcharts}
					options={this.state.chartConfig}
				/>
				</div>
			</>
		)
	}
}

export default SpiderChart;