import React, { Component } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

class MapChart extends Component
{
	render()
	{
		const options = {
			chart: {
        map: require('@highcharts/map-collection/custom/europe.geo.json'),
        spacingBottom: 20,
				height: 800,
				width: 800
			},

			title: {
					text: 'Europe time zones'
			},

			legend: {
					enabled: true
			},

			plotOptions: {
					map: {
							allAreas: false,
							joinBy: ['iso-a2', 'code'],
							dataLabels: {
									enabled: true,
									color: '#FFFFFF',
									style: {
											fontWeight: 'bold'
									},
									// Only show dataLabels for areas with high label rank
									format: null,
									formatter: function () {
											if (this.point.properties && this.point.properties.labelrank.toString() < 5) {
													return this.point.properties['iso-a2'];
											}
									}
							},
							tooltip: {
									headerFormat: '',
									pointFormat: '{point.name}: <b>{series.name}</b>'
							}
					}
			},

			series: [{
					name: 'UTC',
					data: ['IE', 'IS', 'GB', 'PT'].map(function (code) {
							return { code: code };
					})
			}, {
					name: 'UTC + 1',
					data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU',
							'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map(function (code) {
							return { code: code };
					})
			}, {
					name: 'UTC + 2',
					data: ['FI', 'EE', 'LV', 'LT', 'BY', 'UA', 'MD', 'RO', 'BG', 'GR', 'TR', 'CY'].map(function (code) {
							return { code: code };
					})
			}, {
					name: 'UTC + 3',
					data: [{
							code: 'RU'
					}]
			}]
		}


		return(
			<div>
				<HighchartsReact
					highcharts={Highcharts}
					options={options}
					constructorType='mapChart'
				/>
			</div>
		);
	}
}

export default MapChart;