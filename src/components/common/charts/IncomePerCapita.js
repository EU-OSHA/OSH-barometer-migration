import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData } from '../../../api';

const euColor = 'black';
const country1Color = '#ffae00';
class IncomerPercapital extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chartConfig: {
				title: {
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
					height:500,
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
						y: -8
					}
				},
				legend:{
					//reversed: this.props.legend
					itemMarginTop:4,
					itemMarginBottom:4,
					itemStyle: {
						fontFamily: 'OpenSans',
						fontWeight: 'normal',
						fontSize:'12px',
						textOverflow: "ellipsis",
						//width: 250
					}
				},
				tooltip: {
					useHTML: true,
					opacity: 1,
					backgroundColor: "rgba(255, 255, 255, 1)",
					//zIndex: console.log('valores-------------'+this.pos),
					style: {
						zIndex: 100
					},
					// headerFormat: '<b>Country</b> {series.name}<br/> <b> Year {point.x}</b><br/>',
					// pointFormat: '<b> Income </b> {point.y} €',
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>Country: </strong> '+ this.series.name +'</li>' +
						'<li><strong>Year: </strong>'+ this.x  +' </li>' +
						'<li><strong>Imcome: </strong> '+ this.y +' €</li>' +
						'</ul>';
					}
				},
				plotOptions: {
					series: {
						stacking: this.props.stacking

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
					
					categories: [this.props.data?.categories],
					labels: {
						formatter: function () {
							if ([this.value] != 'EU27_2020') {
								return "<span style='color:" + euColor + "'>" + [this.value] + "</span>"
							}
							else {
								return "<span style='color:" + country1Color + "'>" + [this.value] + "</span>"
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
					max: this.props.yAxisMax,
					tickInterval: this.props.tick,
					title: {
						enabled: false
					},
					labels: {
						format: this.props.percentage === true ? '{value} %' : `{value} ${this.props.percentage}`,
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize:'12px'
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
						
					if (categories.indexOf(element.split) == -1) {
						categories.push(element.split)
					}
					
					let split = element.country;
					if (!(split in auxSeries)) {
						auxSeries[split] = []
						
					}auxSeries[split].push(element.value)
					 
				
				});
					
		for (let serie in auxSeries) {
			
			series.push({ name: serie , data: auxSeries[serie] })
			//console.log(categories)
		}

		this.setState({
			chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series}
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

export default IncomerPercapital;