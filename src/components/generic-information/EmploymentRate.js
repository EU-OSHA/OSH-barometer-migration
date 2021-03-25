import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import axios from 'axios';



//const userContext = useContext(UserContext)
const euColor = 'red';
const country1Color = '#ffae00';
const country2Color = '';


const fetchData = (pais1) => {
	const url = `http://89.0.4.28:8080/barometer-data-server/api/quantitative/getChartData?chart=20089&indicator=31`

	const res = axios.get(`${url}&country1=${pais1}&country2=`
		).then((res) => {
			//console.log(res)
			return res.data

		}).then((data) => {
			//console.log(data.resultset[10].split)
			//const prueba = data.resultset.forEach(element =>console.log(element.country))
			//console.log(data.resultset[2].country)
		})
			console.log(res)

// ************************************************			
	// 	{
	// 	params:{country:pais1},
	// 	paramsSerializer: params => {
	// 		let urlparams = new URLSearchParams();

	// 		console.log(pais1)
	// 		if (params.country){
	// 			urlparams.append('country',params.country)
	// 		}
	// 		console.log(urlparams)
	// 		return urlparams

	// 	}

	// }).then((data)=>{
	// 	console.log(data.data)
	// 	return data.data
	// }).catch((e)=>{
	// 	console.log(e)
	// })
	// res.then((response)=>{
	// 	console.log(response)
	// }

}


const fetchData2 = (pais1,pais2) => {
	const url = `http://89.0.4.28:8080/barometer-data-server/api/quantitative/getChartData?chart=20089&indicator=31`

	const res = axios.get(`${url}&country1=${pais1}&country2=${pais2}`
		).then((res) => {
			//console.log(res)
			return res.data

		}).then((data) => {
			//console.log(data.resultset)
		})
		//	console.log(res)
	

}





class EmploymentRate extends Component {
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
					// categories: ['EU27_2020', 'AT'],
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
					categories: ['EU27_2020', 'AT'],
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
					name: "EU27_2020",
					data: [78]
				}, {
					name: "AT",
					data: [45]
				}]
			}
		}
	}


	componentDidUpdate(prevState, prevProps) {
		if (prevState.chartConfig !== this.state.chartConfig) {
			//console.log(this.state)
				
		}


		if (prevProps.pais1 !== this.props.pais1) {
			fetchData(this.props.pais1)

		}
		if (prevProps.pais2 !== this.props.pais2) {
			fetchData2(this.props.pais2)

		}


	}

	 loadData = () => {
		// userContext.handleSelect();
		//console.log('this.state.chartConfig.', this.state);
		//console.log(this.handleSearch)
		this.setState(
			{
				chartConfig: {
					xAxis: {
						categories: [""+this.props.pais1+"", ""+this.props.pais2+"", "EU27_2020"]
					},
					series: this.state.chartConfig.series.concat([{ name: ""+this.props.pais1+"", data: [1, 2, 5] }])
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
				<button onClick={this.loadData.bind(this)}>Update</button>
				<div>
					{this.props.pais1}-
					{this.props.pais2}
				</div>
			</div>

		)
	}
}

export default EmploymentRate;