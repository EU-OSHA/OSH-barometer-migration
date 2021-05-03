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
						lineWidth: 0
					},
					plotOptions: {
						series: {
							colors: this.props.colors,
						},
						line: {
							dataLabels: {
								enabled: this.props.showDataLabel === true ? true : false,
								formatter: function () {
									return '<span style="color: ' + this.point.color + '">' + this.y + '%</span>';
								}
							}
						}
					},
					yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				min: 0
					},
					tooltip: {
						 	useHTML: true,
						//	shared: true,
						// 	pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y} % </b><br>',
						//	headerFormat: `<b>{series.name}</b><br>`,
						// // formatter: function ()  {
						// // 	return '<span style="color:{series.color}">:' + this.series.name +' <b> % </b><br>'
						// // }
						formatter: function () {
							if (this.point.x == '0'){
								return '<ul class="tooltip-item">'+
								'<li> ' + 'Are you exposed to vibrations from tools or machinery?' + '</li>' +
								'<li><strong>Country: </strong> ' + this.series.name +': '+ this.y +'%</li>' + '</li>' +
								'</ul>';
							}else if (this.point.x == '1'){
								return '<ul class="tooltip-item">'+
								'<li> ' + 'Are you exposed to loud noise?' + '</li>' +
								'<li><strong>Country: </strong> ' + this.series.name +': '+ this.y +'%</li>' + '</li>' +
								'</ul>';
							}else if (this.point.x == '2'){
								return '<ul class="tooltip-item">'+
								'<li> ' + 'Are you exposed to high temperatures?' + '</li>' +
								'<li><strong>Country: </strong> ' + this.series.name +': '+ this.y +'%</li>' + '</li>' +
								'</ul>';
							}{
								return '<ul class="tooltip-item">'+
								'<li>' + 'Are you exposed to low temperatures?' + '</li>' +
								'<li><strong>Country: </strong> ' + this.series.name +': '+ this.y +'%</li>' + '</li>' +
								'</ul>';
							}
							
								

						}
					},
					
		
					series: [
					{pointPlacement: 'on'}, 
					{pointPlacement: 'on'},
					{pointPlacement: 'on', color:'#003399'}],
				
			},
			typeCharts:[],
			selectedTypeChart: this.props.chartType[0].type
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
            // this.props.callbackLegend(chart.legend);
        } else {
            chart = chartType[0];
            this.setState({ selectedTypeChart: null });
        }

		if (chart.chart == '20080'){
			categories =['Positions','Sitting','Loads','Movements','Lifting and moving']
		}else if (chart.chart == '20049'){
			categories =['Vibrations from tools or machinery','Loud noise','High temperatures','Low temperatures']
		}else {
			categories =['Positions','Loads','Movements','Sitting']
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
							element.data['Does your work involve tiring or painful positions?'],
							element.data['Does your work involve sitting?'],
							element.data['Does your work involve carrying or moving heavy loads?'],
							element.data['Does your work involve repetitve hand or arm movements?'],
							element.data['Does your work involve lifting or moving people?']
							)
					}else if(chart.chart == '20049'){
						auxSeries[split].push(
							element.data['Are you exposed to vibrations from tools or machinery?'],
							element.data['Are you exposed to loud noise?'],
							element.data['Are you exposed to high temperatures?'],
							element.data['Are you exposed to low temperatures?'],
							)
					}else{
						auxSeries[split].push(
							element.data['Tiring or painful positions'],
							element.data['Lifting or moving people or heavy loads'],
							element.data['Repetitive hand or arm movements'],
							element.data['Prolonged sitting'],
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
            this.props.callbackSelectedSurvey(this.props.chartType[0].type)
        } else {
            this.props.callbackSelectedSurvey(this.props.chartType[0].type)
        }
        this.updateDimension();
        window.addEventListener('resize', this.updateDimension);
	}

	componentDidUpdate(prevProps,prevState){
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
		return (
			<>
			{this.state.selectedTypeChart && (
                        <div className="select-filter-chart-wrapper">
                            {this.state.typeCharts.length > 1 && (
                                <div className="select-filter-chart">
                                    <select onChange={this.onChangeSelect} value={this.state.selectedTypeChart} >
                                        {this.state.typeCharts.map((type) => {
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