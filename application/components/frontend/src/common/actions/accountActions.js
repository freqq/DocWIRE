/* eslint-disable no-unused-vars */
import { replace } from 'react-router-redux';
import { INITIAL_DIAGNOSIS_PATH, DASHBOARD_PATH, CREATE_ACCOUNT_PATH } from 'common/paths';

import { fetchUserdata, createUser, editUser } from 'common/handlers/accountHandler';

export const ACCOUNT_INFO_OK = 'ACCOUNT_INFO_OK';
export const ACCOUNT_INFO_FAIL = 'ACCOUNT_INFO_FAIL';
export const ACCOUNT_INFO_FETCHING = 'ACCOUNT_INFO_FETCHING';

export const CREATE_ACCOUNT_OK = 'CREATE_ACCOUNT_OK';
export const CREATE_ACCOUNT_FAIL = 'CREATE_ACCOUNT_FAIL';
export const CREATE_ACCOUNT_FETCHING = 'CREATE_ACCOUNT_FETCHING';

export const makeAccountInfoOk = accountInfo => ({
  type: ACCOUNT_INFO_OK,
  payload: { accountInfo },
});

export const makeAccountInfoFetching = () => ({
  type: ACCOUNT_INFO_FETCHING,
});

export const makeAccountInfoFail = () => ({
  type: ACCOUNT_INFO_FAIL,
});

export const makeCreateAccountOk = () => ({
  type: CREATE_ACCOUNT_OK,
});

export const makeCreateAccountFetching = () => ({
  type: CREATE_ACCOUNT_FETCHING,
});

export const makeCreateAccountFail = () => ({
  type: CREATE_ACCOUNT_FAIL,
});

export const fetchAccountInfo = () => dispatch => {
  dispatch(makeAccountInfoFetching());

  return fetchUserdata()
    .then(res => {
      dispatch(makeAccountInfoOk(res.data));

      if (res.data.accountType === 'PATIENT' && !res.data.patientInfo.initialDiagnoseDone)
        dispatch(replace(INITIAL_DIAGNOSIS_PATH));
    })
    .catch(() => {
      dispatch(makeAccountInfoFail());
      dispatch(replace(CREATE_ACCOUNT_PATH));
    });
};

export const createAccount = accountData => dispatch => {
  dispatch(makeCreateAccountFetching());

  return createUser(accountData)
    .then(() => {
      dispatch(makeCreateAccountOk());
    })
    .catch(() => {
      dispatch(makeCreateAccountFail());
    });
};
