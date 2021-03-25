import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData } from '../../api';

const euColor = 'blue';
const country1Color = '#ffae00';
class EmploymentRate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chartConfig: {
				title: {
					title: this.props.title,
					align: 'left'
				},
				colors: this.props.colors,
				credits: {
					enabled: false,
				},
				chart: {
					height: 500,
					type: this.props.type,
					backgroundColor: '#F0F0F0'
				},
				exporting: {
					enabled: true,
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
						},
						grouping: false
					},
					line: {
						dataLabels: {
							enabled: this.props.showDataLabel === true ? true : false,
							formatter: function () {
								return '<span style="color:' + this.point.color + '">' + this.y + '€</span>';
							}
						}
					}
				},
				xAxis: {					
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
					},
					type: 'category'
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
				series: []
			}
		}
	}

	getLoadData = (chart, indicator, country1, country2) => {
		let categories = [];
		let auxSeries = [];
		let series = [];
		let split =[];
		let value=[];

		getChartData(chart, indicator, country1, country2)
			.then((res) => {
				console.log('res',res.resultset);
				let i = 0;
				res.resultset.forEach(element => {

					if (element.split == null)
					{
						// There is no split, series and the categories will be the same
						console.log('country', element.countryCode);
						console.log('value',element.value);
						series.push({
			  				name: element.country,
							data: [{name:element.countryCode, y: element.value, x: i}]
						});
						i++;
					}					
				});

		this.setState({
			chartConfig: {...this.state.chartConfig,  series}
		})
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

export default EmploymentRate;