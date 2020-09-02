/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

import MessageMainInput from 'messages-page/components/MessageMainInput';
import MessagesMainComponent from 'messages-page/components/MessagesMainComponent';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const MessagesMainAreaWrapper = styled.div.attrs({ className: 'messages-main-area-wrapper' })`
  grid: messages-main-area;
  position: relative;
  height: 91%;
  font-family: 'Roboto-Light', sans-serif;
`;

const ErrorBlock = styled.div.attrs({ className: 'error-block' })`
  padding: 10px;
  text-align: center;
  background: #fce7e6;
  font-size: 12px;
  color: #552526;
`;

const isChatHistoryLoading = false;
const isChatHistoryLoadingError = false;
const chosenChatUser = 'admin';
const currentUsername = 'admin';
const chatHistory = [
  {
    id: 1,
    sender: 'wojtek',
    dateTime: new Date(),
    content: 'contennnt',
  },
  {
    id: 2,
    sender: 'admin',
    dateTime: new Date(),
    content: 'contennnt',
  },
];

const MessagesMainArea = () => {
  const [isTyping, setIsTyping] = useState(false);

  const onMessageReceive = msg => {
    if (msg.type === 'TYPING' && chosenChatUser === msg.sender) {
      setIsTyping(true);
    } else if (msg.type === 'STOP_TYPING' && chosenChatUser === msg.sender) {
      setIsTyping(false);
    } else {
      setIsTyping(false);

      const messageObj = msg.id === undefined ? { ...msg, id: shortid.generate() } : msg;
      // this.props.addNewMessageFunc(messageObj);
    }
  };

  const sendMessage = msg => {
    try {
      // this.clientRef.sendMessage('/app/sendPrivateMessage', JSON.stringify(msg));

      if (msg.type === 'CHAT') {
        const messageObj = msg.id === undefined ? { ...msg, id: shortid.generate() } : msg;
        // this.props.addNewMessageFunc(messageObj);
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  if (isChatHistoryLoadingError)
    return <ErrorBlock>There was an error during chat boxes fetching.</ErrorBlock>;

  return (
    <MessagesMainAreaWrapper style={chosenChatUser ? {} : { visibility: 'hidden' }}>
      {isChatHistoryLoading ? (
        <ProgressIndicatorCircular size={40} />
      ) : (
        <MessagesMainComponent
          currentUser={currentUsername}
          messagesArray={chatHistory}
          isTyping={isTyping}
          chosenChatUser={chosenChatUser}
        />
      )}

      <MessageMainInput sender={currentUsername} receiver={chosenChatUser} onSend={sendMessage} />
    </MessagesMainAreaWrapper>
  );
};

export default MessagesMainArea;
