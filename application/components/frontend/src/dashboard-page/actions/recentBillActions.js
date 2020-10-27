import { recentPayment } from 'dashboard-page/handlers/recentBillHandlers';

export const FETCH_RECENT_PAYMENT_PENDING = 'FETCH_RECENT_PAYMENT_PENDING';
export const FETCH_RECENT_PAYMENT_OK = 'FETCH_RECENT_PAYMENT_OK';
export const FETCH_RECENT_PAYMENT_FAIL = 'FETCH_RECENT_PAYMENT_FAIL';

export const makeFetchRecentPaymentPending = () => ({
  type: FETCH_RECENT_PAYMENT_PENDING,
});

export const makeFetchRecentPaymentOk = billData => ({
  type: FETCH_RECENT_PAYMENT_OK,
  payload: { billData },
});

export const makeFetchRecentPaymentFail = () => ({
  type: FETCH_RECENT_PAYMENT_FAIL,
});

export const getRecentBill = () => dispatch => {
  dispatch(makeFetchRecentPaymentPending());

  return recentPayment()
    .then(res => {
      dispatch(makeFetchRecentPaymentOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchRecentPaymentFail());
    });
};
