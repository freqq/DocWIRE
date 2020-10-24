import {
  REVIEW_PENDING,
  REVIEW_OK,
  REVIEW_FAIL,
} from 'appointment-details-page/actions/reviewActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: false,
  isError: false,
};

const reviewPending = state => ({
  ...state,
  data: undefined,
  isError: false,
  isLoading: true,
});

const reviewFail = state => ({
  ...state,
  data: undefined,
  isError: true,
  isLoading: false,
});

const reviewOk = (state, action) => ({
  ...state,
  data: action.payload.reviewData,
  isError: false,
  isLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case REVIEW_OK:
      return reviewOk(stateDefinition, action);
    case REVIEW_PENDING:
      return reviewPending(stateDefinition);
    case REVIEW_FAIL:
      return reviewFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
