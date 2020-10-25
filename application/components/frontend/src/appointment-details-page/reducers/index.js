import { combineReducers } from 'redux';
import appointmentReducer from 'appointment-details-page/reducers/appointmentReducer';
import paymentReducer from 'appointment-details-page/reducers/paymentReducer';
import reviewReducer from 'appointment-details-page/reducers/reviewReducer';
import filesReducer from 'appointment-details-page/reducers/filesReducer';

export default combineReducers({
  details: appointmentReducer,
  payment: paymentReducer,
  review: reviewReducer,
  files: filesReducer,
});
