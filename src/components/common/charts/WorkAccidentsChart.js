import React, { Component } from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { getChartData, getDatasourceAndDates } from '../../../api';
import { isFullscreen } from '../utils/Utils';
import { xlsxCustomExport } from '../utils/chartConfig';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const xAxisColor = "#808080";
class WorkAccidentsChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartConfig: {
                title: {
                    // useHTML: true,
                    // text: "<h2 class='title--card'>"+this.props.title+"</h2>",
                    text: props.fullCountryReport == true ? '' : "<h2 class='title--card'>"+this.props.title+"</h2>",
                    align: 'left'
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
                colors: this.props.colors,
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
                                chart.customImage.attr({
									class:'osha-logo'
								});
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
					enabled: props.fullCountryReport == true ? false : true,
					buttons: {
						contextButton: {
							menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"]							
						}
					},
                    menuItemDefinitions: {
                        "downloadXLS": {
                            onclick: function() {
                                xlsxCustomExport('Trend', this.series, this.title.textStr);
                            }
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
                yAxis: {
                    title: {
                        text: ''
                    }
                },
				tooltip: {},
                plotOptions: {},
                series: []
            },
            isLoading: false
        }
    }

    // Init chart config so the Chart loads correctly
    initChart = () => {
        this.setState({ chartConfig: {
            title: {
                //useHTML: true,
                text: this.props.fullCountryReport == true ? '' : "<h2 class='title--card'>"+this.props.title+"</h2>",
                align: 'left',
                widthAdjust: 0,
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
            colors: this.props.colors,
            chart: {
                height: window.innerWidth > 768 ? this.props.fullCountryReport == true ? 250 : 450 : 770,
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
                           chart.customImage.attr({
                            class:'osha-logo'
                        });
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
                enabled: this.props.fullCountryReport == true ? false : true,
                buttons: {
                    contextButton: {
                        menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"]							
                    }
                },
                sourceWidth: this.props.chartSize,
                filename: this.props.title.replace(/ /g, '_')
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
            yAxis: {
                gridLineColor: '#FFF',
                gridLineWidth: 2,
                startOnTick: true,
                endOnTick: true,
                tickInterval: this.props.step ? this.props.step : null,
                max: this.props.yAxisMax ? this.props.yAxisMax : null,
                title: {
                    text: ''
                },
                labels: {
                    format: this.props.percentage === true ? '{value}%' : `{value}`,
                    style: {
                        fontFamily: 'OpenSans-bold',
                        fontWeight: 'normal',
                        fontSize:  this.props.fullCountryReport ? '10px' : '12px',
                        textOverflow: 'none'
                    }
                }
            },
            xAxis: {
                lineWidth: 0,
                labels: {	
                    style: {
                        fontFamily: 'OpenSans-bold',
                        fontWeight: 'normal',
                        fontSize:'12px',
                        fontSize: this.props.fullCountryReport ? '10px' : '12px' ,
                        textOverflow: 'none'
                    }
                }
            },
            plotOptions: {},
            series: []
        } })
    }
    
    // Gets data for the selected Chart
    getLoadData = (chart, indicator, country1, country2) => {
        let categories = [];
        let series = [];
        let auxSeries = [];
        let firstDataEuColor = null
        let secondDataEuColor = null

        this.initChart();
        getChartData(chart, indicator, country1, country2)
            .then((data) => {
                firstDataEuColor = data.resultset[0].value
                secondDataEuColor = data.resultset[1].value;
                
                try {
                    this.setState({ ...this.state, isLoading: true });
                    data.resultset.forEach(element => {
                        if (this.props.type == 'line') {
    
                            if (categories.indexOf(element.split) == -1) {
                                categories.push(element.split);
                            }
    
                            let country = element.country;
                            if (!(country in auxSeries)) {
                                auxSeries[country] = []
                            }
                            auxSeries[country].push(element.value);
                        }

                        if (this.props.type == 'column' || this.props.type == 'bar') {

                            if (categories.indexOf(element.country) == -1) {
                                categories.push(element.country);
                            }
    
                            let split = element.split;
                            if (!(split in auxSeries)) {
                                auxSeries[split] = []
                            }
                            auxSeries[split].push({country:element.country, name: element.countryCode, y: element.value});
                        }
                    });
                    
                } catch (error) {
                    console.log('error fetching data', error)
                } finally {
                    this.setState({ ...this.state, isLoading: false })
                }

                if (this.props.type == 'line') {
                    for (let serie in auxSeries) {
                        if (serie == 'EU27_2020') {
                            series.push( {name: serie, data: auxSeries[serie], color: '#003399'} )
                        } else {
                            series.push( {name: serie, data: auxSeries[serie]} )
                        }
                    }
                    this.setState({ 
                        chartConfig: {...this.state.chartConfig, 
                            // tooltip: {
                            //     headerFormat: '<b>Country </b> {series.name} <br/> <b>Year </b> {point.x} <br/>',
                            //     pointFormat: '<b>Value </b> {point.y}%'
                            // },
                            tooltip: {					
                                useHTML: true,
                                borderColor:"#529FA2",
                                style: {
                                    opacity: 1,
                                    zIndex: 100
                                },
                                formatter: function () {
                                    return '<ul class="tooltip-item">'+
                                    '<li><strong>Country: </strong> ' + this.series.name + '</li>' +
                                    '<li><strong>Year: </strong> '+ this.point.x + '</li>' +
                                    '<li><strong class="tooltip-value up">Value: </strong>' + this.point.y +'%</li>' +
                                    '</ul>';
                                }
                            },
                            plotOptions: {
                                series: {
                                    label: {
                                        connectorAllowed: false
                                    },
                                pointStart: 2010}
                            }, 
                            series
                        } 
                    })
                }  
                
                if (this.props.type == 'column' || this.props.type == 'bar') {
                   
                    // Unknown reason but you have to reverse the array or else 2015 will appear first.
                    let newArray;
                                   
                    for (let serie in auxSeries) {
                        /** 
                         * Finds in the series the same country code and changes the color
                         * it depends on the value of the serie if they're the same.
                         */
                        let euSerie = {...auxSeries[serie].find((serie) => serie.name == 'EU27_2020' )};
                        if (euSerie.y == firstDataEuColor) {
                            euSerie = {...euSerie, color: '#7f97ce'}
                        }
                        if (euSerie.y == secondDataEuColor) {
                            euSerie = {...euSerie, color: '#003399'}
                        }
                        auxSeries[serie][0] = euSerie;
                        series.push( {country:euSerie.country,name: serie, data: auxSeries[serie]} );
                        newArray = [...series].reverse();
                    }

                    // If country is defined, change the colour for that country
                    if (this.props.country)
                    {
                        const selectedCountryColors = ['#F6A400','#F3C564'];
                        for (let i = 0; i < newArray[0].data.length; i++)
                        {
                            if (newArray[0].data[i].name == this.props.country)
                            {
                                newArray[0].data[i] = {...newArray[0].data[i], color: selectedCountryColors[0]}
                                newArray[1].data[i] = {...newArray[1].data[i], color: selectedCountryColors[1]}
                            }
                            else if (newArray[0].data[i].name != 'EU27_2020' && newArray[0].data[i].name != 'EU28')
                            {
                                newArray[0].data[i] = {...newArray[0].data[i], color: this.props.colors[0]}
                                newArray[1].data[i] = {...newArray[1].data[i], color: this.props.colors[1]}
                            }
                        }
                    }                    
                    
                    this.setState({
                        chartConfig: {...this.state.chartConfig, 
                            xAxis: {
                                categories,
                                plotLines: [
                                    {
                                        color: 'black',
                                        width: 2,
                                        value: 0.5,
                                        id: 'break-eu',
                                        zIndex:1
                                    },
                                    {
                                        color: 'black',
                                        width: 2,
                                        value: 27.5,
                                        id: 'break-country',
                                        zIndex:1
                                    }
                                ],
                            },
                            tooltip: {					
                                useHTML: true,
                                borderColor:"#529FA2",
                                style: {
                                    opacity: 1,
                                    zIndex: 100
                                },
                                formatter: function () {
                                    return '<ul class="tooltip-item">'+
                                    '<li><strong>Trend: </strong> ' + this.series.name + '</li>' +
                                    '<li><strong>Country: </strong> '+ this.point.country + '</li>' +
                                    '<li><strong class="tooltip-value up">Value: </strong>' + this.point.y +'%</li>' +
                                    '</ul>';
                                }
                            },
                            plotOptions: {
                                series: {
                                    pointPadding: 0.11,
                                    groupPadding: 0.15,
                                    borderWidth: 0,
                                    pointStart: 0
                                },
                            }, 
                            series: newArray
                        }
                    })
                }
            });

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
                      chart: {...this.state.chartConfig.chart, height: 450}
                  }
                })
            }
        }

        if (width < 768) {
           if (isFullscreen()) {
               this.setState({
                   chartConfig: {
                       ...this.state.chartConfig,
                       chart: {...this.state.chartConfig.chart, height: height}
                   }
               })
           } else {
               this.setState({
                   chartConfig: {
                       ...this.state.chartConfig,
                       chart: {...this.state.chartConfig.chart, height: 770}
                   }
               })
           }
        }
    }

    componentDidMount() {
        this.getLoadData(this.props.chart, this.props.indicator, this.props.selectedCountry1, this.props.selectedCountry2);
        this.getCredits(this.props.chart);

        window.addEventListener('resize', this.updateDimension);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type != this.props.type) {
            this.setState({ chartConfig: {...this.state.chartConfig, chart: {...this.state.chartConfig.chart, type: this.props.type} }});
            this.getCredits(this.props.chart);
        }

        if (prevProps.selectedCountry1 != this.props.selectedCountry1) {
            this.getLoadData(this.props.chart, this.props.indicator, this.props.selectedCountry1, this.props.selectedCountry2);
            this.getCredits(this.props.chart);
        }

        if (prevProps.selectedCountry2 != this.props.selectedCountry2) {
            this.getLoadData(this.props.chart, this.props.indicator, this.props.selectedCountry1, this.props.selectedCountry2);
            this.getCredits(this.props.chart);
        }

        if (prevProps.country != this.props.country) {
            this.getLoadData(this.props.chart, this.props.indicator);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
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

export default WorkAccidentsChart;