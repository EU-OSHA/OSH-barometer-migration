import axios from 'axios';

// GET OSH Countries for the Selectors
export function getOSHCountries(countries) {
    const URL = 'http://89.0.4.28:8080/barometer-data-server/api/countries/getCountriesMatrixPage?page=MATRIX_AUTHORITY';

    const response = axios.get(URL, {
        params: {
            country: countries
        },
        paramsSerializer: params => {
            //Deserialize the array - deleting the Brackets and repeating the same query with the data received
            return params.country.map((data) => `country=${data}`).join('&'); 
        }
    })
    .then((res) => res.data);

    return response
}

export function getOSHStatistic(filters) {
    // baseURL = 'http://89.0.4.28:8080/barometer-data-server/api/qualitative/getMatrixPageData' -> ?page=(INSIDE_HERE_IS_WHAT_CHANGES)
    const URL = 'http://89.0.4.28:8080/barometer-data-server/api/qualitative/getMatrixPageData?page=MATRIX_STATISTICS';

    const response = axios.get(URL, {
        params: {
            country: filters?.countries,
            checks: filters?.checks
        }
    })
    .then((response) => {
        console.log(response)
        return response.data
    })

    
    return response
}





// http://89.0.4.28:8080/barometer-data-server/api/qualitative/getMatrixPageData?page=MATRIX_STATISTICS