import React from 'react';
import styled from 'styled-components';

const AppDashbaordWrapper = styled.div.attrs({ className: 'app-dashboard-wrapper' })`
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fafbfd;
`;

const AppDashbaord = () => <AppDashbaordWrapper>123</AppDashbaordWrapper>;

export default AppDashbaord;
