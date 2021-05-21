import { combineReducers } from 'redux';
import methodology from '../reducers/methodologyReducer';
import defaultCountry from '../reducers/countryReducer';
import defaultCountry2 from '../reducers/country2Reducer';

export default combineReducers({
    methodology,
    defaultCountry,
    defaultCountry2
});