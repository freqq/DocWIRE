/* eslint-disable import/prefer-default-export */
import RequestService from 'common/services/RequestService';

export const appointmentDetails = appointmentId =>
  RequestService.get(`/api/appointments/details/${appointmentId}`);
