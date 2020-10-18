import {
  CREATE_PAYMENT_SESSION_PENDING,
  CREATE_PAYMENT_SESSION_OK,
  CREATE_PAYMENT_SESSION_FAIL,
} from 'appointment-details-page/actions/paymentActions';

const INITIAL_STATE = {
  sessionId: undefined,
  isLoading: false,
  isError: false,
};

const sessionPending = state => ({
  ...state,
  sessionId: undefined,
  isError: false,
  isLoading: true,
});

const sessionFail = state => ({
  ...state,
  sessionId: undefined,
  isError: true,
  isLoading: false,
});

const sessionOk = (state, action) => ({
  ...state,
  sessionId: action.payload.paymentSessionData.id,
  isError: false,
  isLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case CREATE_PAYMENT_SESSION_OK:
      return sessionOk(stateDefinition, action);
    case CREATE_PAYMENT_SESSION_PENDING:
      return sessionPending(stateDefinition);
    case CREATE_PAYMENT_SESSION_FAIL:
      return sessionFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
