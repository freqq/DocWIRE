import React, { useState } from 'react';
import styled from 'styled-components';

import NotificationsDropdown from 'common/components/layout/navbar/NotificationsDropdown';

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

const NotificationsBell = () => {
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  return (
    <NotificationsBellWrapper>
      <BellIconImage
        src={bellIcon}
        alt="bellIcon"
        onClick={() => setShowNotificationsDropdown(true)}
      />
      <NotificationCount>2</NotificationCount>
      {showNotificationsDropdown && (
        <NotificationsDropdown onOutsideClick={() => setShowNotificationsDropdown(false)} />
      )}
    </NotificationsBellWrapper>
  );
};

export default NotificationsBell;
