import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AppointmentCardWrapper = styled.div.attrs({ className: 'appointment-card-wrapper' })`
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

const AppointmentCard = ({ date, time, treatmentType, doctorName }) => (
  <AppointmentCardWrapper>
    <Column>
      <Name>{date}</Name>
      <Title>{time}</Title>
    </Column>
    <Column>
      <Title>Treatment</Title>
      <Name>{treatmentType}</Name>
    </Column>
    <Column>
      <Title>Doctor</Title>
      <Name>{doctorName}</Name>
    </Column>
  </AppointmentCardWrapper>
);

AppointmentCard.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  treatmentType: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
};

export default AppointmentCard;
