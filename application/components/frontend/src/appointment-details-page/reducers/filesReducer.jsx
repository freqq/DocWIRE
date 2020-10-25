import {
  UPLOAD_FILES_PENDING,
  UPLOAD_FILES_OK,
  UPLOAD_FILES_FAIL,
} from 'appointment-details-page/actions/fileActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: false,
  isError: false,
};

const filesPending = state => ({
  ...state,
  data: undefined,
  isError: false,
  isLoading: true,
});

const filesFail = state => ({
  ...state,
  data: undefined,
  isError: true,
  isLoading: false,
});

const filesOk = (state, action) => ({
  ...state,
  data: action.payload.reviewData,
  isError: false,
  isLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case UPLOAD_FILES_OK:
      return filesOk(stateDefinition, action);
    case UPLOAD_FILES_PENDING:
      return filesPending(stateDefinition);
    case UPLOAD_FILES_FAIL:
      return filesFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
