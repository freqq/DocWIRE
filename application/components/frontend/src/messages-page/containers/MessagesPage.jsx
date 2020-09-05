import React from 'react';
import styled from 'styled-components';

import MessageBoxArea from 'messages-page/components/MessageBoxArea';
import MessagesListArea from 'messages-page/components/MessagesListArea';

const MessagesPageWrapper = styled.div.attrs({ className: 'message-page-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
`;

const MessagesGrid = styled.div.attrs({ className: 'message-grid' })`
  display: grid;
  grid-template-columns: 1fr 4fr;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  height: 100%;
  width: 100%;
`;

const MessagesPage = () => (
  <MessagesPageWrapper>
    <MessagesGrid>
      <MessagesListArea />
      <MessageBoxArea />
    </MessagesGrid>
  </MessagesPageWrapper>
);

export default MessagesPage;
