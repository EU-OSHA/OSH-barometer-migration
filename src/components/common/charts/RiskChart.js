import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartDataRisk, getChartDataGender, getChartDataAge } from '../../../api';
import { xlsxCustomExport } from '../utils/chartConfig';

const euColor = 'blue';
const country1Color = '#5c5c5c';

class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			select: 'sector',
			chartConfig: {
				title: {
					text:  this.props.fullCountryReport == true ? '' : "<h2 class='title--card'>"+this.props.title+"</h2>",
					align: 'left'
				},
				credits: {
					enabled: false
				},
				colors: this.props.colors,
				chart: {
					height: this.props.fullCountryReport == true ? 250 : 500,
					type: this.props.type,
					backgroundColor: '#F0F0F0'
				},
				exporting: {
					// enabled: true,
					enabled: this.props.exportingEnabled,
					buttons: {
						contextButton: {
							menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"]							
						}
					},
					menuItemDefinitions: {
                        "downloadXLS": {
                            onclick: function() {
                                xlsxCustomExport('Category', this.series, this.title.textStr);
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
                // tooltip: {
				// 	headerFormat: '<b>Sector:</b>{point.x}<br/><b> Country</b> {series.name}<br/>',
				// 	pointFormat: '<b> Value </b> {point.y} %'
				// },
				tooltip: {					
					useHTML: true,
					style: {
						opacity: 1,
						zIndex: 100
					},
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>Sector: </strong> ' + this.x + '</li>' +
						'<li><strong>Country: </strong> ' + this.series.name + '</li>' +
						'<li><strong> Value: </strong>' + this.y +'%</li>' +
						'</ul>';
					}
				},
				plotOptions: {
					series: {
						stacking: this.props.stacking

					},
					column: {
						stacking: this.props.stackingColumn,
						dataLabels: {
							enabled: this.props.showDataLabel === true ? true : false,
							overflow: 'none',
                            crop: false,
                            allowOverlap: true,
							style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:this.props.fullCountryReport ? '12px' : '14px'
							},
							formatter: function () {
								return '<span style="color: ' + this.point.color + '">' + this.y + '%</span>';
							}
						}
					},
					bar: {
						dataLabels: {
							enabled: this.props.showDataLabel === true ? true : false,
							formatter: function () {
								return '<span style="color: ' + this.point.color + '">' + this.y + '%</span>';
							}
						}
					}
				},
				xAxis: {
					lineWidth: 0,
					categories: [this.props.data?.categories],
					
					labels: {
						formatter: function () {
							if ([this.value] == 'EU28') {
								return "<span style='color:" + euColor + "'>" + [this.value] + "</span>"
							}
							else {
								return "<span style='color:" + country1Color + "'>" + [this.value] + "</span>"
							}
						},
						padding:this.props.fullCountryReport ? 20 : 15,
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize: this.props.fullCountryReport ? '10px' : '12px',
							textOverflow: 'none'
						}
					}
				},
				yAxis: {
					gridLineColor:'#FFF',
					gridLineWidth:2,
					reversed: this.props.reversed,
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
							fontSize: this.props.fullCountryReport ? '10px' : '12px',
							textOverflow: 'none'
						}
					}
				},
				series: [ ]
			}
		}
	}



	getLoadDataRisk = (chart, indicator, country1, country2, sector, gender, age) => {
		let categories = [];
		let auxSeries = [];
		let series = [];
		

		getChartDataRisk(chart, indicator, country1, country2, sector, gender, age)
			.then((res) => {
				res.resultset.forEach(element => {
					if (categories.indexOf(element.countryCode) == -1) {
						categories.push(element.split)
					}
					
					let split = element.country;
					if (!(split in auxSeries)) {
						auxSeries[split] = []
						
					}auxSeries[split].push(element.value)
					 
				});
					
		for (let serie in auxSeries) {
			series.push({ name: serie , data: auxSeries[serie] })
		}
			
			if(series.length == 3){
				this.setState({
					chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series, colors:['#f6a400','#529FA2','#003399']}
				})
			}else{
				this.setState({
					chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series}
				})
			}
		});
	}

	
	handleSelect = (e) => {
		const sector = e.target.value
		this.setState({
			select: e.target.value
		})
		if(this.props.handleSector!=undefined){
			this.props.handleSector(sector);
		}
	}
	

	componentDidMount() {
		if(this.props.showSelect){
			this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2,this.props.sector);
		}else{
			if (this.props.selectedIndicator == 'sector'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, this.props.sector)	
			}
			if (this.props.selectedIndicator == 'gender'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, null, this.props.gender);
			}
			if (this.props.selectedIndicator == 'age'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, null, null,this.props.age);
			}
		}
	}

	componentDidUpdate(prevProps, prevState ) {
		if (!this.props.fullCountryReport)
		{
			if (prevState.select != this.state.select){
				if (this.state.select == 'sector'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, this.props.sector)	
				}
				if (this.state.select == 'gender'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, null, this.props.gender);
				}
				if (this.state.select == 'age'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, null, null,this.props.age);
				}
			}			
	
			if (this.state.select == 'sector'){
				if (prevProps.selectCountry1 != this.props.selectCountry1) {
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2,this.props.sector)
				}
				if (prevProps.selectCountry2 != this.props.selectCountry2){
					this.getLoadDataRisk(this.props.chart,this.props.indicator,this.props.selectCountry1,this.props.selectCountry2,this.props.sector)
				}
			}
	
			if (this.state.select == 'gender'){
				if (prevProps.selectCountry1 != this.props.selectCountry1) {
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2,null,this.props.gender)
				}
				if (prevProps.selectCountry2 != this.props.selectCountry2){
					this.getLoadDataRisk(this.props.chart,this.props.indicator,this.props.selectCountry1,this.props.selectCountry2,null,this.props.gender)
				}
			}
			
			if (this.state.select == 'age'){
				if (prevProps.selectCountry1 != this.props.selectCountry1) {
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2,null,null,this.props.age)
				}
				if (prevProps.selectCountry2 != this.props.selectCountry2){
					this.getLoadDataRisk(this.props.chart,this.props.indicator,this.props.selectCountry1,this.props.selectCountry2,null,null,this.props.age)
				}
			}
		}
		else
		{
			if (this.props.selectCountry1 != prevProps.selectCountry1)
			{
				if (this.props.selectedIndicator == 'sector'){
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, this.props.sector)	
				}
				if (this.props.selectedIndicator == 'gender'){
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, null, this.props.gender);
				}
				if (this.props.selectedIndicator == 'age'){
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.selectCountry1, this.props.selectCountry2, null, null,this.props.age);
				}
			}
		}
	}

	render() {
		let selectDiv;
		if(this.props.showSelect){
			selectDiv = (
				<div className="select-filter-chart" >
					<select onChange={this.handleSelect} className="ng-pristine ng-untouched ng-valid" name="" id="">
						<option className="ng-binding" value="sector">Sector</option>
						<option className="ng-binding" value="gender">Gender</option>
						<option className="ng-binding" value="age">Age</option>
					</select>
				</div>
			)
		}

		// There is a known bug with the Full Screen option, when exiting the chart takes the full height and width of the screen
		// In order to fix it, add a className to the Highcharts element in the containerProps and set a fixed height (in pixels) in the CSS
		// Do not set the height of the chart in the options. If so, when going full screen, it will only take the height configured in the options
		return (
			<div className='chart-container'>
				{selectDiv}
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