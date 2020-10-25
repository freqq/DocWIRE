import { filesUpload } from 'appointment-details-page/handlers/filesHandlers';

export const UPLOAD_FILES_PENDING = 'UPLOAD_FILES_PENDING';
export const UPLOAD_FILES_OK = 'UPLOAD_FILES_OK';
export const UPLOAD_FILES_FAIL = 'UPLOAD_FILES_FAIL';

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

export const uploadFiles = filesList => dispatch => {
  dispatch(makeUploadFilesPending());

  return filesUpload(filesList)
    .then(res => {
      dispatch(makeUploadFilesOk(res.data));
    })
    .catch(() => {
      dispatch(makeUploadFilesFail());
    });
};
