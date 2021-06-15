import React, { Component } from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { getChartData, getDatasourceAndDates } from '../../../api';
import { isFullscreen } from '../utils/Utils';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const xAxisColor = "#808080";
const euColor = "#003399";
const euColorLight = "#7f97ce";

class PreventionChart extends Component {
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
					enabled: this.props.exportingEnabled,
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
					borderColor:"#529FA2",
					// followPointer: true,
					// followTouchMove: true,
					style: {
						zIndex: 100
					},
					formatter: function () {
						return '<ul class="tooltip-item">'+
						'<li><strong>Country: </strong>'+ this.series.name +' </li>' +
						'<li><strong>Answer: </strong>'+ this.x  +' </li>' +
						'<li><strong class="tooltip-value up">Value: </strong> '+ this.y +'%</li>' +
						'</ul>';
					}
				},
                xAxis: {
                    lineWidth: 0,
                    max: this.props.yAxisMax,
                    // plotLines: [
                    //     {
                    //         color: 'black',
                    //         width: '2',
                    //         value: 0.5,
                    //         zIndex:1
                    //     },
                    //     {
                    //         color: 'black',
                    //         width: '2',
                    //         value: 29.5,
                    //         zIndex:1
                    //     }
                    // ],
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
                    max: 100,
                    //tickInterval:20,
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            overflow: 'none',
                            crop: false,
                            allowOverlap: true,
                            style: {
								textOutline: 0,
								textShadow: false,
								fontFamily: 'OpenSans-Bold',
								fontSize:'12px'
							},
							formatter: function () {
								return '<span style="color: ' + this.point.color + '">' + this.y + '%</span>';
							},
                        },
                        borderWidth: 0,  
                        pointStart: 0,
                        states: {
                            inactive: {
                                opacity: 1
                            }
                        },
                        pointPadding: 0.15,
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
            // selectedTypeChart: this.props.chartType[0].type,
            selectedTypeChart: this.props.selectedIndicator != undefined ? this.props.selectedIndicator :  this.props.chartType[0].type,
            country1: this.props.selectedCountry1,
            country2: this.props.selectedCountry2
        }
    }
    
    onChangeSelect = (e) => {
        console.log(e.target.value)
        this.setState({ selectedTypeChart: e.target.value });
        this.props.callbackSelectedSurvey(e.target.value);

        const serie = this.props.chartType.find((chart) => chart.type == e.target.value);
        if (window.innerWidth > 768 ) {
            this.setState({ chartConfig: {...this.state.chartConfig, title: {...this.state.chartConfig.title, text: "<h2 class='title--card'>"+this.props.literals[`L${serie.title}`]+"</h2>" } } })
        }
    }
    
    getLoadData = (chartType) => {
        //console.log('');
        let categories = [];
        let auxSeries = [];
        let series = [];

        let euSerie1 = null;
        let euSerie2 = null;
        let chart = [];
        
        if (chartType.length > 1) {
            chart = chartType.find((chart) => chart.type == this.state.selectedTypeChart);
            if(this.props.callbackLegend != undefined){
                this.props.callbackLegend(chart.legend);
            }
        } else {
            chart = chartType[0];
            this.setState({ selectedTypeChart: null });
        }

        this.setState({ ...this.state, isLoading: true });
        try {
            getChartData(chart.chart, chart.chartIndicator, this.props.selectedCountry1, this.props.selectedCountry2, chart.sector, chart.answers, chart.size)
                .then((data) => {
                    //euSerie1 = data.resultset[0].value
                    //euSerie2 = data.resultset[1].value
                   

                    data.resultset.forEach(element => {
                        if (categories.indexOf(element.countryCode) == -1) {
                            categories.push(element.split)
                        }
    
                        let split = element.countryCode;
                        if (!(split in auxSeries)) {
                            auxSeries[split] = []
                        }
                        
                        auxSeries[split].push(element.value );
                    });

                    for (let serie in auxSeries){
                        series.push({ name:serie , data: auxSeries[serie] })
                    }

                    this.setState({
                        chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series, colors: this.props.colors}
                    })
                    
                   if (series.length ==3){
                       this.setState({ chartConfig: {...this.state.chartConfig, xAxis: {...this.state.chartConfig.xAxis, categories}, series, colors:['#f6a400','#529FA2','#003399']}})
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
        const width = window.innerWidth;
        const height = window.innerHeight;
        const title =  "<h2 class='title--card'>"+this.props.literals[`L${this.props.chartType[0].title}`]+"</h2>"
        const tabTitle = "<h2 class='title--card'>"+this.props.literals[`L${this.props.tabIndicator}`]+"</h2>"

        if (width > 767) {
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
                        chart: {...this.state.chartConfig.chart, height: 450, type: 'column'},
                        title: {...this.state.chartConfig.title, text: this.props.title != undefined ? "<h2 class='title--card'>"+this.props.title+"</h2>" : `<h2 class='title--card'>${title}</h2>`}
                        // title: {...this.state.chartConfig.title, text: title}
                    }
                });
            }
        }

        if (width < 768) {
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
                        chart: {...this.state.chartConfig.chart, height: 770},
                        title: {...this.state.chartConfig.title, text: tabTitle}
                    }
                })
            }
        }
    }

    componentDidMount() {
        this.getLoadData(this.props.chartType);
        this.getCredits(this.props.chartType[0].chart);
        if (this.props.chartType.length > 1) {
            this.setState({ typeCharts: this.props.chartType.map((chart) => chart.type) });
        }

        if (this.props.chartType[0].type == 'ewcs') {
            if(this.props.callbackSelectedSurvey != undefined){
                this.props.callbackSelectedSurvey(this.props.chartType[0].type)
            }
        } else {
            if(this.props.callbackSelectedSurvey != undefined){
                this.props.callbackSelectedSurvey(this.props.chartType[0].type)
            }
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

        if (prevProps.selectedCountry1 != this.props.selectedCountry1){
            this.getLoadData(this.props.chartType);
        }
        if (prevProps.selectedCountry2 != this.props.selectedCountry2){
            this.getLoadData(this.props.chartType);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }
    
    render() {
        let selectDiv;
        if(this.props.showSelect){
            selectDiv = (
                <div className="select-filter-chart">
                    <select onChange={this.onChangeSelect} value={this.state.selectedTypeChart} >
                        {this.state.typeCharts.map((type) => {
                            return <option key={type} value={type} > {type.toUpperCase()} </option>
                        })}
                    </select>
                </div>
            )
        }

        return (
            <React.Fragment>
                    {this.state.selectedTypeChart && (
                        <div className="select-filter-chart-wrapper">
                            {this.state.typeCharts.length > 1 && (
                                selectDiv
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

export default PreventionChart;