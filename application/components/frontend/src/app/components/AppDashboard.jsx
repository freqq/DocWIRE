import React from 'react';
import styled from 'styled-components';

import CovidInformation from 'app/components/CovidInformation';
import Appointments from 'app/components/dashboard/Appointments';
import RecentActivity from 'app/components/dashboard/RecentActivity';
import Medications from 'app/components/dashboard/Medications';
import CurrentConditions from 'app/components/dashboard/CurrentConditions';
import RecentBills from 'app/components/dashboard/RecentBills';

const AppDashbaordWrapper = styled.div.attrs({ className: 'app-dashboard-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100% - 110px);
  padding: 20px 25px;
  background: #fafbfd;
`;

const DashboardGrid = styled.div.attrs({ className: 'dashboard-grid' })`
  display: grid;
  gap: 20px;
  grid-template-rows: fit-content(40%);
  margin-top: 20px;
  height: calc(100% - 108px);
`;

const TopGrid = styled.div.attrs({ className: 'top-grid' })`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 2fr;
`;

const BottomGrid = styled.div.attrs({ className: 'bottom-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const AppDashbaord = () => (
  <AppDashbaordWrapper>
    <CovidInformation />
    <DashboardGrid>
      <TopGrid>
        <Appointments />
        <RecentActivity />
      </TopGrid>
      <BottomGrid>
        <Medications />
        <CurrentConditions />
        <RecentBills />
      </BottomGrid>
    </DashboardGrid>
  </AppDashbaordWrapper>
);

export default AppDashbaord;
