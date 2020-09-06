import React from 'react';
import styled from 'styled-components';

import SettingsContentLeft from 'profile-settings-page/components/SettingsContentLeft';
import SettingsContentRight from 'profile-settings-page/components/SettingsContentRight';

const SettingsContentWrapper = styled.div.attrs({ className: 'settings-content-wrapper' })`
  width: 90%;
  margin: 0 auto;
  height: calc(100% - 150px);
  display: grid;
  grid-template-columns: 25% 1fr;
  gap: 20px;
  margin-top: -57px;
  font-size: 12px;
`;

const SettingsContent = () => (
  <SettingsContentWrapper>
    <SettingsContentLeft />
    <SettingsContentRight />
  </SettingsContentWrapper>
);

export default SettingsContent;
