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
  height: 20px;
  width: 20px;
  line-height: 20px;
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
  bottom: 5px;
  left: 60px;
  font-size: 12px;
  font-weight: 100;
  line-height: 20px;
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  transition: 2s;
`;

const MessagesMainComponent = ({ currentUser, messagesArray, isTyping, chosenChatUser }) => {
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

  const renderMessages = () => (
    <MessagesList id="messages-list">
      {messagesArray.map((item, i, arr) => {
        const previousItem = arr[i - 1];
        if (item.sender === currentUser) {
          return (
            <MessagesListItemRight key={item.id}>
              {i !== 0 && previousItem.sender === item.sender ? null : (
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
              {i !== 0 && previousItem.sender === item.sender ? null : (
                <MessageUserImage>{item.sender.charAt(0).toUpperCase()}</MessageUserImage>
              )}
            </MessageImageBox>
            <MessageContentArea>
              {i !== 0 && previousItem.sender === item.sender ? null : (
                <MessageAuthorParagraph>
                  {`${item.sender}, ${new Date(item.dateTime).getHours()}:${new Date(
                    item.dateTime,
                  ).getMinutes()}`}
                </MessageAuthorParagraph>
              )}
              <MessageContent
                style={i !== 0 && previousItem.sender === item.sender ? { marginLeft: '0' } : {}}
              >
                {item.content}
              </MessageContent>
            </MessageContentArea>
          </MessagesListItemLeft>
        );
      })}
    </MessagesList>
  );

  return (
    <MessagesMainComponentWrapper>
      {renderMessages()}
      {isTyping && (
        <IsTypingBox>
          <TypingAvatar>{chosenChatUser.charAt(0).toUpperCase()}</TypingAvatar>
          {chosenChatUser}
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
  currentUser: PropTypes.string.isRequired,
  isTyping: PropTypes.bool.isRequired,
  chosenChatUser: PropTypes.string.isRequired,
};

export default MessagesMainComponent;
