/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import MessageSearchInput from 'messages-page/components/MessageSearchInput';
import MessageItem from 'messages-page/components/MessageItem';
import NewMessageModal from 'messages-page/components/NewMessageModal';

import newMessageIcon from 'images/icons/create_room.svg';

const MessagesListAreaWrapper = styled.div.attrs({ className: 'messages-list-area' })`
  grid: messages-list-area;
  background: #fff;
  border-right: 1px solid #f0f0f0;
`;

const MessagesList = styled.div.attrs({ className: 'messages-list' })`
  margin-top: 10px;
  max-height: 95vh;

  &:hover {
    overflow-y: scroll;
  }

  @media only screen and (max-width: 990px) {
    margin-top: 65px;
  }
`;

const NewMessageButton = styled.div.attrs({ className: 'new-mesage-button' })`
  display: inline-block;
  border-radius: 5px;
  width: 5%;
  padding: 10px 13px 5px 10px;
  border: 1px solid #f0f0f0;
  transition: 0.2s;
  cursor: pointer;
  float: right;
  margin: 10px 10px 0 0;
  height: 28px;
  text-align: center;

  @media only screen and (max-width: 990px) {
    width: 70%;
  }

  @media only screen and (max-width: 790px) {
    width: 45%;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

const NewMessageIcon = styled.img.attrs({
  className: 'new-message-icon',
  alt: 'new-message-icon',
})`
  height: 20px;
`;

const MessageListHeader = styled.div.attrs({ className: 'message-list-header' })`
  display: block;
  width: 100%;
`;

const NoMessagesBox = styled.div.attrs({ className: 'no-messages-box' })`
  text-align: center;
  font-size: 10px;
  width: 60%;
  padding: 20px;
  margin: 40px auto 0 auto;
  border: 1px solid #f0f0f0;
`;

const ErrorBlock = styled.div.attrs({ className: 'error-block' })`
  padding: 20px 10px;
  margin: 5px 0;
  text-align: center;
  background: #fce7e6;
  font-size: 12px;
  color: #552526;
  width: 80%;
  margin: 20px auto;
`;

const MESSAGES = [
  {
    id: 1,
    sender: 'admin',
    active: true,
    dateTime: new Date(),
    content: 'content',
  },
  {
    id: 2,
    sender: 'przemek',
    active: true,
    dateTime: new Date(),
    content: 'content 2',
  },
];

const MessagesListArea = () => {
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const isChatListLoading = false;
  const isChatListError = false;

  const newMessageModal = () => (
    <NewMessageModal
      onClose={() => {
        setShowNewMessageModal(false);
      }}
    />
  );

  const clickModal = () => {
    setShowNewMessageModal(!showNewMessageModal);
  };

  const renderMessages = () => (
    <MessagesList>
      {MESSAGES.map(message => (
        <MessageItem key={message.id} messageObject={message} />
      ))}
    </MessagesList>
  );

  return (
    <MessagesListAreaWrapper>
      <MessageListHeader>
        <MessageSearchInput />
        <NewMessageButton onClick={clickModal}>
          <NewMessageIcon src={newMessageIcon} />
        </NewMessageButton>
      </MessageListHeader>
      {isChatListLoading ? (
        <ProgressIndicatorCircular size={40} />
      ) : isChatListError ? (
        <ErrorBlock>There was an error during chat boxes fetching.</ErrorBlock>
      ) : MESSAGES.length === 0 ? (
        <NoMessagesBox>No messages available.</NoMessagesBox>
      ) : (
        renderMessages()
      )}
      {showNewMessageModal && newMessageModal()}
    </MessagesListAreaWrapper>
  );
};

export default MessagesListArea;
