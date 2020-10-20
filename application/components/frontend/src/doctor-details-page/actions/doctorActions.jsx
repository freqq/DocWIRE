import { doctorDetails, createReview } from 'doctor-details-page/handlers/doctorHandlers';

export const FETCH_DOCTOR_DETAILS_PENDING = 'FETCH_DOCTOR_DETAILS_PENDING';
export const FETCH_DOCTOR_DETAILS_OK = 'FETCH_DOCTOR_DETAILS_OK';
export const FETCH_DOCTOR_DETAILS_FAIL = 'FETCH_DOCTOR_DETAILS_FAIL';

export const CREATE_NEW_REVIEW_PENDING = 'CREATE_NEW_REVIEW_PENDING';
export const CREATE_NEW_REVIEW_OK = 'CREATE_NEW_REVIEW_OK';
export const CREATE_NEW_REVIEW_FAIL = 'CREATE_NEW_REVIEW_FAIL';

export const makeFetchDoctorDetailsPending = () => ({
  type: FETCH_DOCTOR_DETAILS_PENDING,
});

export const makeFetchDoctorDetailsOk = patientData => ({
  type: FETCH_DOCTOR_DETAILS_OK,
  payload: { patientData },
});

export const makeFetchDoctorDetailsFail = () => ({
  type: FETCH_DOCTOR_DETAILS_FAIL,
});

export const makeCreateNewReviewPending = () => ({
  type: CREATE_NEW_REVIEW_PENDING,
});

export const makeCreateNewReviewOk = reviewData => ({
  type: CREATE_NEW_REVIEW_OK,
  payload: { reviewData },
});

export const makeCreateNewReviewFail = () => ({
  type: CREATE_NEW_REVIEW_FAIL,
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

export const addReview = reviewData => dispatch => {
  dispatch(makeCreateNewReviewPending());

  return createReview(reviewData)
    .then(res => {
      dispatch(makeCreateNewReviewOk(res.data));
    })
    .catch(() => {
      dispatch(makeCreateNewReviewFail());
    });
};
