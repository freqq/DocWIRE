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
  background: ${Colors.WHITE};
  border-top: 1px solid ${Colors.GALLERY};
  z-index: 3;
  min-height: 55px;
  max-height: 55px;
`;

const DetailsActions = styled.div.attrs({ className: 'details-actions' })``;

const MenuList = styled.ul.attrs({ className: 'details-box-menu-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const MenuListItem = styled.li.attrs({ className: 'details-box-menu-list-item' })`
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
  background: '#d0d0d0',
};

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

  return (
    <DetailsBoxWrapper style={style}>
      <DetailsActions>
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
