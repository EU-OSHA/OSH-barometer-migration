import axios from 'axios';

const BASEURL = 'http://89.0.4.28:8080/barometer-data-server/api/'

export function getChartData(chart, indicator, country1, country2) {
    const URL = `${BASEURL}quantitative/getChartData`

    const response = axios.get(URL, {
        params: {
            chart,
            indicator,
            country1,
            country2
        },        
    }).then((res) => {
        return res.data
    })

    return response;
}