import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserSection from 'common/components/layout/navbar/UserSection';
import moreIcon from 'images/icons/more.svg';
import phoneIcon from 'images/icons/phone.svg';
import messageIcon from 'images/icons/message.svg';

const AppointmentCardWrapper = styled.div.attrs({
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

const AppointmentCard = ({ time, firstName, lastName, appointmentType }) => {
  return (
    <AppointmentCardWrapper>
      <AppointmentCardHeader>
        <AppointmentTime>{time}</AppointmentTime>
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
  appointmentType: PropTypes.string.isRequired,
};

export default AppointmentCard;
