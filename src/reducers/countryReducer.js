import { SET_DEFAULT_COUNTRY } from '../constants';

const initialState = {
    // defaultCountry: {
        code: "0",
        isCookie: false,
        selectedByUser: false
    // }
}

export default (state = initialState, action) => {
    // console.log("Arrives to set country default reducer",action);
    switch (action.type) {
        case SET_DEFAULT_COUNTRY:
            const { country } = action;
            // console.log("defaultCountry",country);
            return country;
        default:
            return state;
    }
}