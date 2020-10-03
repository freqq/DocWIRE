import { combineReducers } from 'redux';
import appointmentDetailsReducer from 'video-conversation-page/reducers/videoConversationReducer';

export default combineReducers({
  appointmentDetails: appointmentDetailsReducer,
});
