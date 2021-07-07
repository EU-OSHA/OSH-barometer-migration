import { combineReducers } from 'redux';
import methodology from '../reducers/methodologyReducer';
import selectCountries from '../reducers/countryReducers';

export default combineReducers({
    methodology,
    selectCountries
});