import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartDataRisk, getChartDataGender, getChartDataAge } from '../../../api';

const euColor = 'blue';
const country1Color = '#5c5c5c';

class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			select: 'sector',
			chartConfig: {
				title: {
					text:  "<h2 class='title--card'>"+this.props.title+"</h2>",
					align: 'left'
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
						stacking: this.props.stackingColumn
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
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize:'12px',
							textOverflow: 'none'
						}
					}
				},
				yAxis: {
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
							fontSize:'12px',
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
					//console.log(res.resultset)
					if (categories.indexOf(element.countryCode) == -1) {
						categories.push(element.split)
					}//console.log(categories)
					
					let split = element.countryCode;
					if (!(split in auxSeries)) {
						auxSeries[split] = []
						
					}auxSeries[split].push(element.value)
					 
				});//console.log(auxSeries)
					
		for (let serie in auxSeries) {
			
			series.push({ name: serie , data: auxSeries[serie] })
			//console.log(categories)
		}

			this.setState({
				chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series}
			})
		});
	}

	
handleSelect = (e) => {
	this.setState({
		select: e.target.value
	})
}
	

	componentDidMount() {
		this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2,this.props.sector);
	}

	componentDidUpdate(prevProps, prevState ) {

			if (prevState.select != this.state.select){
				if (this.state.select == 'sector'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2, this.props.sector)	
				}
				if (this.state.select == 'gender'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2, null, this.props.gender);
				}
				if (this.state.select == 'age'){
				this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2, null, null,this.props.age);
				}
			}
			

			if (this.state.select == 'sector'){
				if (prevProps.pais1 != this.props.pais1) {
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2,this.props.sector)
				}
				if (prevProps.pais2 != this.props.pais2){
					this.getLoadDataRisk(this.props.chart,this.props.indicator,this.props.pais1,this.props.pais2,this.props.sector)
				}
			}

			if (this.state.select == 'gender'){
				if (prevProps.pais1 != this.props.pais1) {
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2,null,this.props.gender)
				}
				if (prevProps.pais2 != this.props.pais2){
					this.getLoadDataRisk(this.props.chart,this.props.indicator,this.props.pais1,this.props.pais2,null,this.props.gender)
				}
			}

		
			if (this.state.select == 'age'){
				if (prevProps.pais1 != this.props.pais1) {
					this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2,null,null,this.props.age)
				}
				if (prevProps.pais2 != this.props.pais2){
					this.getLoadDataRisk(this.props.chart,this.props.indicator,this.props.pais1,this.props.pais2,null,null,this.props.age)
				}
			}

			

		// if (prevProps.pais1 != this.props.pais1) {
		// 	this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1, this.props.pais2,null,null,this.props.age)
		// }
		// if (prevProps.pais2 != this.props.pais2) {
		// 	this.getLoadDataRisk(this.props.chart, this.props.indicator, this.props.pais1,this.props.pais2,null,null,this.props.age)
		// }

				
		
	}





	render() {
		// There is a known bug with the Full Screen option, when exiting the chart takes the full height and width of the screen
		// In order to fix it, add a className to the Highcharts element in the containerProps and set a fixed height (in pixels) in the CSS
		// Do not set the height of the chart in the options. If so, when going full screen, it will only take the height configured in the options
		return (
			<div className='chart-container'>
				<div className="select-filter-chart" >
					<select onChange={this.handleSelect} className="ng-pristine ng-untouched ng-valid" name="" id="">
						<option className="ng-binding" value="sector">Sector</option>
						<option className="ng-binding" value="gender">Gender</option>
						<option className="ng-binding" value="age">Age</option>
					</select>
				</div>
				<HighchartsReact
					highcharts={Highcharts}
					options={this.state.chartConfig}
					containerProps={{ className: 'chartContainer' }}
				/>
				{/* <div>
					{this.props.indicator}-{this.props.chart}-{this.props.pais1}-{this.props.pais2}
				</div> */}
			</div>
		)
	}
}

export default Chart;