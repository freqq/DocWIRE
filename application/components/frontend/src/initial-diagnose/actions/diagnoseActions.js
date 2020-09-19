import { getDoctors } from 'initial-diagnose/handlers/diagnoseHandlers';

export const FETCH_DOCTORS_FETCHING = 'FETCH_DOCTORS_FETCHING';
export const FETCH_DOCTORS_OK = 'FETCH_DOCTORS_OK';
export const FETCH_DOCTORS_FAIL = 'FETCH_DOCTORS_FAIL';

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
