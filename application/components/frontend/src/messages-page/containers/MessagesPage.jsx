import React from 'react';
import styled from 'styled-components';

import MessageBoxArea from 'messages-page/components/MessageBoxArea';
import MessagesListArea from 'messages-page/components/MessagesListArea';

const MessagesPageWrapper = styled.div.attrs({ className: 'message-page-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-areas: 'messages-list-area message-box-area';
  height: 100%;
`;

const MessagesPage = () => (
  <MessagesPageWrapper>
    <MessagesListArea />
    <MessageBoxArea />
  </MessagesPageWrapper>
);

export default MessagesPage;
