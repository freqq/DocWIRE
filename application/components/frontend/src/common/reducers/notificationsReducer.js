import {
  NEW_NOTIFICATIONS_COUNT_PENDING,
  NEW_NOTIFICATIONS_COUNT_OK,
  NEW_NOTIFICATIONS_COUNT_FAIL,
  NOTIFICATION_LIST_PENDING,
  NOTIFICATION_LIST_OK,
  NOTIFICATION_LIST_FAIL,
} from 'common/actions/notificationsActions';

export const SEARCH_INITIAL_STATE = {
  data: null,
  isError: false,
  isLoading: true,
  notificationsData: null,
  isListError: false,
  isListLoading: true,
};

export default (state, { type, payload }) => {
  const stateDefinition = typeof state === 'undefined' ? SEARCH_INITIAL_STATE : state;
  switch (type) {
    case NEW_NOTIFICATIONS_COUNT_OK:
      return {
        ...stateDefinition,
        isError: false,
        isLoading: false,
        data: payload.notificationsCount,
      };
    case NEW_NOTIFICATIONS_COUNT_FAIL:
      return { ...stateDefinition, data: null, isLoading: false, isError: true };
    case NEW_NOTIFICATIONS_COUNT_PENDING:
      return { ...stateDefinition, data: null, isLoading: true, isError: false };
    case NOTIFICATION_LIST_OK:
      return {
        ...stateDefinition,
        isListError: false,
        isListLoading: false,
        notificationsData: payload.notificationsList,
      };
    case NOTIFICATION_LIST_FAIL:
      return {
        ...stateDefinition,
        notificationsData: null,
        isListLoading: false,
        isListError: true,
      };
    case NOTIFICATION_LIST_PENDING:
      return {
        ...stateDefinition,
        notificationsData: null,
        isListLoading: true,
        isListError: false,
      };
    default:
      return stateDefinition;
  }
};
