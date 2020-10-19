import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppointmentsList from 'appointments-page/components/patient/AppointmentsList';
import AppointmentsPage from 'appointments-page/containers/AppointmentsPage';

const AppointmentsListChoice = ({ accountType }) =>
  accountType === 'PATIENT' ? <AppointmentsList /> : <AppointmentsPage />;

const mapStateToProps = state => ({
  accountType: state.common.accountData.userData.accountType,
});

AppointmentsListChoice.propTypes = {
  accountType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(AppointmentsListChoice);
