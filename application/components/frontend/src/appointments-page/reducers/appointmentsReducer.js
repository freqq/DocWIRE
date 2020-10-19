import {
  FETCH_APPOINTMENTS_LIST_PENDING,
  FETCH_APPOINTMENTS_LIST_OK,
  FETCH_APPOINTMENTS_LIST_FAIL,
  FETCH_APPOINTMENTS_REQUESTS_PENDING,
  FETCH_APPOINTMENTS_REQUESTS_OK,
  FETCH_APPOINTMENTS_REQUESTS_FAIL,
  FETCH_APPOINTMENTS_FOR_DAY_PENDING,
  FETCH_APPOINTMENTS_FOR_DAY_OK,
  FETCH_APPOINTMENTS_FOR_DAY_FAIL,
} from 'appointments-page/actions/appointmentActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: true,
  isError: false,
  requests: undefined,
  requestsIsLoading: true,
  requestsIsError: false,
  accepted: undefined,
  acceptedIsLoading: true,
  acceptedIsError: false,
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
  data: action.payload.appointmentsListData,
  isError: false,
  isLoading: false,
});

const fetchAcceptedPending = state => ({
  ...state,
  accepted: undefined,
  acceptedIsError: false,
  acceptedIsLoading: true,
});

const fetchAcceptedFail = state => ({
  ...state,
  accepted: undefined,
  acceptedIsError: true,
  acceptedIsLoading: false,
});

const fetchAcceptedOk = (state, action) => ({
  ...state,
  accepted: action.payload.appointmentsForDayList,
  acceptedIsError: false,
  acceptedIsLoading: false,
});

const fetchRequestsPending = state => ({
  ...state,
  requests: undefined,
  requestsIsError: false,
  requestsIsLoading: true,
});

const fetchRequestsFail = state => ({
  ...state,
  requests: undefined,
  requestsIsError: true,
  requestsIsLoading: false,
});

const fetchRequestsOk = (state, action) => ({
  ...state,
  requests: action.payload.appointmentsRequests,
  requestsIsError: false,
  requestsIsLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case FETCH_APPOINTMENTS_LIST_OK:
      return fetchOk(stateDefinition, action);
    case FETCH_APPOINTMENTS_LIST_PENDING:
      return fetchPending(stateDefinition);
    case FETCH_APPOINTMENTS_LIST_FAIL:
      return fetchFail(stateDefinition);
    case FETCH_APPOINTMENTS_REQUESTS_OK:
      return fetchRequestsOk(stateDefinition, action);
    case FETCH_APPOINTMENTS_REQUESTS_PENDING:
      return fetchRequestsPending(stateDefinition);
    case FETCH_APPOINTMENTS_REQUESTS_FAIL:
      return fetchRequestsFail(stateDefinition);
    case FETCH_APPOINTMENTS_FOR_DAY_OK:
      return fetchAcceptedOk(stateDefinition, action);
    case FETCH_APPOINTMENTS_FOR_DAY_PENDING:
      return fetchAcceptedPending(stateDefinition);
    case FETCH_APPOINTMENTS_FOR_DAY_FAIL:
      return fetchAcceptedFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
