import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import UserContext from '../models/context/UserContext';
import axios from 'axios';
import { data } from 'jquery';



//const userContext = useContext(UserContext)
const euColor = 'red';
const country1Color = '#ffae00';
const country2Color = '';
let categories = [];
let auxSeries = [];
let series = [];
let split =[];


const fetchData = (pais1) => {
	const url = `http://89.0.4.28:8080/barometer-data-server/api/quantitative/getChartData?chart=20089&indicator=31`

	const res = axios.get(`${url}&country1=${pais1}&country2=`
		).then((res) => {
			console.log(res.data)
			return res.data

		}).then((data) => {

			data.resultset.forEach(result =>{
				//console.log(result)
				if (categories.indexOf(result.countryCode) == -1)
				{
					categories.push(result.countryCode);
				
				}
				var split = result.split;
				if(!(split in auxSeries)){
					auxSeries[split] = []; 
				}
				auxSeries[split].push(result.value);
			});
			
			for (var serie in auxSeries){
				series.push({name: serie, data: auxSeries[serie]});
			}
			console.log("categories",categories);
			console.log("series", series[0])
			console.log("split",auxSeries)
			
		})
			//console.log(res)

			

}


const fetchData2 = (pais1,pais2) => {
	const url = `http://89.0.4.28:8080/barometer-data-server/api/quantitative/getChartData?chart=20089&indicator=31`

	const res = axios.get(`${url}&country1=${pais1}&country2=${pais2}`
		).then((res) => {
			console.log(res)
			return res.data

		}).then((data) => {
			console.log(data.resultset)
		})
			console.log(res)
	

}





class Chart extends Component {
	constructor(props) {

		super(props);
		//console.log('props', this.props);
		//this.loadData = this.loadData.bind(this);

		

		this.state = {
			chartConfig: {
				title: {
					text: this.props.title,
					align: 'left'
				},
				credits: {
					enabled: false
				},
				colors: this.props.colors,
				chart: {
					height: 400,
					type: this.props.type,
					backgroundColor: '#F0F0F0'
				},
				exporting: {
					enabled: true
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: this.props.showDataLabel === true ? true : false,
							formatter: function () {
								return '<span style="color:' + this.point.color + '">' + this.y + '%</span>';
							}
						}
					}
				},
				xAxis: {
					categories: [categories[0]],
					labels: {
						formatter: function () {
							if ([this.value] == 'EU27_2020') {
								return "<span style='color:" + euColor + "'>" + [this.value] + "</span>"
							}
							else {
								return "<span style='color:" + country1Color + "'>" + [this.value] + "</span>"
							}
						},
						style: {
							fontWeight: 'bold'
						}
					}
				},
				yAxis: {
					max: this.props.yAxisMax,
					tickInterval: this.props.tick,
					title: {
						enabled: false
					},
					labels: {
						format: this.props.percentage === true ? '{value} %' : '{value}',
						style: {
							fontWeight: 'bold'
						}
					}
				},
				series: [{
					name: "From 0 to 9 persons employed",
					data: [2.5, 8]
				}, {
					name: "From 10 to 19 persons employed",
					data: [8.7,7.4]
				}, {
					name: "From 20 to 49 persons employed",
					data: [4.3, 3.8]
				}, {
					name: "From 50 to 249 persons employed",
					data: [1.2, 1.6]
				}, {
					name: "250 persons employed or more",
					data: [0.5, 0.3]
				}]
			}
		}
	}

	// componentDidMount(){
	// 	fetchData()
	// 	//this.state;
	// 	console.log("base de dato montada")
	// }

	componentDidUpdate(prevState, prevProps) {
		// if (prevState.chartConfig !== this.state.chartConfig) {
		// 	fetchData(this.props.pais1)
		// 	//console.log("estado cambiado")
		
				
		// }


		if (prevProps.pais1 !== this.props.pais1) {
			 fetchData(this.props.pais1)


		}
		if (prevProps.pais2 !== this.props.pais2) {
			fetchData2(this.props.pais2)

		}


	}

	 loadData = ()=> {
		// userContext.handleSelect();
		//console.log('this.state.chartConfig.', this.state);
		//console.log(this.handleSearch)
		this.setState(
			{
				chartConfig: {
					chart:{
						height: 400
					},
					xAxis: {
						categories: [categories[0],categories[1],categories[2]]
					}, 
					series: [series[0],series[1],series[2],series[3],series[4]]
				}
			});
	}

	render() {
		// const {value} = this.props
		// console.log(value);

		//console.log("this.state.chartConfig", this.state.chartConfig);

		// There is a known bug with the Full Screen option, when exiting the chart takes the full height and width of the screen
		// In order to fix it, add a className to the Highcharts element in the containerProps and set a fixed height (in pixels) in the CSS
		// Do not set the height of the chart in the options. If so, when going full screen, it will only take the height configured in the options
		return (
			<div className='chart-container'>
				<HighchartsReact
					highcharts={Highcharts}
					options={this.state.chartConfig}
					containerProps={{ className: 'chartContainer' }}
				/>
				<button onClick={()=>this.loadData()}>Update</button>
				<div>
					{this.props.pais1}-
					{this.props.pais2}
				</div>
				
			</div>

		)
	}
}

export default Chart;