import RequestService from 'common/services/RequestService';

export const fetchNewNotificationsCount = () => RequestService.get(`/api/notifications/new`);

export const fetchNotificationsList = () => RequestService.get(`/api/notifications/`);
