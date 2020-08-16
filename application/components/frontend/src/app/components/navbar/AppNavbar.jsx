import React from 'react';
import styled from 'styled-components';

import SearchBar from 'app/components/navbar/SearchBar';
import UserSection from 'app/components/navbar/UserSection';
import NotificationsBell from 'app/components/navbar/NotificationsBell';

const AppNavbarWrapper = styled.div.attrs({ className: 'app-navbar-wrapper' })`
  width: calc(100% - 50px);
  height: 50px;
  line-height: 50px;
  padding: 10px 25px;
  border-bottom: 1px solid #f0f0f0;
`;

const RightSide = styled.div.attrs({ className: 'right-side' })`
  float: right;
`;

const AppNavbar = () => (
  <AppNavbarWrapper>
    <SearchBar />
    <RightSide>
      <NotificationsBell />
      <UserSection />
    </RightSide>
  </AppNavbarWrapper>
);

export default AppNavbar;
