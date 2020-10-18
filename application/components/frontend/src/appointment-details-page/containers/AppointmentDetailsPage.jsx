/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { successToast, errorToast } from 'common/components/notifications/notifications';
import { APP_TITLE } from 'common/constants';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
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

const ErrorBlock = styled.div.attrs({ className: 'error-block' })`
  padding: 20px 10px;
  margin: 5px 0;
  text-align: center;
  background: #fce7e6;
  font-size: 12px;
  color: #552526;
  width: 80%;
  margin: 20px auto;
`;

const AppointmentDetailsPage = ({
  fetchAppointmentDetailsFunc,
  isLoading,
  isError,
  match,
  data,
}) => {
  useEffect(() => {
    const {
      params: { appointmentId },
    } = match;

    document.title = `Appointment details - ${APP_TITLE}`;
    fetchAppointmentDetailsFunc(appointmentId);

    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) successToast('Payment succesfully booked.');
    if (query.get('canceled')) errorToast('Payment canceled');
  }, []);

  const getFullName = person => `${person.firstName} ${person.lastName}`;

  if (isError)
    return (
      <AppointmentDetailsPageWrapper>
        <ErrorBlock>There was an error while fetching appointment details</ErrorBlock>
      </AppointmentDetailsPageWrapper>
    );

  if (isLoading)
    return (
      <AppointmentDetailsPageWrapper>
        <ProgressIndicatorCircular />
      </AppointmentDetailsPageWrapper>
    );

  return (
    <AppointmentDetailsPageWrapper>
      <AppointmentDetailsBreadcrumb patientName={getFullName(data.patient)} />
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
  data: state.appointmentDetails.details.data,
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
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailsPage);
