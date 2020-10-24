import RequestService from 'common/services/RequestService';

export const appointmentDetails = appointmentId =>
  RequestService.get(`/api/appointments/${appointmentId}`);

export const acceptRequest = appointmentId =>
  RequestService.put(`/api/appointments/accept/${appointmentId}`);

export const reviewDoctor = ratingObject =>
  RequestService.put(`/api/appointments/review/`, ratingObject);
