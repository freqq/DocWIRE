import { doctorDetails } from 'doctor-details-page/handlers/doctorHandlers';

export const FETCH_DOCTOR_DETAILS_PENDING = 'FETCH_DOCTOR_DETAILS_PENDING';
export const FETCH_DOCTOR_DETAILS_OK = 'FETCH_DOCTOR_DETAILS_OK';
export const FETCH_DOCTOR_DETAILS_FAIL = 'FETCH_DOCTOR_DETAILS_FAIL';

export const makeFetchDoctorDetailsPending = () => ({
  type: FETCH_DOCTOR_DETAILS_PENDING,
});

export const makeFetchDoctorDetailsOk = doctorData => ({
  type: FETCH_DOCTOR_DETAILS_OK,
  payload: { doctorData },
});

export const makeFetchDoctorDetailsFail = () => ({
  type: FETCH_DOCTOR_DETAILS_FAIL,
});

export const getDoctorDetails = doctorId => dispatch => {
  dispatch(makeFetchDoctorDetailsPending());

  return doctorDetails(doctorId)
    .then(res => {
      dispatch(makeFetchDoctorDetailsOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchDoctorDetailsFail());
    });
};
