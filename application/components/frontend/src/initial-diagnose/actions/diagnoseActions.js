import { getDoctors, bookAppointment } from 'initial-diagnose/handlers/diagnoseHandlers';

export const FETCH_DOCTORS_FETCHING = 'FETCH_DOCTORS_FETCHING';
export const FETCH_DOCTORS_OK = 'FETCH_DOCTORS_OK';
export const FETCH_DOCTORS_FAIL = 'FETCH_DOCTORS_FAIL';

export const CREATE_APPOINTMENT_FETCHING = 'CREATE_APPOINTMENT_FETCHING';
export const CREATE_APPOINTMENT_OK = 'CREATE_APPOINTMENT_OK';
export const CREATE_APPOINTMENT_FAIL = 'CREATE_APPOINTMENT_FAIL';

export const makeDoctorsFetching = () => ({
  type: FETCH_DOCTORS_FETCHING,
});

export const makeDoctorsOk = data => ({
  type: FETCH_DOCTORS_OK,
  payload: { data },
});

export const makeDoctorsFail = () => ({
  type: FETCH_DOCTORS_FAIL,
});

export const makeCreateAppointmentFetching = () => ({
  type: CREATE_APPOINTMENT_FETCHING,
});

export const makeCreateAppointmentOk = data => ({
  type: CREATE_APPOINTMENT_OK,
  payload: { data },
});

export const makeCreateAppointmentFail = () => ({
  type: CREATE_APPOINTMENT_FAIL,
});

export const fetchDoctorsList = searchQuery => dispatch => {
  dispatch(makeDoctorsFetching());

  return getDoctors(searchQuery)
    .then(res => {
      dispatch(makeDoctorsOk(res.data));
    })
    .catch(() => {
      dispatch(makeDoctorsFail());
    });
};

export const createAppointment = appointmentData => dispatch => {
  dispatch(makeCreateAppointmentFetching());

  return bookAppointment(appointmentData)
    .then(res => {
      dispatch(makeCreateAppointmentOk(res.data));
    })
    .catch(() => {
      dispatch(makeCreateAppointmentFail());
    });
};
