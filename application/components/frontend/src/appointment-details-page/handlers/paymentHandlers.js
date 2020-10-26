import RequestService from 'common/services/RequestService';

export const payForAppointment = sessionRequest =>
  RequestService.post(`/api/payment/session`, sessionRequest);
