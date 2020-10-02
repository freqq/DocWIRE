import React from 'react';
import styled from 'styled-components';
import StreamBoxTopbar from 'video-conversation-page/components/StreamBoxTopbar';
import StreamComponent from 'video-conversation-page/components/StreamComponent';
import PropTypes from 'prop-types';

const StreamBoxWrapper = styled.div.attrs({ className: 'details-box-wrapper' })`
  height: 100%;
`;

const StreamBox = ({
  setInitialAudio,
  setInitialVideo,
  joinSession,
  stopSharingScreen,
  goFullScreen,
  shareScreen,
  showVideo,
  muteAudio,
  handleMainVideoStream,
  initialAudio,
  initialVideo,
  sessionStarted,
  isSharingScreen,
  publishVideo,
  isSpeaking,
  publishAudio,
  publisher,
  mainStreamManager,
  subscribers,
  fullScreenMode,
}) => (
  <StreamBoxWrapper>
    <StreamBoxTopbar />
    <StreamComponent
      setInitialAudio={setInitialAudio}
      setInitialVideo={setInitialVideo}
      joinSession={joinSession}
      stopSharingScreen={stopSharingScreen}
      goFullScreen={goFullScreen}
      shareScreen={shareScreen}
      showVideo={showVideo}
      muteAudio={muteAudio}
      handleMainVideoStream={handleMainVideoStream}
      initialAudio={initialAudio}
      initialVideo={initialVideo}
      sessionStarted={sessionStarted}
      isSharingScreen={isSharingScreen}
      publishVideo={publishVideo}
      isSpeaking={isSpeaking}
      publishAudio={publishAudio}
      publisher={publisher}
      mainStreamManager={mainStreamManager}
      subscribers={subscribers}
      fullScreenMode={fullScreenMode}
    />
  </StreamBoxWrapper>
);

StreamBox.propTypes = {
  setInitialAudio: PropTypes.func.isRequired,
  setInitialVideo: PropTypes.func.isRequired,
  joinSession: PropTypes.func.isRequired,
  stopSharingScreen: PropTypes.func.isRequired,
  goFullScreen: PropTypes.func.isRequired,
  shareScreen: PropTypes.func.isRequired,
  showVideo: PropTypes.func.isRequired,
  muteAudio: PropTypes.func.isRequired,
  handleMainVideoStream: PropTypes.func.isRequired,
  initialAudio: PropTypes.bool.isRequired,
  initialVideo: PropTypes.bool.isRequired,
  sessionStarted: PropTypes.bool.isRequired,
  isSharingScreen: PropTypes.bool.isRequired,
  isSpeaking: PropTypes.bool.isRequired,
  publishVideo: PropTypes.bool.isRequired,
  publishAudio: PropTypes.bool.isRequired,
  fullScreenMode: PropTypes.bool.isRequired,
  publisher: PropTypes.instanceOf(Object).isRequired,
  mainStreamManager: PropTypes.instanceOf(Object).isRequired,
  subscribers: PropTypes.instanceOf(Array).isRequired,
};

export default StreamBox;
