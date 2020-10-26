import {
  FETCH_USERS_PENDING,
  FETCH_USERS_OK,
  FETCH_USERS_FAIL,
  SET_CURRENT_CHAT,
} from 'messages-page/actions/newMessageActions';

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  usersData: [],
  currentPerson: null,
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (type) {
    case FETCH_USERS_PENDING:
      return { ...stateDefinition, isLoading: true, isError: false, usersData: [] };
    case FETCH_USERS_OK:
      return {
        ...stateDefinition,
        isLoading: false,
        isError: false,
        usersData: payload.usersData
          .filter(user => user.userId !== payload.currentUserId)
          .slice(0, 5),
      };
    case FETCH_USERS_FAIL:
      return { ...stateDefinition, isLoading: false, isError: true, usersData: [] };
    case SET_CURRENT_CHAT:
      return {
        ...stateDefinition,
        currentPerson: payload.person,
      };
    default:
      return stateDefinition;
  }
};
