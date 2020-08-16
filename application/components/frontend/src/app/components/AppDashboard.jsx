import React from 'react';
import styled from 'styled-components';

import CovidInformation from 'app/components/CovidInformation';

const AppDashbaordWrapper = styled.div.attrs({ className: 'app-dashboard-wrapper' })`
  width: calc(100% - 50px);
  height: 100%;
  padding: 20px 25px;
  background: #fafbfd;
`;

const AppDashbaord = () => (
  <AppDashbaordWrapper>
    <CovidInformation />
  </AppDashbaordWrapper>
);

export default AppDashbaord;
