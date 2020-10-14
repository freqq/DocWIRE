import { combineReducers } from 'redux';
import appointmentReducer from 'appointments-page/reducers/appointmentReducer';

export default combineReducers({
  appointmentDetails: appointmentReducer,
});
