import React from 'react';
import styled from 'styled-components';

import phoneIcon from 'images/icons/phone_small.svg';
import clockIcon from 'images/icons/clock.svg';
import locationIcon from 'images/icons/location.svg';

const OverNavBarWrapper = styled.div.attrs({
  className: 'over-nav-bar-wrapper',
})`
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
`;

const OverNavBarContainer = styled.div.attrs({
  className: 'over-nav-bar-container',
})`
  width: 70%;
  font-size: 10px;
  padding: 10px 0;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`;

const OverNavbarMenu = styled.ul.attrs({ className: 'over-navbar-menu' })`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const OverNavbarMenuItem = styled.li.attrs({ className: 'over-navbar-menu-item' })`
  margin: 0;
  padding: 0;
  display: inline-block;
  margin-right: 40px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;

  &:hover {
    opacity: 0.6;
  }
`;

const ItemIcon = styled.img.attrs({ className: 'item-icon' })`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  vertical-align: middle;
`;

const ImageHelper = styled.span.attrs({ className: 'image-helper' })`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`;

const ItemName = styled.span.attrs({ className: 'item-name' })`
  font-size: 11px;
  display: inline-block;
  height: 12px;
  margin-right: 5px;
`;

const ItemValue = styled.span.attrs({ className: 'item-value' })`
  font-size: 11px;
  display: inline-block;
  height: 12px;
  text-decoration: underline;
`;

const OVER_NAVBAR_ITEMS = [
  {
    id: 0,
    name: 'Phone: ',
    value: '+48 999 23 42',
    icon: phoneIcon,
  },
  {
    id: 1,
    name: 'Availability: ',
    value: '8-20',
    icon: clockIcon,
  },
  {
    id: 2,
    name: 'Location: ',
    value: '4935 Apple Lane, Peoria Illinois',
    icon: locationIcon,
  },
];

const OverNavBar = () => {
  const renderOverNavbarMenu = () => (
    <OverNavbarMenu>
      {OVER_NAVBAR_ITEMS.map(item => (
        <OverNavbarMenuItem key={item.id}>
          <ImageHelper />
          <ItemIcon src={item.icon} alt={item.name} />
          <ItemName>{item.name}</ItemName>
          <ItemValue>{item.value}</ItemValue>
        </OverNavbarMenuItem>
      ))}
    </OverNavbarMenu>
  );

  return (
    <OverNavBarWrapper>
      <OverNavBarContainer>{renderOverNavbarMenu()}</OverNavBarContainer>
    </OverNavBarWrapper>
  );
};

export default OverNavBar;
