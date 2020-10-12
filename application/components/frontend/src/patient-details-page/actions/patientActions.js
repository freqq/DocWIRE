import { patientDetails } from 'patient-details-page/handlers/patientHandlers';

export const FETCH_PATIENT_DETAILS_PENDING = 'FETCH_PATIENT_DETAILS_PENDING';
export const FETCH_PATIENT_DETAILS_OK = 'FETCH_PATIENT_DETAILS_OK';
export const FETCH_PATIENT_DETAILS_FAIL = 'FETCH_PATIENT_DETAILS_FAIL';

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
