import {
  appointmentsList,
  requestsList,
  acceptedAppointments,
} from 'appointments-page/handlers/appointmentHandlers';

export const FETCH_APPOINTMENTS_LIST_PENDING = 'FETCH_APPOINTMENTS_LIST_PENDING';
export const FETCH_APPOINTMENTS_LIST_OK = 'FETCH_APPOINTMENTS_LIST_OK';
export const FETCH_APPOINTMENTS_LIST_FAIL = 'FETCH_APPOINTMENTS_LIST_FAIL';

export const FETCH_APPOINTMENTS_REQUESTS_PENDING = 'FETCH_APPOINTMENTS_REQUESTS_PENDING';
export const FETCH_APPOINTMENTS_REQUESTS_OK = 'FETCH_APPOINTMENTS_REQUESTS_OK';
export const FETCH_APPOINTMENTS_REQUESTS_FAIL = 'FETCH_APPOINTMENTS_REQUESTS_FAIL';

export const FETCH_APPOINTMENTS_FOR_DAY_PENDING = 'FETCH_APPOINTMENTS_FOR_DAY_PENDING';
export const FETCH_APPOINTMENTS_FOR_DAY_OK = 'FETCH_APPOINTMENTS_FOR_DAY_OK';
export const FETCH_APPOINTMENTS_FOR_DAY_FAIL = 'FETCH_APPOINTMENTS_FOR_DAY_FAIL';

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

export const makeFetchAppointmentsRequestsPending = () => ({
  type: FETCH_APPOINTMENTS_REQUESTS_PENDING,
});

export const makeFetchAppointmentsRequestsOk = appointmentsRequests => ({
  type: FETCH_APPOINTMENTS_REQUESTS_OK,
  payload: { appointmentsRequests },
});

export const makeFetchAppointmentsRequestsFail = () => ({
  type: FETCH_APPOINTMENTS_REQUESTS_FAIL,
});

export const makeFetchAppointmentsForDayPending = () => ({
  type: FETCH_APPOINTMENTS_FOR_DAY_PENDING,
});

export const makeFetchAppointmentsForDayOk = appointmentsForDayList => ({
  type: FETCH_APPOINTMENTS_FOR_DAY_OK,
  payload: { appointmentsForDayList },
});

export const makeFetchAppointmentsForDayFail = () => ({
  type: FETCH_APPOINTMENTS_FOR_DAY_FAIL,
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

export const fetchAppointmentsForDay = dateObject => dispatch => {
  dispatch(makeFetchAppointmentsForDayPending());

  return acceptedAppointments(dateObject)
    .then(res => {
      dispatch(makeFetchAppointmentsForDayOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchAppointmentsForDayFail());
    });
};

export const fetchAppointmentsRequests = () => dispatch => {
  dispatch(makeFetchAppointmentsRequestsPending());

  return requestsList()
    .then(res => {
      dispatch(makeFetchAppointmentsRequestsOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchAppointmentsRequestsFail());
    });
};
