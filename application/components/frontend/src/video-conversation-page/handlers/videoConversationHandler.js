import RequestService from 'common/services/RequestService';

export const appointmentDetails = appointmentId =>
  RequestService.get(`/api/appointments/${appointmentId}`);

export const appointmentDelete = appointmentId =>
  RequestService.delete(`/api/room/${appointmentId}`);
