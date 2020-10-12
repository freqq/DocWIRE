import { combineReducers } from 'redux';
import recentAppointmentReducer from 'dashboard-page/reducers/recentAppointmentReducer';

export default combineReducers({
  recentAppointment: recentAppointmentReducer,
});
