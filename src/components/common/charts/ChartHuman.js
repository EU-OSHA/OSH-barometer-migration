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
				styledMode: true,
				title: {
					//useHTML: true,
					text: "<h2 class='title--card'>"+this.props.title+"</h2>",
					align: 'left',
					widthAdjust: 20,
					y:44,
					style: {
						zIndex: 1,
						lineHeight:33
					}
				},
				colors: this.props.colors,
				credits: {
					enabled: false,
				},
				chart: {
					//height: 400,
					//width:300,
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
						},
						verticalAlign: 'top',
						y: 4
					}
				},
				legend:{
					//reversed: this.props.legend
					//verticalAlign: 'bottom',
					symbolRadius: 0,
					//layout: 'vertical',
					itemMarginTop:4,
					itemMarginBottom:4,
					itemDistance: 5,
					//width: 300,
					itemStyle: {
						fontFamily: 'OpenSans',
						fontWeight: 'normal',
						fontSize:'11px',
						textOverflow: "ellipsis",
						//width: 150
					}
				},
				tooltip: {					
					useHTML: true,
					opacity: 1,
					backgroundColor: "rgba(255, 255, 255, 1)",
					zIndex: 100,
					borderWidth:1,
					borderColor:"#CCC",
					// followPointer: true,
					// followTouchMove: true,
					style: {
						zIndex: 100
					},
					formatter: function () {						
						return '<ul class="tooltip-item">'+
						'<li><strong>Country: </strong> ' + this.series.name + '</li>' +
						'<li><strong class="tooltip-value up"> Value: </strong>' + this.y +'%</li>' +
						'</ul>';
					}
				},
				// plotOptions: {
				// 	series: {
				// 		shadow: false,
				// 		outline: 0,
				// 		stacking: this.props.stacking
				// 	},
				// 	// bar: {
				// 	// 	dataLabels: {
				// 	// 		style: {
				// 	// 			textOutline: 0,
				// 	// 			textShadow: false,
				// 	// 			fontFamily: 'OpenSans-Bold',
				// 	// 			fontSize:'14px'
				// 	// 		},
				// 	// 		enabled: this.props.showDataLabel === true ? true : false,
				// 	// 		formatter: function () {
				// 	// 			return '<span style="color:' + this.point.color + '">' + this.y + '%</span>';
				// 	// 		}
				// 	// 	},
				// 	// 	grouping: false
				// 	// },
				// 	// bar: {
				// 	// 	style: {
				// 	// 		textOutline: 0,
				// 	// 		textShadow: false,
				// 	// 		fontFamily: 'OpenSans-Bold',
				// 	// 		fontSize:'14px'
				// 	// 	},
				// 	// 	dataLabels: {
				// 	// 		enabled: this.props.showDataLabel === true ? true : false,
				// 	// 		formatter: function () {
				// 	// 			return '<span style="color:' + this.point.color + '">' + this.y + '€</span>';
				// 	// 		}
				// 	// 	}
				// 	// }
				// },
				xAxis: {
					lineWidth: 0,					
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
							textOutline: 0,
							textShadow: false,
							fontFamily: 'OpenSans-Bold',
							fontSize:'14px'
						}
					},
					type: 'category'
				},
				yAxis: {
					lineWidth: 0,
					//max: this.props.yAxisMax,
					//tickInterval: this.props.tick,
					visible:false,
					title: {
						enabled: false
					},
					labels: {
						//format: this.props.percentage === true ? '{value} %' : `{value} ${this.props.percentage}`,
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize:'12px'
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
								//type: 'column',
								color:euColor,
								pointWidth: 68,
								pointPadding: 0.15,
								borderColor: 'transparent',
								borderWidth: 0,
								data: [{
									name:element.value, 
									y: element.value, 
									x: i, 
									color: {
										pattern: {
											image:humanBlue,
											// width:68,
											// height:element.value,
											// x:10,
											// y:0
											//aspectRatio:0.453
										}
									}									
								}]
							});
						}else{
							if( i== 0){
								series.push({
									name: element.country,
									//type: 'column',
									color:this.props.colors[i],
									pointWidth: 68,
									 pointPadding: 1,
									 borderColor: 'transparent',
									// borderWidth: 0,
									data: [{name:element.value, y: element.value, x: i, 
										color: {
											pattern: {
												image: humanOrange,
												//width:68,
												//height:element.value,
												//aspectRatio:0.453
											}
										}}]
								});
							} else {
								series.push({
									name: element.country,
									//type: 'column',
									color:this.props.colors[i],
									pointWidth: 68,
									pointPadding: 0.15,
									borderColor: 'transparent',
									borderWidth: 0,
									data: [{
										name:element.value, 
										y: element.value, 
										x: i, 
										color: {
											pattern: {
												image: humanGreen,
												//width:110,
												//height:element.value
												//aspectRatio:0.453
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
		this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2);
	}

	componentDidUpdate(prevProps) {
		//console.log(prevProps ,'-----------------',this.props.selectCountry1)
		if (prevProps.selectCountry1 != this.props.selectCountry1) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2)
		}

		if (prevProps.selectCountry2 != this.props.selectCountry2) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2)
		}
		if (prevProps.chart != this.props.chart){
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2)
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
