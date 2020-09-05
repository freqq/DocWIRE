import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AppointmentCard from 'appointments-page/components/AppointmentCard';

const AppointmentsAtHourWrapper = styled.div.attrs({ className: 'appointments-at-hour-wrapper' })`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 1fr;
`;

const AppointmentsTime = styled.div.attrs({ className: 'appointments-time' })`
  font-weight: 600;
  font-size: 12px;
`;

const AppointmentsCardsWrapper = styled.div.attrs({ className: 'appointments-cards-wrapper' })``;

const AppointmentsAtHour = ({ time, appointmentsList }) => (
  <AppointmentsAtHourWrapper>
    <AppointmentsTime>{time}</AppointmentsTime>
    <AppointmentsCardsWrapper>
      {appointmentsList.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          time={appointment.time}
          firstName={appointment.firstName}
          lastName={appointment.lastName}
          appointmentType={appointment.appointmentType}
        />
      ))}
    </AppointmentsCardsWrapper>
  </AppointmentsAtHourWrapper>
);

AppointmentsAtHour.propTypes = {
  time: PropTypes.string.isRequired,
  appointmentsList: PropTypes.instanceOf(Object).isRequired,
};

export default AppointmentsAtHour;
