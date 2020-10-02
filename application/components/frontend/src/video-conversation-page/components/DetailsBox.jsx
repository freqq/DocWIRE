/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import Colors from 'common/colors';
import PropTypes from 'prop-types';

import micIcon from 'images/icons/microphone.svg';
import cameraIcon from 'images/icons/camera.svg';
import reportIcon from 'images/icons/report.svg';
import exitIcon from 'images/icons/exit.svg';
import shareScreenIcon from 'images/icons/share.svg';

const DetailsBoxWrapper = styled.div.attrs({ className: 'details-box-wrapper' })`
  grid: details-box-area;
  background: ${Colors.WHITE};
  border-top: 1px solid ${Colors.GALLERY};
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 'actions-area users-area';
  z-index: 3;
  min-height: 55px;
  max-height: 55px;
`;

const DetailsActions = styled.div.attrs({ className: 'details-actions' })`
  grid: actions-area;
`;

const UsersArea = styled.div.attrs({ className: 'users-area' })`
  grid: users-area;
  font-size: 12px;
  text-align: right;
  line-height: 55px;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const MenuList = styled.ul.attrs({ className: 'details-box-menu-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const ParticipantsWrapper = styled.div.attrs({ className: 'participants-wrapper' })`
  display: inline-block;
  margin: 0 30px 0 15px;

  @media only screen and (max-width: 1180px) {
    display: none;
  }
`;

const ParticipantsSmaller = styled.div.attrs({ className: 'participants-smaller' })`
  display: inline-block;
  margin: 0 30px 0 15px;

  @media only screen and (min-width: 1180px) {
    display: none;
  }
`;

const ParticipantItem = styled.div.attrs({ className: 'participant-item' })`
  display: inline-block;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: ${Colors.WHITE};
  margin-left: -8px;
`;

const MenuListItem = styled.ul.attrs({ className: 'details-box-menu-list-item' })`
  display: inline-block;
  margin: 0;
  padding: 13px;
  cursor: pointer;
  width: 50px;
  border-right: 2px solid ${Colors.GALLERY};
  font-family: 'Titillium Web', sans-serif;

  &:hover {
    background: ${Colors.GALLERY};
  }

  &:last-child {
    border-right: none;
  }
`;

const MenuListIcon = styled.img.attrs({ className: 'menu-list-icon', alt: 'menu-list-icon' })`
  margin: 0;
  display: inline-block;
  width: 22px;
  height: 22px;
`;

const unActiveButton = {
  background: '#f0f0f0',
  border: '1px solid #d0d0d0',
};

const PARTICIPANTS_LIST = [
  {
    nick: 'OP',
    bgColor: Colors.MATISSE,
  },
  {
    nick: 'PW',
    bgColor: Colors.SHIP_COVE,
  },
  {
    nick: 'TD',
    bgColor: Colors.BUTTERCUP,
  },
  {
    nick: 'JF',
    bgColor: Colors.BURGUNDY,
  },
  {
    nick: 'AK',
    bgColor: Colors.SCIENCE_BLUE,
  },
  {
    nick: '+24',
    bgColor: Colors.GUARDSMAN_RED,
  },
];

const DetailsBox = ({
  showVideo,
  muteAudio,
  goFullScreen,
  shareScreen,
  stopSharingScreen,
  isSharingScreen,
  style,
  publishAudio,
  publishVideo,
}) => {
  const onMuteClick = () => {
    muteAudio();
  };

  const onHideClick = () => {
    showVideo();
  };

  const fullScreen = () => {
    goFullScreen();
  };

  const handleScreenShare = () => {
    if (isSharingScreen) stopSharingScreen();
    else shareScreen();
  };

  const renderParticipants = () => (
    <ParticipantsWrapper>
      {PARTICIPANTS_LIST.map(user => (
        <ParticipantItem key={user.nick} style={{ background: user.bgColor }}>
          {user.nick}
        </ParticipantItem>
      ))}
    </ParticipantsWrapper>
  );

  return (
    <DetailsBoxWrapper>
      <DetailsActions style={style}>
        <MenuList>
          <MenuListItem
            onClick={onMuteClick}
            className="tooltip"
            style={publishAudio ? {} : unActiveButton}
          >
            <MenuListIcon src={micIcon} />
            <span className="tooltiptext">{publishAudio ? 'Mute ' : 'Unmute '} microphone</span>
          </MenuListItem>
          <MenuListItem
            onClick={onHideClick}
            className="tooltip"
            style={publishVideo ? {} : unActiveButton}
          >
            <MenuListIcon src={cameraIcon} />
            <span className="tooltiptext">{publishVideo ? 'Hide ' : 'Show '} video</span>
          </MenuListItem>
          <MenuListItem onClick={fullScreen} className="tooltip">
            <MenuListIcon src={exitIcon} />
            <span className="tooltiptext">Fullscreen</span>
          </MenuListItem>
          <MenuListItem className="tooltip" onClick={handleScreenShare}>
            <MenuListIcon src={shareScreenIcon} />
            <span className="tooltiptext">
              {isSharingScreen ? 'Stop sharing screen' : 'Share screen'}
            </span>
          </MenuListItem>
          <MenuListItem className="tooltip">
            <MenuListIcon src={reportIcon} />
            <span className="tooltiptext">Report stream</span>
          </MenuListItem>
        </MenuList>
      </DetailsActions>

      <UsersArea>
        Participants
        <>{renderParticipants()}</>
        <ParticipantsSmaller>
          <ParticipantItem style={{ background: Colors.GUARDSMAN_RED }}>24+</ParticipantItem>
        </ParticipantsSmaller>
      </UsersArea>
    </DetailsBoxWrapper>
  );
};

DetailsBox.propTypes = {
  showVideo: PropTypes.func.isRequired,
  muteAudio: PropTypes.func.isRequired,
  goFullScreen: PropTypes.func.isRequired,
  shareScreen: PropTypes.func.isRequired,
  stopSharingScreen: PropTypes.func.isRequired,
  isSharingScreen: PropTypes.bool.isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
  publishVideo: PropTypes.bool.isRequired,
  publishAudio: PropTypes.bool.isRequired,
};

export default DetailsBox;
