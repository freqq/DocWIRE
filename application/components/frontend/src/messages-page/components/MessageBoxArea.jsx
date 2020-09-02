import React from 'react';
import styled from 'styled-components';

import MessagesMainArea from 'messages-page/components/MessagesMainArea';
import moreIcon from 'images/icons/more.svg';

const MessageBoxAreaWrapper = styled.div.attrs({ className: 'message-box-area' })`
  grid: message-box-area;
`;

const ProfileMoreIcon = styled.img.attrs({
  className: 'profile-more-icon',
  alt: 'profile-more-icon',
})`
  width: 14px;
  height: 14px;
  cursor: pointer;
  display: inline-block;
  margin-top: 15px;
  float: right;
`;

const MessageTopBar = styled.div.attrs({ className: 'message-top-bar' })`
  padding: 12px 40px;
  border-bottom: 1px solid #f0f0f0;
  background: #ffffff;
  position: relative;
  min-height: 41px;
`;

const TopBarLeftSide = styled.div.attrs({ className: 'top-bar-left-side' })`
  display: inline-block;
`;

const UserImage = styled.div.attrs({ className: 'user-image' })`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 15px;
  left: 30px;
  border-radius: 50%;
  background: #2d4564;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #fff;
`;

const TopBarUserName = styled.span.attrs({ className: 'top-bar-user-name' })`
  display: inline-block;
  font-size: 12px;
  margin: 0;
  line-height: 40px;
  margin-left: 30px;
`;

const UserActiveDot = styled.div.attrs({ className: 'user-active-dot' })`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  bottom: 4px;
  background: #5bc247;
  margin-left: 3px;
  border: 2px solid #ffffff;
  right: -4px;
  display: inline-block;
`;

const chosenChatUser = 'admin';

const MessageBoxArea = () => (
  <MessageBoxAreaWrapper>
    <MessageTopBar>
      {chosenChatUser ? (
        <TopBarLeftSide>
          <UserImage>{chosenChatUser.charAt(0).toUpperCase()}</UserImage>
          <TopBarUserName>{chosenChatUser}</TopBarUserName>
          <UserActiveDot />
        </TopBarLeftSide>
      ) : null}
      <ProfileMoreIcon src={moreIcon} />
    </MessageTopBar>

    <MessagesMainArea />
  </MessageBoxAreaWrapper>
);

export default MessageBoxArea;
