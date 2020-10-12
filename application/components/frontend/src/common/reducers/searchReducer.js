import { SEARCH_FETCHING, SEARCH_FAIL, SEARCH_OK } from 'common/actions/searchActions';

export const SEARCH_INITIAL_STATE = {
  data: null,
  isError: false,
  isLoading: false,
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? SEARCH_INITIAL_STATE : state;
  switch (type) {
    case SEARCH_OK:
      return {
        ...stateDefinition,
        isError: false,
        isLoading: false,
        data: payload.searchData,
      };
    case SEARCH_FAIL:
      return { ...stateDefinition, data: null, isLoading: false, isError: true };
    case SEARCH_FETCHING:
      return { ...stateDefinition, data: null, isLoading: true, isError: false };
    default:
      return stateDefinition;
  }
};
