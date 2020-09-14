import MessagesRequestService from 'common/services/MessagesRequestService';

export const getChatBoxList = () => MessagesRequestService.get(`/chat/messages`);

export const getChatHistory = userId =>
  MessagesRequestService.get(`/chat/history?userId=${userId}`);

export const markChatAsRead = userId => MessagesRequestService.get(`/chat/read?userId=${userId}`);
