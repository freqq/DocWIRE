import {
  FETCH_DOCTORS_FETCHING,
  FETCH_DOCTORS_OK,
  FETCH_DOCTORS_FAIL,
} from 'initial-diagnose/actions/diagnoseActions';

export const CHOOSE_DOCTOR_INITIAL_STATE = {
  doctorsList: undefined,
  isError: false,
  isFetching: false,
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? CHOOSE_DOCTOR_INITIAL_STATE : state;
  switch (type) {
    case FETCH_DOCTORS_OK:
      return {
        ...stateDefinition,
        isError: false,
        isFetching: false,
        doctorsList: payload.data,
      };
    case FETCH_DOCTORS_FAIL:
      return { ...stateDefinition, doctorsList: null, isFetching: false, isError: true };
    case FETCH_DOCTORS_FETCHING:
      return { ...stateDefinition, doctorsList: null, isFetching: true, isError: false };
    default:
      return stateDefinition;
  }
};
