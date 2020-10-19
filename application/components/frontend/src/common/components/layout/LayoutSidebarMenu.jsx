import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import appointmentsIcon from 'images/menu-icons/appointments.svg';
import billingsIcon from 'images/menu-icons/billings.svg';
import chatIcon from 'images/menu-icons/chat.svg';
import historyIcon from 'images/menu-icons/history.svg';
import homeIcon from 'images/menu-icons/home.svg';
import medicalIcon from 'images/menu-icons/medical.svg';
import prescriptionsIcon from 'images/menu-icons/prescriptions.svg';
import faqIcon from 'images/menu-icons/faq.svg';

const LayoutSidebarMenuWrapper = styled.div.attrs({ className: 'layout-sidebar-menu-wrapper' })`
  width: calc(100% - 30px);
  height: 100%;
  font-size: 12px;
  padding: 15px;
  font-family: 'Roboto', sans-serif;
`;

const SectionTitle = styled.p.attrs({ className: 'section-title' })`
  text-transform: uppercase;
  margin: 0 0 5px 0;
  font-weight: 400;
  color: #2d4564;
`;

const MenuWrapper = styled.ul.attrs({ className: 'menu-wrapper' })`
  list-style-type: none;
  margin: 0 0 25px 0;
  padding: 0;
`;

const MenuItem = styled.li.attrs({ className: 'menu-item' })`
  margin: 0 0 3px 0;
  padding: 10px;
  cursor: pointer;
  font-weight: 100;
  border-radius: 3px;
  border: 1px solid #ffffff;
  transition: 0.2s;

  &:hover {
    background: #f9fafc;
    border: 1px solid #f0f0f0;
  }
`;

const StyledLink = styled(Link).attrs({ className: 'styled-link' })`
  color: #000;
  display: flex;
  text-decoration: none;
  transition: 0.2s;
`;

const MenuItemIcon = styled.img.attrs({ className: 'menu-item-icon' })`
  width: 15px;
  margin-right: 10px;
`;

const MenuItemName = styled.p.attrs({ className: 'menu-item-name' })`
  margin: 0;
  display: inline-block;
`;

const ACTIVE_TAB_STYLE = {
  background: '#f9fafc',
  border: '1px solid #f0f0f0',
};

const MENU_ITEMS = [
  {
    sectionTitle: 'Dashboard',
    options: [
      { name: 'Home', icon: homeIcon, to: '/dashboard' },
      { name: 'Appointments', icon: appointmentsIcon, to: '/appointments' },
      { name: 'Messages', icon: chatIcon, to: '/messages' },
    ],
  },
  {
    sectionTitle: 'Medical',
    options: [
      { name: 'Medications', icon: medicalIcon, to: '/medications' },
      { name: 'Prescriptions', icon: prescriptionsIcon, to: '/prescriptions' },
    ],
  },
  {
    sectionTitle: 'Finance',
    options: [
      { name: 'Billing', icon: billingsIcon, to: '/billings' },
      { name: 'History', icon: historyIcon, to: '/history' },
    ],
  },
  {
    sectionTitle: 'Understand',
    options: [{ name: 'FAQ', icon: faqIcon, to: '/faq' }],
  },
];

const LayoutSidebarMenu = ({ setActiveTab, activeTab }) => (
  <LayoutSidebarMenuWrapper>
    {MENU_ITEMS.map(menuItem => (
      <MenuWrapper key={menuItem.sectionTitle}>
        <SectionTitle>{menuItem.sectionTitle}</SectionTitle>
        {menuItem.options.map(sectionOption => (
          <MenuItem
            key={sectionOption.to}
            style={activeTab === sectionOption.to ? ACTIVE_TAB_STYLE : {}}
          >
            <StyledLink to={sectionOption.to} onClick={() => setActiveTab(sectionOption.to)}>
              <MenuItemIcon src={sectionOption.icon} alt="sectionOption" />
              <MenuItemName>{sectionOption.name}</MenuItemName>
            </StyledLink>
          </MenuItem>
        ))}
      </MenuWrapper>
    ))}
  </LayoutSidebarMenuWrapper>
);

LayoutSidebarMenu.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default LayoutSidebarMenu;
