import { combineReducers } from 'redux';
import appointmentReducer from 'appointment-details-page/reducers/appointmentReducer';
import paymentReducer from 'appointment-details-page/reducers/paymentReducer';

export default combineReducers({
  details: appointmentReducer,
  payment: paymentReducer,
});
