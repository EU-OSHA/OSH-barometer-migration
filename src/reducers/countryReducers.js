import { SET_LOCKED_COUNTRY, SET_SELECT_COUNTRY, SET_SELECT_COUNTRY_2 } from "../constants";

export default (state = {
    selectCountry: 'AT',
    selectCountry2: '',
    lockedCountry: '',
    isCookie: false,
    selectedByUser: false
}, action) => {
    switch (action.type) {
        case SET_SELECT_COUNTRY:
            return {
                ...state,
                selectCountry: action.payload.country
            }
            
        case SET_SELECT_COUNTRY_2:
            return {
                ...state,
                selectCountry2: action.payload.country2
        }

        case SET_LOCKED_COUNTRY:
            return {
                ...state,
                lockedCountry: action.payload.country,
                isCookie: action.payload.isCookie,
                selectedByUser: action.payload.selectedByUser
            }
    
        default:
            return state;
    }
}