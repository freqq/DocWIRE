/* eslint-disable import/prefer-default-export */
import RequestService from 'common/services/RequestService';

export const filesUpload = (uploadRequest, filesList) =>
  RequestService.post(`/api/appointments/upload/${filesList}`, uploadRequest);
