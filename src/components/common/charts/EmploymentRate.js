import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData, getDatasourceAndDates } from '../../../api';
import { xlsxCustomExport } from '../utils/chartConfig';

const euColor = '#003399';
const country1Color = '#ffae00';
const country2Color = '#529FA2';
class EmploymentRate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chartConfig: {
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
					height: this.props.fullCountryReport ? 450 : 250,
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
					enabled: this.props.fullCountryReport,
					buttons: {
						contextButton: {
							menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"]							
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
						y: -5
					}
				},
				legend:{
					//reversed: this.props.legend
					symbolRadius: 0,
					itemMarginTop:4,
					itemMarginBottom:4,
					// align: 'center',
					// itemWidth: this.props.fullCountryReport ? 250 : 80,
					itemDistance: this.props.fullCountryReport ? 10 : 1,

					//width: 200,
					itemStyle: {
						fontFamily: 'OpenSans',
						fontWeight: 'normal',
						fontSize: this.props.fullCountryReport ? '12px' : '11px',
						textOverflow: "ellipsis"
					}
				},
				plotOptions: {
					borderColor: '#16983e',
					//borderWidth: 3,
					series: {
						//pointStart: 50,
						shadow: false,
						outline: 0,
						stacking: this.props.stacking,
					},
					bar: {
						borderWidth: 0,
						dataLabels: {
							//useHTML: true,
							align: 'left',
							y:-2,
							inside: false,
							overflow: 'none',
							crop: false,
							style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:this.props.fullCountryReport ? '14px' : '10px'
							},
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
								return '<span style="color:' + this.point.color + '">' + this.y + '???</span>';
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
					// positioner: function(labelWidth, labelHeight, point) {
					// 	var tooltipX = point.plotX/2;
					// 	var tooltipY = point.plotY - point.h/4;
					// 	return {
					// 		x: tooltipX,
					// 		y: tooltipY
					// 	};
					// },
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>Country: </strong> ' + this.series.name + '</li>' +
						'<li><strong class="tooltip-value"> Value: </strong>' + this.y +'%</li>' +
						'</ul>';
					}
				},
				xAxis: {
					lineWidth: 0,
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
							fontSize:this.props.fullCountryReport ? '12px' : '10px'
						}
					},
					type: 'category'
				},
				yAxis: {
					lineWidth: 0,
					gridLineColor: '#FFF',
          			gridLineWidth: 2,
					min: 50,
					max: 100,
					tickInterval: this.props.tick,
					title: {
						enabled: false
					},
					labels: {
						format: this.props.percentage === true ? '{value}%' : `{value} ${this.props.percentage}`,
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							// w:console.log(this.props.fullCountryReport ),
							fontSize:this.props.fullCountryReport ? '12px' : '10px',
							textOverflow: 'none'
						}
					}
				},
				series: []
			}
		}
	}

	getCredits = (chart) => {
		getDatasourceAndDates(chart).then((res)=>{
			let text = res;
			//console.log('text',text);
			this.setState({
				chartConfig: {...this.state.chartConfig, credits: {...this.state.chartConfig.credits, text}}
			})
		})		
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

						if(element.countryCode == "EU27_2020"){							
							series.push({
								name: element.country,
								color:euColor,
							  	data: [{
									name:element.countryCode, 
									y: element.value, x: i
							  	}]
						 	});
						}else{
							series.push({
								name: element.country,
								color:this.props.colors[i],
							  	data: [{
									name:element.countryCode, 
									y: element.value, x: i,
							  	}]
						 	});
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
		this.getCredits(this.props.chart);
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

EmploymentRate.defaultProps = {
	fullCountryReport: true,
	title: ''
}

export default EmploymentRate;