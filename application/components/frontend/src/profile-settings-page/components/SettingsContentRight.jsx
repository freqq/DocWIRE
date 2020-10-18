import React from 'react';
import styled from 'styled-components';

import Tabs from 'common/components/tabs/Tabs';
import ProfileEdit from 'profile-settings-page/components/tabs/ProfileEdit';
import NotificationsSettings from 'profile-settings-page/components/tabs/NotificationsSettings';

const SettingsContentRightWrapper = styled.div.attrs({
  className: 'settings-content-right-wrapper',
})`
  padding: 10px;
  background: #ffffff;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
`;

const SettingsContentRight = () => (
  <SettingsContentRightWrapper>
    <Tabs>
      <div label="Account settings">
        <ProfileEdit />
      </div>
      <div label="Notifications settings">
        <NotificationsSettings />
      </div>
    </Tabs>
  </SettingsContentRightWrapper>
);

export default SettingsContentRight;
