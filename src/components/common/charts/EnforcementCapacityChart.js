import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData, getDatasourceAndDates } from '../../../api';

import oshaLogo from './img/osha_logo-chart.svg';

const euColor = '#003399';
const euColorSeries = ['#003399', '#7f97ce'];
const country1Color = '#ffae00';
const country2Color = '#529FA2';
class EnforcementCapacityChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartConfig: {
				styledMode: true,
				title: {
					//useHTML: true,
					// TODO: Maybe possible change to main-title--card 
					text: "<h2 class='title--card'>"+this.props.title+"</h2>",
					align: 'left',
					widthAdjust: 0,
					style: {
						zIndex: 1,
						lineHeight:36
					}					
				},
				subtitle: {
					// TODO: Styles to title--card for being a subtitle
					text: `<h2 class='title--card' > ${this.props.subtitle} </h2>`,
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
					height:450,
					// width: 300,
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
					y:-10,
					buttons: {
						contextButton: {
							menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"]							
						}
					},
					chartOptions:
					{
						credits: {
							enabled: true
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
						pointPadding: 0.25
					},
					column: {
						stacking: this.props.stackingColumn,
						dataLabels: {
							enabled: true,
							style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:'12px'
							},
							formatter: function (){
								return this.point.split
							}
						},
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
					borderColor:"#529FA2",
					zIndex: 100,
					style: {
						zIndex: 100
					},
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>Country: </strong> ' + this.x + '</li>' +
						'<li><strong>Answer: </strong> ' + this.point.split + '</li>' +
						'<li><strong class="tooltip-value"> Value: </strong>' + this.y +'%</li>' +
						'</ul>';
					},
				},
				xAxis: {
					lineWidth: 0,
					categories: [this.props.data?.categories],
					
					labels: {
						formatter: function () {
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
					gridLineColor:'#FFF',
					gridLineWidth:2,
					reversedStacks: false,
					reversed: this.props.reversed,
					max: 100,
					tickInterval: this.props.tick,
					title: {
						enabled: false
					},
					// TODO: delete
					// stackLabels: {
					// 	// enabled: true
					// },
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

	getLoadData = (chart, indicator, country1, country2, sector, answers) => {
		let categories = [];
		let auxSeries = [];
		let series = [];
		const seriesColor = ['#f6a400', '#449fa2']
		

		getChartData(chart, indicator, country1, country2, sector, answers)
			.then((res) => {
				let serieInternalColors = 0;
				let euInternalColors = 0;
				res.resultset.forEach(element => {
					if (categories.indexOf(element.countryCode) == -1) {
						categories.push(element.countryCode)
					}
					
					let split = element.countryCode;
					if (!(split in auxSeries)) {
						auxSeries[split] = []
					}

					if (element.countryCode != 'EU27_2020') {
						const index = categories.findIndex((categ) => categ == element.countryCode)
						if (element.countryCode == categories.find((category) => category == element.countryCode)) {
							auxSeries[split].push({
								name: element.country,
								split: element.split,
								color: this.props.colors[euInternalColors],
								y: element.value, 
								x: index
							});
							euInternalColors++
						}
					} else {
						auxSeries[split].push({
							name: element.country,
							split: element.split,
							color: euColorSeries[serieInternalColors],
							y: element.value, 
							x: categories.length == 3 ? 2 : 1
						});
						serieInternalColors++
					}
				});
			
				for (let serie in auxSeries) {
					const findColor = categories.findIndex((el) => el == serie);
					if (serie == 'EU27_2020') {
						series.push({ name: serie, data: auxSeries[serie], color: euColorSeries[0]})
					} else {
						series.push({ name: auxSeries[serie][0].name, data: auxSeries[serie], color: seriesColor[findColor] })
					}
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
		this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, this.props.sector, this.props.answers);
		this.getCredits(this.props.chart);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectCountry1 != this.props.selectCountry1) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, this.props.sector, this.props.answers)
		}

		if (prevProps.selectCountry2 != this.props.selectCountry2) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, this.props.sector, this.props.answers)
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

export default EnforcementCapacityChart;