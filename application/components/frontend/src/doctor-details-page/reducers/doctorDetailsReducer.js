import {
  FETCH_DOCTOR_DETAILS_PENDING,
  FETCH_DOCTOR_DETAILS_OK,
  FETCH_DOCTOR_DETAILS_FAIL,
  CREATE_NEW_REVIEW_PENDING,
  CREATE_NEW_REVIEW_OK,
  CREATE_NEW_REVIEW_FAIL,
} from 'doctor-details-page/actions/doctorActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: true,
  isError: false,
  reviews: undefined,
  isReviewsLoading: false,
  isReviewsError: false,
};

const fetchPending = state => ({
  ...state,
  data: undefined,
  reviews: undefined,
  isError: false,
  isLoading: true,
});

const fetchFail = state => ({
  ...state,
  data: undefined,
  notes: undefined,
  isError: true,
  isLoading: false,
});

const fetchOk = (state, action) => ({
  ...state,
  data: action.payload,
  notes: action.payload.doctorData.reviewResponse.reverse(),
  isError: false,
  isLoading: false,
});

const reviewPending = state => ({
  ...state,
  isReviewsError: false,
  isReviewsLoading: true,
});

const reviewFail = state => ({
  ...state,
  isReviewsError: true,
  isReviewsLoading: false,
});

const reviewOk = (state, action) => ({
  ...state,
  reviews: [action.payload.reviewData, ...state.reviews],
  isReviewsError: false,
  isReviewsLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case FETCH_DOCTOR_DETAILS_OK:
      return fetchOk(stateDefinition, action);
    case FETCH_DOCTOR_DETAILS_PENDING:
      return fetchPending(stateDefinition);
    case FETCH_DOCTOR_DETAILS_FAIL:
      return fetchFail(stateDefinition);
    case CREATE_NEW_REVIEW_OK:
      return reviewOk(stateDefinition, action);
    case CREATE_NEW_REVIEW_PENDING:
      return reviewPending(stateDefinition);
    case CREATE_NEW_REVIEW_FAIL:
      return reviewFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
