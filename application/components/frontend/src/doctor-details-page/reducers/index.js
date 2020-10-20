import { combineReducers } from 'redux';
import doctorDetailsReducer from 'doctor-details-page/reducers/doctorDetailsReducer';

export default combineReducers({
  doctorDetails: doctorDetailsReducer,
});
