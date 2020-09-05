import React from 'react';
import styled from 'styled-components';

import SearchBar from 'common/components/layout/navbar/SearchBar';
import UserSection from 'common/components/layout/navbar/UserSection';
import NotificationsBell from 'common/components/layout/navbar/NotificationsBell';

const LayoutNavbarWrapper = styled.div.attrs({ className: 'layout-navbar-wrapper' })`
  width: calc(100% - 50px);
  height: 50px;
  line-height: 50px;
  padding: 10px 25px;
  border-bottom: 1px solid #f0f0f0;
  background: #ffffff;
`;

const RightSide = styled.div.attrs({ className: 'right-side' })`
  float: right;
`;

const LayoutNavbar = () => (
  <LayoutNavbarWrapper>
    <SearchBar />
    <RightSide>
      <NotificationsBell />
      <UserSection firstName="Steven" lastName="Holland" bottomText="Patient" />
    </RightSide>
  </LayoutNavbarWrapper>
);

export default LayoutNavbar;
