/* eslint-disable import/prefer-default-export */
import RequestService from 'common/services/RequestService';

export const patientDetails = patientId => RequestService.get(`/api/users/${patientId}`);
