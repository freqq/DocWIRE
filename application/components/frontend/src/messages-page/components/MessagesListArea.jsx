import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrentChat } from 'messages-page/actions/newMessageActions';
import {
  fetchChatBoxList,
  fetchChatHistory,
  markChatWithUserAsRead,
} from 'messages-page/actions/messagesListActions';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import MessageSearchInput from 'messages-page/components/MessageSearchInput';
import MessageItem from 'messages-page/components/MessageItem';
import NewMessageModal from 'messages-page/components/NewMessageModal';

const MessagesListAreaWrapper = styled.div.attrs({ className: 'messages-list-area-wrapper' })`
  grid: messages-list-area;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  position: relative;
`;

const MessagesList = styled.div.attrs({ className: 'messages-list' })`
  margin-top: 12px;
  max-height: 95vh;

  &:hover {
    overflow-y: scroll;
  }

  @media only screen and (max-width: 990px) {
    margin-top: 65px;
  }
`;

const MessageListHeader = styled.div.attrs({ className: 'message-list-header' })`
  display: block;
  width: 100%;
`;

const NoMessagesBox = styled.div.attrs({ className: 'no-messages-box' })`
  text-align: center;
  font-size: 10px;
  width: 60%;
  padding: 80px 20px;
  margin: 20px auto 0 auto;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  font-weight: 100;
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

const NewMessageButton = styled.div.attrs({ className: 'new-message-button' })`
  width: 80%;
  margin: 0 auto;
  font-weight: 100;
  bottom: 20px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  background: #f0f0f0;
  border: 1px solid #f0f0f0;
  padding: 10px;
  transition: 0.2s;
  font-size: 10px;
  position: absolute;
  bottom: 20px;
  left: 9px;

  &:hover {
    opacity: 0.8;
  }
`;

const MessagesListArea = ({
  setCurrentChatFunc,
  searchValue,
  addNewUser,
  fetchChatHistoryFunc,
  fetchChatBoxListFunc,
  markChatWithUserAsReadFunc,
  isChatListLoading,
  isChatListError,
  chatList,
  filteredChatList,
  currentPerson,
  loggedInUserData,
}) => {
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  useEffect(() => {
    fetchChatBoxListFunc();
  }, []);

  const setCurrentChatClick = message => {
    let userData;
    if (message.sender.userId === loggedInUserData.userId) {
      userData = message.receiver;
    } else {
      userData = message.sender;
    }

    setCurrentChatFunc(userData);
    fetchChatHistoryFunc(userData.userId);
    markChatWithUserAsReadFunc(userData.userId);
  };

  const newMessageModal = () => (
    <NewMessageModal
      onClose={() => {
        setShowNewMessageModal(false);
      }}
      onChoice={person => {
        addNewUser(person);
        setShowNewMessageModal(false);
      }}
    />
  );

  const renderMessages = () => {
    const valueToMap = searchValue.length > 0 ? filteredChatList : chatList;

    return (
      <MessagesList>
        {valueToMap.map(message => (
          <MessageItem
            key={message.id}
            messageObject={message}
            onClick={() => setCurrentChatClick(message)}
            person={currentPerson}
            loggedInUserData={loggedInUserData}
          />
        ))}
      </MessagesList>
    );
  };

  const valueToMap = searchValue.length > 0 ? filteredChatList : chatList;

  return (
    <MessagesListAreaWrapper>
      <MessageListHeader>
        <MessageSearchInput />
      </MessageListHeader>
      {isChatListLoading ? (
        <ProgressIndicatorCircular size={40} />
      ) : isChatListError ? (
        <ErrorBlock>There was an error during chat boxes fetching.</ErrorBlock>
      ) : valueToMap.length === 0 ? (
        <NoMessagesBox>No messages available</NoMessagesBox>
      ) : (
        renderMessages()
      )}
      {showNewMessageModal && newMessageModal()}
      <NewMessageButton onClick={() => setShowNewMessageModal(true)}>New message</NewMessageButton>
    </MessagesListAreaWrapper>
  );
};

MessagesListArea.propTypes = {
  setCurrentChatFunc: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  currentPerson: PropTypes.instanceOf(Object).isRequired,
  loggedInUserData: PropTypes.instanceOf(Object).isRequired,
  addNewUser: PropTypes.func.isRequired,
  fetchChatHistoryFunc: PropTypes.func.isRequired,
  fetchChatBoxListFunc: PropTypes.func.isRequired,
  markChatWithUserAsReadFunc: PropTypes.func.isRequired,
  isChatListLoading: PropTypes.bool.isRequired,
  isChatListError: PropTypes.bool.isRequired,
  chatList: PropTypes.instanceOf(Array).isRequired,
  filteredChatList: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  loggedInUserData: state.common.accountData.userData,
  currentPerson: state.messages.usersList.currentPerson,
  isChatListLoading: state.messages.messagesList.isChatListLoading,
  isChatListError: state.messages.messagesList.isChatListError,
  chatList: state.messages.messagesList.chatList,
  filteredChatList: state.messages.messagesList.filteredChatList,
  searchValue: state.messages.messagesList.searchValue,
});

const mapDispatchToProps = dispatch => ({
  setCurrentChatFunc: person => dispatch(setCurrentChat(person)),
  fetchChatBoxListFunc: () => dispatch(fetchChatBoxList()),
  fetchChatHistoryFunc: userId => dispatch(fetchChatHistory(userId)),
  markChatWithUserAsReadFunc: userId => dispatch(markChatWithUserAsRead(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListArea);
