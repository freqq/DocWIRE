import RequestService from 'common/services/RequestService';

export const filesUpload = uploadFormData =>
  RequestService.postFile(`/api/appointments/files/upload`, uploadFormData);

export const fileDownload = fileId =>
  RequestService.get(`/api/appointments/files/download/${fileId}`);
