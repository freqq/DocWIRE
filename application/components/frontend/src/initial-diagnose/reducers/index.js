import { combineReducers } from 'redux';
import chooseDoctorReducer from 'initial-diagnose/reducers/chooseDoctorReducer';
import createAppointmentReducer from 'initial-diagnose/reducers/createAppointmentReducer';

export default combineReducers({
  chooseDoctor: chooseDoctorReducer,
  createAppointment: createAppointmentReducer,
});
