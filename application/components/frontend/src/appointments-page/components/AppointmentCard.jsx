import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';
import UserSection from 'common/components/layout/navbar/UserSection';
import moreIcon from 'images/icons/more.svg';
import phoneIcon from 'images/icons/phone.svg';
import messageIcon from 'images/icons/message.svg';

const AppointmentCardWrapper = styled(Link).attrs({
  className: 'appointments-card-wrapper',
})`
  width: calc(100% - 32px);
  font-size: 12px;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #f2f2f9;
  cursor: pointer;
  transition: 0.2s;
  background: #fafbfd;
  color: #000;
  text-decoration: none;
  display: block;

  &:hover {
    transform: scale(1.02);
  }
`;

const AppointmentCardHeader = styled.div.attrs({
  className: 'appointments-card-header',
})`
  font-size: 11px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 10px;
`;

const AppointmentTime = styled.div.attrs({
  className: 'appointments-time',
})`
  font-size: 10px;
  font-weight: 100;
`;

const AppointmentMoreIconContainer = styled.div.attrs({
  className: 'appointments-more-icon-container',
})`
  text-align: right;
`;

const CardIconImage = styled.img.attrs({
  className: 'card-icon-image',
})`
  height: 12px;
  margin-left: 20px;
  cursor: pointer;
`;

const AppointmentCardFooter = styled.div.attrs({
  className: 'appointments-card-footer',
})`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  text-align: right;
`;

const AppointmentCard = ({ time, firstName, lastName, appointmentType, appointmentId }) => {
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

  const getFullDate = appointmentDate =>
    `${getAppointmentDate(appointmentDate)}, ${getAppointmentTime(appointmentDate)}`;

  return (
    <AppointmentCardWrapper to={`/appointments/${appointmentId}`}>
      <AppointmentCardHeader>
        <AppointmentTime>{getFullDate(time)}</AppointmentTime>
        <AppointmentMoreIconContainer>
          <CardIconImage alt="more-icon" src={moreIcon} />
        </AppointmentMoreIconContainer>
      </AppointmentCardHeader>
      <UserSection
        firstName={firstName}
        lastName={lastName}
        bottomText={appointmentType}
        showIcon={false}
        circleSize={30}
        circleFontSize={10}
      />
      <AppointmentCardFooter>
        <CardIconImage alt="message-icon" src={messageIcon} />
        <CardIconImage alt="phone-icon" src={phoneIcon} />
      </AppointmentCardFooter>
    </AppointmentCardWrapper>
  );
};

AppointmentCard.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
  appointmentType: PropTypes.string.isRequired,
};

export default AppointmentCard;
