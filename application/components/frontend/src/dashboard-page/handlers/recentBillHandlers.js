import RequestService from 'common/services/RequestService';

export const recentPayment = () => RequestService.get(`/api/payment/history/recent`);
