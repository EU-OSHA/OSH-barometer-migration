import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import humanBlue from './img/human-blue.svg';
import humanOrange from './img/human-orange.svg';
import humanGreen from './img/human-green.svg';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/pattern-fill')(Highcharts);
import { getChartData } from '../../../api'

const euColor = '#003399';
const country1Color = '#ffae00';
const country2Color = '#529FA2';

class ChartHuman extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chartConfig: {
				title: {
					useHTML: true,
					text: "<h2 class='title--card'>"+this.props.title+"</h2>",
					align: 'left'
				},
				colors: this.props.colors,
				credits: {
					enabled: false,
				},
				chart: {
					//height: 400,
					type: this.props.type,
					backgroundColor: '#F0F0F0'
				},
				exporting: {
					enabled: true,
					buttons: {
						contextButton: {
							menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"]							
						}
					}
				},
				navigation: {
					buttonOptions: {
						theme: {
							fill: 'transparent',
							states: {
								hover: {
									fill: '#CCC'
								},
								select: {
									fill: 'transparent'
								}
							}
						}
					}
				},
				legend:{
					//reversed: this.props.legend
					verticalAlign: 'bottom',
					symbolRadius: 0,
					//layout: 'vertical',
					itemMarginTop:4,
					itemMarginBottom:4,
					//width: 300,
					itemStyle: {
						fontFamily: 'OpenSans',
						fontWeight: 'normal',
						fontSize:'12px',
						textOverflow: "ellipsis",
						width: 250
					}
				},
				plotOptions: {
					series: {
						shadow: false,
						outline: 0,
						stacking: this.props.stacking
					},
					bar: {
						dataLabels: {
							style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:'14px'
							},
							enabled: this.props.showDataLabel === true ? true : false,
							formatter: function () {
								return '<span style="color:' + this.point.color + '">' + this.y + '%</span>';
							}
						},
						grouping: false
					},
					bar: {
						style: {
							textOutline: 0,
							textShadow: false,
							fontFamily: 'OpenSans-Bold',
							fontSize:'14px'
						},
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
								if( this.pos == 0){
									return "<span style='color:" + country1Color + "'>" + [this.value] + "</span>"
								} else {
									return "<span style='color:" + country2Color + "'>" + [this.value] + "</span>"
								}
								
							}
						},
						style: {
							fontWeight: 'bold'
						}
					},
					type: 'category'
				},
				yAxis: {
					//max: this.props.yAxisMax,
					//tickInterval: this.props.tick,
					visible:false,
					title: {
						enabled: false
					},
					labels: {
						//format: this.props.percentage === true ? '{value} %' : `{value} ${this.props.percentage}`,
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
				//console.log('res',res.resultset);
				let i = 0;
				res.resultset.forEach(element => {

					if (element.split == null)
					{
						// There is no split, series and the categories will be the same
						//console.log('country', element.countryCode);
						//console.log('value',element.value);
						
						if( element.countryCode == "EU27_2020" ){
							series.push({
								name: element.country,
								type: 'column',
								color:euColor,
								pointWidth: 110,
								pointPadding: 0.25,
								borderColor: 'transparent',
								borderWidth: 0,
								data: [{name:element.countryCode, y: element.value, x: i, 
									color: {
										pattern: {
											image:humanBlue,
											//aspectRatio:0.8
										}
									}}]
							});
						}else{
							if( i== 0){
								series.push({
									name: element.country,
									type: 'column',
									color:this.props.colors[i],
									pointWidth: 110,
									pointPadding: 0.25,
									borderColor: 'transparent',
									borderWidth: 0,
									data: [{name:element.countryCode, y: element.value, x: i, 
										color: {
											pattern: {
												image: humanOrange,
												//aspectRatio:0.8
											}
										}}]
								});
							} else {
								series.push({
									name: element.country,
									type: 'column',
									color:this.props.colors[i],
									pointWidth: 110,
									pointPadding: 0.25,
									borderColor: 'transparent',
									borderWidth: 0,
									data: [{name:element.countryCode, y: element.value, x: i, 
										color: {
											pattern: {
												image: humanGreen,
												//aspectRatio:0.8
											}
										}}]
								});
							}
						}
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
		if (prevProps.chart != this.props.chart){
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
