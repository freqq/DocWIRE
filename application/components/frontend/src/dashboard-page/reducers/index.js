import { combineReducers } from 'redux';
import recentAppointmentReducer from 'dashboard-page/reducers/recentAppointmentReducer';
import recentBillReducer from 'dashboard-page/reducers/recentBillReducer';

export default combineReducers({
  recentAppointment: recentAppointmentReducer,
  recentBill: recentBillReducer,
});
