import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import sendIcon from 'images/icons/send.svg';

const MessageMainInputWrapper = styled.div.attrs({ className: 'message-main-input-wrapper' })`
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
  padding: 20px;
  position: absolute;
  width: 98%;
  z-index: 1;
  border-right: 1px solid #f0f0f0;
`;

const InputWrapper = styled.div.attrs({ className: 'input-wrapper' })`
  position: relative;
`;

const MessageInputComponent = styled.input.attrs({ className: 'message-input-component' })`
  border-radius: 4px;
  background: #f5f7f9;
  outline: none;
  padding: 10px 60px 10px 20px;
  font-size: 12px;
  border: 1px solid #f5f7f9;
  display: block;
  margin: 0 auto;
  width: 85%;
  border: 1px solid #f0f0f0;

  @media only screen and (max-width: 1150px) {
    width: 75%;
  }

  @media only screen and (max-width: 680px) {
    width: 65%;
    margin-left: 0;
  }
`;

const SendMessageIcon = styled.img.attrs({
  className: 'send-message-icon',
  alt: 'send-message-icon',
})`
  position: absolute;
  right: 34px;
  padding: 10px 15px 10px 15px;
  cursor: pointer;
  top: 1px;
  width: 16px;
  height: 16px;
  border-left: 1px solid #f0f0f0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: 0.2s;

  &:hover {
    background: #f0f0f0;
  }

  @media only screen and (max-width: 680px) {
    right: 80px;
  }

  @media only screen and (max-width: 530px) {
    right: 40px;
  }
`;

const PLACEHOLDER = 'Write a message...';

const MessageMainInput = ({ sender, receiver, onSend }) => {
  const [textInput, setTextInput] = useState('');

  const sendMessage = () => {
    const messageObject = {
      sender,
      receiver,
      content: textInput,
      read: false,
      type: 'CHAT',
      dateTime: new Date(),
    };

    if (messageObject.message !== '') {
      onSend(messageObject);
      onSend(messageObject);
      setTextInput('');
    }
  };

  const onEnter = event => {
    if (event.key === 'Enter') sendMessage();
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;

    setTextInput(value).then(() => {
      const typingMessageObject = {
        sender,
        receiver,
        content: textInput,
        read: false,
        type: value.length === 0 ? 'STOP_TYPING' : 'TYPING',
        dateTime: new Date(),
      };

      onSend(typingMessageObject);
    });
  };

  return (
    <MessageMainInputWrapper>
      <InputWrapper>
        <MessageInputComponent
          placeholder={PLACEHOLDER}
          value={textInput}
          onKeyDown={onEnter}
          onChange={onChange}
        />
        <SendMessageIcon src={sendIcon} onClick={sendMessage} />
      </InputWrapper>
    </MessageMainInputWrapper>
  );
};

MessageMainInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  sender: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired,
};

export default MessageMainInput;
