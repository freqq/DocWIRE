import { recentAppointment } from 'dashboard-page/handlers/dashboardHandlers';

export const FETCH_RECENT_APPOINTMENT_PENDING = 'FETCH_RECENT_APPOINTMENT_PENDING';
export const FETCH_RECENT_APPOINTMENT_OK = 'FETCH_RECENT_APPOINTMENT_OK';
export const FETCH_RECENT_APPOINTMENT_FAIL = 'FETCH_RECENT_APPOINTMENT_FAIL';

export const makeFetchRecentAppointmentPending = () => ({
  type: FETCH_RECENT_APPOINTMENT_PENDING,
});

export const makeFetchRecentAppointmentOk = appointmentData => ({
  type: FETCH_RECENT_APPOINTMENT_OK,
  payload: { appointmentData },
});

export const makeFetchRecentAppointmentFail = () => ({
  type: FETCH_RECENT_APPOINTMENT_FAIL,
});

export const getRecentAppointment = () => dispatch => {
  dispatch(makeFetchRecentAppointmentPending());

  return recentAppointment()
    .then(res => {
      dispatch(makeFetchRecentAppointmentOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchRecentAppointmentFail());
    });
};
