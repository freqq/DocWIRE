import { combineReducers } from 'redux';
import appointmentReducer from 'appointment-details-page/reducers/appointmentReducer';

export default combineReducers({
  details: appointmentReducer,
});
