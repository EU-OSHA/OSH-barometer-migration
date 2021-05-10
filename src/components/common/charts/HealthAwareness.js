import React, { Component } from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { getChartData, getDatasourceAndDates } from '../../../api';
import { largeSize } from '../utils/chartConfig';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class HealthAwareness extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            chartConfig: {
                title: {
                    text: "<h2 class='title--card'>"+ this.props.chartTitle[`L${this.props.chartType[0].title}`] + "</h3>",
                    align: 'left',
                    y: 20,
                    style: {
                        zIndex: 1,
                        lineHeight: 36
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
                    height: 450,
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
                    sourceWidth: largeSize
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
				legend:{
					//reversed: this.props.legend
					//verticalAlign: 'bottom',
					symbolRadius: 0,
					//layout: 'vertical',
					itemMarginTop:4,
					itemMarginBottom:4,
					itemDistance: 5,
					//width: 300,
					itemStyle: {
						fontFamily: 'OpenSans',
						fontWeight: 'normal',
						fontSize:'11px',
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
                    style: {
                        opacity: 1,
                        zIndex: 100
                    },
                    formatter: function () {
                        return '<ul class="tooltip-item">'+ 
						'<li><strong>Anwser: </strong>'+ this.series.name +' </li>' +
						'<li><strong>Country: </strong>'+ this.x  +' </li>' +
						'<li><strong class="tooltip-value up">Value: </strong> '+ this.y +'%</li>' +
						'</ul>';
                    },
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
							fontWeight: 'normal',
							fontSize:'12px',
                            color: '#808080'
						}
                    }
                },
                yAxis: {
                    gridLineColor:'#FFF',
                    gridLineWidth:2,
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
                    max: 100,
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        borderWidth: 0,
                        pointStart: 0
                    },
                    series: {
                        // stacking: 'normal',
                    }
                },
                series: {}
            },
            isLoading: false,
        }
    }

    getLoadData = (chartType) => {
        let categories = [];
        let auxSeries = [];
        let series = [];

        let euSeries1 = null;
        let euSeries2 = null;
       
        this.setState({ ...this.state, isLoading: true });
        this.props.callbackLegend(chartType[0].legend);

        try {
            getChartData(chartType[0].chart, chartType[0].chartIndicator, null, null, [chartType[0].sector], chartType[0].answers)
                .then((data) => {
                    data.resultset.forEach(element => {
                        euSeries1 = data.resultset[0].value;
                        euSeries2 = data.resultset[1].value;

                        if (categories.indexOf(element.country) == -1) {
                            categories.push(element.country);
                        }

                        let split = element.split;
                        if (!(split in auxSeries)) {
                            auxSeries[split] = [];
                        }

                        auxSeries[split].push({ name: element.country, y: element.value });
                    });
                    
                    for (let serie in auxSeries) {
                        series.push({ name: serie, data: auxSeries[serie] });
                    }

                    if (series.length < 3) {
                        series[0].data[0] = {...series[0].data[0], color: '#003399'}
                        series[1].data[0] = {...series[1].data[0], color: '#7f97ce'}
                    }

                    const reversedArray = [...series.reverse()];
                    if (series.length >= 3) {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, xAxis: {categories}, colors: this.props.colors}  });
                    } else {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, xAxis: {categories}, colors: this.props.colors.slice(1,3)} });
                    }
                })
        } catch (error) {
            console.log('Error fetching data: ', error.message)
        } finally {
            this.setState({ ...this.state, isLoading: false })
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

    componentDidMount() {
        this.getLoadData(this.props.chartType);
        this.getCredits(this.props.chartType[0].chart);
    }

    componentDidUpdate(prevProps, prevState) {

        // if (prevState.selectedTypeChart != this.state.selectedTypeChart) {
        //     this.getLoadData(this.props.chartType);
        // }
        
        if (prevProps.type != this.props.type) {
            this.setState({ chartConfig: {...this.state.chartConfig, chart: {...this.state.chartConfig.chart, type: this.props.type} }})
        }
    }
    
    render() {
        return (
            <div className='chart-container'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.chartConfig}
                    containerProps={{ className: 'chartContainer' }}
                />
            </div>
        );
    }
}

export default HealthAwareness;