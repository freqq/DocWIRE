import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ChatInput from 'video-conversation-page/components/ChatInput';
import ChatPosts from 'video-conversation-page/components/ChatPosts';
import Colors from 'common/colors';

const ChatBoxWrapper = styled.div.attrs({ className: 'chat-box-wrapper' })`
  background: ${Colors.BACKGROUND_COLOR};
  border-left: 3px solid ${Colors.GALLERY};
  position: relative;
  display: grid;
  grid-template-rows: 1fr 10%;
`;

const ChatBox = ({ messages, sendChatMessage, isSession }) => (
  <ChatBoxWrapper>
    <ChatPosts messages={messages} />
    <ChatInput onMessageSend={sendChatMessage} isSession={isSession} />
  </ChatBoxWrapper>
);

ChatBox.propTypes = {
  messages: PropTypes.instanceOf(Array).isRequired,
  sendChatMessage: PropTypes.func.isRequired,
  isSession: PropTypes.bool.isRequired,
};

export default ChatBox;
