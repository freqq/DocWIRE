import RequestService from 'common/services/RequestService';

export default () => RequestService.get(`/api/chat/count/`);
