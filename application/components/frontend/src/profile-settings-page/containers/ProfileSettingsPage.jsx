import React from 'react';
import styled from 'styled-components';

import SettingsHeader from 'profile-settings-page/components/SettingsHeader';
import SettingsContent from 'profile-settings-page/components/SettingsContent';

const ProfileSettingsPageWrapper = styled.div.attrs({ className: 'profile-settings-page-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  margin: 20px 25px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  background: #fdfdfd;
  border-radius: 5px;
`;

const ProfileSettingsPage = () => {
  return (
    <ProfileSettingsPageWrapper>
      <SettingsHeader />
      <SettingsContent />
    </ProfileSettingsPageWrapper>
  );
};

export default ProfileSettingsPage;
