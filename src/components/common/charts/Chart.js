import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData } from '../../../api';

const euColor = '#003399';
const country1Color = '#ffae00';
const country2Color = '#529FA2';
class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartConfig: {
				styledMode: true,
				title: {
					//useHTML: true,
					text: "<h2 class='title--card'>"+this.props.title+"</h2>",
					align: 'left',
					widthAdjust: 0,
					style: {
						zIndex: 1,
						lineHeight:36
					}					
				},
				credits: {
					enabled: false
				},
				colors: this.props.colors,
				chart: {
					height:450,
					//width: 300,
					type: this.props.type,
					backgroundColor: '#F0F0F0',
					// events: {
					// 	render: function() {
					// 	  var chart = this;	
					// 	  console.log(chart.yAxis[0].height);
					// 	  if (!chart.customImage) {
					// 			chart.customImage = chart.renderer.image(
					// 			'https://www.highcharts.com/samples/graphics/sun.png',
					// 			chart.plotLeft + chart.plotSizeX - 250,
					// 			chart.plotTop + chart.plotSizeY - 130,
					// 			130,
					// 			130
					// 			).add();
					// 	  } else {
					// 			chart.customImage.attr({
					// 			x: chart.plotLeft + chart.plotSizeX - 50,
					// 			y: chart.plotTop + chart.plotSizeY + 30
					// 			});
					// 	  }
				  
					// 	  if (!chart.fullscreen.isOpen) {
					// 			chart.customImage.css({
					// 			display: 'none'
					// 			});
					// 	  } else {								
					// 			chart.customImage.css({
					// 			display: 'block'
					// 			});								
					// 			// chart.legend.options.layout = "horizontal";
					// 			console.log(chart.yAxis[0].height);	
					// 	  }	
					// 	}						
					// },
				},
				exporting: {
					enabled: true,
					y:-10,
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
						y:-5
					}
				},
				legend:{
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
						stacking: this.props.stacking,

					},
					column: {
						stacking: this.props.stackingColumn,
						borderWidth: 0,
						pointPadding: 0.1
					},
					bar: {
						minPointLength:3,
						groupPadding:0.06,
						borderWidth: 0,
						pointWidth:this.props.stacking ? 50 : undefined,
						dataLabels: {
							align: 'left',
							y:-2,
							inside: false,
							overflow: 'none',
							crop: false,
							style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:'14px'
							},
							enabled: this.props.showDataLabel === true ? true : false,
							formatter: function () {								
								return '<span class="data-labels" style="color:' + this.point.color + '">' + this.y + '%</span>';
							}
						}
					}
				},
				tooltip: {					
					useHTML: true,
					opacity: 1,
					backgroundColor: "rgba(255, 255, 255, 1)",
					borderColor: '#16983e',
					zIndex: 100,
					style: {
						zIndex: 100
					},
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>'+props.title+': </strong><br>' + this.series.name +'</li>'+
						'<li><strong>Country: </strong> ' + this.x + '</li>' +
						'<li><strong class="tooltip-value"> Value: </strong>' + this.y +'%</li>' +
						'</ul>';
					},
				},
				xAxis: {
					lineWidth: 0,
					categories: [this.props.data?.categories],
					
					labels: {
						formatter: function () {
							//console.log(this.value +'-------------'+ this.pos);
							if ([this.value] == 'EU27_2020') {
								return "<span style='color:" + euColor + "'>" + [this.value] + "</span>"
							}else{
								if([this.pos] == 0){
									return "<span style='color:" + country1Color + "'>" + [this.value] + "</span>";
								}else{
									return "<span style='color:" + country2Color + "'>" + [this.value] + "</span>";
								}
							}
						},
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize:'12px'
						}
					}
				},
				yAxis: {
					gridLineColor: '#FFF',
                    gridLineWidth: 2,
					reversedStacks: false,
					reversed: this.props.reversed,
					max: 100,
					tickInterval: this.props.tick,
					title: {
						enabled: false
					},
					labels: {
						format: this.props.percentage === true ? '{value}%' : `{value}${this.props.percentage}`,
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize:'12px',
							textOverflow: 'none'
						}
					}
				},
				series: [ ]
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
					//console.log(res.resultset)
					if (categories.indexOf(element.countryCode) == -1) {
						categories.push(element.countryCode)
					}//console.log(categories)
					
					let split = element.split;
					if (!(split in auxSeries)) {
						auxSeries[split] = []
						
					}auxSeries[split].push(element.value)
					 
				});//console.log(auxSeries)
					
		for (let serie in auxSeries) {
			
			series.push({ name: serie , data: auxSeries[serie] })
		}

		this.setState({
			chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series}
		})
	});
		
	}

	componentDidMount() {
		this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectCountry1 != this.props.selectCountry1) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2)
		}

		if (prevProps.selectCountry2 != this.props.selectCountry2) {
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

export default Chart;