import React from 'react';
import styled from 'styled-components';

import NewAppointmentCard from 'appointments-page/components/NewAppointmentCard';

const AppointmentsColumnWrapper = styled.div.attrs({ className: 'appointments-column-wrapper' })``;

const ColumnTitle = styled.div.attrs({ className: 'column-title' })`
  font-weight: 100;
  margin-bottom: 10px;
`;

const APPOINTMENTS_REQUESTS = [
  {
    id: 1,
    firstName: 'Isabella',
    lastName: 'Smith',
    time: '09:00 - 09:30',
    date: 'Monday, February 26',
    appointmentType: 'USG + Consultation',
    price: '120$',
  },
  {
    id: 2,
    firstName: 'Isabella',
    lastName: 'Smith',
    time: '09:00 - 09:30',
    date: 'Monday, February 26',
    appointmentType: 'USG + Consultation',
    price: '120$',
  },
  {
    id: 3,
    firstName: 'Isabella',
    lastName: 'Smith',
    time: '09:00 - 09:30',
    date: 'Monday, February 26',
    appointmentType: 'USG + Consultation',
    price: '120$',
  },
];

const AppointmentsColumn = () => (
  <AppointmentsColumnWrapper>
    <ColumnTitle>New appointment requests</ColumnTitle>
    {APPOINTMENTS_REQUESTS.map(request => (
      <NewAppointmentCard
        key={request.id}
        firstName={request.firstName}
        lastName={request.lastName}
        date={request.date}
        time={request.time}
        appointmentType={request.appointmentType}
        price={request.price}
      />
    ))}
  </AppointmentsColumnWrapper>
);

export default AppointmentsColumn;
