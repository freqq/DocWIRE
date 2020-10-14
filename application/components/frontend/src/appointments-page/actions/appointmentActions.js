import { appointmentDetails } from 'appointments-page/handlers/appointmentHandlers';

export const FETCH_APPOINTMENT_PENDING = 'FETCH_APPOINTMENT_PENDING';
export const FETCH_APPOINTMENT_OK = 'FETCH_APPOINTMENT_OK';
export const FETCH_APPOINTMENT_FAIL = 'FETCH_APPOINTMENT_FAIL';

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
