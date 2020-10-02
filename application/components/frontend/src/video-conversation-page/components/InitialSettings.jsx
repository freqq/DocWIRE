import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ToggleSwitch from 'common/components/ToggleSwitch';
import cameraIcon from 'images/icons/camera.svg';
import micIcon from 'images/icons/microphone.svg';

const UserImage = styled.div.attrs({ className: 'user-image' })`
  border: 1px solid #f0f0f0;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: block;
  margin: 0 auto 20px auto;
  background: #2d4564;
  line-height: 80px;
  color: #fff;
  text-align: center;
  font-size: 22px;
`;

const ImgIcon = styled.img.attrs({ className: 'img-icon', alt: 'img-icon' })`
  width: 26px;
  height: 26px;
  display: inline-block;
  margin-right: 5px;
`;

const JoinSessionButton = styled.button.attrs({ className: 'join-session-button' })`
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background: #2d4564;
  color: #ffffff;
  padding: 10px;
  font-weight: 300;
  font-size: 12px;
  outline: none;
  display: block;
  margin: 15px auto 0 auto;
  cursor: pointer;
  width: 100%;
`;

const InitialSettingsTitle = styled.p.attrs({ className: 'initial-settings-title' })`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 100;
`;

const InitialSettingsItems = styled.div.attrs({ className: 'initial-settings' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'initial-item-name-area initial-item-choice-area';
  margin-bottom: 10px;
`;

const InitialSettingsItemsName = styled.div.attrs({ className: 'initial-settings-name-area' })`
  grid: initial-item-name-area;
  text-align: right;
  padding-right: 15px;
  line-height: 31px;
`;

const InitialSettingsItemsChoice = styled.div.attrs({ className: 'initial-settings-choice-area' })`
  grid: initial-item-choice-area;
  text-align: left;
  padding-left: 15px;
  line-height: 31px;
`;

const InitialSettingsWrapper = styled.div.attrs({ className: 'initial-settings-wrapper' })`
  margin: auto;
  font-size: 13px;
`;

const Items = styled.div.attrs({ className: 'items' })`
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  padding: 25px;
`;

const InitialSettings = ({
  setInitialAudio,
  setInitialVideo,
  initialVideo,
  initialAudio,
  joinSession,
  username,
}) => (
  <InitialSettingsWrapper>
    <InitialSettingsTitle>Choose your audio and video settings</InitialSettingsTitle>
    <Items>
      <UserImage>{username.charAt(0).toUpperCase()}</UserImage>
      <InitialSettingsItems>
        <InitialSettingsItemsName>
          <ImgIcon src={cameraIcon} />
          <ToggleSwitch
            name="initialVideo"
            onCheck={setInitialVideo}
            isChecked={initialVideo}
            style={{ display: 'inline-block' }}
          />
        </InitialSettingsItemsName>
        <InitialSettingsItemsChoice>
          <ImgIcon src={micIcon} />
          <ToggleSwitch
            name="initialAudio"
            onCheck={setInitialAudio}
            isChecked={initialAudio}
            style={{ display: 'inline-block' }}
          />
        </InitialSettingsItemsChoice>
      </InitialSettingsItems>
      <JoinSessionButton onClick={joinSession}>Join now</JoinSessionButton>
    </Items>
  </InitialSettingsWrapper>
);

InitialSettings.propTypes = {
  setInitialAudio: PropTypes.func.isRequired,
  setInitialVideo: PropTypes.func.isRequired,
  joinSession: PropTypes.func.isRequired,
  initialVideo: PropTypes.bool.isRequired,
  initialAudio: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  username: state.common.authUser.keycloakInfo.userInfo.preferred_username,
});

export default connect(mapStateToProps, null)(InitialSettings);
