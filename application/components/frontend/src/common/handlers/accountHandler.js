import RequestService from 'common/services/RequestService';

export const fetchUserdata = () => RequestService.get(`/api/users`);

export const createUser = userData => RequestService.post(`/api/users`, userData);

export const editUser = userData => RequestService.put(`/api/users`, userData);
