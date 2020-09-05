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
  width: calc(100% - 30px);
  font-size: 12px;
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 10px;
  border: 1px solid #f2f2f9;
  cursor: pointer;
  transition: 0.2s;

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
  margin-top: 5px;
  padding-top: 15px;
  border-top: 1px solid #778e9ea2;
  text-align: right;
`;

const CARD_COLORS = ['#e3f3fd', '#ffefef', '#fffaed', '#f6f5fa'];

const AppointmentCard = ({ time, firstName, lastName, appointmentType }) => {
  const getRandomBackgroundColor = () =>
    CARD_COLORS[Math.floor(CARD_COLORS.length * Math.random())];

  return (
    <AppointmentCardWrapper style={{ background: getRandomBackgroundColor() }}>
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
