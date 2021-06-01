import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import humanBlue from './img/human-blue.svg';
import humanOrange from './img/human-orange.svg';
import humanGreen from './img/human-green.svg';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/pattern-fill')(Highcharts);
import { getChartData, getDatasourceAndDates } from '../../../api'
import { xlsxCustomExport } from '../utils/chartConfig';

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
					text: "<h2 class='title--card'>"+props.title+"</h2>",
					align: 'left',
					widthAdjust: 20,
					y:44,
					style: {
						zIndex: 1,
						lineHeight:33
					},
					margin: 30
				},
				data: {
					enablePolling: true,
					dataRefreshRate: 1
				},
				colors: this.props.colors,
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
				chart: {
					height: 500,
					//width:300,
					type: this.props.type,
					backgroundColor: '#F0F0F0',
					events: {
						render: function() {
							var chart = this;
							this.series.forEach(function(series) {
								series.data[0].dataLabel.attr({
								  	y: chart.fullscreen.isOpen ? (chart.chartHeight-170) : (chart.chartHeight-200)
								});					  
							})

						   	if (!chart.customImage)
						   	{
							   	chart.customImage = chart.renderer.image(
									'https://visualisation.osha.europa.eu/pentaho/plugin/pentaho-cdf-dd/api/resources/system/osha-dvt-barometer/static/custom/img/EU-OSHA-en.png',
									chart.chartWidth - 130,
									chart.chartHeight - 37,
									130,
									37
							   	).add();
								chart.customImage.attr({
									class:'osha-logo'
								});
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
							menuItems: ["viewFullscreen", "printChart", "separator", "downloadCSV", "downloadXLS"]							
						}
					},
					menuItemDefinitions: {
                        "downloadXLS": {
                            onclick: function() {
                                xlsxCustomExport('Country', this.series, this.title.textStr, true);
                            }
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
					symbolRadius: 0,
					itemMarginTop:4,
					itemMarginBottom:4,
					itemDistance: 5,
					itemStyle: {
						fontFamily: 'OpenSans',
						fontWeight: 'normal',
						fontSize:'11px',
						textOverflow: "ellipsis",
					},
					margin: 20
				},
				plotOptions: {
					series: {
						dataLabels: {
							enabled: true,
							color: '#58585A',
							style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:'14px'
							},
						},
						events: {
							legendItemClick: function(e) {
								e.preventDefault();
							}
						},
					}
				},
				tooltip: {					
					useHTML: true,
					opacity: 1,
					backgroundColor: "rgba(255, 255, 255, 1)",
					zIndex: 100,
					borderWidth:1,
					borderColor:"#529FA2",
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
				xAxis: {
					opposite: true,
					lineWidth: 0,					
					labels: {
						formatter: function () {
							if ([this.value] == 'EU27_2020' || this.pos == (this.chart.series.length - 1)) {
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
					gridLineColor:'#FFF',
					gridLineWidth:2,
					lineWidth: 0,
					//max: this.props.yAxisMax,
					//tickInterval: this.props.tick,
					visible:false,
					title: {
						enabled: false
					}
				},
				series: []
			}
		}
	}

	getLoadData = (chart, indicator, country1, country2) => {
		let series = [];

		getChartData(chart, indicator, country1, country2)
			.then((res) => {
				let i = 0;
				let numberOfItems = res.resultset.length;
				res.resultset.forEach(element => {
					if (element.split == null)
					{
						// There is no split, series and the categories will be the same						
						if ( element.countryCode == "EU27_2020" ){
							series.push({
								name: element.country,
								//type: 'column',
								color:euColor,
								pointWidth: numberOfItems > 2 ? 60 : 70,
								//pointPadding: 0.15,
								borderColor: 'transparent',
								borderWidth: 0,
								data: [{
									name:element.countryCode, 
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
						} else {
							if( i == 0){
								series.push({
									name: element.country,
									//type: 'column',
									color:this.props.colors[i],
									pointWidth: numberOfItems > 2 ? 60 : 70,
									 //pointPadding: 1,
									 borderColor: 'transparent',
									// borderWidth: 0,
									data: [{name:element.countryCode, y: element.value, x: i, 
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
									pointWidth: numberOfItems > 2 ? 60 : 70,
									// pointPadding: 0.25,
									borderColor: 'transparent',
									borderWidth: 0,
									data: [{
										name:element.countryCode, 
										y: element.value, 
										// x: i, 
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

	getCredits = (chart) => {
		getDatasourceAndDates(chart).then((res)=>{
			let text = res;
			this.setState({
				chartConfig: {...this.state.chartConfig, credits: {...this.state.chartConfig.credits, text}}
			})
		})		
	}

	componentDidMount() {
		this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2);
		this.getCredits(this.props.chart);
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevProps.selectCountry1 != this.props.selectCountry1) {
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2)
		}

		if (prevProps.selectCountry2 != this.props.selectCountry2) {
			// Check if it's the first time that the country2 is set 
			if (prevProps.selectCountry2 == undefined || prevProps.selectCountry2=='0')
			{
				let series = [];
				this.setState({
					chartConfig: {...this.state.chartConfig, series}
				});
			}
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2)
		}

		if (prevProps.chart != this.props.chart){
			this.getLoadData(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2);
			this.getCredits(this.props.chart);
		}

		if (prevState.chartConfig.series != this.state.chartConfig.series)
		{
			this.forceUpdate();
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
