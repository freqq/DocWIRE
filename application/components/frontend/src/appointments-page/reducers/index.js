import { combineReducers } from 'redux';
import appointmentsReducer from 'appointments-page/reducers/appointmentsReducer';

export default combineReducers({
  appointments: appointmentsReducer,
});
