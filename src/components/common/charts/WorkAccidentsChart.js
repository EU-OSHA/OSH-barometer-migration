import React, { Component } from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
import { getChartData } from '../../../api';

class WorkAccidentsChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartConfig: {
                title: {
                    text: this.props.title,
                    align: 'left'
                },
                credits: {
                    enabled: false
                },
                colors: this.props.colors,
                chart: {
                    type: this.props.type,
                    backgroundColor: '#F0F0F0'
                },
                exporting: {
                    enabled: true,
                    buttons: {
                        contextButton: {
                            menuItems: ['viewFullscreen']
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
                text: this.props.title,
                align: 'left'
            },
            credits: {
                enabled: false
            },
            colors: this.props.colors,
            chart: {
                type: this.props.type,
                backgroundColor: '#F0F0F0'
            },
            exporting: {
                enabled: true,
                buttons: {
                    contextButton: {
                        menuItems: ['viewFullscreen']
                    }
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
            },
            tooltip: {},
            plotOptions: {},
            series: []
        } })
    }
    
    // Gets data for the selected Chart
    getLoadData = (chart, indicator, country1, country2) => {
        let categories = [];
        let series = [];
        let auxSeries = [];
        
        this.initChart();
        getChartData(chart, indicator, country1, country2)
        .then((data) => {
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
                            auxSeries[country].push(element.value)
                        }

                        if (this.props.type == 'column') {

                            if (categories.indexOf(element.country) == -1) {
                                categories.push(element.country);
                            }
    
                            let split = element.split;
                            if (!(split in auxSeries)) {
                                auxSeries[split] = []
                            }
                            auxSeries[split].push({name: element.countryCode, y: element.value});

                            
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
                            tooltip: {
                                headerFormat: '<b>Country </b> {series.name} <br/> <b>Year </b> {point.x} <br/>',
                                pointFormat: '<b>Value </b> {point.y}%'
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
                    if (this.props.type == 'column') {
                        // Unknown reason but you have to reverse the array or else 2015 will appear first.
                        let newArray;
                        for (let serie in auxSeries) {
                            /** 
                             * Finds in the series the same country code and changes the color
                             * it depends on the value of the serie if they're the same.
                             */
                            let euSerie = {...auxSeries[serie].find((serie) => serie.name == 'EU27_2020' )};
                            if (euSerie.y == 1.9) {
                                euSerie = {...euSerie}
                            } else {
                                euSerie = {...euSerie, color: '#003399'}
                            }
                            auxSeries[serie][0] = euSerie
                            series.push( {name: serie, data: auxSeries[serie]} );
                            newArray = [...series].reverse();
                        }
                    this.setState({
                        chartConfig: {
                            ...this.state.chartConfig, 
                            xAxis: {categories},
                            tooltip: {
                                headerFormat: '<b>Trend </b> {series.name} <br/> <b>Country </b> {point.x} <br/>',
                                pointFormat: '<b>Value </b> {point.y}'
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2, 
                                    borderWidth: 0
                                }, 
                                series: {
                                    pointStart: 0,
                                },
                            }, 
                            series: newArray
                        }
                    })
                }
            });

    }

    componentDidMount() {
        this.getLoadData(this.props.chart, this.props.indicator, this.props.selectedCountry1, this.props.selectedCountry2)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type != this.props.type) {
            this.setState({ chartConfig: {...this.state.chartConfig, chart: {...this.state.chartConfig.chart, type: this.props.type} }})
        }

        if (prevProps.selectedCountry1 != this.props.selectedCountry1) {
            this.getLoadData(this.props.chart, this.props.indicator, this.props.selectedCountry1, this.props.selectedCountry2)
        }

        if (prevProps.selectedCountry2 != this.props.selectedCountry2) {
            this.getLoadData(this.props.chart, this.props.indicator, this.props.selectedCountry1, this.props.selectedCountry2)
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

export default WorkAccidentsChart;