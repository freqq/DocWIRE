import {
  AUTH_USER_INFO_OK,
  AUTH_USER_INFO_FAIL,
  AUTH_USER_INFO_FETCHING,
} from 'common/actions/authUserActions';

export const AUTH_USER_INITIAL_STATE = {
  keycloakInfo: null,
  isError: false,
  isFetching: true,
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? AUTH_USER_INITIAL_STATE : state;
  switch (type) {
    case AUTH_USER_INFO_OK:
      return {
        ...stateDefinition,
        isError: false,
        isFetching: false,
        keycloakInfo: payload.keycloakInfo,
      };
    case AUTH_USER_INFO_FAIL:
      return { ...stateDefinition, keycloakInfo: null, isFetching: false, isError: true };
    case AUTH_USER_INFO_FETCHING:
      return { ...stateDefinition, keycloakInfo: null, isFetching: true, isError: false };
    default:
      return stateDefinition;
  }
};
