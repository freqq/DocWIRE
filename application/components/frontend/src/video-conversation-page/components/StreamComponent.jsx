import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import DetailsBox from 'video-conversation-page/components/DetailsBox';
import UserVideoComponent from 'video-conversation-page/components/UserVideoComponent';
import InitialSettings from 'video-conversation-page/components/InitialSettings';

const VideoComponentWrapper = styled.div.attrs({ className: 'video-component-wrapper' })`
  display: inline-block;
  font-family: 'Sen', sans-serif;
`;

const StreamComponentWrapper = styled.div.attrs({ className: 'stream-component-wrapper' })`
  overflow: hidden;
  max-height: 83vh;
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-gap: 0;
  grid-template-rows: 22fr 2fr;
  grid-template-areas:
    'stream-box-area'
    'details-box-area';
  height: 100%;

  @media only screen and (max-height: 770px) {
    max-height: 82vh;
  }

  @media only screen and (max-height: 715px) {
    max-height: 81vh;
  }

  @media only screen and (max-height: 670px) {
    max-height: 80vh;
  }
`;

const VideoGrid = styled.div.attrs({ className: 'video-grid' })``;
const StreamBox = styled.div.attrs({ className: 'stream-box-area' })`
  grid: stream-box-area;
  max-height: 70vh;
`;

const MainVideoArea = styled.div.attrs({ className: 'main-video' })``;
const SmallVideoArea = styled.div.attrs({ className: 'small-video-area' })``;

const StreamComponent = ({
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
  <StreamComponentWrapper id="session">
    {publisher === undefined ? (
      <InitialSettings
        setInitialAudio={setInitialAudio}
        setInitialVideo={setInitialVideo}
        initialAudio={initialAudio}
        initialVideo={initialVideo}
        joinSession={joinSession}
      />
    ) : null}
    <StreamBox id="main-video" className={fullScreenMode ? 'full-sc-video' : 'not-full-sc-video'}>
      {!publisher && sessionStarted ? (
        <ProgressIndicatorCircular />
      ) : (
        <VideoGrid>
          <MainVideoArea>
            {mainStreamManager !== undefined ? (
              <UserVideoComponent
                isSharingScreen={isSharingScreen}
                isSpeaking={isSpeaking}
                bigVideo
                hiddenCamera={!publishVideo}
                streamManager={mainStreamManager}
              />
            ) : null}
          </MainVideoArea>
          <SmallVideoArea id="stream-container">
            {publisher !== undefined ? (
              <VideoComponentWrapper
                className="stream-container small-video"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent
                  bigVideo={false}
                  hiddenCamera={!publishVideo}
                  streamManager={publisher}
                />
              </VideoComponentWrapper>
            ) : null}
            {subscribers.map(sub => (
              <VideoComponentWrapper
                key={shortid.generate()}
                className="stream-container"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent
                  bigVideo={false}
                  hiddenCamera={!publishVideo}
                  streamManager={sub}
                />
              </VideoComponentWrapper>
            ))}
          </SmallVideoArea>
        </VideoGrid>
      )}
    </StreamBox>

    <DetailsBox
      isSharingScreen={isSharingScreen}
      style={publisher !== undefined ? {} : { visibility: 'hidden' }}
      shareScreen={shareScreen}
      stopSharingScreen={stopSharingScreen}
      goFullScreen={goFullScreen}
      showVideo={showVideo}
      muteAudio={muteAudio}
      publishVideo={publishVideo}
      publishAudio={publishAudio}
    />
  </StreamComponentWrapper>
);

StreamComponent.propTypes = {
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

export default StreamComponent;
