/* eslint-disable prefer-template */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import { setCurrentChat } from 'messages-page/actions/newMessageActions';
import { fetchChatHistory, addNewUserToChatBox } from 'messages-page/actions/messagesListActions';

import MessageBoxArea from 'messages-page/components/MessageBoxArea';
import MessagesListArea from 'messages-page/components/MessagesListArea';
import MessagePatientDetails from 'messages-page/components/MessagePatientDetails';

const MessagesPageWrapper = styled.div.attrs({ className: 'message-page-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
`;

const MessagesGrid = styled.div.attrs({ className: 'message-grid' })`
  display: grid;
  grid-template-columns: 2fr 8fr 3fr;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  height: 100%;
  width: 100%;
`;

const MessagesPage = ({
  chatList,
  setCurrentChatFunc,
  fetchChatHistoryFunc,
  addNewUserToChatBoxFunc,
  userData,
}) => {
  const addNewUser = person => {
    if (
      chatList.some(
        message =>
          message.sender.userId === person.userId || message.receiver.userId === person.userId,
      )
    ) {
      setCurrentChatFunc(person);
      fetchChatHistoryFunc(person.userId);
    } else {
      const newMessage = {
        id: shortid.generate(),
        sender: userData,
        receiver: person,
        dateTime: new Date(),
        content: '',
        unread: 0,
        active: false,
      };

      addNewUserToChatBoxFunc(newMessage);
    }
  };

  return (
    <MessagesPageWrapper>
      <MessagesGrid>
        <MessagesListArea addNewUser={addNewUser} />
        <MessageBoxArea addNewUser={addNewUser} />
        <MessagePatientDetails />
      </MessagesGrid>
    </MessagesPageWrapper>
  );
};

MessagesPage.propTypes = {
  setCurrentChatFunc: PropTypes.func.isRequired,
  fetchChatHistoryFunc: PropTypes.func.isRequired,
  addNewUserToChatBoxFunc: PropTypes.func.isRequired,
  chatList: PropTypes.instanceOf(Array).isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  chatList: state.messages.messagesList.chatList,
  userData: state.common.accountData.userData,
});

const mapDispatchToProps = dispatch => ({
  setCurrentChatFunc: person => dispatch(setCurrentChat(person)),
  fetchChatHistoryFunc: userId => dispatch(fetchChatHistory(userId)),
  addNewUserToChatBoxFunc: chatBoxItem => dispatch(addNewUserToChatBox(chatBoxItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
