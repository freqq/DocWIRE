import React from 'react';
import { Route, Switch } from 'react-router-dom';
import getPath from 'common/utils/path';
import makeLoadable from 'common/utils/loadable';
import NotFoundPage from 'common/components/NotFoundPage';

export const ROOT_PATH = getPath('/');
export const LOGIN_PATH = getPath('/login');
export const REGISTER_PATH = getPath('/register');
export const FORGOT_PASSWORD_PATH = getPath('/forgot-password');
export const DIAGNOSE_PATH = getPath('/diagnose');

export const LoadableMainPage = makeLoadable(() => import('main-page/containers/MainPage'));
export const LoadableLoginPage = makeLoadable(() => import('auth-page/containers/LoginPage'));
export const LoadableRegisterPage = makeLoadable(() => import('auth-page/containers/RegisterPage'));
export const LoadableForgotPasswordPage = makeLoadable(() =>
  import('auth-page/containers/ForgotPasswordPage'),
);
export const LoadableInitialDiagnosePage = makeLoadable(() =>
  import('initial-diagnose/containers/InitialDiagnosePage'),
);

const RootRouter = () => (
  <Switch>
    <Route exact path={ROOT_PATH} component={LoadableMainPage} />
    <Route exact path={LOGIN_PATH} component={LoadableLoginPage} />
    <Route exact path={REGISTER_PATH} component={LoadableRegisterPage} />
    <Route exact path={FORGOT_PASSWORD_PATH} component={LoadableForgotPasswordPage} />
    <Route exact path={DIAGNOSE_PATH} component={LoadableInitialDiagnosePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRouter;
