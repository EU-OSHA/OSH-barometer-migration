import React, { Component } from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { getChartData } from '../../../api';

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
                    text: "<h2 class='title--card'>"+this.props.chartTitle[`L${this.props.chartType[0].title}`]+"</h2>",
                    //text: this.props.chartTitle[`L${this.props.chartType[0].title}`],
                    align: 'left',
					widthAdjust: -100,
					y:20,
					style: {
						zIndex: 1,
						lineHeight:36
					}
                },
				credits: {
					enabled: false,
				},
                chart: {
                    height:450,
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
					borderColor:"#CCC",
					// followPointer: true,
					// followTouchMove: true,
					style: {
						zIndex: 100
					},
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>Anwser: </strong>'+ this.series.name +' </li>' +
						'<li><strong>Country: </strong>'+ this.x  +' </li>' +
						'<li><strong class="tooltip-value up">Value: </strong> '+ Highcharts.numberFormat(this.y,0,',','.') +'%</li>' +
						'</ul>';
					}
				},
                xAxis: {
                    max: this.props.yAxisMax,
                    plotLines: [
                        {
                            color: 'black',
                            width: '2',
                            value: 0.5
                        },
                        {
                            color: 'black',
                            width: '2',
                            value: 29.5
                        }
                    ],
                    labels: {
                        style: {
							fontFamily: 'OpenSans-bold',
							fontWeight: 'normal',
							fontSize:'12px',
                            color:xAxisColor
						}
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
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
                    series: {
                        stacking: 'normal',
                        pointStart: 0,
                    }
                },
                series: []
            },
            isLoading: true,
            typeCharts: [],
            selectedTypeChart: this.props?.chartType[0].type
        }
    }
    
    onChangeSelect = (e) => {
        this.setState({ selectedTypeChart: e.target.value });

        const serie = this.props.chartType.find((chart) => chart.type == e.target.value);
        this.setState({ chartConfig: {...this.state.chartConfig, title: {...this.state.chartConfig.title, text: "<h2 class='title--card'>"+this.props.chartTitle[`L${serie.title}`]+"</h2>" } } })
    }
    
    getLoadData = (chartType) => {
        let categories = [];
        let auxSeries = [];
        let series = [];

        let euSerie1 = null;
        let euSerie2 = null;
        let chart
        
        if (chartType.length > 1) {
            chart = chartType.find((chart) => chart.type == this.state.selectedTypeChart);
        } else {
            chart = chartType[0];
            this.setState({ selectedTypeChart: null })
        }
        
        this.setState({ ...this.state, isLoading: true });
        try {
            getChartData(chart.chart, chart.chartIndicator, null, null, chart.sector, chart.answers)
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
                            if (serie == 'Yes' || serie == 'Once or more' || serie == 'Mean') {
                                const euValueSerie1 = {...auxSeries[serie][0], color: euColor}
                                auxSeries[serie][0] = euValueSerie1
                            }
                            if (serie == 'No' || serie == 'Never' ) {
                                const euValueSerie2 = {...auxSeries[serie][0], color: euColorLight}
                                auxSeries[serie][0] = euValueSerie2
                            }
                        series.push({ name: serie, data: auxSeries[serie] });
                    }

                    const reversedArray = [...series].reverse();
                    if (series.length == 2) {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors.slice(1,3)}})                        
                    } else if (series.length == 1) {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors.slice(2,3)}})  
                    } else {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, colors: this.props.colors}})
                    }
                });
        } catch (error) {
            console.log('error', error)    
        } finally {
            setTimeout(() => {
                this.setState({ ...this.state, isLoading: false })
            }, 20);
        }
    }

    componentDidMount() {
        this.getLoadData(this.props.chartType);
        this.setState({ typeCharts: this.props.chartType.map((chart) => chart.type) });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedTypeChart != this.state.selectedTypeChart) {
            this.getLoadData(this.props.chartType);
        }

        if (prevProps.type != this.props.type) {
            this.setState({ chartConfig: {...this.state.chartConfig, chart: {...this.state.chartConfig.chart, type: this.props.type} }})
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.selectedTypeChart && (
                    <div className="select-filter-chart">
                        <select onChange={this.onChangeSelect} >
                            {this.state.typeCharts.map((type) => {
                                return <option key={type} value={type} > {type.toUpperCase()} </option>
                            })}
                        </select>
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