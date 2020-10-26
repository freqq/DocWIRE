import RequestService from 'common/services/RequestService';

export const recentAppointment = () => RequestService.get(`/api/appointments/details/recent`);
