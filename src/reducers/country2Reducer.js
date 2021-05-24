import { SET_DEFAULT_COUNTRY_2 } from '../constants';

const initialState = {
    code: "0",
    isCookie: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DEFAULT_COUNTRY_2:
            const { country2 } = action;
            return country2;
        default:
            return state;
    }
}