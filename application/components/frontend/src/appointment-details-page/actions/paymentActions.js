/* eslint-disable no-unused-vars */
import { loadStripe } from '@stripe/stripe-js';

import { payForAppointment } from 'appointment-details-page/handlers/paymentHandlers';

const stripePromise = loadStripe(
  'pk_test_51HdE8mDV6EZPJrHH6ux01msiBTXw4BG0xKoVUY6FSOJryZPnGVkX3jNCdOSV823bS47nrEnbkQMB6659kjowouAf00UBbtf4EV',
);

export const CREATE_PAYMENT_SESSION_PENDING = 'CREATE_PAYMENT_SESSION_PENDING';
export const CREATE_PAYMENT_SESSION_OK = 'CREATE_PAYMENT_SESSION_OK';
export const CREATE_PAYMENT_SESSION_FAIL = 'CREATE_PAYMENT_SESSION_FAIL';

export const makeCreatePaymentSessionPending = () => ({
  type: CREATE_PAYMENT_SESSION_PENDING,
});

export const makeCreatePaymentSessionOk = paymentSessionData => ({
  type: CREATE_PAYMENT_SESSION_OK,
  payload: { paymentSessionData },
});

export const makeCreatePaymentSessionFail = () => ({
  type: CREATE_PAYMENT_SESSION_FAIL,
});

export const createPaymentSession = sessionRequest => async dispatch => {
  const stripe = await stripePromise;
  dispatch(makeCreatePaymentSessionPending());

  return payForAppointment(sessionRequest)
    .then(res => {
      dispatch(makeCreatePaymentSessionOk(res.data));
      stripe.redirectToCheckout({ sessionId: res.data.id });
    })
    .catch(() => {
      dispatch(makeCreatePaymentSessionFail());
    });
};
