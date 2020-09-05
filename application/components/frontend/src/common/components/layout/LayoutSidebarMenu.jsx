import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import appointmentsIcon from 'images/menu-icons/appointments.svg';
import billingsIcon from 'images/menu-icons/billings.svg';
import carePlansIcon from 'images/menu-icons/care_plans.svg';
import chatIcon from 'images/menu-icons/chat.svg';
import historyIcon from 'images/menu-icons/history.svg';
import homeIcon from 'images/menu-icons/home.svg';
import labIcon from 'images/menu-icons/lab.svg';
import medicalIcon from 'images/menu-icons/medical.svg';
import prescriptionsIcon from 'images/menu-icons/prescriptions.svg';
import reportsIcon from 'images/menu-icons/reports.svg';
import supportIcon from 'images/menu-icons/support.svg';
import faqIcon from 'images/menu-icons/faq.svg';
import formsIcon from 'images/menu-icons/forms.svg';

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
  transition: 0.2s;

  &:hover {
    background: #607086;
  }

  &:hover a {
    color: #ffffff;
  }

  &:hover a img {
    filter: invert(1);
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
  background: '#607086',
};

const ACTIVE_LINK_STYLE = {
  color: '#ffffff',
};

const ACTIVE_IMG_STYLE = {
  filter: 'invert(1)',
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
      { name: 'Lab results', icon: labIcon, to: '/lab-results' },
      { name: 'Medical results', icon: medicalIcon, to: '/medical-results' },
      { name: 'Prescriptions', icon: prescriptionsIcon, to: '/prescriptions' },
      { name: 'Care plans', icon: carePlansIcon, to: '/care-plans' },
      { name: 'Forms', icon: formsIcon, to: '/forms' },
    ],
  },
  {
    sectionTitle: 'Finance',
    options: [
      { name: 'Billing', icon: billingsIcon, to: '/billings' },
      { name: 'History', icon: historyIcon, to: '/history' },
      { name: 'Reports', icon: reportsIcon, to: '/reports' },
    ],
  },
  {
    sectionTitle: 'Understand',
    options: [
      { name: 'FAQ', icon: faqIcon, to: '/faq' },
      { name: 'Support', icon: supportIcon, to: '/support' },
    ],
  },
];

const LayoutSidebarMenu = () => {
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  return (
    <LayoutSidebarMenuWrapper>
      {MENU_ITEMS.map(menuItem => (
        <MenuWrapper>
          <SectionTitle>{menuItem.sectionTitle}</SectionTitle>
          {menuItem.options.map(sectionOption => (
            <MenuItem style={activeTab === sectionOption.to ? ACTIVE_TAB_STYLE : {}}>
              <StyledLink
                style={activeTab === sectionOption.to ? ACTIVE_LINK_STYLE : {}}
                to={sectionOption.to}
                onClick={() => setActiveTab(sectionOption.to)}
              >
                <MenuItemIcon
                  style={activeTab === sectionOption.to ? ACTIVE_IMG_STYLE : {}}
                  src={sectionOption.icon}
                  alt="sectionOption"
                />
                <MenuItemName>{sectionOption.name}</MenuItemName>
              </StyledLink>
            </MenuItem>
          ))}
        </MenuWrapper>
      ))}
    </LayoutSidebarMenuWrapper>
  );
};

export default LayoutSidebarMenu;
