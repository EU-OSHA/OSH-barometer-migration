import { combineReducers } from 'redux';
import methodology from '../reducers/methodologyReducer';
import defaultCountry from '../reducers/countryReducer';

export default combineReducers({
    methodology,
    defaultCountry
});