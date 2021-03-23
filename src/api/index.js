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

    return response
}