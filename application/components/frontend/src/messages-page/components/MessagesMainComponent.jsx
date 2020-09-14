import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { animateScroll } from 'react-scroll';

const MessagesMainComponentWrapper = styled.div.attrs({
  className: 'messages-main-component-wrapper',
})`
  position: relative;
  height: 100%;
  width: 100%;
  font-family: 'Roboto-Light', sans-serif;

  @media only screen and (max-width: 800px) {
    max-width: 90%;
  }
`;

const MessagesList = styled.ul.attrs({ className: 'messages-list' })`
  list-style-type: none;
  margin: 0;
  padding: 20px;
  position: absolute;
  max-height: 67vh;
  width: 95%;
  font-size: 13px;
  bottom: 0;
  height: calc(100% - 40px);

  overflow: hidden;

  &:hover {
    overflow-y: scroll;
  }
`;

const NoMessagesBox = styled.div.attrs({ className: 'no-messages-box' })`
  margin: 0;
  position: relative;
  padding: 20px;
  max-height: 67vh;
  width: 95%;
  bottom: 0;
  height: calc(100% - 40px);
  overflow: hidden;
`;

const NoMessagesText = styled.div.attrs({ className: 'no-messages-test' })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  text-align: center;
  font-weight: 100;
`;

const MessagesListItemRight = styled.li.attrs({ className: 'messages-list-item-right' })`
  display: block;
  max-width: 50%;
  text-align: right;
  float: right;
  clear: both;
  margin: 0 0 10px 0;
`;

const TypingAvatar = styled.div.attrs({ className: 'typing-avatar' })`
  background: #2d4564;
  color: #fff;
  font-size: 12px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  display: inline-block;
  margin-right: 5px;
`;

const MessagesListItemLeft = styled.li.attrs({ className: 'messages-list-item-left' })`
  display: block;
  max-width: 60%;
  text-align: left;
  clear: both;
  float: left;
  margin: 0 0 10px 0;
  display: grid;
  grid-template-columns: 1fr 8fr;
  grid-template-areas: 'message-image-box-area message-content-area';
`;

const MessageImageBox = styled.div.attrs({ className: 'messages-image-box' })`
  grid: message-image-box-area;
  width: 44px;
`;

const MessageContentArea = styled.div.attrs({ className: 'messages-image-box' })`
  grid: message-content-area;
`;

const MessageAuthorParagraph = styled.div.attrs({ className: 'message-author-paragraph' })`
  margin: 0 0 5px 0;
  font-size: 9px;
`;

const MessageContent = styled.p.attrs({ className: 'messages-content' })`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  margin: 0;
  border-top-left-radius: 0;
  display: inline-block;
  overflow-wrap: break-word;
  font-size: 11px;
`;

const MessageUserImage = styled.div.attrs({ className: 'message-user-image' })`
  border-radius: 50%;
  width: 32px;
  width: 32px;
  border: 1px solid #f0f0f0;
  margin-right: 10px;
  cursor: pointer;
  background: #2d4564;
  color: #fff;
  line-height: 32px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
`;

const IsTypingBox = styled.div.attrs({ className: 'is-typing-box' })`
  position: absolute;
  bottom: 10px;
  left: 20px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  font-size: 12px;
  font-weight: 100;
  line-height: 20px;
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  transition: 2s;
`;

const MessagesMainComponent = ({ currentUser, messagesArray, isTyping, loggedInUserId }) => {
  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-list',
      duration: 200,
    });
  }, []);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-list',
      duration: 100,
    });
  }, [messagesArray]);

  const getCircleData = person =>
    person !== undefined && person.firstName.charAt(0) + person.lastName.charAt(0);

  const getFullName = person => `${person.firstName} ${person.lastName}`;

  const renderMessages = () => (
    <MessagesList id="messages-list">
      {messagesArray.map((item, i, arr) => {
        const previousItem = arr[i - 1];

        if (item.sender.userId === loggedInUserId) {
          return (
            <MessagesListItemRight key={item.id}>
              {i !== 0 && previousItem.sender.userId === item.sender.userId ? null : (
                <MessageAuthorParagraph>
                  {`${new Date(item.dateTime).getHours()}:${new Date(item.dateTime).getMinutes()}`}
                </MessageAuthorParagraph>
              )}
              <MessageContent style={{ background: '#cbe1fe' }}>{item.content}</MessageContent>
            </MessagesListItemRight>
          );
        }

        return (
          <MessagesListItemLeft key={item.id}>
            <MessageImageBox>
              {i !== 0 && previousItem.sender.userId === item.sender.userId ? null : (
                <MessageUserImage>{getCircleData(item.sender)}</MessageUserImage>
              )}
            </MessageImageBox>
            <MessageContentArea>
              {i !== 0 && previousItem.sender.userId === item.sender.userId ? null : (
                <MessageAuthorParagraph>
                  {`${getFullName(item.sender)}, ${new Date(item.dateTime).getHours()}:${new Date(
                    item.dateTime,
                  ).getMinutes()}`}
                </MessageAuthorParagraph>
              )}
              <MessageContent
                style={
                  i !== 0 && previousItem.sender.userId === item.sender.userId
                    ? { marginLeft: '0' }
                    : {}
                }
              >
                {item.content}
              </MessageContent>
            </MessageContentArea>
          </MessagesListItemLeft>
        );
      })}
    </MessagesList>
  );

  const getTypingAvatarText = user =>
    user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();

  return (
    <MessagesMainComponentWrapper>
      {messagesArray.length === 0 ? (
        <NoMessagesBox>
          <NoMessagesText>No messages to show</NoMessagesText>
        </NoMessagesBox>
      ) : (
        renderMessages()
      )}
      {isTyping && (
        <IsTypingBox>
          <TypingAvatar>{getTypingAvatarText(currentUser)}</TypingAvatar>
          {currentUser.firstName}
          <div className="typing-indicator">
            <span />
            <span />
            <span />
          </div>
        </IsTypingBox>
      )}
    </MessagesMainComponentWrapper>
  );
};

MessagesMainComponent.propTypes = {
  messagesArray: PropTypes.arrayOf(Object).isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  isTyping: PropTypes.bool.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
};

export default MessagesMainComponent;
