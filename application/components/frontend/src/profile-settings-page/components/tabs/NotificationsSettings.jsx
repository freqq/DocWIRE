import React from 'react';
import styled from 'styled-components';

const NotificationsSettingsWrapper = styled.div.attrs({
  className: 'nofications-settings-wrapper',
})`
  padding: 20px;
`;

const NotificationsSettings = () => (
  <NotificationsSettingsWrapper>notifications</NotificationsSettingsWrapper>
);

export default NotificationsSettings;
