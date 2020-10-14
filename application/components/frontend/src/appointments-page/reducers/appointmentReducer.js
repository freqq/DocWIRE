import {
  FETCH_APPOINTMENT_PENDING,
  FETCH_APPOINTMENT_OK,
  FETCH_APPOINTMENT_FAIL,
} from 'appointments-page/actions/appointmentsActions';

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
  data: action.payload.appointmentData,
  isError: false,
  isLoading: false,
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
    default:
      return stateDefinition;
  }
};
