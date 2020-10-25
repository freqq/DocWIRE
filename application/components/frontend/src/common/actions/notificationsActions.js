import {
  fetchNewNotificationsCount,
  fetchNotificationsList,
} from 'common/handlers/notificationsHandler';

export const NEW_NOTIFICATIONS_COUNT_PENDING = 'NEW_NOTIFICATIONS_COUNT_PENDING';
export const NEW_NOTIFICATIONS_COUNT_OK = 'NEW_NOTIFICATIONS_COUNT_OK';
export const NEW_NOTIFICATIONS_COUNT_FAIL = 'NEW_NOTIFICATIONS_COUNT_FAIL';

export const NOTIFICATION_LIST_PENDING = 'NOTIFICATION_LIST_PENDING';
export const NOTIFICATION_LIST_OK = 'NOTIFICATION_LIST_OK';
export const NOTIFICATION_LIST_FAIL = 'NOTIFICATION_LIST_FAIL';

export const HANDLE_NEW_NOTIFICATIONS = 'HANDLE_NEW_NOTIFICATIONS';

export const handleNotification = () => ({
  type: HANDLE_NEW_NOTIFICATIONS,
});

export const makeNewNotificationsCountPending = () => ({
  type: NEW_NOTIFICATIONS_COUNT_PENDING,
});

export const makeNewNotificationsCountFail = () => ({
  type: NEW_NOTIFICATIONS_COUNT_FAIL,
});

export const makeNewNotificationsCountOk = notificationsCount => ({
  type: NEW_NOTIFICATIONS_COUNT_OK,
  payload: { notificationsCount },
});

export const makeNotificationsListPending = () => ({
  type: NOTIFICATION_LIST_PENDING,
});

export const makeNotificationsListFail = () => ({
  type: NOTIFICATION_LIST_FAIL,
});

export const makeNotificationsListOk = notificationsList => ({
  type: NOTIFICATION_LIST_OK,
  payload: { notificationsList },
});

export const getNewNotificationsCount = () => dispatch => {
  dispatch(makeNewNotificationsCountPending());

  return fetchNewNotificationsCount()
    .then(res => {
      dispatch(makeNewNotificationsCountOk(res.data));
    })
    .catch(() => {
      dispatch(makeNewNotificationsCountFail());
    });
};

export const getNotificationsList = () => dispatch => {
  dispatch(makeNotificationsListPending());

  return fetchNotificationsList()
    .then(res => {
      dispatch(makeNotificationsListOk(res.data));
    })
    .catch(() => {
      dispatch(makeNotificationsListFail());
    });
};

export const handleNewNotification = () => dispatch => {
  dispatch(handleNotification());
};
