/* eslint-disable prefer-template */
import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';

import { addNewMessage } from 'messages-page/actions/messagesListActions';
import MessageMainInput from 'messages-page/components/MessageMainInput';
import MessagesMainComponent from 'messages-page/components/MessagesMainComponent';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const MessagesMainAreaWrapper = styled.div.attrs({ className: 'messages-main-area-wrapper' })`
  position: relative;
  height: calc(100% - 40px - 24px);
  font-family: 'Roboto-Light', sans-serif;
  display: grid;
  grid-template-rows: 88% 12%;
`;

const ErrorBlock = styled.div.attrs({ className: 'error-block' })`
  padding: 10px;
  text-align: center;
  background: #fce7e6;
  font-size: 12px;
  color: #552526;
`;

const MessagesMainArea = ({
  currentPerson,
  addNewUser,
  addNewMessageFunc,
  isChatHistoryLoading,
  isChatHistoryLoadingError,
  chatHistory,
  userData,
  loggedInUserId,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [clientRef, setClientRef] = useState(null);

  const onMessageReceive = msg => {
    if (msg.type === 'TYPING' && currentPerson.userId === msg.sender.userId) {
      setIsTyping(true);
    } else if (msg.type === 'STOP_TYPING' && currentPerson.userId === msg.sender.userId) {
      setIsTyping(false);
    } else {
      setIsTyping(false);

      addNewUser(msg.sender);
      const messageObj = msg.id === undefined ? { ...msg, id: shortid.generate() } : msg;
      addNewMessageFunc(messageObj);
    }
  };

  const sendMessage = msg => {
    try {
      clientRef.sendMessage('/app/sendPrivateMessage', JSON.stringify(msg));

      if (msg.type === 'CHAT') {
        const messageObj = msg.id === undefined ? { ...msg, id: shortid.generate() } : msg;
        addNewMessageFunc(messageObj);
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  if (isChatHistoryLoadingError)
    return <ErrorBlock>There was an error during chat history fetching.</ErrorBlock>;

  const wsSourceUrl = 'http://docwire.test:8085/api/chat/ws';

  const getPersonId = () => (userData !== null ? userData.userId : null);

  return (
    <MessagesMainAreaWrapper style={currentPerson ? {} : { visibility: 'hidden' }}>
      {isChatHistoryLoading ? (
        <ProgressIndicatorCircular size={40} />
      ) : (
        <MessagesMainComponent
          currentUser={currentPerson}
          messagesArray={chatHistory}
          loggedInUserId={loggedInUserId}
          isTyping={isTyping}
        />
      )}

      <SockJsClient
        url={wsSourceUrl}
        topics={[`/user/${getPersonId()}/reply`]}
        onMessage={onMessageReceive}
        ref={client => {
          setClientRef(client);
        }}
        debug
      />

      <MessageMainInput sender={userData} receiver={currentPerson} onSend={sendMessage} />
    </MessagesMainAreaWrapper>
  );
};

MessagesMainArea.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
  currentPerson: PropTypes.instanceOf(Object).isRequired,
  addNewUser: PropTypes.func.isRequired,
  addNewMessageFunc: PropTypes.func.isRequired,
  isChatHistoryLoading: PropTypes.bool.isRequired,
  isChatHistoryLoadingError: PropTypes.bool.isRequired,
  chatHistory: PropTypes.instanceOf(Array).isRequired,
  loggedInUserId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentPerson: state.messages.usersList.currentPerson,
  userData: state.common.accountData.userData,
  currentUsername: state.common.authUser.keycloakInfo.userInfo.preferred_username,
  loggedInUserId: state.common.authUser.keycloakInfo.subject,
  isChatHistoryLoading: state.messages.messagesList.isChatHistoryLoading,
  isChatHistoryLoadingError: state.messages.messagesList.isChatHistoryLoadingError,
  chatHistory: state.messages.messagesList.chatHistory,
});

const mapDispatchToProps = dispatch => ({
  addNewMessageFunc: message => dispatch(addNewMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesMainArea);
