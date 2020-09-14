import React, { useEffect } from 'react';
import styled from 'styled-components';

import { APP_TITLE } from 'common/constants';
import CovidInformation from 'dashboard-page/components/CovidInformation';
import Appointments from 'dashboard-page/components/Appointments';
import RecentActivity from 'dashboard-page/components/RecentActivity';
import Medications from 'dashboard-page/components/Medications';
import CurrentConditions from 'dashboard-page/components/CurrentConditions';
import RecentBills from 'dashboard-page/components/RecentBills';

const AppDashboardWrapper = styled.div.attrs({ className: 'app-dashboard-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
  background: #fafbfd;
  overflow: hidden;
`;

const DashboardGrid = styled.div.attrs({ className: 'dashboard-grid' })`
  display: grid;
  gap: 20px;
  grid-template-rows: 10% 35% 55%;
  overflow: hidden;
  height: 100%;
`;

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 2fr;
  height: 100%;
`;

const BottomRightGrid = styled.div.attrs({ className: 'bottom-right-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const DashboardPage = () => {
  useEffect(() => {
    document.title = `Dashboard - ${APP_TITLE}`;
  }, []);

  return (
    <AppDashboardWrapper>
      <DashboardGrid>
        <CovidInformation />
        <TwoSideGrid>
          <Appointments />
          <RecentActivity />
        </TwoSideGrid>
        <TwoSideGrid>
          <Medications />
          <BottomRightGrid>
            <CurrentConditions />
            <RecentBills />
          </BottomRightGrid>
        </TwoSideGrid>
      </DashboardGrid>
    </AppDashboardWrapper>
  );
};

export default DashboardPage;
