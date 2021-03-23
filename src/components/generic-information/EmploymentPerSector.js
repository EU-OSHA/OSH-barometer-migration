import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const euColor = 'red';
const country1Color= '#ffae00';
const country2Color= '';



// const fetchData = (pais1) => {
// 	const url = `http://89.0.4.28:8080/barometer-data-server/api/quantitative/getChartData?chart=20089&indicator=31`

// 	const res = axios.get(`${url}&country1=${pais1}&country2=`
// 		).then((res) => {
// 			console.log(res)
// 			return res.data

// 		}).then((data) => {
// 			//console.log(data.resultset[10].split)
// 			//const prueba = data.resultset.forEach(element =>console.log(element.country))
// 			//console.log(data.resultset[2].country)
// 		})
// 			console.log(res)

// // ************************************************			
// 	// 	{
// 	// 	params:{country:pais1},
// 	// 	paramsSerializer: params => {
// 	// 		let urlparams = new URLSearchParams();

// 	// 		console.log(pais1)
// 	// 		if (params.country){
// 	// 			urlparams.append('country',params.country)
// 	// 		}
// 	// 		console.log(urlparams)
// 	// 		return urlparams

// 	// 	}

// 	// }).then((data)=>{
// 	// 	console.log(data.data)
// 	// 	return data.data
// 	// }).catch((e)=>{
// 	// 	console.log(e)
// 	// })
// 	// res.then((response)=>{
// 	// 	console.log(response)
// 	// }

// }


// const fetchData2 = (pais1,pais2) => {
// 	const url = `http://89.0.4.28:8080/barometer-data-server/api/quantitative/getChartData?chart=20089&indicator=31`

// 	const res = axios.get(`${url}&country1=${pais1}&country2=${pais2}`
// 		).then((res) => {
// 			console.log(res)
// 			return res.data

// 		}).then((data) => {
// 			console.log(data.resultset)
// 		})
// 			console.log(res)
	

// }

class EmploymentPerSector extends Component
{
	constructor (props)
	{
		super(props);
		//console.log('props', this.props);

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
					series: {
						stacking: 'normal'

					},
					bar: {
						dataLabels: {
							enabled: this.props.showDataLabel === true ? true : false,
							formatter: function() {
								return '<span style="color:'+this.point.color+'">'+this.y + '%</span>';
							}
						}
					}
				},
				xAxis: {
					
						categories: ['EU27_2020', 'AT'],
						labels: {
							formatter: function() {
								if ([this.value] == 'EU27_2020')
								{
									return "<span style='color:"+euColor+"'>"+[this.value]+"</span>"
								}
								else
								{
									return "<span style='color:"+country1Color+"'>"+[this.value]+"</span>"
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
						name: "Agriculture, forestry and fishing",
						data: [5,8]
				},{
						name: "Manufacturing",
						data: [7,7.2]
				},{
						name: "Construction, waste management, water and electricity supply",
						data: [1.3,3.8]
				},{
						name: "IT, Finance, Real estate and other technical scientific or personal service activities",
						data: [1.2,1.6]
				},{
						name: "Public administration",
						data: [0.5,0.3]
				},{
						name: "Education, human health and social work activities",
						data: [1.2,1.6]
				},{
						name: "Trade, transport, food/accommodation and recreation activities",
						data: [0.5,0.3]
				}]
				}
		}
	}

	loadData()
	{
		//console.log('this.state.chartConfig.', this.state);
		this.setState(
			{
				chartConfig:{
					xAxis:{
						categories: [""+this.props.pais1+"", ""+this.props.pais2+"", "EU27_2020"]
					},
					series: [{
						name: "Agriculture, forestry and fishing",
						data: [5,8,4.5]
				},{
						name: "Manufacturing",
						data: [7,7.2,7.8]
				},{
						name: "Construction, waste management, water and electricity supply",
						data: [1.3,3.8,6.5]
				},{
						name: "IT, Finance, Real estate and other technical scientific or personal service activities",
						data: [1.2,1.6,5]
				},{
						name: "Public administration",
						data: [0.5,0.3,7]
				},{
						name: "Education, human health and social work activities",
						data: [1.2,1.6,6.3]
				},{
						name: "Trade, transport, food/accommodation and recreation activities",
						data: [0.5,0.3,4.7]
				}]
				}
			});
	}

	render()
	{

		//console.log("this.state.chartConfig", this.state.chartConfig);

		// There is a known bug with the Full Screen option, when exiting the chart takes the full height and width of the screen
		// In order to fix it, add a className to the Highcharts element in the containerProps and set a fixed height (in pixels) in the CSS
		// Do not set the height of the chart in the options. If so, when going full screen, it will only take the height configured in the options
		return (
			<div className='chart-container'>
				<HighchartsReact
					highcharts={Highcharts}
					options={this.state.chartConfig}
					containerProps = {{ className: 'chartContainer' }}
				/>
				<div>
				<button onClick={this.loadData.bind(this)}>Update</button>
				</div>

				<div>
				{this.props.pais1}-
				{this.props.pais2}
				</div>

			</div>
		)
	}
}

export default EmploymentPerSector;