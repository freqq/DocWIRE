import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { animateScroll } from 'react-scroll';

import Colors from 'common/colors';

const ChatPostsWrapper = styled.div.attrs({
  className: 'char-posts-wrapper',
  id: 'messages-box-container',
})`
  padding: 20px;
  overflow-y: scroll;
`;

const MessagesBox = styled.div.attrs({ className: 'messages-box' })`
  width: 100%;
`;

const MessageBox = styled.div.attrs({ className: 'message-box' })`
  position: relative;
  margin-bottom: 25px;
  word-wrap: break-word;
`;

const UserIcon = styled.div.attrs({ className: 'user-icon' })`
  border-radius: 50%;
  background: ${Colors.SYCAMORE};
  width: 30px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  color: ${Colors.WHITE};
  display: inline-block;
  position: absolute;
  cursor: pointer;
`;

const userIconLeft = {
  top: '5px',
  left: '-40px',
};

const userIconRight = {
  top: '5px',
  right: '-15px',
};

const UserMessage = styled.div.attrs({ className: 'user-message' })`
  background: ${Colors.WHITE};
  color: #000;
  font-weight: 300;
  font-family: 'Titillium Web', sans-serif;
  padding: 10px;
  font-size: 10px;
  display: inline-block;
  width: 80%;
  border: 1px solid ${Colors.GALLERY};
  border-radius: 3px;
`;

const messageLeft = {
  marginLeft: '35px',
};

const messageRight = {
  marginRight: '30px',
};

const ChatPosts = ({ messages }) => {
  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-box-container',
      duration: 600,
    });
  }, []);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-box-container',
      duration: 100,
    });
  }, [messages]);

  const renderMessages = () => (
    <MessagesBox>
      {messages.map(item => (
        <MessageBox key={item.id} style={item.userMessage ? messageRight : messageLeft}>
          <UserIcon
            style={{
              ...(item.userMessage ? userIconRight : userIconLeft),
              ...{ background: item.iconColor },
            }}
          >
            {item.initials}
          </UserIcon>
          <UserMessage>{item.message}</UserMessage>
        </MessageBox>
      ))}
    </MessagesBox>
  );

  return <ChatPostsWrapper>{renderMessages()}</ChatPostsWrapper>;
};

ChatPosts.propTypes = {
  messages: PropTypes.arrayOf(Object).isRequired,
};

export default ChatPosts;
