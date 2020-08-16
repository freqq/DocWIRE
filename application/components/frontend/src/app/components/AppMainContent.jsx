import React from 'react';
import styled from 'styled-components';

import AppNavbar from 'app/components/AppNavbar';
import AppDashboard from 'app/components/AppDashboard';

const AppMainContentWrapper = styled.div.attrs({ className: 'app-main-content-wrapper' })`
  width: 100%;
  height: 100%;
  background: #ffffff;
`;

const AppMainContent = () => (
  <AppMainContentWrapper>
    <AppNavbar />
    <AppDashboard />
  </AppMainContentWrapper>
);

export default AppMainContent;
