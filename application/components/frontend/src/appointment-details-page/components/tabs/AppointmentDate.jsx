import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';

const AppointmentDateWrapper = styled.div.attrs({ className: 'appointment-date-wrapper' })`
  padding: 20px;
`;

const leadingZeros = param => (param < 10 ? '0' : '') + param;

const AppointmentDate = ({ appointmentDate }) => {
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

  const getFullDate = () =>
    `${getAppointmentDate(appointmentDate)}, ${getAppointmentTime(appointmentDate)}`;

  return <AppointmentDateWrapper>{getFullDate()}</AppointmentDateWrapper>;
};

AppointmentDate.propTypes = {
  appointmentDate: PropTypes.instanceOf(Object).isRequired,
};

export default AppointmentDate;
