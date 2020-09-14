import { combineReducers } from 'redux';
import newMessageReducer from 'messages-page/reducers/newMessageReducer';
import messagesListReducer from 'messages-page/reducers/messagesListReducer';

export default combineReducers({
  usersList: newMessageReducer,
  messagesList: messagesListReducer,
});
