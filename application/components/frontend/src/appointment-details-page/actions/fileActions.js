import { filesUpload, fileDownload } from 'appointment-details-page/handlers/filesHandlers';
import { successToast, errorToast } from 'common/components/notifications/notifications';

export const UPLOAD_FILES_PENDING = 'UPLOAD_FILES_PENDING';
export const UPLOAD_FILES_OK = 'UPLOAD_FILES_OK';
export const UPLOAD_FILES_FAIL = 'UPLOAD_FILES_FAIL';

export const DOWNLOAD_FILE_PENDING = 'DOWNLOAD_FILE_PENDING';
export const DOWNLOAD_FILE_OK = 'DOWNLOAD_FILE_OK';
export const DOWNLOAD_FILE_FAIL = 'DOWNLOAD_FILE_FAIL';

export const makeUploadFilesPending = () => ({
  type: UPLOAD_FILES_PENDING,
});

export const makeUploadFilesOk = filesData => ({
  type: UPLOAD_FILES_OK,
  payload: { filesData },
});

export const makeUploadFilesFail = () => ({
  type: UPLOAD_FILES_FAIL,
});

export const makeDownloadPending = () => ({
  type: DOWNLOAD_FILE_PENDING,
});

export const makeDownloadOk = fileData => ({
  type: DOWNLOAD_FILE_OK,
  payload: { fileData },
});

export const makeDownloadFail = () => ({
  type: DOWNLOAD_FILE_FAIL,
});

export const uploadFiles = uploadFormData => dispatch => {
  dispatch(makeUploadFilesPending());

  return filesUpload(uploadFormData)
    .then(res => {
      dispatch(makeUploadFilesOk(res.data));
      successToast('Successfully uploaded files!');
    })
    .catch(() => {
      dispatch(makeUploadFilesFail());
      errorToast('There was an error while files upload.');
    });
};

export const downloadFile = fileId => dispatch => {
  dispatch(makeDownloadPending());

  return fileDownload(fileId)
    .then(res => {
      dispatch(makeDownloadOk(res.data));
    })
    .catch(() => {
      dispatch(makeDownloadFail());
    });
};
