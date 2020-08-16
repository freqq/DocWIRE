import React from 'react';
import styled from 'styled-components';

const AppNavbarWrapper = styled.div.attrs({ className: 'app-navbar-wrapper' })`
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const AppNavbar = () => <AppNavbarWrapper>123</AppNavbarWrapper>;

export default AppNavbar;
