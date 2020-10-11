import {
  CREATE_APPOINTMENT_FETCHING,
  CREATE_APPOINTMENT_OK,
  CREATE_APPOINTMENT_FAIL,
} from 'initial-diagnose/actions/diagnoseActions';

export const CREATE_APPOINTMENT_INITIAL_STATE = {
  appointmentData: null,
  isError: false,
  isFetching: true,
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? CREATE_APPOINTMENT_INITIAL_STATE : state;
  switch (type) {
    case CREATE_APPOINTMENT_OK:
      return {
        ...stateDefinition,
        isError: false,
        isFetching: false,
        appointmentData: payload.data,
      };
    case CREATE_APPOINTMENT_FAIL:
      return { ...stateDefinition, appointmentData: null, isFetching: false, isError: true };
    case CREATE_APPOINTMENT_FETCHING:
      return { ...stateDefinition, appointmentData: null, isFetching: true, isError: false };
    default:
      return stateDefinition;
  }
};
