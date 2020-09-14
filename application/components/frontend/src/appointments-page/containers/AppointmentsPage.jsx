import React, { useEffect } from 'react';
import styled from 'styled-components';

import { APP_TITLE } from 'common/constants';
import AppointmentsLeftCard from 'appointments-page/containers/AppointmentsLeftCard';
import AppointmentsRightCard from 'appointments-page/containers/AppointmentsRightCard';
import AppointmentsColumn from 'appointments-page/components/AppointmentsColumn';

const AppointmentsPageWrapper = styled.div.attrs({ className: 'appointments-page-wrapper' })`
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 40% 20%;
  gap: 30px;
`;

const AppointmentsPage = () => {
  useEffect(() => {
    document.title = `Appointments - ${APP_TITLE}`;
  }, []);

  return (
    <AppointmentsPageWrapper>
      <AppointmentsLeftCard />
      <AppointmentsColumn />
      <AppointmentsRightCard />
    </AppointmentsPageWrapper>
  );
};

export default AppointmentsPage;
