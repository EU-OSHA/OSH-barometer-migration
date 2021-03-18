import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

class SpiderChart extends Component
{

	render()
	{
		const options = {
			chart: {
        polar: true,
        type: 'line'
    	},
			title: {
        text: 'Ergonomic risks',
        x: -80
			},

			pane: {
					size: '95%'
			},

			xAxis: {
				categories: ['Positions','Loads','Movements','Sitting'],
				tickmarkPlacement: 'on',
				lineWidth: 0
			},

			yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
			},

			tooltip: {
					shared: true,
					pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y} %</b><br/>'
			},

			series: [{
					name: '(AT) Austria)',
					data: [26.9, 50.3, 63.5, 62.3],
					pointPlacement: 'on'
			}, {
					name: 'EU27_2020',
					data: [31.6, 51.7, 65.3, 60.8],
					pointPlacement: 'on'
			}],
		}

		return (
			<div>
				<HighchartsReact
					highcharts={Highcharts}
					options={options}
				/>
			</div>
		)
	}
}

export default SpiderChart;