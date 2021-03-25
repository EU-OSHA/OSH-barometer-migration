import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData } from '../../../api';

const euColor = 'red';
const country1Color = '#ffae00';
class ChartHuman extends Component {
	constructor(props) {
		super(props);

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
					height:500,
					type: this.props.type,
					backgroundColor: '#F0F0F0'
				},
				exporting: {
					enabled: true
				},
				plotOptions: {
					series: {
						stacking: this.props.stacking

					},
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
					
					categories: [this.props.data?.categories],
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
						format: this.props.percentage === true ? '{value} %' : `{value} ${this.props.percentage}`,
						style: {
							fontWeight: 'bold'
						}
					}
				},
				series: [{
					type: 'column',
					pointPadding: 0.25,
					borderColor: 'transparent',
					borderWidth: 0,
					data: [{
						name: 'AT',
						y: 300,
						color: {
							pattern: {
								image: 'human-orange.svg',
								//aspectRatio:0.8
							}
						}
					}, {
						name: 'BE',
						y: 180,
						color: {
							pattern: {
								image: 'human-green.svg',
								//aspectRatio:1.4
							}
						}
					}, {
						name: 'EU27_2020',
						y: 120,
						color: {
							pattern: {
								image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg',
								//aspectRatio:1.4
							}
						}
					},
					]
				}]
			}
		}
	}

	getLoadData = (chart, indicator, country1, country2) => {
		let categories = [];
		let auxSeries = [];
		let series = [];

		getChartData(chart, indicator, country1, country2)
			.then((res) => {
				res.resultset.forEach(element => {

					if (categories.indexOf(element.countryCode) == -1) {
						categories.push(element.countryCode)
					}
					let split = element.countryCode;
					if (!(split in auxSeries)) {
						auxSeries[split] = []
					}
					// else if (element.split == null) {
					// 	split = element.value
					// 	//console.log("esta funcion aplica")
					// }
					
					auxSeries[split].push(element.value)
				});
					
		for (let serie in auxSeries) {
			series.push({ name: serie, data: auxSeries[serie] })
		}

		// this.setState({
		// 	chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series: { color: { pattern: { image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg'}}},}
		// })
	});
		
	}

	componentDidMount() {
		this.getLoadData(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.pais1 != this.props.pais1) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2)
		}

		if (prevProps.pais2 != this.props.pais2) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2)
		}
	}

	render() {
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
			</div>
		)
	}
}

export default ChartHuman;