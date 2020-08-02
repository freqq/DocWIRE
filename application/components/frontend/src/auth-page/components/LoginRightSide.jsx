import React from 'react';
import styled from 'styled-components';

import loginPageBg from 'images/login_page_bg.jpg';

const LoginRightSideWrapper = styled.div.attrs({ className: 'login-right-side-wrapper' })`
  border-left: 1px solid #f0f0f0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(${loginPageBg});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center 120px;
`;

const LoginPageMenu = styled.ul.attrs({ className: 'login-page-menu' })`
  list-style-type: none;
  margin: 0;
  height: 95px;
  line-height: 95px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
`;

const LoginPageMenuItem = styled.li.attrs({ className: 'login-page-menu-item' })`
  margin: 0 25px;
  display: inline-block;
  transition: 0.2s;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #4e93d7;
  }
`;

const LoginPageTitle = styled.p.attrs({ className: 'login-page-title' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 60px;
  font-family: 'Roboto', sans-serif;
  margin-top: 70px;
`;

const BoldSpan = styled.span.attrs({ className: 'bold-span' })`
  font-weight: 900;
`;

const MENU_ITEMS = [
  {
    name: 'Contact',
  },
  {
    name: 'How It Works',
  },
  {
    name: 'For Patients',
  },
  {
    name: 'Doctors',
  },
  {
    name: 'Privacy Policy',
  },
  {
    name: 'Terms of Service',
  },
];

const LoginRightSide = () => (
  <LoginRightSideWrapper>
    <LoginPageMenu>
      {MENU_ITEMS.map(item => (
        <LoginPageMenuItem key={item.name}>{item.name}</LoginPageMenuItem>
      ))}
    </LoginPageMenu>
    <LoginPageTitle>
      <span>We care about </span>
      <BoldSpan>you.</BoldSpan>
    </LoginPageTitle>
  </LoginRightSideWrapper>
);

export default LoginRightSide;
