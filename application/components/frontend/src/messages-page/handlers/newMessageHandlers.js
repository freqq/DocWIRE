import RequestService from 'common/services/RequestService';

export default searchQuery => RequestService.get(`/api/users/all?search=${searchQuery}`);
