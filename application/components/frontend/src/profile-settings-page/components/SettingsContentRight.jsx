import React from 'react';
import styled from 'styled-components';

import Tabs from 'common/components/tabs/Tabs';
import ProfileEdit from 'profile-settings-page/components/tabs/ProfileEdit';
import ProfilePaymentMethods from 'profile-settings-page/components/tabs/ProfilePaymentMethods';

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
      <div label="Account Settings">
        <ProfileEdit />
      </div>
      <div label="Payment methods">
        <ProfilePaymentMethods />
      </div>
    </Tabs>
  </SettingsContentRightWrapper>
);

export default SettingsContentRight;
