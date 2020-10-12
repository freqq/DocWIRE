import {
  FETCH_PATIENT_DETAILS_PENDING,
  FETCH_PATIENT_DETAILS_OK,
  FETCH_PATIENT_DETAILS_FAIL,
} from 'patient-details-page/actions/patientActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: true,
  isError: false,
};

const fetchPending = state => ({
  ...state,
  data: undefined,
  isError: false,
  isLoading: true,
});

const fetchFail = state => ({
  ...state,
  data: undefined,
  isError: true,
  isLoading: false,
});

const fetchOk = (state, action) => ({
  ...state,
  data: action.payload,
  isError: false,
  isLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case FETCH_PATIENT_DETAILS_OK:
      return fetchOk(stateDefinition, action);
    case FETCH_PATIENT_DETAILS_PENDING:
      return fetchPending(stateDefinition);
    case FETCH_PATIENT_DETAILS_FAIL:
      return fetchFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
