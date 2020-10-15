/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { APP_TITLE } from 'common/constants';
import { fetchAppointmentsList } from 'appointments-page/actions/appointmentActions';
import AppointmentsLeftCard from 'appointments-page/containers/AppointmentsLeftCard';
import AppointmentsRightCard from 'appointments-page/containers/AppointmentsRightCard';
import AppointmentsColumn from 'appointments-page/components/AppointmentsColumn';

const AppointmentsPageWrapper = styled.div.attrs({ className: 'appointments-page-wrapper' })`
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 40% 20%;
  gap: 30px;
`;

const AppointmentsPage = ({ fetchAppointmentsListFunc, isLoading, isError }) => {
  useEffect(() => {
    document.title = `Appointments - ${APP_TITLE}`;
    fetchAppointmentsListFunc();
  }, []);

  return (
    <AppointmentsPageWrapper>
      <AppointmentsLeftCard />
      <AppointmentsColumn />
      <AppointmentsRightCard />
    </AppointmentsPageWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appointmentsList.appointments.isLoading,
  isError: state.appointmentsList.appointments.isError,
});

const mapDispatchToProps = dispatch => ({
  fetchAppointmentsListFunc: () => dispatch(fetchAppointmentsList()),
});

AppointmentsPage.propTypes = {
  fetchAppointmentsListFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsPage);
