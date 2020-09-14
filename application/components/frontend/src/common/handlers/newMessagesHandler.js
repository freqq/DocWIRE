import MessagesRequestService from 'common/services/MessagesRequestService';

export default () => MessagesRequestService.get(`/chat/count/`);
