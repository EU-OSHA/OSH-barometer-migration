import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const euColor = 'red';
const country1Color= '#ffae00';
const country2Color= '';

class Chart extends Component
{
	constructor (props)
	{
		super(props);
		console.log('props', this.props);

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
						type: 'bar',
						backgroundColor: '#F0F0F0'
				},
				exporting: {
						enabled: true
				},
				plotOptions: {
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
						name: "From 0 to 9 persons employed",
						data: [80,87]
				},{
						name: "From 10 to 19 persons employed",
						data: [17,7.2]
				},{
						name: "From 20 to 49 persons employed",
						data: [1.3,3.8]
				},{
						name: "From 50 to 249 persons employed",
						data: [1.2,1.6]
				},{
						name: "250 persons employed or more",
						data: [0.5,0.3]
				}]
			}
		}
	}

	loadData()
	{
		console.log('this.state.chartConfig.', this.state);
		this.setState(
			{
				chartConfig:{
					xAxis:{
						categories: ["AT","BE"]
					},
					series: this.state.chartConfig.series.concat([{name:"TEST New Series",data:[1,2]}])
				}
			});
	}

	render()
	{

		console.log("this.state.chartConfig", this.state.chartConfig);

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
			</div>
		)
	}
}

export default Chart;