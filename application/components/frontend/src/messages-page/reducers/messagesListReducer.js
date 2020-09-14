/* eslint-disable prefer-template */
/* eslint-disable no-case-declarations */
import {
  FETCH_CHAT_BOX_LIST_PENDING,
  FETCH_CHAT_BOX_LIST_OK,
  FETCH_CHAT_BOX_LIST_FAIL,
  FETCH_CHAT_HISTORY_PENDING,
  FETCH_CHAT_HISTORY_OK,
  FETCH_CHAT_HISTORY_FAIL,
  ADD_NEW_MESSAGE,
  ADD_NEW_USER_TO_CHAT_BOX,
  MARK_USER_CHAT_AS_READ,
  FILTER_CHAT_BOX_MESSAGES,
} from 'messages-page/actions/messagesListActions';

const INITIAL_STATE = {
  isChatHistoryLoading: false,
  isChatHistoryLoadingError: false,
  chatHistory: [],
  isChatListLoading: false,
  isChatListError: false,
  chatList: [],
  filteredChatList: [],
  searchValue: '',
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (type) {
    case FETCH_CHAT_HISTORY_PENDING:
      return {
        ...stateDefinition,
        isChatHistoryLoading: true,
        isChatHistoryLoadingError: false,
        chatHistory: [],
      };
    case FETCH_CHAT_HISTORY_OK:
      return {
        ...stateDefinition,
        isChatHistoryLoading: false,
        isChatHistoryLoadingError: false,
        chatHistory: payload.chatHistory,
      };
    case FETCH_CHAT_HISTORY_FAIL:
      return {
        ...stateDefinition,
        isChatHistoryLoading: false,
        isChatHistoryLoadingError: true,
        chatHistory: [],
      };
    case FETCH_CHAT_BOX_LIST_PENDING:
      return {
        ...stateDefinition,
        isChatListLoading: true,
        isChatListError: false,
        chatList: [],
      };
    case FETCH_CHAT_BOX_LIST_OK:
      return {
        ...stateDefinition,
        isChatListLoading: false,
        isChatListError: false,
        chatList: payload.chatBoxList,
      };
    case FETCH_CHAT_BOX_LIST_FAIL:
      return {
        ...stateDefinition,
        isChatListLoading: false,
        isChatListError: true,
        chatList: [],
      };
    case ADD_NEW_MESSAGE:
      return {
        ...stateDefinition,
        chatHistory: [...stateDefinition.chatHistory, payload.message],
        chatList: stateDefinition.chatList
          .map(item =>
            (item.sender.userId !== payload.currentUserId &&
              item.sender.userId === payload.message.sender.userId) ||
            (item.sender.userId !== payload.currentUserId &&
              item.sender.userId === payload.message.receiver.userId) ||
            (item.receiver.userId !== payload.currentUserId &&
              item.receiver.userId === payload.message.receiver.userId) ||
            (item.receiver.userId !== payload.currentUserId &&
              item.receiver.userId === payload.message.sender.userId)
              ? { ...item, content: payload.message.content, dateTime: payload.message.dateTime }
              : item,
          )
          .sort((a, b) =>
            new Date(a.dateTime) > new Date(b.dateTime)
              ? -1
              : Number(new Date(a.dateTime) < new Date(b.dateTime)),
          ),
      };
    case ADD_NEW_USER_TO_CHAT_BOX:
      return {
        ...stateDefinition,
        chatList: [payload.chatBoxItem, ...stateDefinition.chatList],
      };
    case MARK_USER_CHAT_AS_READ:
      return {
        ...stateDefinition,
        chatList: stateDefinition.chatList.map(item =>
          item.sender.userId === payload.userId ? { ...item, unread: false } : item,
        ),
      };
    case FILTER_CHAT_BOX_MESSAGES:
      return {
        ...stateDefinition,
        searchValue: payload.keyword,
        filteredChatList: stateDefinition.chatList.filter(
          item =>
            item.sender.firstName.toLowerCase().includes(payload.keyword.toLowerCase()) ||
            item.sender.lastName.toLowerCase().includes(payload.keyword.toLowerCase()) ||
            item.receiver.firstName.toLowerCase().includes(payload.keyword.toLowerCase()) ||
            item.receiver.lastName.toLowerCase().includes(payload.keyword.toLowerCase()) ||
            (item.receiver.firstName + ' ' + item.receiver.lastName)
              .toLowerCase()
              .includes(payload.keyword.toLowerCase()) ||
            (item.sender.firstName + ' ' + item.sender.lastName)
              .toLowerCase()
              .includes(payload.keyword.toLowerCase()),
        ),
      };
    default:
      return stateDefinition;
  }
};
