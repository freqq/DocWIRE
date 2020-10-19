import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAppointmentsForDay } from 'appointments-page/actions/appointmentActions';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import AppointmentCard from 'appointments-page/components/AppointmentCard';

const AppointmentsAtHourWrapper = styled.div.attrs({ className: 'appointments-at-hour-wrapper' })`
  width: 100%;
  margin-bottom: 20px;
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

const AppointmentsCardsWrapper = styled.div.attrs({ className: 'appointments-cards-wrapper' })``;

const NotFound = styled.div.attrs({ className: 'not-found' })`
  margin: 20px auto;
  width: 80%;
  background: #ccc;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
`;

const AppointmentsAtHour = ({
  appointmentsList,
  fetchAppointmentsForDayFunc,
  isError,
  chosenDate,
  isLoading,
}) => {
  useEffect(() => {
    const dateObject = {
      chosenDate,
    };

    fetchAppointmentsForDayFunc(dateObject.toISOString());
  }, chosenDate);

  if (isLoading)
    return (
      <AppointmentsAtHourWrapper>
        <AppointmentsCardsWrapper>
          <ProgressIndicatorCircular />
        </AppointmentsCardsWrapper>
      </AppointmentsAtHourWrapper>
    );

  if (isError)
    return (
      <AppointmentsAtHourWrapper>
        <AppointmentsCardsWrapper>
          <ErrorBlock>There was an error while fetching appointments.</ErrorBlock>
        </AppointmentsCardsWrapper>
      </AppointmentsAtHourWrapper>
    );

  return (
    <AppointmentsAtHourWrapper>
      <AppointmentsCardsWrapper>
        {appointmentsList.length > 0 ? (
          <>
            {appointmentsList.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                time={appointment.time}
                firstName={appointment.firstName}
                lastName={appointment.lastName}
                appointmentType={appointment.appointmentType}
              />
            ))}
          </>
        ) : (
          <NotFound>No appointments found for chosen day.</NotFound>
        )}
      </AppointmentsCardsWrapper>
    </AppointmentsAtHourWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appointmentsList.appointments.acceptedIsLoading,
  isError: state.appointmentsList.appointments.acceptedIsError,
  appointmentsList: state.appointmentsList.appointments.accepted,
});

const mapDispatchToProps = dispatch => ({
  fetchAppointmentsForDayFunc: dateObject => dispatch(fetchAppointmentsForDay(dateObject)),
});

AppointmentsAtHour.propTypes = {
  appointmentsList: PropTypes.instanceOf(Object).isRequired,
  fetchAppointmentsForDayFunc: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  chosenDate: PropTypes.instanceOf(Date).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsAtHour);
