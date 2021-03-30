import axios from 'axios';

const BASEURL = process.env.BASE_URL;

// GET OSH Countries for the Selectors
export function getOSHCountries(dataPage, countries) {
    const URL = `${BASEURL}countries/getCountriesMatrixPage`;

    const response = axios.get(URL, {
        params: {
            page: dataPage,
            country: countries
        },
        paramsSerializer: params => {
            let urlWithParams = new URLSearchParams()

            if(params.page) {
                urlWithParams.append('page', params.page);
            }

            if (params.country) {
                params.country.map((country) => urlWithParams.append('country', country));
            }

            return urlWithParams
        }
    })
    .then((res) => res.data);

    return response
}

// GET OSH data for components OSH-Authorities, OSH-Statistics
export function getOSHData(dataPage, filters) {
    const URL = `${BASEURL}qualitative/getMatrixPageData`;

    const response = axios.get(URL, {
        params: {
            page: dataPage,
            country: filters?.countries,
            checks: filters?.checks,
            searchBar: filters?.searchBar
        },
        paramsSerializer: params => {
            let urlWithParams = new URLSearchParams();

            if (params.page) {
                urlWithParams.append('page', params.page)
            }

            if (params.country) {
                params.country.map((country) => urlWithParams.append('country', country.code));
            }

            if (params.checks) {
                params.checks.map((check) => urlWithParams.append(`check${check.id}`, check.check))
            }

            if (params.searchBar) {
                urlWithParams.append('search', params.searchBar)
            }

            return urlWithParams
        }
    })
    .then((response) => response.data);

    return response
}

export function getIndicatorCountries(chart = '20012') {
    const URL = `${BASEURL}countries/getIndicatorCountries`

    const response = axios.get(URL, {
        params: {
            chart
        }
    })
        .then((res) => res.data);

    return response
}

//Get countries available for social dialogue select
export function getNationalStrategiesCountries() {
    const URL = `${BASEURL}countries/getCountriesStrategiesPage?page=STRATEGY`;

    const response = axios.get(URL)
    .then((res) => res.data);

    return response
}

//Get countries available for social dialogue select
export function getSocialDialogueCountries() {
    const URL = `${BASEURL}countries/getIndicatorCountries?chart=20090`;

    const response = axios.get(URL)
    .then((res) => res.data);

    return response
}

//Get social dialogue data for each available country including EU27
export function getSocialDialogueData(filters){
    const URL = `${BASEURL}quantitative/getCountryCardData?chart=20090`;
    const response = axios.get(URL, {
        params: {
            country: filters?.countries
        },
        paramsSerializer: params => {
            let urlWithParams = new URLSearchParams();

            if (params.country) {
                params.country.map((country) => urlWithParams.append('country', country.code));
            }

            return urlWithParams
        }
    })
    .then((response) => response.data);

    return response
}

//Get countries available for health perception select
export function getHealthPerceptionCountries() {
    const URL = `${BASEURL}countries/getIndicatorCountries?chart=20026`;

    const response = axios.get(URL)
    .then((res) => res.data);

    return response
}

//Get health perception data for each available country including EU27
export function getHealthPerceptionData(filters){
    const URL = `${BASEURL}quantitative/getCountryCardData?chart=20026`;
    const response = axios.get(URL, {
        params: {
            country: filters?.countries
        },
        paramsSerializer: params => {
            let urlWithParams = new URLSearchParams();

            if (params.country) {
                params.country.map((country) => urlWithParams.append('country', country.code));
            }

            return urlWithParams
        }
    })
    .then((response) => response.data);

    return Response;
}

export function getChartData(chart, indicator, country1, country2) {
    const URL = `${BASEURL}quantitative/getChartData`;

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

export function getChartDataRisk(chart, indicator, country1,country2, sector, gender, age){
    const URL = `${BASEURL}/quantitative/getChartData`;
    //?&sector=9&sector=10&sector=11&sector=12&sector=13&sector=8
  
    const response = axios.get(URL, {
        params: {
            chart,
            indicator,
            country1,
            country2,
            sector,
            gender,
            age
            
        },
        paramsSerializer: params =>{
            let urlWithParams = new URLSearchParams()

            if(params.chart){
                urlWithParams.append('chart',chart)
            }

            if(params.indicator){
                urlWithParams.append('indicator',indicator)
            }

            if (params.country1){
                urlWithParams.append('country1',country1)
            }

            if(params.country2){
                urlWithParams.append('country2',country2)
            }
            if(params.sector){
                params.sector.map(element => urlWithParams.append('sector',element))
            }
            if (params.gender){
                params.gender.map(element => urlWithParams.append('gender',element))
            }

            if (params.age){
                params.age.map(element => urlWithParams.append('age',element))
            }

            return urlWithParams;
        }
    }).then((res)=> {
        return res.data
    })

    return response;
}

