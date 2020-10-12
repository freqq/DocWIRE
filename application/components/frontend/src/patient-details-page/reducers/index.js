import { combineReducers } from 'redux';
import patientDetailsReducer from 'patient-details-page/reducers/patientDetailsReducer';

export default combineReducers({
  patientDetails: patientDetailsReducer,
});
