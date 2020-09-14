import {
  getChatBoxList,
  getChatHistory,
  markChatAsRead,
} from 'messages-page/handlers/messagesListHandlers';
import { getUnreadMessagesCount } from 'common/actions/newMessagesActions';

export const FETCH_CHAT_BOX_LIST_PENDING = 'FETCH_CHAT_BOX_LIST_PENDING';
export const FETCH_CHAT_BOX_LIST_OK = 'FETCH_CHAT_BOX_LIST_OK';
export const FETCH_CHAT_BOX_LIST_FAIL = 'FETCH_CHAT_BOX_LIST_FAIL';

export const FETCH_CHAT_HISTORY_PENDING = 'FETCH_CHAT_HISTORY_PENDING';
export const FETCH_CHAT_HISTORY_OK = 'FETCH_CHAT_HISTORY_OK';
export const FETCH_CHAT_HISTORY_FAIL = 'FETCH_CHAT_HISTORY_FAIL';

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const ADD_NEW_USER_TO_CHAT_BOX = 'ADD_NEW_USER_TO_CHAT_BOX';
export const MARK_USER_CHAT_AS_READ = 'MARK_USER_CHAT_AS_READ';
export const FILTER_CHAT_BOX_MESSAGES = 'FILTER_CHAT_BOX_MESSAGES';

export const makeMarkUserChatAsRead = userId => ({
  type: MARK_USER_CHAT_AS_READ,
  payload: { userId },
});

export const makeFilterChatBox = keyword => ({
  type: FILTER_CHAT_BOX_MESSAGES,
  payload: { keyword },
});

export const makeFetchChatBoxPending = () => ({
  type: FETCH_CHAT_BOX_LIST_PENDING,
});

export const makeFetchChatBoxOk = chatBoxList => ({
  type: FETCH_CHAT_BOX_LIST_OK,
  payload: { chatBoxList },
});

export const makeFetchChatBoxFail = () => ({
  type: FETCH_CHAT_BOX_LIST_FAIL,
});

export const makeFetchChatHistoryPending = () => ({
  type: FETCH_CHAT_HISTORY_PENDING,
});

export const makeFetchChatHistoryOk = chatHistory => ({
  type: FETCH_CHAT_HISTORY_OK,
  payload: { chatHistory },
});

export const makeFetchChatHistoryFail = () => ({
  type: FETCH_CHAT_HISTORY_FAIL,
});

export const makeAddNewMessage = (message, currentUserId) => ({
  type: ADD_NEW_MESSAGE,
  payload: { message, currentUserId },
});

export const makeAddNewUserToChatBox = chatBoxItem => ({
  type: ADD_NEW_USER_TO_CHAT_BOX,
  payload: { chatBoxItem },
});

export const fetchChatBoxList = () => dispatch => {
  dispatch(makeFetchChatBoxPending());

  return getChatBoxList()
    .then(res => {
      dispatch(makeFetchChatBoxOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchChatBoxFail());
    });
};

export const fetchChatHistory = userId => dispatch => {
  dispatch(makeFetchChatHistoryPending());

  return getChatHistory(userId)
    .then(res => {
      dispatch(makeFetchChatHistoryOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchChatHistoryFail());
    });
};

export const addNewMessage = (message, currentUserId) => dispatch => {
  dispatch(makeAddNewMessage(message, currentUserId));
};

export const addNewUserToChatBox = chatBoxItem => dispatch => {
  dispatch(makeAddNewUserToChatBox(chatBoxItem));
};

export const markChatWithUserAsRead = userId => dispatch => {
  dispatch(makeMarkUserChatAsRead(userId));

  return markChatAsRead(userId).then(() => {
    dispatch(getUnreadMessagesCount());
  });
};

export const filterMessagesChatBox = keyword => dispatch => {
  dispatch(makeFilterChatBox(keyword));
};
