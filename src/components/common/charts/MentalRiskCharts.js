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
                    text: this.props.chartTitle[`L${this.props.chartType[0].title}`],
                    align: 'left'
                },
                colors: this.props.colors,
                chart: {
                    type: 'column',
                    backgroundColor: '#F0F0F0'
                },
                xAxis: {
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
                    ]
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
                tooltip: {
                    headerFormat: '<b>Answer <b/> {series.name} <br/> <b>Country </b> {point.x} <br/>',
                    pointFormat: '<b> Value </b> {point.y}%'
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        pointStart: 0,
                    }
                },
                series: []
            },
            isLoading: false,
            typeCharts: [],
            selectedTypeChart: this.props?.chartType[0].type
        }
    }

    onChangeSelect = (e) => {
        this.setState({ selectedTypeChart: e.target.value });

        const serie = this.props.chartType.find((chart) => chart.type == e.target.value);
        this.setState({ chartConfig: {...this.state.chartConfig, title: {...this.state.chartConfig.title, text: this.props.chartTitle[`L${serie.title}`]}} })
    }
    
    getLoadData = (chartType) => {
        let categories = [];
        let auxSeries = [];
        let series = [];

        let euSerie1 = null;
        let euSerie2 = null;
        this.setState({ ...this.state, isLoading: true });
        let chart

        if (chartType.length > 1) {
            chart = chartType.find((chart) => chart.type == this.state.selectedTypeChart);
        } else {
            chart = chartType[0];
            this.setState({ selectedTypeChart: null })
        }

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
    
                        if (chart.type == 'esener') {
                            auxSeries[split].push({ name: element.country, y: element.value * 100 });
                        } else {
                            auxSeries[split].push({ name: element.country, y: element.value });
                        }
                    });

                    for (let serie in auxSeries) {
                            if (serie == 'Yes' || serie == 'Once or more' || serie == 'Mean') {
                                const euValueSerie1 = {...auxSeries[serie][0], color: '#003399'}
                                auxSeries[serie][0] = euValueSerie1
                            }
                            if (serie == 'No' || serie == 'Never' ) {
                                const euValueSerie2 = {...auxSeries[serie][0], color: '#7f97ce'}
                                auxSeries[serie][0] = euValueSerie2
                            }
                        series.push({ name: serie, data: auxSeries[serie] });
                    }

                    const reversedArray = [...series].reverse();
                    if (series.length == 1) {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, legend: {enabled: false}} })
                    } else {
                        this.setState({ chartConfig: {...this.state.chartConfig, series: reversedArray, xAxis: {categories}} })
                    }
                });
        } catch (error) {
            console.log('error', error)    
        } finally {
            this.setState({ ...this.state, isLoading: false })
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
            
                <div className='chart-container'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartConfig}
                        containerProps={{ className: 'chartContainer' }}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default MentalRiskCharts;