import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router-dom';

import settingsIcon from 'images/icons/settings.svg';
import supportIcon from 'images/icons/support.svg';
import signOutIcon from 'images/icons/sign_out.svg';

const UserDropdownMenuWrapper = styled.div.attrs({ className: 'user-dropdown-menu-wrapper' })`
  border: 1px solid rgba(100, 100, 100, 0.4);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  line-height: 15px;
  font-size: 11px;
  position: absolute;
  top: 50px;
  left: 40px;
  min-width: 150px;
  z-index: 9999;
  font-family: 'Roboto', sans-serif !important;
  cursor: auto;
  border-radius: 5px;
  overflow: hidden;
`;

const UserDropdownMenuList = styled.ul.attrs({ className: 'user-dropdown-menu-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const UserDropdownMenuListItem = styled.li.attrs({ className: 'user-dropdown-menu-list-item' })`
  margin: 0;
  padding: 10px 15px;
  width: calc(100% - 30px);
  display: flex;
  transition: 0.2s;
  cursor: pointer;
  font-size: 11px;

  &:hover {
    background: #f0f0f0;
  }

  &:first-child {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

const ItemIcon = styled.img.attrs({ className: 'item-icon' })`
  width: 15px;
  margin-right: 8px;
`;

const ItemTitle = styled.p.attrs({ className: 'item-title' })`
  font-weight: 100;
  margin: 0;
`;

const StyledLink = styled(Link).attrs({ className: 'styled-link' })`
  text-decoration: none;
  display: flex;
  color: #000000;
`;

const MENU_ITEMS = [
  {
    id: 1,
    icon: settingsIcon,
    to: '/settings',
    title: 'Account settings',
  },
  {
    id: 2,
    icon: supportIcon,
    to: '/faq',
    title: 'FAQ',
  },
  {
    id: 3,
    elemendId: 'logout-button',
    icon: signOutIcon,
    title: 'Sign out',
    style: {
      borderTop: '1px solid #f0f0f0',
      color: '#a70000',
    },
    paragraphStyle: {
      fontWeight: '400',
    },
  },
];

const UserDropdownMenu = ({ onOutsideClick, logoutUserFunc }) => {
  UserDropdownMenu.handleClickOutside = () => onOutsideClick();

  return (
    <UserDropdownMenuWrapper>
      <UserDropdownMenuList>
        {MENU_ITEMS.map(menuItem => (
          <UserDropdownMenuListItem
            id={menuItem.elemendId ? menuItem.elemendId : null}
            key={menuItem.id}
            style={menuItem.style ? menuItem.style : {}}
          >
            <StyledLink to={menuItem.to} onClick={menuItem.id === 5 ? logoutUserFunc : null}>
              {menuItem.icon && <ItemIcon src={menuItem.icon} alt="menu-icon" />}
              <ItemTitle style={menuItem.paragraphStyle ? menuItem.paragraphStyle : {}}>
                {menuItem.title}
              </ItemTitle>
            </StyledLink>
          </UserDropdownMenuListItem>
        ))}
      </UserDropdownMenuList>
    </UserDropdownMenuWrapper>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => UserDropdownMenu.handleClickOutside,
};

UserDropdownMenu.propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
  logoutUserFunc: PropTypes.func.isRequired,
};

export default onClickOutside(UserDropdownMenu, clickOutsideConfig);
