import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getSpiderChart } from '../../../api'
import { isFullscreen } from '../utils/Utils';
import { xlsxCustomExport } from '../utils/chartConfig';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

class SpiderChart extends Component{
	constructor(props) {
		super(props);

		this.state = {
			chartConfig: {
				colors: this.props.colors,
				credits: {
					enabled: false
				},
				exporting: {
					enabled: true,
					menuItemDefinitions: {
                        "downloadXLS": {
                            onclick: function() {
                                xlsxCustomExport('Indicator', this.series, this.title.textStr);
                            }
                        }
                    }
				},
				chart: {
					backgroundColor: props.backgroundColor? props.backgroundColor : '#F0F0F0',
					polar: true,
					type: 'line',
					// height:this.props.fullCountryReport ? 320 : 770,
					spacingTop: props.fullCountryReport == true ? 45 : 10
				},
				title: {
					text: props.fullCountryReport == true ? '' : "<h2 class='title--card'>"+this.props.literals[`L${this.props.chartType[0].title}`]+"</h2>",
					align: 'left'
					//x: -180
				},
				legend: {
					margin: this.props.fullCountryReport ? 15 : 20
				},
				exporting: {
					enabled: this.props.exportingEnabled
				},				
				pane: {
					size: '99%'
				},
				plotOptions: {
					series: {
						colors: this.props.colors,
						lineWidth:4,
						marker: {
							radius: 4,
							symbol: "circle"
						},
					},
					line: {
						dataLabels: {
							style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:this.props.fullCountryReport ? '14px' : '16px',
							},
							allowOverlap: false,
							padding:this.props.fullCountryReport ? 20 : 10,
							enabled: this.props.showDataLabel === true ? true : false,
							formatter: function () {
								if (this.series.name == 'EU27_2020' || this.series.name == 'EU28')
								{
									return '<span style="color: ' + this.point.color + '">' + this.y + '%</span>';
								}
								else
								{
									return null;
								}
							}
						}
					}
				},
				legend: {
					margin: this.props.fullCountryReport ? 25 : 50
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
				xAxis: {
					tickmarkPlacement: 'on',
					lineWidth: 0,
					gridLineColor: '#acacac',
					gridLineWidth: 1,
					labels: {	
						distance: this.props.fullCountryReport ? 10 : 20,					
						style: {
							fontFamily: 'OpenSans',
							fontSize:this.props.fullCountryReport ? '12px' : '14px',
							color: 'black'
						}
					}
				},
				yAxis: {
					labels:{
						enabled: false
					},
					tickInterval: 20,
					gridLineInterpolation: 'polygon',
					gridLineColor: '#acacac',
					gridLineWidth: 1,
					lineWidth: 0,
					min: 0
				},
				tooltip: {
					useHTML: true,
					opacity: 1,
					backgroundColor: "rgba(255, 255, 255, 1)",
					borderColor:"#529FA2",
					fontSize:'12px',
					zIndex: 100,
					style: {
						zIndex: 100
					},
							 
					formatter: function () {
						if (this.x == props.literals.L22153){
							return ['<ul class="tooltip-item"><li><strong>' + 'Are you exposed to vibrations from tools or <br>machinery?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
										return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22155){
							return ['<ul class="tooltip-item"><li><strong>' + 'Are you exposed to loud noise?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22156){
							return ['<ul class="tooltip-item"><li><strong>' + 'Are you exposed to high temperatures?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22154){
							return ['<ul class="tooltip-item"><li><strong>' + 'Are you exposed to low temperatures?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22161){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your work involve tiring or <br>painful positions?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22165){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your work involve carrying or <br>moving heavy loads?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22163){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your work involve sitting?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22164){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your work involve repetitve hand or <br>arm movements?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22162){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your work involve lifting or <br>moving people?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22171){
							return ['<ul class="tooltip-item"><li><strong>' + 'Did the employees have a role in the design and set-up <br>of the measures to address psychosocial risks?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22172){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your organisation have a health and <br>safety delegate or committee?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22173){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your organisation have a trade union, <br>works council or a similar committee <br>representing employees?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22174){
							return ['<ul class="tooltip-item"><li><strong>' + 'Are health and safety issues regularly discussed <br>in staff or team meetings? <br>(Regularly and Occasionally)' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22175){
							return ['<ul class="tooltip-item"><li><strong>' + 'How often controversies related to health and safety arise? <br>(Sum of often and sometimes)' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22176){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your organisation have a regular meeting <br>in which employees can express their views <br>about what is happening in the organisation?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22177){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your organisation have a trade union, <br>works council or a similar committee <br>representing employees?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}else if (this.x == props.literals.L22178){
							return ['<ul class="tooltip-item"><li><strong>' + 'Does your organisation have a health and safety <br>delegate or committee?' + '</strong><br></li>'].concat(
								this.points ? this.points.map(function (point) {
									return '<li><strong>' + point.series.name + ':</strong> ' + point.y + '% '+'</li>';
									}) : ['</ul>']	);
						}
					},
					//split: true,
					shared:true
				},
				series: [
					{pointPlacement: 'on'}, 
					{pointPlacement: 'on'},
					{pointPlacement: 'on', color:'#003399'}
				],
			},
			typeCharts:[],
			selectedTypeChart: (this.props.selectedIndicator != undefined) ? this.props.selectedIndicator : this.props.dataset
		}
	}


	onChangeSelect = (e) => {
        this.setState({ selectedTypeChart: e.target.value });
        this.props.callbackSelectedSurvey(e.target.value);

        const serie = this.props.chartType.find((chart) => chart.type == e.target.value);
        if (window.innerWidth > 768 ) {
            this.setState({ chartConfig: {...this.state.chartConfig, title: {...this.state.chartConfig.title, text: "<h2 class='title--card'>"+this.props.literals[`L${serie.title}`]+"</h2>" } } })
        }
    }

	getLoadData = (chartType) =>{
		let categories = [];
        let auxSeries = [];
        let series = [];
		let chart
		const country1= this.props.selectCountry1;
		const country2= this.props.selectCountry2;
		
		if (chartType.length > 1) {
            chart = chartType.find((chart) => chart.type == this.state.selectedTypeChart);
			if (this.state.selectedTypeChart == null && this.props.dataset != null)
			{
				this.setState({ selectedTypeChart: this.props.dataset });
				chart = chartType.find((chart) => chart.type == this.props.dataset);
			}
            // this.props.callbackLegend(chart.legend);
        } else {
            chart = chartType[0];
            this.setState({ selectedTypeChart: null });
        }

		if (chart.chart == '20080'){
			categories =[this.props.literals.L22161,this.props.literals.L22163,this.props.literals.L22159,this.props.literals.L22164,this.props.literals.L22162]
		}else if (chart.chart == '20049'){
			categories =[this.props.literals.L22153,this.props.literals.L22155,this.props.literals.L22156,this.props.literals.L22154]
		}else if (chart.chart == '20101') {
			categories =[this.props.literals.L22157,this.props.literals.L22159,this.props.literals.L22158,this.props.literals.L22163]
		}else if (chart.chart == '20106'){
			categories =[this.props.literals.L22171,this.props.literals.L22172,this.props.literals.L22173,this.props.literals.L22174,this.props.literals.L22175]
		}else if (chart.chart == '20069'){
			categories=[this.props.literals.L22176,this.props.literals.L22177,this.props.literals.L22178]
		}

		getSpiderChart(chart.chart, country1, country2)
		.then((res)=>{

			res.resultset.forEach(element => {
				// if (categories.indexOf(element.countryCode) == -1){
				// 	categories.push(element.data)
				// }
				let split = element.countryCode == 'EU27_2020' || element.countryCode == 'EU28' ? element.countryCode : `(${element.countryCode}) ${element.countryName}`;
				if (!(split in auxSeries)) {
					auxSeries[split] = []
				}
					if(chart.chart == '20080'){
						auxSeries[split].push(
							element.data[this.props.literals.L347],
							element.data[this.props.literals.L348],
							element.data[this.props.literals.L349],
							element.data[this.props.literals.L350],
							element.data[this.props.literals.L351]
							)
					}else if(chart.chart == '20049'){
						auxSeries[split].push(
							element.data[this.props.literals.L324],
							element.data[this.props.literals.L325],
							element.data[this.props.literals.L326],
							element.data[this.props.literals.L327],
							)
					}else if(chart.chart == '20101'){
						auxSeries[split].push(
							element.data[this.props.literals.L20676],
							element.data[this.props.literals.L20690],
							element.data[this.props.literals.L20691],
							element.data['Prolonged sitting'],
							)
					}else if(chart.chart == '20106'){
						auxSeries[split].push(
							element.data['E3Q306'],
							element.data['E3Q350_4'],
							element.data['E3Q350_2'],
							element.data['E3Q357'],
							element.data['E3Q353']
							)
					}else if(chart.chart == '20069'){
						auxSeries[split].push(
							element.data[this.props.literals.L332],
							element.data[this.props.literals.L353],
							element.data[this.props.literals.L352]
							)
					}
			});

			for (let serie in auxSeries){
				series.push({ name: serie, pointPlacement: 'on', data: auxSeries[serie]})
				//console.log(auxSeries[serie])
			}
			if (series.length == 3){
				this.setState({ chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series, colors:['#f6a400','#529FA2','#003399']  }})
			}else{
				this.setState({ chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series}})
			}
			
		})

	}

	updateDimension = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const title = this.props.fullCountryReport == true ? '' : this.props.reportTitle != undefined ? "<h2 class='title--card'>"+this.props.reportTitle+"</h2>" : 
			"<h2 class='title--card'>"+this.props.literals[`L${this.props.chartType[0].title}`]+"</h2>";
		const tabTitle = "<h2 class='title--card'>"+this.props.literals[`L${this.props.tabIndicator}`]+"</h2>"

		if (width < 767) {
			if (isFullscreen()) {
				this.setState({
					chartConfig: {
						...this.state.chartConfig,
						// chart: {...this.state.chartConfig.chart, width: width},
						chart: {...this.state.chartConfig.chart, height: height}
					}
				});
			} else {
				if (width < 570){
					if(width < 376){
						if(width < 326){
							this.setState({
								chartConfig: {
									...this.state.chartConfig,
									chart: {...this.state.chartConfig.chart, height: 350},
									title: {
										...this.state.chartConfig.title,
										text: tabTitle,
										margin: 40
									}
								}
							})
						} else {
							this.setState({
								chartConfig: {
									...this.state.chartConfig,
									chart: {...this.state.chartConfig.chart, height: 350},
									title: {
										...this.state.chartConfig.title,
										text: tabTitle,
										margin: 40
									}
								}
							})
						}
					} else {
						this.setState({
							chartConfig: {
								...this.state.chartConfig,
								chart: {...this.state.chartConfig.chart, height: 400},
								title: {
									...this.state.chartConfig.title,
									text: tabTitle,
									margin: 50
								}
							}
						})
					}
				}
				else {
					this.setState({
						chartConfig: {
							...this.state.chartConfig,
							chart: {...this.state.chartConfig.chart, height: 450},
							title: {
								...this.state.chartConfig.title,
								text: tabTitle,
								margin: 50
							}
						}
					})
				}
			}
		} else {
			if (isFullscreen()) {
				this.setState({
					chartConfig: {
						...this.state.chartConfig,
						chart: {...this.state.chartConfig.chart, height: height}
					}
				});
			} else {
				this.setState({
					chartConfig: {
						...this.state.chartConfig,
						chart: {
							...this.state.chartConfig.chart, 
							height: this.props.fullCountryReport ? 500 : 600, 
						},
						title: {
							...this.state.chartConfig.title,
							text: title,
							margin: 40
						},
						// xAxis:{
						// 	...this.state.chartConfig.xAxis,
						// 	labels: {
						// 		distance:40
						// 	}
						// }
					}
				})
			}
		}
	}


	componentDidMount(){
		this.getLoadData(this.props.chartType);
        //this.getCredits(this.props.chartType[0].chart);
        if (this.props.chartType.length > 1) {
            this.setState({ typeCharts: this.props.chartType.map((chart) => chart.type) });
        }

        if (this.props.callbackSelectedSurvey)
		{
			if (this.props.chartType[0].type == 'ewcs') {
				this.props.callbackSelectedSurvey(this.props.chartType[1].type)
			} else {
				this.props.callbackSelectedSurvey(this.props.chartType[0].type)
			}
		}		
        this.updateDimension();
        window.addEventListener('resize', this.updateDimension);
	}

	componentDidUpdate(prevProps,prevState){
		if (prevProps.chartType !=  this.props.chartType)
		{
			if (this.props.chartType.length > 1) {
				this.setState({ typeCharts: this.props.chartType.map((chart) => chart.type) });
			}
			this.getLoadData(this.props.chartType);
            this.updateDimension();
		}		

		if(prevProps.selectCountry1 != this.props.selectCountry1){
			this.getLoadData(this.props.chartType)
		}
		if(prevProps.selectCountry2 != this.props.selectCountry2){
			this.getLoadData(this.props.chartType)
		}

		if (prevState.selectedTypeChart != this.state.selectedTypeChart) {
            this.getLoadData(this.props.chartType);
        }

        if (prevProps.type != this.props.type) {
            this.setState({ chartConfig: {...this.state.chartConfig, chart: {...this.state.chartConfig.chart, type: this.props.type} }})
        }
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimension);
	}

	render()
	{
		let selectDiv;
		if(this.props.showSelect){
            selectDiv = (
				<div className="select-filter-chart">
					<select onChange={this.onChangeSelect} value={this.state.selectedTypeChart} >
						{ this.state.typeCharts.map((type) => {
							return <option key={type} value={type} > {type.toUpperCase()} </option>
						})}
					</select>
				</div>
			)
		}

		return (
			<React.Fragment>
				{ this.state.selectedTypeChart && (
					<div className="select-filter-chart-wrapper">
						{ this.state.typeCharts.length > 1 && (
							selectDiv
						)}
					</div>
				)}
				<div>
					<HighchartsReact
						highcharts={Highcharts}
						options={this.state.chartConfig}
					/>
				</div>
			</React.Fragment>
		)
	}
}

export default SpiderChart;