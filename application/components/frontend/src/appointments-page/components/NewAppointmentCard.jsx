/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserSection from 'common/components/layout/navbar/UserSection';
import messageIcon from 'images/icons/message.svg';

const NewAppointmentCardWrapper = styled.div.attrs({ className: 'new-appointment-card-wrapper' })`
  background: #ffffff;
  padding: 20px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 12px;
`;

const Time = styled.div.attrs({ className: 'time' })`
  margin-top: 15px;
  margin-bottom: 3px;
`;

const Date = styled.div.attrs({ className: 'date' })`
  font-weight: 100;
  font-size: 8px;
`;

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px 0;
  margin: 10px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  &:first-child {
    border: none;
    margin: 0;
    padding: 0;
  }
`;

const AppointmentType = styled.div.attrs({ className: 'appointment-type' })`
  font-weight: 100;
`;

const Price = styled.div.attrs({ className: 'price' })`
  text-align: right;
`;

const IconsBlock = styled.div.attrs({ className: 'icons-block' })`
  text-align: right;
`;

const Icon = styled.img.attrs({ className: 'icon' })`
  width: 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`;

const ApproveButton = styled.div.attrs({ className: 'approve-button' })`
  text-align: center;
  width: 20%;
  display: inline-block;
  font-size: 10px;
  cursor: pointer;
  transition: 0.2s;
  background: #2d4564;
  margin-right: 10px;
  color: #ffffff;
  font-weight: 100;
  padding: 10px 20px;
  border: 1px solid #2d4564;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const RescheduleButton = styled.div.attrs({ className: 'reschedule-button' })`
  text-align: center;
  width: 20%;
  display: inline-block;
  font-size: 10px;
  cursor: pointer;
  transition: 0.2s;
  background: #ffffff;
  color: #2d4564;
  font-weight: 100;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #2d4564;

  &:hover {
    opacity: 0.8;
  }
`;

const NewAppointmentCard = ({ firstName, lastName, date, time, appointmentType, price }) => (
  <NewAppointmentCardWrapper>
    <TwoSideGrid>
      <UserSection
        firstName={firstName}
        lastName={lastName}
        bottomText="Patient"
        showIcon={false}
        circleSize={30}
        circleFontSize={9}
      />
      <IconsBlock>
        <Icon src={messageIcon} alt="message-icon" />
      </IconsBlock>
    </TwoSideGrid>
    <Time>{time}</Time>
    <Date>{date}</Date>
    <TwoSideGrid>
      <AppointmentType>{appointmentType}</AppointmentType>
      <Price>{price}</Price>
    </TwoSideGrid>
    <ApproveButton>Approve</ApproveButton>
    <RescheduleButton>Reschedule</RescheduleButton>
  </NewAppointmentCardWrapper>
);

NewAppointmentCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  appointmentType: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default NewAppointmentCard;
