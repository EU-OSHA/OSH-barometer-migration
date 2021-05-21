import { SET_METHODOLOGY } from '../constants';
import { SET_DEFAULT_COUNTRY } from '../constants';
import { SET_DEFAULT_COUNTRY_2 } from '../constants';

// For each of the actions defined for redux, this file will export one function
export function setMethodology(section, subsection, indicator) {
    const action = {
        type: SET_METHODOLOGY,
        section,
        subsection,
        indicator: indicator
    }
    return action;
}

// For each of the actions defined for redux, this file will export one function
export function setDefaultCountry(country) {
    // console.log("Arrives to set country default action",country);
    const action = {
        type: SET_DEFAULT_COUNTRY,
        country
    }
    return action;
}

// For each of the actions defined for redux, this file will export one function
export function setDefaultCountry2(country2) {
    // console.log("Arrives to set country default action",country);
    const action = {
        type: SET_DEFAULT_COUNTRY_2,
        country2
    }
    return action;
}