import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';

import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import { fetchAppointmentsRequests } from 'appointments-page/actions/appointmentActions';
import NewAppointmentCard from 'appointments-page/components/NewAppointmentCard';

const AppointmentsColumnWrapper = styled.div.attrs({ className: 'appointments-column-wrapper' })`
  position: relative;
`;

const ColumnTitle = styled.div.attrs({ className: 'column-title' })`
  font-weight: 100;
  margin-bottom: 10px;
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

const AppointmentsColumn = ({ fetchAppointmentsRequestsFunc, isLoading, isError, requests }) => {
  useEffect(() => {
    fetchAppointmentsRequestsFunc();
  }, []);

  const leadingZeros = param => (param < 10 ? '0' : '') + param;

  const getDate = date => {
    const chosenDate = moment(date);

    const year = chosenDate.year();
    const monthName = MONTH_FULL_NAMES[chosenDate.month()];
    const day = chosenDate.date();
    const dayOfWeek = WEEK_DAYS_NAMES[chosenDate.day()];

    return `${dayOfWeek} ${day} ${monthName}, ${year}`;
  };
  const getTime = date => {
    const chosenDate = moment(date);
    const chosenDateEnd = moment(date).add('30', 'minutes');

    const hour = leadingZeros(chosenDate.hour());
    const minutes = leadingZeros(chosenDate.minutes());

    const hourEnd = leadingZeros(chosenDateEnd.hour());
    const minutesEnd = leadingZeros(chosenDateEnd.minutes());

    return `${hour}:${minutes} - ${hourEnd}:${minutesEnd}`;
  };

  if (isError)
    return (
      <AppointmentsColumnWrapper>
        <ColumnTitle>New appointment requests</ColumnTitle>
        <ErrorBlock>There was an error while fetching appointments requests.</ErrorBlock>
      </AppointmentsColumnWrapper>
    );

  return (
    <AppointmentsColumnWrapper>
      <ColumnTitle>New appointment requests</ColumnTitle>
      {isLoading ? (
        <ProgressIndicatorCircular />
      ) : (
        <>
          {requests.map(request => (
            <NewAppointmentCard
              key={request.id}
              patientId={request.patient.userId}
              appointmentId={request.id}
              firstName={request.patient.firstName}
              lastName={request.patient.lastName}
              date={getDate(request.appointmentDate)}
              time={getTime(request.appointmentDate)}
              appointmentType="TYPE"
              price={request.appointmentPrice}
            />
          ))}
        </>
      )}
    </AppointmentsColumnWrapper>
  );
};

const mapStateToProps = state => ({
  requests: state.appointmentsList.appointments.requests,
  isLoading: state.appointmentsList.appointments.requestsIsLoading,
  isError: state.appointmentsList.appointments.requestsIsError,
});

const mapDispatchToProps = dispatch => ({
  fetchAppointmentsRequestsFunc: () => dispatch(fetchAppointmentsRequests()),
});

AppointmentsColumn.propTypes = {
  fetchAppointmentsRequestsFunc: PropTypes.func.isRequired,
  requests: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsColumn);
