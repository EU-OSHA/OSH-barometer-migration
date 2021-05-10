import React, { Component } from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { getChartData, getDatasourceAndDates } from '../../../api';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const xAxisColor = "#808080";
const euColor = "#003399";
const euColorLight = "#7f97ce";

class MentalRiskCharts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartConfig: {
                title: {
                    text: "<h2 class='title--card'>"+this.props.literals[`L${this.props.chartType[0].title}`]+"</h2>",
                    //text: this.props.chartTitle[`L${this.props.chartType[0].title}`],
                    align: 'left',
					widthAdjust: -50,
					y:20,
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
                chart: {
                    height: window.innerWidth > 768 ? 450 : 770,
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
					buttons: {
						contextButton: {
							menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"]							
						}
					},
                    sourceWidth: 1300,
                    filename: this.props.literals[`L${this.props.chartType[0].title}`].replace(/ /g, '_')
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
						y: 0
					}
				},
				legend:{
					//reversed: this.props.legend
					//verticalAlign: 'bottom',
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
						//width: 150
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
						'<li><strong>Anwser: </strong>'+ this.series.name +' </li>' +
						'<li><strong>Country: </strong>'+ this.x  +' </li>' +
						'<li><strong class="tooltip-value up">Value: </strong> '+ this.y +'%</li>' +
						'</ul>';
					}
				},
                xAxis: {
                    lineWidth: 0,
                    max: this.props.yAxisMax,
                    plotLines: [
                        {
                            color: 'black',
                            width: '2',
                            value: 0.5,
                            zIndex:1
                        },
                        {
                            color: 'black',
                            width: '2',
                            value: 29.5,
                            zIndex:1
                        }
                    ],
                    labels: {
                        style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'bold',
							fontSize:'12px',
                            color:xAxisColor
						}
                    }
                },
                yAxis: {
                    gridLineColor:'#FFF',
                    gridLineWidth:2,
                    title: {
                        text: ''
                    },
                    gridLineColor: '#FFF',
                    gridLineWidth: 2,
                    labels: {
						format: this.props.percentage === true ? '{value:,.0f} %' : `{value:,.0f} ${this.props.percentage}`,
						style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize:'12px'
						}
                    },
                    min: 0,
                    max: 100
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                      borderWidth: 0,  
                      pointStart: 0,
                        states: {
                            inactive: {
                                opacity: 1
                            }
                        },
                        point: {
                            events: {
                                mouseOver: function () {
                                    let series = this.series.data;
                                    series.forEach((p) => {
                                        p.setState('hover')
                                    });
                                },
                                mouseOut: function () {
                                    let series = this.series.data;
                                    series.forEach((p) => {
                                        p.setState();
                                    })
                                }
                            }
                        }
                    }
                },
                series: []
            },
            isLoading: true,
            typeCharts: [],
            selectedTypeChart: this.props.chartType[0].type
        }
    }
    
    onChangeSelect = (e) => {
        this.setState({ selectedTypeChart: e.target.value });
        this.props.callbackSelectedSurvey(e.target.value);

        const serie = this.props.chartType.find((chart) => chart.type == e.target.value);
        if (window.innerWidth > 768 ) {
            this.setState({ 
                chartConfig: {
                    ...this.state.chartConfig, 
                    title: {
                        ...this.state.chartConfig.title, 
                        text: "<h2 class='title--card'>"+this.props.literals[`L${serie.title}`]+"</h2>" 
                    },
                    exporting: {
                        ...this.state.chartConfig.exporting, 
                        filename: this.props.literals[`L${serie.title}`].replace(/ /g, '_')
                    }
                } 
            })
        }
    }
    
    getLoadData = (chartType) => {
        //console.log('getLoadData');
        let categories = [];
        let auxSeries = [];
        let series = [];

        let euSerie1 = null;
        let euSerie2 = null;
        let chart = [];

        
        if (chartType.length > 1) {
            chart = chartType.find((chart) => chart.type == this.state.selectedTypeChart);
            // this.props.callbackLegend(chart.legend);
        } else {
            chart = chartType[0];
            this.setState({ selectedTypeChart: null });
        }

        this.props.callbackLegend(chart.legend);

        this.setState({ ...this.state, isLoading: true });
        try {
            getChartData(chart.chart, chart.chartIndicator, null, null, [chart.sector], chart.answers)
                .then((data) => {
                    euSerie1 = data.resultset[0].value
                    euSerie2 = data.resultset[1].value
                   

                    data.resultset.forEach(element => {
                        if (categories.indexOf(element.country) == -1) {
                            categories.push(element.country)
                        }
    
                        let split = element.split;
                        if (!(split in auxSeries)) {
                            auxSeries[split] = []
                        }
                        
                        auxSeries[split].push({ name: element.country, y: element.value });
                    });

                    for (let serie in auxSeries) {
                            if (serie == 'Yes' || serie == 'Once or more' || serie == 'Mean' || serie == 'At least 1/4 of the time') {
                                const euValueSerie1 = {...auxSeries[serie][0], color: euColor}
                                auxSeries[serie][0] = euValueSerie1
                            }
                            if (serie == 'No' || serie == 'Never' || serie == 'Less than 1/4 of the time' ) {
                                const euValueSerie2 = {...auxSeries[serie][0], color: euColorLight}
                                auxSeries[serie][0] = euValueSerie2
                            }
                        series.push({ name: serie, data: auxSeries[serie] });

                    }
                       const arr = series.slice(0,1)
                       const arr1 = series.slice(1,2)
                       const arr2 = series.slice(2,3)
                       const array = arr1.concat(arr,arr2).reverse()

                    const reversedArray = [...series].reverse();
                    if (series.length == 2) {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors.slice(1,3), legend: {...this.state.chartConfig.legend, enabled: true}, xAxis: {...this.state.chartConfig.xAxis, plotLines: [{width: '2', color: 'black', value: 0.5, zIndex:1}, {width: '2', color: 'black', value: 27.5, zIndex:1}] ,categories} }})                        
                        // if (categories.length < 31) {
                        //     console.log('trigger 1.1', categories.length)
                        // }
                        
                        // if (categories.length > 30) {
                        //     console.log('trigger 1.2', categories.length)
                        //     this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors.slice(1,3), xAxis: {plotLines: [{width: '2', color: 'black', value: 0.5}, {width: '2', color: 'black', value: 27.5}] ,categories} }})                        
                        // }
                        
                    } else if (series.length == 1) {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors.slice(2,3), legend: {...this.state.chartConfig.legend, enabled: false}, xAxis: {...this.state.chartConfig.xAxis,plotLines: [{width: '2', color: 'black', value: 0.5, zIndex:1}, {width: '2', color: 'black', value: 27.5, zIndex:1}], categories} }})  
                        // if (categories.length < 31) {
                        //     console.log('trigger 2.1', categories.length)
                        // }

                        // if (categories.length > 30) {
                        //     console.log('trigger 2.1', categories.length)
                        //     this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors.slice(2,3), xAxis: {plotLines: [{width: '2', color: 'black', value: 0.5}, {width: '2', color: 'black', value: 29.5}], categories} }})  
                        // }
                    } else if (series[0].name == 'Yes, but only some of them'){
                        this.setState({ chartConfig: {...this.state.chartConfig, series: array, colors: this.props.colors, legend: {...this.state.chartConfig.legend, enabled: true}, xAxis: {plotLines: [{width: '2', color: 'black', value: 0.5, zIndex:1}, {width: '2', color: 'black', value: 27.5, zIndex:1}], labels: { style: {fontFamily: 'OpenSans-bold', fontWeight: 'normal', fontSize:'12px', color:xAxisColor}}, categories} }})
                        // if (categories.length < 31) {
                        //     console.log('trigger 3.1', categories.length)
                        // }

                        // if (categories.length > 31) {
                        //     console.log('trigger 3.2', categories.length)
                        //     this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors, xAxis: {plotLines: [{width: '2', color: 'black', value: 0.5}, {width: '2', color: 'black', value: 29.5}], categories} }})
                        // }
                    }else{
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors, legend: {...this.state.chartConfig.legend, enabled: true}, xAxis: {plotLines: [{width: '2', color: 'black', value: 0.5, zIndex:1}, {width: '2', color: 'black', value: 27.5, zIndex:1}], labels: { style: {fontFamily: 'OpenSans-bold', fontWeight: 'normal', fontSize:'12px', color:xAxisColor}}, categories} }})
                    }
                });
        } catch (error) {
            console.log('error', error)    
        } finally {
            setTimeout(() => {
                this.setState({ ...this.state, isLoading: false })
            }, 50);
        }
    }

    getCredits = (chart) => {
        getDatasourceAndDates(chart).then((res)=>{
            let text = res;
            this.setState({
                chartConfig: {...this.state.chartConfig, credits: {...this.state.chartConfig.credits, text}}
            })
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

    componentDidMount() {
        this.getLoadData(this.props.chartType);
        this.getCredits(this.props.chartType[0].chart);
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

    componentDidUpdate(prevProps, prevState) {
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
    
    render() {
        return (
            <React.Fragment>
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
                    {!this.state.isLoading && (
                        <div className='chart-container'>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={this.state.chartConfig}
                                containerProps={{ className: 'chartContainer' }}
                            />
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default MentalRiskCharts;