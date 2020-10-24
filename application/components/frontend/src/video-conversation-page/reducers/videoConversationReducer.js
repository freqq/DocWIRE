import {
  CONNECT_TO_APPOINTMENT_PENDING,
  CONNECT_TO_APPOINTMENT_OK,
  CONNECT_TO_APPOINTMENT_FAIL,
} from 'video-conversation-page/actions/videoConversationActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: true,
  isError: false,
};

const connectPending = state => ({
  ...state,
  data: undefined,
  isError: false,
  isLoading: false,
});

const connectFail = state => ({
  ...state,
  data: undefined,
  isError: true,
  isLoading: false,
});

const connectOk = (state, action) => ({
  ...state,
  data: action.payload.appointmentData,
  isError: false,
  isLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case CONNECT_TO_APPOINTMENT_OK:
      return connectOk(stateDefinition, action);
    case CONNECT_TO_APPOINTMENT_PENDING:
      return connectPending(stateDefinition);
    case CONNECT_TO_APPOINTMENT_FAIL:
      return connectFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
