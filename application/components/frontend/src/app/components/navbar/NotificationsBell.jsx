import React from 'react';
import styled from 'styled-components';

import bellIcon from 'images/icons/bell.svg';

const NotificationsBellWrapper = styled.div.attrs({ className: 'notifications-bell-wrapper' })`
  position: relative;
  display: inline-block;
  margin-right: 30px;
  height: 50px;
`;

const BellIconImage = styled.img.attrs({ className: 'bell-icon-image' })`
  height: 20px;
  cursor: pointer;
  vertical-align: middle;
`;

const NotificationCount = styled.div.attrs({ className: 'notifications-count' })`
  position: absolute;
  top: 10px;
  right: -7px;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  text-align: center;
  font-size: 10px;
  line-height: 16px;
  background: #2d4564;
  color: #ffffff;
`;

const NotificationsBell = () => (
  <NotificationsBellWrapper>
    <BellIconImage src={bellIcon} alt="bellIcon" />
    <NotificationCount>2</NotificationCount>
  </NotificationsBellWrapper>
);

export default NotificationsBell;
