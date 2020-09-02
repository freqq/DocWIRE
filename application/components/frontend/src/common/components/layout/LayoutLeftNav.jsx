import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LayoutSidebarMenu from 'common/components/layout/LayoutSidebarMenu';
import mainLogo from 'images/main_logo.svg';

const LayoutLeftNavWrapper = styled.div.attrs({ className: 'layout-left-nav-wrapper' })`
  width: calc(100% - 1px);
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #f0f0f0;
`;

const LayoutLogoHeader = styled.div.attrs({ className: 'app-logo-header' })`
  border-bottom: 1px solid #f0f0f0;
  height: 50px;
  line-height: 50px;
  text-align: left;
  padding: 10px 15px;
  vertical-align: middle;
  width: 100%;
`;

const LayoutLogoHeaderImage = styled.img.attrs({ className: 'app-logo-header-image' })`
  height: 50px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const LayoutLeftNav = () => (
  <LayoutLeftNavWrapper>
    <LayoutLogoHeader>
      <Link to="/dashboard">
        <LayoutLogoHeaderImage src={mainLogo} />
      </Link>
    </LayoutLogoHeader>
    <LayoutSidebarMenu />
  </LayoutLeftNavWrapper>
);

export default LayoutLeftNav;
