/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { APP_TITLE } from 'common/constants';
import { fetchAppointmentDetails } from 'appointment-details-page/actions/appointmentActions';
import AppointmentLeft from 'appointment-details-page/components/AppointmentLeft';
import AppointmentRight from 'appointment-details-page/components/AppointmentRight';
import AppointmentDetailsBreadcrumb from 'appointment-details-page/components/AppointmentDetailsBreadcrumb';

const AppointmentDetailsPageWrapper = styled.div.attrs({
  className: 'appointment-details-page-wrapper',
})`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
`;

const AppointmentGrid = styled.div.attrs({ className: 'message-grid' })`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  width: 100%;
`;

const AppointmentDetailsPage = ({ fetchAppointmentDetailsFunc, isLoading, isError, match }) => {
  useEffect(() => {
    const {
      params: { appointmentId },
    } = match;

    document.title = `Appointment details - ${APP_TITLE}`;
    fetchAppointmentDetailsFunc(appointmentId);
  }, []);

  return (
    <AppointmentDetailsPageWrapper>
      <AppointmentDetailsBreadcrumb patientName="Alice Cooper" />
      <AppointmentGrid>
        <AppointmentLeft />
        <AppointmentRight />
      </AppointmentGrid>
    </AppointmentDetailsPageWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appointmentDetails.details.isLoading,
  isError: state.appointmentDetails.details.isError,
});

const mapDispatchToProps = dispatch => ({
  fetchAppointmentDetailsFunc: appointmentId => dispatch(fetchAppointmentDetails(appointmentId)),
});

AppointmentDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      appointmentId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetchAppointmentDetailsFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailsPage);
