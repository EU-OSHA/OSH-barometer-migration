import React, { Component } from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { getChartData } from '../../../api';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class MentalRiskCharts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartConfig: {
                title: {
                    text: this.props.title,
                    align: 'left'
                },
                colors: this.props.colors,
                chart: {
                    type: 'column',
                    backgroundColor: '#F0F0F0'
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return `${this.value}%`
                        }
                    },
                    min: 0,
                    max: 100
                },
                tooltip: {},
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        pointStart: 0
                    }
                },
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
                type: 'column',
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
            plotOptions: {
                series: {
                    pointStart: 0,
                }
            },
            series: []
        } })
    }
    
    getLoadData = (chartType) => {
        let categories = [];
        let auxSeries = [];
        let series = [];

        let euSeries = '';

        try {
            this.initChart();
            this.setState({ ...this.state, isLoading: true });
            switch (this.props.tabIndicator) {
                case '340':
                    const chart = chartType.find((chart) => chart.type == 'esener')
                    if (chart) {
                        getChartData(chart.chart, chart.indicator, null, null, chart.sector, chart.answer)
                            .then((data1) => {
                                console.log('data', data1)
                                data1.resultset.forEach(element => {
    
                                    if (categories.indexOf(element.country) == -1) {
                                        categories.push(element.country)
                                    }
    
                                    let split = element.split;
                                    if (!(split in auxSeries)) {
                                        auxSeries[split] = []
                                    }
    
                                    auxSeries[split].push(element.value);
                                });
    
                                for (let serie in auxSeries) {
                                    series.push({ name: serie, data: auxSeries[serie] });
                                }
                                const reversedArray = [...series].reverse()
                                this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, xAxis: {categories}} })
                            });
                    }
                    break;
                case '341':
                    console.log('second case');
                    break;
                case '342':
                    console.log('third case');
                    break;
                case '343':
                    console.log('fourth case');
                    break;
                case '344':
                    console.log('fifth case');
                    break;
                case '345':
                    console.log('sixth case');
                    break;
                case '346':
                    console.log('seventh case');
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log('error', error)    
        } finally {
            this.setState({ ...this.state, isLoading: false })
        }
        
        console.log('categories', categories)
        console.log('auxSeries', auxSeries)
        console.log('series', series)
    }

    componentDidMount() {
        this.getLoadData(this.props.chartType);
        // this.getLoadData(this.props.chart, this.props.indicator, this.props.sector)
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

export default MentalRiskCharts;