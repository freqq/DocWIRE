import RequestService from 'common/services/RequestService';

export default query => RequestService.get(`/api/users/search?query=${query}`);
