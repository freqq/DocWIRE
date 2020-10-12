import {
  FETCH_RECENT_APPOINTMENT_PENDING,
  FETCH_RECENT_APPOINTMENT_OK,
  FETCH_RECENT_APPOINTMENT_FAIL,
} from 'dashboard-page/actions/dashboardActions';

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
    case FETCH_RECENT_APPOINTMENT_OK:
      return fetchOk(stateDefinition, action);
    case FETCH_RECENT_APPOINTMENT_PENDING:
      return fetchPending(stateDefinition);
    case FETCH_RECENT_APPOINTMENT_FAIL:
      return fetchFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
