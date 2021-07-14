import React, { Component } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/pattern-fill')(Highcharts);
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
				countrySelected: '',

				title: {
					text: this.props.title
				},

				tooltip: {
					enabled: false
				},

				credits: {
					enabled: false
				},
	
				colorAxis: {
					tickPixelInterval: 100
				},
				exporting: {
					enabled: false,
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
				},
				colorAxis: {
					//min: 1,
					type: 'linear',
					// minColor: 'rgb(82 159 162 / 10%)',
					// maxColor: 'rgb(82 159 162 / 100%)',
					// stops: [
					// 	[0, 'rgb(82 159 162 / 10%)'],
					// 	[0.67, 'rgb(82 159 162 / 67%)'],
					// 	[1, 'rgb(82 159 162 / 100%)']
					// ]
					minColor: '#dcecec',
                    maxColor: '#4a8e91',
					stops: [
                        [0, '#DAEBEC'],
                        // [0.25, '#badddd'],
                        [0.5, '#B4D6D7'],
                        // [0.75, '#78b4b6'],
                        [1,'#4a8e91'],
                    ]
                    // stops: [
                    //     [0.1, '#dcecec'],
                    //     [0.5, '#a8cfd0'],
                    //     [0.6, '#78b4b6'],
                    //     [0.8, '#519ea1'],
                    //     [1,'#529fa2'],
                    // ]
				},
				plotOptions: {
					map: {
                        nullColor: '#F0F0F0'
                    },
					series: {
						allowPointSelect: true,
						cursor: 'pointer',
						borderColor: '#c4c4c4',
						borderWidth: 2,
						states:{
							hover: {
								enabled: true,
								borderColor: '#57575A',
								//color:'#000000'
							},
							select: {
								color: '#f6a400'
							}
						},
						point: {
							events: {
								click: this.countrySelect = (e) =>  {
									if (this.state.countrySelected != e.point.name) {
										this.setState({
											countrySelected: e.point.name
										})


										this.handleSelect(e)
									} else {
										e.preventDefault()
									}
									
								}
							}
						}
					}
				},			
				series: []
			}
		}	
	}



	getLoadData = (select) => {
		const data = [];
		let series = [];
		getCountryDataMap(select)
			.then((response)=> response)
			.then((res) => 
		{
			let	seriesObject = { name: '', data:[] };
			let patternObject = { name: '', data: [], 					
				dataLabels: {
					enabled: true,
					color: '#000',
					y:-7,
					style: {
						textShadow: false, 
						textOutline: "#c7e2e3",
						fontFamily: 'OpenSans-Bold',
						fontSize:'14px'
					},
					formatter: function () {
						if (this.point.value) {
							if(this.point["hc-key"] === "gr"){
								return "EL";
							}else if(this.point["hc-key"] === "gb"){
								return "UK";
							}else{
								return this.point["hc-key"].toUpperCase();
							}
						}
					}
				}
			};
			let data = [];
			res.resultset.forEach((element)=>{						
				let countryCode = element.countryCode.toLowerCase();
				if (countryCode != 'eu27_2020' && countryCode != 'eu28')
				{
					if(countryCode === "el"){
						countryCode = "gr";
					}else if(countryCode === "uk"){
						countryCode = "gb";
					}
					data.push({ countryCode: countryCode, value: element.data[select] });
				}
			})
			
			data.forEach((element) => {
				if(element.value != undefined){
					seriesObject.data.push([element.countryCode, element.value]);

					if (element.countryCode == "no" || element.countryCode == "is" || element.countryCode == "ch")
					{
						patternObject.data.push({'hc-key': element.countryCode, value: element.value, color: {
							pattern: {
							path: {
								d: 'M 0 10 L 10 0 M -10 10 L 10 -10 M 8 12 L 12 8',
								strokeWidth: 2
							},
							color: '#fff',
							width: 10,
							height: 10,
							opacity: 0.6
							}
						}, borderColor:'white'});
					}
					else
					{
						patternObject.data.push({'hc-key': element.countryCode, value: element.value, borderColor: 'white'});
					}
				}
			})
			
			series.push(seriesObject);
			series.push(patternObject);

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

	componentDidUpdate(prevProps, prevState){
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

	render()
	{
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
