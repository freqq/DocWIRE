import RequestService from 'common/services/RequestService';

export default searchQuery => RequestService.get(`/users/all?search=${searchQuery}`);
