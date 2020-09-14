import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MessageItemWrapper = styled.div.attrs({ className: 'message-item-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 10fr;
  grid-template-areas: 'message-user-image-area message-details-area';
  padding: 15px;
  font-family: 'Titillium Web', sans-serif;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: 0.15s;

  @media only screen and (max-width: 990px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'message-user-image-area';
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f9fafc;
  }
`;

const MessageTopInfo = styled.div.attrs({ className: 'message-top-info' })`
  margin: 3px 0 0 10px;
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

const MessageUserImageArea = styled.div.attrs({ className: 'message-user-image-area' })`
  position: relative;
`;

const MessageDetailsArea = styled.div.attrs({ className: 'message-details-area' })`
  @media only screen and (max-width: 990px) {
    display: none;
  }
`;

const MessageUserImg = styled.div.attrs({ className: 'message-user-img' })`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 1px solid #f0f0f0;
  background: #2d4564;
  text-align: center;
  line-height: 35px;
  font-size: 12px;
  color: #fff;
  margin: 0 auto;
`;

const MessageUserImageActive = styled.div.attrs({ className: 'message-user-image-active' })`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  bottom: 4px;
  background: #5bc247;
  border: 2px solid #ffffff;
  right: -3px;
  position: absolute;

  @media only screen and (max-width: 990px) {
    display: none;
  }
`;

const MessageUserName = styled.p.attrs({ className: 'message-user-name' })`
  grid: message-user-name-area;
  font-size: 12px;
  margin: 0;
  color: #4f6073;
  font-weight: 400;
`;

const StyledSpan = styled.span.attrs({ className: 'tooltip-span' })`
  margin-left: 15px;
  margin-top: 5px;

  top: 5px !important;
  background-color: rgba(0, 0, 0, 0.6) !important;

  @media only screen and (min-width: 990px) {
    display: none;
  }

  @media only screen and (max-width: 820px) {
    left: -20px !important;
  }

  @media only screen and (max-width: 750px) {
    display: none;
  }
`;

const MessageTime = styled.p.attrs({ className: 'message-user-name' })`
  grid: message-user-time-area;
  font-size: 13px;
  margin: 0;
  text-align: right;
  color: #cacfd5;
  font-weight: 300;
`;

const MessageComponent = styled.div.attrs({ className: 'message-component' })`
  font-size: 10px;
  color: #b4bbc3;
  margin: 2px 0 0 0;
  font-weight: 400;
  margin-left: 10px;
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-template-areas: 'message-content-area message-unred-area';
`;

const MessageContentArea = styled.div.attrs({ className: 'message-content-area' })`
  grid: message-content-area;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
`;

const UNREAD_MESSAGE_STYLE = {
  background: '#f3f7fd',
};

const MessageItem = ({ messageObject, onClick, person, loggedInUserData }) => {
  const getCircleContent = () => {
    if (messageObject.sender.userId === loggedInUserData.userId)
      return messageObject.receiver.firstName.charAt(0) + messageObject.receiver.lastName.charAt(0);

    return messageObject.sender.firstName.charAt(0) + messageObject.sender.lastName.charAt(0);
  };

  const getNameContent = () => {
    if (messageObject.sender.userId === loggedInUserData.userId)
      return messageObject.receiver.firstName;

    return messageObject.sender.firstName;
  };

  const decideIfUnreadStyle = () => {
    if (messageObject.receiver.userId === loggedInUserData.userId)
      return person !== null && person.userId === messageObject.sender.userId;

    return person !== null && person.userId === messageObject.receiver.userId;
  };

  const minutesWithLeadingZero = date => (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

  return (
    <MessageItemWrapper
      onClick={onClick}
      style={messageObject.unread || decideIfUnreadStyle() ? UNREAD_MESSAGE_STYLE : {}}
    >
      <MessageUserImageArea className="tooltip">
        <MessageUserImg>{getCircleContent()}</MessageUserImg>
        <StyledSpan className="tooltiptext">{getNameContent()}</StyledSpan>
        {messageObject.active ? <MessageUserImageActive /> : null}
      </MessageUserImageArea>
      <MessageDetailsArea>
        <MessageTopInfo>
          <MessageUserName>{getNameContent()}</MessageUserName>
          <MessageTime>
            {`${new Date(messageObject.dateTime).getHours()}:${minutesWithLeadingZero(
              new Date(messageObject.dateTime),
            )}`}
          </MessageTime>
        </MessageTopInfo>
        <MessageComponent>
          <MessageContentArea>{messageObject.content}</MessageContentArea>
        </MessageComponent>
      </MessageDetailsArea>
    </MessageItemWrapper>
  );
};

MessageItem.propTypes = {
  messageObject: PropTypes.objectOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  person: PropTypes.instanceOf(Object).isRequired,
  loggedInUserData: PropTypes.instanceOf(Object).isRequired,
};

export default MessageItem;
