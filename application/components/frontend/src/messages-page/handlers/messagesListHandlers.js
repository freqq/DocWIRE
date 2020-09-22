import RequestService from 'common/services/RequestService';

export const getChatBoxList = () => RequestService.get(`/api/chat/messages`);

export const getChatHistory = userId => RequestService.get(`/api/chat/history?userId=${userId}`);

export const markChatAsRead = userId => RequestService.get(`/api/chat/read?userId=${userId}`);
