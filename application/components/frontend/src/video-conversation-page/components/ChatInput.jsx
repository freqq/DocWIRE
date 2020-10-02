import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import commentIcon from 'images/icons/comment.svg';

const ChatInputWrapper = styled.div.attrs({ className: 'chat-input-wrapper' })`
  width: 74%;
  position: absolute;
  bottom: 0;
  margin: 0;
`;

const ChatInputElement = styled.input.attrs({ className: 'chat-input-wrapper' })`
  width: 100%;
  padding: 20px 60px 21px 20px;
  outline: none;
  border: 1px solid #f0f0f0;
  border-left: none;
`;

const InputWrapper = styled.div.attrs({ className: 'input-wrapper' })``;

const ChatInputIcon = styled.img.attrs({ className: 'chat-input-icon', alt: 'chat-input-icon' })`
  position: absolute;
  right: -60px;
  top: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const PLACEHOLDER = 'Quick message...';

const ChatInput = ({ onMessageSend, isSession }) => {
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    const messageObj = inputText;
    if (messageObj.length > 0) {
      onMessageSend(messageObj);
      setInputText('');
    }
  };

  const onEnter = event => {
    if (event.key === 'Enter') sendMessage();
  };

  return (
    <ChatInputWrapper>
      {isSession && (
        <InputWrapper>
          <ChatInputElement
            autoComplete="off"
            onChange={evt => setInputText(evt.target.value)}
            name="inputText"
            value={inputText}
            placeholder={PLACEHOLDER}
            onKeyDown={onEnter}
          />
          <ChatInputIcon src={commentIcon} onClick={sendMessage} />
        </InputWrapper>
      )}
    </ChatInputWrapper>
  );
};

ChatInput.propTypes = {
  onMessageSend: PropTypes.func.isRequired,
  isSession: PropTypes.bool.isRequired,
};

export default ChatInput;
