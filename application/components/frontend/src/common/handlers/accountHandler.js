import RequestService from 'common/services/RequestService';

export const fetchUserdata = userData => RequestService.get(`/users`, userData);

export const createUser = () => RequestService.post(`/users`);

export const editUser = userData => RequestService.put(`/users`, userData);
