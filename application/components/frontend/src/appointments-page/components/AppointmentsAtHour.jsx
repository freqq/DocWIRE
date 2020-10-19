import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

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

const AppointmentsCardsWrapper = styled.div.attrs({ className: 'appointments-cards-wrapper' })`
  padding-right: 20px;
`;

const NotFound = styled.div.attrs({ className: 'not-found' })`
  margin: 20px auto;
  width: 80%;
  background: rgba(45, 69, 100, 0.85);
  color: #fff;
  padding: 30px 10px;
  font-size: 11px;
  font-weight: 100;
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
    const dateObject = moment(chosenDate);
    fetchAppointmentsForDayFunc(dateObject.add(1, 'd').toISOString());
  }, [chosenDate]);

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
                appointmentId={appointment.id}
                time={appointment.appointmentDate}
                firstName={appointment.patient.firstName}
                lastName={appointment.patient.lastName}
                appointmentType="TYPE"
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
