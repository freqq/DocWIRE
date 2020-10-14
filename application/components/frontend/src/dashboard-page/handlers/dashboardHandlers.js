/* eslint-disable import/prefer-default-export */
import RequestService from 'common/services/RequestService';

export const recentAppointment = () => RequestService.get(`/api/appointments/details/recent`);
