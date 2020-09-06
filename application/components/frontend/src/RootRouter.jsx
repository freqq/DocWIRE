import React from 'react';
import { Route, Switch } from 'react-router-dom';
import getPath from 'common/utils/path';
import makeLoadable from 'common/utils/loadable';
import NotFoundPage from 'common/components/NotFoundPage';
import Layout from 'common/components/layout/Layout';

export const ROOT_PATH = getPath('/');
export const DASHBOARD_PATH = getPath('/dashboard');
export const PATIENT_DETAILS_PATH = getPath('/patient/:patientId');
export const PROFILE_SETTINGS_PATH = getPath('/settings');
export const MESSAGES_PATH = getPath('/messages');
export const APPOINTMENTS_PATH = getPath('/appointments');
export const LOGIN_PATH = getPath('/login');
export const REGISTER_PATH = getPath('/register');
export const FORGOT_PASSWORD_PATH = getPath('/forgot-password');
export const DIAGNOSE_PATH = getPath('/diagnose');
export const FAQ_PATH = getPath('/faq');
export const APPOINTMENT_DETAILS_PATH = getPath('/appointments/:appointmentId');

export const LoadableMainPage = makeLoadable(() => import('main-page/containers/MainPage'));
export const LoadableDashboardPage = makeLoadable(() =>
  import('dashboard-page/containers/DashboardPage'),
);
export const LoadableMessagesPage = makeLoadable(() =>
  import('messages-page/containers/MessagesPage'),
);
export const LoadableAppointmentsPage = makeLoadable(() =>
  import('appointments-page/containers/AppointmentsPage'),
);
export const LoadableProfileSettingsPage = makeLoadable(() =>
  import('profile-settings-page/containers/ProfileSettingsPage'),
);
export const LoadablePatientDetailsPage = makeLoadable(() =>
  import('patient-details-page/containers/PatientDetailsPage'),
);
export const LoadableFAQPage = makeLoadable(() => import('faq-page/containers/FAQPage'));
export const LoadableAppointmentDetailsPage = makeLoadable(() =>
  import('appointment-details-page/containers/AppointmentDetailsPage'),
);
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
    <Layout>
      <Route exact path={DASHBOARD_PATH} component={LoadableDashboardPage} />
      <Route exact path={MESSAGES_PATH} component={LoadableMessagesPage} />
      <Route exact path={APPOINTMENTS_PATH} component={LoadableAppointmentsPage} />
      <Route exact path={PATIENT_DETAILS_PATH} component={LoadablePatientDetailsPage} />
      <Route exact path={PROFILE_SETTINGS_PATH} component={LoadableProfileSettingsPage} />
      <Route exact path={APPOINTMENT_DETAILS_PATH} component={LoadableAppointmentDetailsPage} />
      <Route exact path={FAQ_PATH} component={LoadableFAQPage} />
    </Layout>
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRouter;
