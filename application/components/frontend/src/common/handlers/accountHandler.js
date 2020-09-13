import RequestService from 'common/services/RequestService';

export const fetchUserdata = () => RequestService.get(`/users`);

export const createUser = userData => RequestService.post(`/users`, userData);

export const editUser = userData => RequestService.put(`/users`, userData);
