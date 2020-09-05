import React from 'react';
import styled from 'styled-components';

import MessageBoxArea from 'messages-page/components/MessageBoxArea';
import MessagesListArea from 'messages-page/components/MessagesListArea';

const MessagesPageWrapper = styled.div.attrs({ className: 'message-page-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-areas: 'messages-list-area message-box-area';
  height: 90%%;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid red;
`;

const MessagesPage = () => (
  <MessagesPageWrapper>
    <MessagesListArea />
    <MessageBoxArea />
  </MessagesPageWrapper>
);

export default MessagesPage;
