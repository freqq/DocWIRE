import React from 'react';
import styled from 'styled-components';

const SettingsHeaderWrapper = styled.div.attrs({ className: 'settings-header-wrapper' })`
  width: 100%;
  height: 150px;
  background: #2d4564;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const SettingsHeader = () => <SettingsHeaderWrapper />;

export default SettingsHeader;
