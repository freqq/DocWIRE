import RequestService from 'common/services/RequestService';

export const patientDetails = patientId => RequestService.get(`/api/users/details/${patientId}`);

export const createNote = noteData => RequestService.post(`/api/users/note`, noteData);
