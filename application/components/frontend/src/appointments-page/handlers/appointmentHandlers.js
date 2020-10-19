import RequestService from 'common/services/RequestService';

export const appointmentsList = () => RequestService.get(`/api/appointments/details/all`);

export const requestsList = () => RequestService.get(`/api/appointments/requests`);

export const acceptedAppointments = date =>
  RequestService.get(`/api/appointments/accepted?date=${date}`);
