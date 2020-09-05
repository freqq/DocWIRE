import React from 'react';
import styled from 'styled-components';

import AppointmentsLeftCard from 'appointments-page/containers/AppointmentsLeftCard';
import AppointmentsRightCard from 'appointments-page/containers/AppointmentsRightCard';

const AppointmentsPageWrapper = styled.div.attrs({ className: 'appointments-page-wrapper' })`
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 40%;
  gap: 30px;
`;

const AppointmentsPage = () => (
  <AppointmentsPageWrapper>
    <AppointmentsLeftCard />
    <AppointmentsRightCard />
  </AppointmentsPageWrapper>
);

export default AppointmentsPage;
