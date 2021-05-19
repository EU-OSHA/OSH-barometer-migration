import React, { Component } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getCountryDataMap } from '../../../api'
import { nodeName, timers } from 'jquery';



class MapChart extends Component {
	 
	constructor(props) {
		super(props);
		
		this.handleSelect = this.handleSelect.bind(this)
		this.state ={
				select:"",
			chartConfig: {
				chart: {
					map: require('@highcharts/map-collection/custom/europe.geo.json'),
					spacingBottom: 20,
					height: 800,
					width: 1024,
					backgroundColor: '#F0F0F0'
				},

				title: {
					text: this.props.title
				},

				credits: {
					enabled: false
				},
	
				colorAxis: {
					tickPixelInterval: 100
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
						y: 4
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					y: 45,
					//backgroundColor: 'rgba(255,255,255,0.85)',
					//floating: true,
					//y: 25
				},
				colorAxis: {
							//min: 1,
							type: 'logarithmic',
							minColor: 'rgb(82 159 162 / 10%)',
							maxColor: 'rgb(82 159 162 / 100%)',
							stops: [
								[0, 'rgb(82 159 162 / 10%)'],
								[0.67, 'rgb(82 159 162 / 67%)'],
								[1, 'rgb(82 159 162 / 100%)']
							]
						},
						plotOptions: {
							series: {
								allowPointSelect: true,
								cursor: 'pointer',
								states:{
									hover: {
										//enabled: true,
										//color:'#000000'
									},
									select: {
										color: '#f6a400',
										dashStyle: 'dot'
									}

								},
								point: {
									events: {
										click: this.countrySelect = (e) =>  {
											this.handleSelect(e)
										}
									}
								}
							}
						},
			
				series: [{
					//name: "country",
					//data:[['de',4]	],
					
					dataLabels: {
						enabled: true,
						color: '#000',
						y:-10,
						style: {
							textShadow: false, 
							textOutline: "#c7e2e3",
							fontFamily: 'OpenSans-Bold',
							fontSize:'14px'
						},
						formatter: function () {
							if (this.point.value) {
								return this.point.name;
							}
						}
					},
					tooltip: {
						enabled:false,
						headerFormat: '',
						pointFormat: '<strong style="font-size:14px;font-family:OpenSans-Bold">{point.name}</strong> <br>Median age of population: <strong style="font-size:14px;font-family:OpenSans-Bold">{point.value}</strong> Years'
					}
				}]
			}
		}	
	}



	getLoadData = (select) => {
		const datos = [];
		let series = [];
		let auxSeries = [];
		let name = [];
		getCountryDataMap(select)
			.then((response)=> response)
			.then((res) => {
			//console.log(select)
		let	seriesObject = {name: '', data:[]}
				const option =	res.resultset.forEach((element)=>{
						
					//seriesObject.name.push(element.countryCode) 
					datos.push(element.countryCode.toLowerCase(),element.data[select])
					})
					
					for (let i = 0; i< datos.length; i += 2){
						let arry = datos.slice(i,i+2)
						seriesObject.data.push(arry);	
						}
					series.push(seriesObject)

			this.setState({chartConfig: {...this.state.chartConfig, series }})
	});
		
	}

	componentDidMount() {
		this.getLoadData(this.props.select);
	}

	handleSelect = (e) =>{
		 const country = e.point.name
		 const {handleSearch}= this.props
		handleSearch(country)
	}

	componentDidUpdate(prevProps){
		if (prevProps.select != this.props.select){
			this.getLoadData(this.props.select)
		}
		if(prevProps.title != this.props.title){
			this.setState({chartConfig: {...this.state.chartConfig, title:{...this.state.chartConfig.title, text: this.props.title}}})
		}
		if (prevProps.unselect != this.props.unselect){
			this.getLoadData(this.props.select)
		}
	}

// url map
//@highcharts/map-collection/custom/europe.geo.json


	render()
	{	
		//mapa
		
		return(
			<div>
				<HighchartsReact
					highcharts={Highcharts}
					options={this.state.chartConfig}
					constructorType='mapChart'
				/>
			</div>
		);
	}
}

export default MapChart;
