import RequestService from 'common/services/RequestService';

export const getDoctors = searchQuery => RequestService.get(`/users/doctors?search=${searchQuery}`);

export const bookAppointment = appointment =>
  RequestService.post('/appointments/book', appointment);
