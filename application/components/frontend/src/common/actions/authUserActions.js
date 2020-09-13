import { push, replace } from 'react-router-redux';
import Keycloak from 'keycloak-js';

import { BASE_PATH, INTERNAL_SERVER_ERROR_PATH } from 'common/paths';
import initKeycloakOptions from 'common/keycloak_params';
import { fetchAccountInfo } from 'common/actions/accountActions';

export const AUTH_USER_INFO_OK = 'AUTH_USER_INFO_OK';
export const KEYCLOAK_OBJECT_OK = 'KEYCLOAK_OBJECT_OK';
export const AUTH_USER_INFO_FAIL = 'AUTH_USER_INFO_FAIL';
export const AUTH_USER_INFO_FETCHING = 'AUTH_USER_INFO_FETCHING';

const getRedirectionPath = currentPath =>
  currentPath !== INTERNAL_SERVER_ERROR_PATH ? currentPath : BASE_PATH;

export const makeAuthUserInfoOk = keycloakInfo => ({
  type: AUTH_USER_INFO_OK,
  payload: { keycloakInfo },
});

export const makeAuthUserInfoFetching = () => ({
  type: AUTH_USER_INFO_FETCHING,
});

export const makeAuthUserInfoFail = () => ({
  type: AUTH_USER_INFO_FAIL,
});

export const fetchAuthUserInfo = currentPath => dispatch => {
  const keycloak = Keycloak(initKeycloakOptions);

  dispatch(makeAuthUserInfoFetching());

  keycloak.onTokenExpired = () => {
    keycloak.updateToken(30);
  };

  return keycloak
    .init({ onLoad: initKeycloakOptions.onLoad })
    .success(() => {
      keycloak.loadUserInfo().success(() => {
        dispatch(makeAuthUserInfoOk(keycloak));
        dispatch(replace(getRedirectionPath(currentPath)));
        dispatch(fetchAccountInfo());
      });
    })
    .error(() => {
      dispatch(makeAuthUserInfoFail());
      dispatch(push(INTERNAL_SERVER_ERROR_PATH));
    });
};

export const logoutUser = () => {
  const keycloak = Keycloak(initKeycloakOptions);

  return keycloak.init().success(() => {
    keycloak.logout();
  });
};
