import { 
    SET_METHODOLOGY, 
    SET_SELECT_COUNTRY,
    SET_SELECT_COUNTRY_2,
    SET_LOCKED_COUNTRY,
} from '../constants';

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

export function setCountry1(country) {
    const action = {
        type: SET_SELECT_COUNTRY,
        payload: { country }
    }
    return action;
}

export function setCountry2(country2) {
    const action = {
        type: SET_SELECT_COUNTRY_2,
        payload: { country2 }
    }
    return action;
}

export function setLockedCountry(country, isCookie, selectedByUser) {
    const action = {
        type: SET_LOCKED_COUNTRY,
        payload: { 
            country,
            isCookie,
            selectedByUser
         }
    }
    return action
}