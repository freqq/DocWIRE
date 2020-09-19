import { combineReducers } from 'redux';
import chooseDoctorReducer from 'initial-diagnose/reducers/chooseDoctorReducer';

export default combineReducers({
  chooseDoctor: chooseDoctorReducer,
});
