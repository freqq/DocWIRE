import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';

const AppointmentCardWrapper = styled(Link).attrs({ className: 'appointment-card-wrapper' })`
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  font-size: 9px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  cursor: pointer;
  transition: 0.2s;
  margin: 10px 0;
  color: #000;
  text-decoration: none;

  &:hover {
    transform: scale(1.02);
  }
`;

const Column = styled.div.attrs({ className: 'column' })``;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 100;
  margin-bottom: 5px;
`;
const Name = styled.div.attrs({ className: 'name' })`
  font-size: 14px;
  font-weight: 400;

  &:first-child {
    margin-bottom: 5px;
  }
`;

const AppointmentCard = ({ appointmentDate, doctorData, appointmentState, appointmentId }) => {
  const leadingZeros = param => (param < 10 ? '0' : '') + param;

  const getAppointmentDate = dateObj => {
    const chosenDate = moment(dateObj);

    const year = chosenDate.year();
    const monthName = MONTH_FULL_NAMES[chosenDate.month()];
    const day = chosenDate.date();
    const dayOfWeek = WEEK_DAYS_NAMES[chosenDate.day()];

    return `${dayOfWeek} ${day} ${monthName}, ${year}`;
  };

  const getAppointmentTime = dateObj => {
    const chosenDate = moment(dateObj);
    const chosenDateEnd = moment(dateObj).add('30', 'minutes');

    const hour = leadingZeros(chosenDate.hour());
    const minutes = leadingZeros(chosenDate.minutes());

    const hourEnd = leadingZeros(chosenDateEnd.hour());
    const minutesEnd = leadingZeros(chosenDateEnd.minutes());

    return `${hour}:${minutes} - ${hourEnd}:${minutesEnd}`;
  };

  const getDoctorFullName = doctor => `${doctor.firstName} ${doctor.lastName}`;

  return (
    <AppointmentCardWrapper to={`/appointments/${appointmentId}`}>
      <Column>
        <Name>{getAppointmentDate(appointmentDate)}</Name>
        <Title>{getAppointmentTime(appointmentDate)}</Title>
      </Column>
      <Column>
        <Title>Appointment state</Title>
        <Name>{appointmentState}</Name>
      </Column>
      <Column>
        <Title>Doctor</Title>
        <Name>{getDoctorFullName(doctorData)}</Name>
      </Column>
    </AppointmentCardWrapper>
  );
};

AppointmentCard.propTypes = {
  appointmentDate: PropTypes.instanceOf(Date).isRequired,
  doctorData: PropTypes.string.isRequired,
  appointmentState: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default AppointmentCard;
