/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import mainLogo from 'images/main_logo.svg';
import accountIcon from 'images/icons/account.svg';
import phoneIcon from 'images/icons/phone.svg';
import menuIcon from 'images/icons/open-menu.svg';

const MainPageNavbarWrapper = styled.div.attrs({ className: 'main-page-navbar-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-areas: 'navbar-logo navbar-menu';
  padding-top: 10px;
  height: 50px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
`;

const NavbarLogo = styled.img.attrs({ className: 'navbar-logo' })`
  height: 60px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const NavbarLogoWrapper = styled.div.attrs({ className: 'navbar-logo-wrapper' })`
  grid: navbar-logo;
`;

const NavbarMenuWrapper = styled.div.attrs({ className: 'navbar-menu-wrapper' })`
  grid: navbar-menu;
  text-align: right;
  line-height: 60px;
`;

const NavbarMenu = styled.ul.attrs({ className: 'navbar-menu' })`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const NavbarMenuItem = styled.li.attrs({ className: 'navbar-menu-item' })`
  margin: 0;
  padding: 0;
  display: inline-block;
  margin-left: 40px;
  cursor: pointer;
  white-space: nowrap;

  @media only screen and (max-width: 910px) {
    display: none;
  }
`;

const ToggleButton = styled.li.attrs({ className: 'toggle-button' })`
  margin: 0;
  padding: 0;
  margin-left: 40px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;
  display: none;

  &:hover {
    opacity: 0.6;
  }

  @media only screen and (max-width: 910px) {
    display: inline-block;
  }
`;

const ItemIcon = styled.img.attrs({ className: 'item-icon' })`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  vertical-align: middle;
`;

const ImageHelper = styled.span.attrs({ className: 'image-helper' })`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`;

const ItemName = styled.span.attrs({ className: 'item-name' })`
  font-size: 12px;
  display: inline-block;
  height: 24px;
  transition: 0.2s;
  text-transform: uppercase;

  &:hover {
    opacity: 0.6;
    text-decoration: underline;
  }
`;

const NAVBAR_MENU_ITEMS = [
  {
    name: 'Contact',
    icon: phoneIcon,
  },
  {
    name: 'How It Works',
    icon: accountIcon,
  },
  {
    name: 'For Patients',
    icon: accountIcon,
  },
  {
    name: 'Doctors',
    icon: accountIcon,
  },
  {
    name: 'My account',
    icon: accountIcon,
  },
];

const MainPageNavbar = () => {
  const renderNavbarMenu = () => (
    <NavbarMenu>
      {NAVBAR_MENU_ITEMS.map(item => (
        <NavbarMenuItem key={item.name}>
          <ImageHelper />
          <ItemName>{item.name}</ItemName>
        </NavbarMenuItem>
      ))}
      <ToggleButton>
        <ImageHelper />
        <ItemIcon src={menuIcon} alt="menuIcon" />
      </ToggleButton>
    </NavbarMenu>
  );

  return (
    <MainPageNavbarWrapper>
      <NavbarLogoWrapper>
        <NavbarLogo src={mainLogo} alt="mainLogo" />
      </NavbarLogoWrapper>
      <NavbarMenuWrapper>{renderNavbarMenu()}</NavbarMenuWrapper>
    </MainPageNavbarWrapper>
  );
};

export default MainPageNavbar;
