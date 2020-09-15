import {
  ACCOUNT_INFO_OK,
  ACCOUNT_INFO_FAIL,
  ACCOUNT_INFO_FETCHING,
  CREATE_ACCOUNT_OK,
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_FETCHING,
} from 'common/actions/accountActions';

export const ACCOUNT_DATA_INITIAL_STATE = {
  userData: null,
  isError: false,
  isFetching: true,
  createLoading: true,
  createError: false,
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? ACCOUNT_DATA_INITIAL_STATE : state;
  switch (type) {
    case ACCOUNT_INFO_OK:
      return {
        ...stateDefinition,
        isError: false,
        isFetching: false,
        userData: payload.accountInfo,
      };
    case ACCOUNT_INFO_FAIL:
      return { ...stateDefinition, userData: null, isFetching: false, isError: true };
    case ACCOUNT_INFO_FETCHING:
      return { ...stateDefinition, userData: null, isFetching: true, isError: false };
    case CREATE_ACCOUNT_OK:
      return {
        ...stateDefinition,
        createError: false,
        createLoading: false,
      };
    case CREATE_ACCOUNT_FAIL:
      return { ...stateDefinition, createLoading: false, createError: true };
    case CREATE_ACCOUNT_FETCHING:
      return { ...stateDefinition, createLoading: true, createError: false };
    default:
      return stateDefinition;
  }
};
