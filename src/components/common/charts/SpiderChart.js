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
			prueba: 'hola',
			chartConfig: {
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
		
					yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				min: 0
					},
		
					tooltip: {
							shared: true,
							pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y} %</b><br/>',
							//headerFormat: '<b>{series.name}</b><br>',
							//pointFormat: '{point.x} cm, {point.y} kg',
							//clusterFormat: 'Clustered points: {point.clusterPointsAmount}'
					},
		
					series: [{
							name: '(AT) Austria)',
							data: [26.9, 50.3, 63.5, 62.3],
							pointPlacement: 'on'
					}, {
							name: 'EU27_2020',
							data: [31.6, 51.7, 65.3, 60.8],
							pointPlacement: 'on'
					}],
				
			}

		}
	}

	getLoadData = (chart, country1, country2) =>{
		let categories =[];
		// if (chart == '20049'){
		// categories =['Vibrations from tools or machinery','Loud noise','High temperatures','Low temperatures']
		// }else if (chart == '20080'){
		// categories =['Positions','Loads','Movements','Sitting']
		// }
		let auxSeries = [];
		let series = [];

		getSpiderChart(chart, country1, country2)
		.then((res)=>{

			res.resultset.forEach(element => {
				if (categories.indexOf(element.countryCode) == -1){
					categories.push(element.data)
				}
				let split = element.countryCode;
				if (!(split in auxSeries)) {
					auxSeries[split] = []
				}auxSeries[split].push()
			})
			console.log(categories)
		})

	}


	componentDidMount(){
		this.getLoadData(this.props.chart, this.props.selectCountry1, this.props.selectCountry2)
	}

	componentDidUpdate(prevProps,prevState){
		if(prevProps.selectCountry1 != this.props.selectCountry1){
			this.getLoadData(this.props.chart, this.props.selectCountry1, this.props.selectCountry2)
		}
		if(prevProps.selectCountry2 != this.props.selectCountry2){
			this.getLoadData(this.props.chart, this.props.selectCountry1, this.props.selectCountry2)
		}
	}

	render()
	{
		return (
			<div>
				<HighchartsReact
					highcharts={Highcharts}
					options={this.state.chartConfig}
				/>
			</div>
		)
	}
}

export default SpiderChart;