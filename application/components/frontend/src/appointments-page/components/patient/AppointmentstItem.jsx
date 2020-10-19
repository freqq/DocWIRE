import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';
import AppointmentCard from 'patient-details-page/components/AppointmentCard';

const AppointmentstItemWrapper = styled.li.attrs({ className: 'appointments-item-wrapper' })`
  width: calc(100% - 40px);
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 20px;
`;

const AppointmentstItem = ({ appointment }) => {
  const getDoctorFullName = () => `${appointment.doctor.firstName} ${appointment.doctor.lastName}`;

  const leadingZeros = param => (param < 10 ? '0' : '') + param;

  const getAppointmentDate = () => {
    const chosenDate = moment(appointment.appointmentDate);

    const year = chosenDate.year();
    const monthName = MONTH_FULL_NAMES[chosenDate.month()];
    const day = chosenDate.date();
    const dayOfWeek = WEEK_DAYS_NAMES[chosenDate.day()];

    return `${dayOfWeek} ${day} ${monthName}, ${year}`;
  };

  const getAppointmentTime = () => {
    const chosenDate = moment(appointment.appointmentDate);
    const chosenDateEnd = moment(appointment.appointmentDate).add('30', 'minutes');

    const hour = leadingZeros(chosenDate.hour());
    const minutes = leadingZeros(chosenDate.minutes());

    const hourEnd = leadingZeros(chosenDateEnd.hour());
    const minutesEnd = leadingZeros(chosenDateEnd.minutes());

    return `${hour}:${minutes} - ${hourEnd}:${minutesEnd}`;
  };

  return (
    <AppointmentstItemWrapper>
      <AppointmentCard
        appointmentId={appointment.id}
        doctorName={getDoctorFullName()}
        time={getAppointmentTime()}
        date={getAppointmentDate()}
        treatmentType="Root Canal prep"
      />
    </AppointmentstItemWrapper>
  );
};

AppointmentstItem.propTypes = {
  appointment: PropTypes.instanceOf(Object).isRequired,
};

export default AppointmentstItem;
