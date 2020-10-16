import {
  FETCH_APPOINTMENT_PENDING,
  FETCH_APPOINTMENT_OK,
  FETCH_APPOINTMENT_FAIL,
  ACCEPT_APPOINTMENT_REQUEST_PENDING,
  ACCEPT_APPOINTMENT_REQUEST_OK,
  ACCEPT_APPOINTMENT_REQUEST_FAIL,
} from 'appointment-details-page/actions/appointmentActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: true,
  isError: false,
  isAcceptRequestLoading: false,
  isAcceptRequestError: false,
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
  data: action.payload.appointmentData,
  isError: false,
  isLoading: false,
});

const acceptRequestPending = state => ({
  ...state,
  isAcceptRequestError: false,
  isAcceptRequestLoading: true,
});

const acceptRequestFail = state => ({
  ...state,
  isAcceptRequestError: true,
  isAcceptRequestLoading: false,
});

const acceptRequestOk = (state, action) => ({
  ...state,
  data: action.payload.appointmentData,
  isAcceptRequestError: false,
  isAcceptRequestLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case FETCH_APPOINTMENT_OK:
      return fetchOk(stateDefinition, action);
    case FETCH_APPOINTMENT_PENDING:
      return fetchPending(stateDefinition);
    case FETCH_APPOINTMENT_FAIL:
      return fetchFail(stateDefinition);
    case ACCEPT_APPOINTMENT_REQUEST_OK:
      return acceptRequestOk(stateDefinition, action);
    case ACCEPT_APPOINTMENT_REQUEST_PENDING:
      return acceptRequestPending(stateDefinition);
    case ACCEPT_APPOINTMENT_REQUEST_FAIL:
      return acceptRequestFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
