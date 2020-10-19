import {
  appointmentDetails,
  acceptRequest,
} from 'appointment-details-page/handlers/appointmentHandlers';
import { push } from 'react-router-redux';

export const FETCH_APPOINTMENT_PENDING = 'FETCH_APPOINTMENT_PENDING';
export const FETCH_APPOINTMENT_OK = 'FETCH_APPOINTMENT_OK';
export const FETCH_APPOINTMENT_FAIL = 'FETCH_APPOINTMENT_FAIL';

export const ACCEPT_APPOINTMENT_REQUEST_PENDING = 'ACCEPT_APPOINTMENT_REQUEST_PENDING';
export const ACCEPT_APPOINTMENT_REQUEST_OK = 'ACCEPT_APPOINTMENT_REQUEST_OK';
export const ACCEPT_APPOINTMENT_REQUEST_FAIL = 'ACCEPT_APPOINTMENT_REQUEST_FAIL';

export const makeFetchAppointmentPending = () => ({
  type: FETCH_APPOINTMENT_PENDING,
});

export const makeFetchAppointmentOk = appointmentData => ({
  type: FETCH_APPOINTMENT_OK,
  payload: { appointmentData },
});

export const makeFetchAppointmentFail = () => ({
  type: FETCH_APPOINTMENT_FAIL,
});

export const makeAcceptAppointmentRequestPending = () => ({
  type: ACCEPT_APPOINTMENT_REQUEST_PENDING,
});

export const makeAcceptAppointmentRequestOk = appointmentData => ({
  type: ACCEPT_APPOINTMENT_REQUEST_OK,
  payload: { appointmentData },
});

export const makeAcceptAppointmentRequestFail = () => ({
  type: ACCEPT_APPOINTMENT_REQUEST_FAIL,
});

export const fetchAppointmentDetails = appointmentId => dispatch => {
  dispatch(makeFetchAppointmentPending());

  return appointmentDetails(appointmentId)
    .then(res => {
      dispatch(makeFetchAppointmentOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchAppointmentFail());
    });
};

export const acceptAppointmentRequest = appointmentId => dispatch => {
  dispatch(makeAcceptAppointmentRequestPending());

  return acceptRequest(appointmentId)
    .then(res => {
      dispatch(makeAcceptAppointmentRequestOk(res.data));
      dispatch(push(`/appointments/${appointmentId}`));
    })
    .catch(() => {
      dispatch(makeAcceptAppointmentRequestFail());
    });
};
