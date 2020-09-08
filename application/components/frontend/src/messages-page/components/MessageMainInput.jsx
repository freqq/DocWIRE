import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MessageMainInputWrapper = styled.div.attrs({ className: 'message-main-input-wrapper' })`
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
  padding: 20px;
  z-index: 1;
  display: grid;
  grid-template-columns: 90% 10%;
`;

const SendMessageButton = styled.button.attrs({ className: 'send-message-button' })`
  display: inline-block;
  font-size: 12px;
  outline: none;
  border: 1px solid #f0f0f0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 100%;
  padding: 10px 20px;
  font-weight: 100;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: 0.2s;
  border-left: none;

  &:hover {
    opacity: 0.7;
  }
`;

const MessageInputComponent = styled.input.attrs({ className: 'message-input-component' })`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #f5f7f9;
  outline: none;
  padding: 10px 20px;
  font-size: 12px;
  display: block;
  margin: 0 auto;
  width: calc(100% - 40px);
  border: 1px solid #f0f0f0;
  border-right: none;

  @media only screen and (max-width: 1150px) {
    width: 75%;
  }

  @media only screen and (max-width: 680px) {
    width: 65%;
    margin-left: 0;
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
      <MessageInputComponent
        placeholder={PLACEHOLDER}
        value={textInput}
        onKeyDown={onEnter}
        onChange={onChange}
      />
      <SendMessageButton onClick={() => sendMessage()}>Send</SendMessageButton>
    </MessageMainInputWrapper>
  );
};

MessageMainInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  sender: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired,
};

export default MessageMainInput;
