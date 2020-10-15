import { appointmentsList } from 'appointments-page/handlers/appointmentHandlers';

export const FETCH_APPOINTMENTS_LIST_PENDING = 'FETCH_APPOINTMENTS_LIST_PENDING';
export const FETCH_APPOINTMENTS_LIST_OK = 'FETCH_APPOINTMENTS_LIST_OK';
export const FETCH_APPOINTMENTS_LIST_FAIL = 'FETCH_APPOINTMENTS_LIST_FAIL';

export const makeFetchAppointmentsListPending = () => ({
  type: FETCH_APPOINTMENTS_LIST_PENDING,
});

export const makeFetchAppointmentsListOk = appointmentsListData => ({
  type: FETCH_APPOINTMENTS_LIST_OK,
  payload: { appointmentsListData },
});

export const makeFetchAppointmentsListFail = () => ({
  type: FETCH_APPOINTMENTS_LIST_FAIL,
});

export const fetchAppointmentsList = () => dispatch => {
  dispatch(makeFetchAppointmentsListPending());

  return appointmentsList()
    .then(res => {
      dispatch(makeFetchAppointmentsListOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchAppointmentsListFail());
    });
};
