import { reviewDoctor } from 'appointment-details-page/handlers/appointmentHandlers';

export const REVIEW_PENDING = 'REVIEW_PENDING';
export const REVIEW_OK = 'REVIEW_OK';
export const REVIEW_FAIL = 'REVIEW_FAIL';

export const makeReviewPending = () => ({
  type: REVIEW_PENDING,
});

export const makeReviewOk = reviewData => ({
  type: REVIEW_OK,
  payload: { reviewData },
});

export const makeReviewFail = () => ({
  type: REVIEW_FAIL,
});

export const doctorReview = ratingObject => dispatch => {
  dispatch(makeReviewPending());

  return reviewDoctor(ratingObject)
    .then(res => {
      dispatch(makeReviewOk(res.data));
    })
    .catch(() => {
      dispatch(makeReviewFail());
    });
};
