import React from 'react';
import styled from 'styled-components';

import AppointmentsHeader from 'appointments-page/components/AppointmentsHeader';
import AppointmentsCurrentDate from 'appointments-page/components/AppointmentsCurrentDate';
import AppointmentsAtHour from 'appointments-page/components/AppointmentsAtHour';

const AppointmentsLeftCardWrapper = styled.div.attrs({
  className: 'appointments-left-card-wrapper',
})`
  height: 78vh;
  overflow: hidden;
  background: #ffffff;
  padding: 25px;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
`;

const AppointmentsListWrapper = styled.div.attrs({
  className: 'appointments-list-wrapper',
})`
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const APPOINTMENTS_LIST = [
  {
    id: 1,
    time: '09:00',
    appointmentsList: [
      {
        id: 1,
        time: '09:00 - 09:30',
        firstName: 'William',
        lastName: 'Brown',
        appointmentType: 'USG + Constultation',
      },
      {
        id: 2,
        time: '09:30 - 10:00',
        firstName: 'Emma',
        lastName: 'Thomson',
        appointmentType: 'Emergency appointment',
      },
    ],
  },
  {
    id: 2,
    time: '10:00',
    appointmentsList: [
      {
        id: 3,
        time: '10:00 - 10:30',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        appointmentType: 'Medicine dose adjustment',
      },
      {
        id: 4,
        time: '10:30 - 10:45',
        firstName: 'James',
        lastName: 'Davis',
        appointmentType: 'Consultation',
      },
    ],
  },
];

const AppointmentsLeftCard = () => (
  <AppointmentsLeftCardWrapper>
    <AppointmentsHeader />
    <AppointmentsCurrentDate date={new Date()} />
    <AppointmentsListWrapper>
      {APPOINTMENTS_LIST.map(appointmentBlock => (
        <AppointmentsAtHour
          key={appointmentBlock.id}
          time={appointmentBlock.time}
          appointmentsList={appointmentBlock.appointmentsList}
        />
      ))}
    </AppointmentsListWrapper>
  </AppointmentsLeftCardWrapper>
);

export default AppointmentsLeftCard;
