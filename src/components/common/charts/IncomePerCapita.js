import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData, getDatasourceAndDates } from '../../../api';

const euColor = '#003399';
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
					enabled: true,
					text: "",
					href: '',
					style: {
						cursor: 'arrow'
					},
					position: {
						x: -130
					}
				},
				colors: this.props.colors,
				chart: {
					height:500,
					type: this.props.type,
					backgroundColor: '#F0F0F0',
					events: {
						render: function() {
							  var chart = this;
						   if (!chart.customImage)
						   {
							   chart.customImage = chart.renderer.image(
								   'https://visualisation.osha.europa.eu/pentaho/plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/img/EU-OSHA-en.png',
								   chart.chartWidth - 130,
								   chart.chartHeight - 37,
								   130,
								   37
							   ).add();
						   }
						   else
						   {
							   chart.customImage.attr({
								   x: chart.chartWidth - 130,
								   y: chart.chartHeight - 37
							   });
						   }
					
						   if (chart.fullscreen.isOpen) {
							   chart.customImage.css({
								   display: 'block'
							   });
							   chart.container.className = 'highcharts-container full-screen';
							 }
						   else
						   {
							   chart.customImage.css({
								   display: ''
							   });	
							   chart.container.className = 'highcharts-container';
						   }
						}					
					},
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
					style: {
						zIndex: 100
					},
					// headerFormat: '<ul class="tooltip-item"><li><strong>Country: </strong> {series.name}</li>',
					// pointFormat: '<li><strong>Year: </strong> {point.x}</li><li><strong>Imcome: </strong> {point.y} €</li></ul>',
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>Country: </strong>'+ this.series.name +' </li>' +
						'<li><strong>Year: </strong>'+ this.x  +' </li>' +
						'<li><strong class="tooltip-value up">Imcome: </strong> '+ Highcharts.numberFormat(this.y,0,',','.') + ' ' + props.percentage +'</li>' +
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
								return '<span style="color:' + this.point.color + '">' + Highcharts.numberFormat(this.y,0,',','.')   + ' ' + props.percentage +'</span>';
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
						format: this.props.percentage === true ? '{value:,.0f} %' : `{value:,.0f} ${this.props.percentage}`,
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

	getCredits = (chart) => {
		getDatasourceAndDates(chart).then((res)=>{
			let text = res;
			this.setState({
				chartConfig: {...this.state.chartConfig, credits: {...this.state.chartConfig.credits, text}}
			})
		})		
	}

	componentDidMount() {
		this.getLoadData(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2);
		this.getCredits(this.props.chart);
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
			this.getCredits(this.props.chart);
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