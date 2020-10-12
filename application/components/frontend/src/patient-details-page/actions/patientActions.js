import { patientDetails, createNote } from 'patient-details-page/handlers/patientHandlers';

export const FETCH_PATIENT_DETAILS_PENDING = 'FETCH_PATIENT_DETAILS_PENDING';
export const FETCH_PATIENT_DETAILS_OK = 'FETCH_PATIENT_DETAILS_OK';
export const FETCH_PATIENT_DETAILS_FAIL = 'FETCH_PATIENT_DETAILS_FAIL';

export const CREATE_NEW_NOTE_PENDING = 'CREATE_NEW_NOTE_PENDING';
export const CREATE_NEW_NOTE_OK = 'CREATE_NEW_NOTE_OK';
export const CREATE_NEW_NOTE_FAIL = 'CREATE_NEW_NOTE_FAIL';

export const makeFetchPatientDetailsPending = () => ({
  type: FETCH_PATIENT_DETAILS_PENDING,
});

export const makeFetchPatientDetailsOk = patientData => ({
  type: FETCH_PATIENT_DETAILS_OK,
  payload: { patientData },
});

export const makeFetchPatientDetailsFail = () => ({
  type: FETCH_PATIENT_DETAILS_FAIL,
});

export const makeCreateNewNotePending = () => ({
  type: CREATE_NEW_NOTE_PENDING,
});

export const makeCreateNewNoteOk = noteData => ({
  type: CREATE_NEW_NOTE_OK,
  payload: { noteData },
});

export const makeCreateNewNoteFail = () => ({
  type: CREATE_NEW_NOTE_FAIL,
});

export const getPatientDetails = patientId => dispatch => {
  dispatch(makeFetchPatientDetailsPending());

  return patientDetails(patientId)
    .then(res => {
      dispatch(makeFetchPatientDetailsOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchPatientDetailsFail());
    });
};

export const addNote = noteData => dispatch => {
  dispatch(makeCreateNewNotePending());

  return createNote(noteData)
    .then(res => {
      dispatch(makeCreateNewNoteOk(res.data));
    })
    .catch(() => {
      dispatch(makeCreateNewNoteFail());
    });
};
