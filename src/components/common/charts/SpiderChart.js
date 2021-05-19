import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getSpiderChart} from '../../../api'
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

class SpiderChart extends Component{
	constructor(props) {
		super(props);

		this.state = {
			chartConfig: {
				colors: this.props.colors,
					chart: {
				backgroundColor: '#F0F0F0',
				polar: true,
				type: 'line'
				},
					title: {
						text: "<h2 class='title--card'>"+this.props.literals[`L${this.props.chartType[0].title}`]+"</h2>",
				align: 'left'
				//x: -180
					},
					
					pane: {
							size: '100%'
					},
		
					xAxis: {
						//categories: ['Vibrations from tools or machinery','Loud noise','High temperatures','Low temperatures'],
						tickmarkPlacement: 'on',
						lineWidth: 0,
						gridLineColor: '#000000',
						gridLineWidth: 0.25,
					},
					plotOptions: {
						series: {
							colors: this.props.colors,
						},
						line: {
							dataLabels: {
								style: {
									textOutline: 0,
									textShadow: false,
									fontFamily: 'OpenSans-Bold',
									fontSize:'14px'
								},
								enabled: this.props.showDataLabel === true ? true : false,
								formatter: function () {
									return '<span style="color: ' + this.point.color + '">' + this.y + '%</span>';
								}
							}
						}
					},
					yAxis: {
				gridLineInterpolation: 'polygon',
				gridLineColor: '#000000',
				gridLineWidth: 0.25,
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
								return ['<b>' + 'Are you exposed to vibrations from tools or <br>machinery?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : []	);
							}else if (this.x == props.literals.L22155){
								return ['<b>' + 'Are you exposed to loud noise?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : []	);
							}else if (this.x == props.literals.L22156){
								return ['<b>' + 'Are you exposed to high temperatures?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22154){
								return ['<b>' + 'Are you exposed to low temperatures?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22161){
								return ['<b>' + 'Does your work involve tiring or <br>painful positions?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22165){
								return ['<b>' + 'Does your work involve carrying or <br>moving heavy loads?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22163){
								return ['<b>' + 'Does your work involve sitting?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22164){
								return ['<b>' + 'Does your work involve repetitve hand or <br>arm movements?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22162){
								return ['<b>' + 'Does your work involve lifting or <br>moving people?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22171){
								return ['<b>' + 'Did the employees have a role in the design and set-up <br>of the measures to address psychosocial risks?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22172){
								return ['<b>' + 'Does your organisation have a health and <br>safety delegate or committee?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22173){
								return ['<b>' + 'Does your organisation have a trade union, <br>works council or a similar committee <br>representing employees?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22174){
								return ['<b>' + 'Are health and safety issues regularly discussed <br>in staff or team meetings? <br>(Regularly and Occasionally)' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22175){
								return ['<b>' + 'How often controversies related to health and safety arise? <br>(Sum of often and sometimes)' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22176){
								return ['<b>' + 'Does your organisation have a regular meeting <br>in which employees can express their views <br>about what is happening in the organisation?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22177){
								return ['<b>' + 'Does your organisation have a trade union, <br>works council or a similar committee <br>representing employees?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}else if (this.x == props.literals.L22178){
								return ['<b>' + 'Does your organisation have a health and safety <br>delegate or committee?' + '</b><br><br>'].concat(
									this.points ? this.points.map(function (point) {
											return point.series.name + ': ' + point.y + '% '+'<br>';
										}) : [] );
							}
						},
						//split: true,
						shared:true
					},
					
		
					series: [
					{pointPlacement: 'on'}, 
					{pointPlacement: 'on'},
					{pointPlacement: 'on', color:'#003399'}],
				
			},
			typeCharts:[],
			selectedTypeChart: this.props.dataset
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
				let split = element.countryCode;
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
				this.setState({ chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series, colors:['#f6a400','#cbe2e3','#003399']  }})
			}else{
				this.setState({ chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series}})
			}
			
		})

	}


	updateDimension = () => {
		if (window.innerWidth > 768) {
			this.setState({ chartConfig: {...this.state.chartConfig, chart: {...this.state.chartConfig.chart, height: 450}, title: {...this.state.chartConfig.title, text: "<h2 class='title--card'>"+this.props.literals[`L${this.props.chartType[0].title}`]+"</h2>"}} });
		} else {
            const shortTitle = this.props.literals[`L${this.props.tabIndicator}`]
			this.setState({ chartConfig: {...this.state.chartConfig, chart: {...this.state.chartConfig.chart, height: 770}, title: {...this.state.chartConfig.title, text: "<h2 class='title--card'>"+shortTitle+"</h2>"}} });
		}
	}


	componentDidMount(){
		this.getLoadData(this.props.chartType);
        //this.getCredits(this.props.chartType[0].chart);
        if (this.props.chartType.length > 1) {
            this.setState({ typeCharts: this.props.chartType.map((chart) => chart.type) });
        }

        if (this.props.chartType[0].type == 'ewcs') {
            this.props.callbackSelectedSurvey(this.props.chartType[1].type)
        } else {
            this.props.callbackSelectedSurvey(this.props.chartType[0].type)
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

	render()
	{
		console.log('Render Spider selectedTypeChart', this.state.selectedTypeChart);
		return (
			<>
				{ this.state.selectedTypeChart && (
					<div className="select-filter-chart-wrapper">
						{ this.state.typeCharts.length > 1 && (
							<div className="select-filter-chart">
								<select onChange={this.onChangeSelect} value={this.state.selectedTypeChart} >
									{ this.state.typeCharts.map((type) => {
										return <option key={type} value={type} > {type.toUpperCase()} </option>
									})}
								</select>
							</div>
						)}
					</div>
				)}
				<div>
					<HighchartsReact
						highcharts={Highcharts}
						options={this.state.chartConfig}
					/>
				</div>
			</>
		)
	}
}

export default SpiderChart;