import RequestService from 'common/services/RequestService';

export const getDoctors = searchQuery =>
  RequestService.get(`/api/users/doctors?search=${searchQuery}`);

export const bookAppointment = appointment =>
  RequestService.post('/api/appointments/book', appointment);
