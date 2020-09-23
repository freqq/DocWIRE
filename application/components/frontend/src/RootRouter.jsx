import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import getPath from 'common/utils/path';
import makeLoadable from 'common/utils/loadable';
import NotFoundPage from 'common/components/NotFoundPage';
import Layout from 'common/components/layout/Layout';
import AuthService from 'AuthService';

export const ROOT_PATH = getPath('/');
export const DASHBOARD_PATH = getPath('/dashboard');
export const PATIENT_DETAILS_PATH = getPath('/patient/:patientId');
export const PROFILE_SETTINGS_PATH = getPath('/settings');
export const MESSAGES_PATH = getPath('/messages');
export const APPOINTMENTS_PATH = getPath('/appointments');
export const DIAGNOSE_PATH = getPath('/diagnose');
export const FAQ_PATH = getPath('/faq');
export const APPOINTMENT_DETAILS_PATH = getPath('/appointments/:appointmentId');
export const VIDEO_CONVERSATION_PAGE = getPath('/call/:callId');
export const CREATE_ACCOUNT_PATH = getPath('/create-account');

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

export const LoadableInitialDiagnosePage = makeLoadable(() =>
  import('initial-diagnose/containers/InitialDiagnosePage'),
);

export const LoadableVideoConversationPage = makeLoadable(() =>
  import('video-conversation-page/containers/VideoConversationPage'),
);

export const LoadableCreateAccountPage = makeLoadable(() =>
  import('create-account-page/containers/CreateAccountPage'),
);

const RootRouter = ({ isAccountError, userInfo }) => (
  <Switch>
    <Route exact path={ROOT_PATH} component={LoadableMainPage} />
    <AuthService>
      <Route exact path={DIAGNOSE_PATH} component={LoadableInitialDiagnosePage} />
      <Route exact path={CREATE_ACCOUNT_PATH} component={LoadableCreateAccountPage} />
      {!isAccountError &&
        userInfo &&
        ((userInfo.patientInfo && userInfo.patientInfo.initialDiagnoseDone) ||
          userInfo.doctorInfo) && (
          <Layout>
            <Route exact path={DASHBOARD_PATH} component={LoadableDashboardPage} />
            <Route exact path={MESSAGES_PATH} component={LoadableMessagesPage} />
            <Route exact path={APPOINTMENTS_PATH} component={LoadableAppointmentsPage} />
            <Route exact path={PATIENT_DETAILS_PATH} component={LoadablePatientDetailsPage} />
            <Route exact path={PROFILE_SETTINGS_PATH} component={LoadableProfileSettingsPage} />
            <Route
              exact
              path={APPOINTMENT_DETAILS_PATH}
              component={LoadableAppointmentDetailsPage}
            />
            <Route exact path={FAQ_PATH} component={LoadableFAQPage} />
            <Route exact path={VIDEO_CONVERSATION_PAGE} component={LoadableVideoConversationPage} />
          </Layout>
        )}
    </AuthService>
    <Route component={NotFoundPage} />
  </Switch>
);

const mapStateToProps = state => ({
  isAccountError: state.common.accountData.isError,
  userInfo: state.common.accountData.userData,
});

RootRouter.propTypes = {
  isAccountError: PropTypes.bool.isRequired,
  userInfo: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(RootRouter);
