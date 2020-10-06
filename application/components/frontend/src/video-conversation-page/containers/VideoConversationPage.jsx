/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import shortid from 'shortid';

import StreamBox from 'video-conversation-page/components/StreamBox';
import NoAppointmentFoundPlaceholder from 'common/components/placeholders/NoAppointmentFoundPlaceholder';
import ChatBox from 'video-conversation-page/components/ChatBox';
import Colors from 'common/colors';
import useStateCallback from 'common/hooks/useStateCallback';
import withLoading, { ProgIndSize } from 'common/utils/withLoading';
import { getAppointmentDetails } from 'video-conversation-page/actions/videoConversationActions';

const VideoConversationPageWrapper = styled.div.attrs({
  className: 'video-conversation-page-wrapper',
})`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
`;

const VideoGrid = styled.div.attrs({ className: 'video-grid' })`
  display: grid;
  grid-template-columns: 2fr 8fr 3fr;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  height: 100%;
  width: 100%;
`;

const JSON_CONTENT_TYPE = 'application/json';
const SPEECH_DETECTION_VALUE = 10;
const SPEAKING_THRESHOLD_VALUE = 50;
const RESOLUTION = '950x484';
const PUBLISHER_ROLE = 'PUBLISHER';

const VideoConversationPageWithLoading = withLoading(
  VideoConversationPageWrapper,
  ProgIndSize.XX_LARGE,
);

const VideoConversationPage = ({
  token,
  username,
  getAppointmentDetailsFunc,
  match,
  isError,
  isLoading,
}) => {
  const [initialVideo, setInitialVideo] = useState(true);
  const [initialAudio, setInitialAudio] = useState(true);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [publishVideo, setPublishVideo] = useStateCallback(true);
  const [publishAudio, setPublishAudio] = useStateCallback(true);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useStateCallback(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');
  const [messages, setMessages] = useState([]);
  const [openVidu, setOpenVidu] = useState();
  const [sessionToken, setSessionToken] = useState('');

  const exitHandler = () => {
    setFullScreenMode(!fullScreenMode);
  };

  const addFullscreenEventListeners = () => {
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);
  };

  const leaveSession = () => {
    const mySession = session;

    if (mySession) mySession.disconnect();

    setOpenVidu(null);
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const removeUserFromSession = () => {
    const leaveSessionRequest = {
      sessionName: appointmentId,
      token,
    };

    const headers = {
      'Content-Type': JSON_CONTENT_TYPE,
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
    };

    return axios.post(`/api/session/leave`, leaveSessionRequest, {
      headers,
    });
  };

  useEffect(() => {
    const {
      params: { callId },
    } = match;

    setAppointmentId(callId);
    // getAppointmentDetailsFunc(callId);
    addFullscreenEventListeners();

    return () => {
      if (session) removeUserFromSession();
      leaveSession();
    };
  }, []);

  const getToken = sessionRequest => {
    const headers = {
      'Content-Type': JSON_CONTENT_TYPE,
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
    };

    return axios.post(`/api/appointments/session/join`, sessionRequest, {
      headers,
    });
  };

  const handleMainVideoStream = stream => {
    if (mainStreamManager !== stream) setMainStreamManager(stream);
  };

  const deleteSubscriber = streamManager => {
    const mySubscribers = subscribers;
    const index = mySubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      mySubscribers.splice(index, 1);
      setSubscribers(mySubscribers);
    }
  };

  const isUserSpeaking = event =>
    Math.abs(event.value.newValue - event.value.oldValue) > SPEECH_DETECTION_VALUE &&
    (Math.abs(event.value.oldValue < SPEAKING_THRESHOLD_VALUE) ||
      Math.abs(event.value.newValue < SPEAKING_THRESHOLD_VALUE)) &&
    publishAudio;

  const joinSession = () => {
    const openViduObject = new OpenVidu();
    openViduObject.setAdvancedConfiguration({
      iceServers: [
        { urls: `stun:${window.location.host}:3478` },
        {
          urls: [
            `turn:www.${window.location.host}:3478`,
            `turn:www.${window.location.host}:3478?transport=tcp`,
          ],
        },
      ],
    });

    setOpenVidu(openViduObject);

    const mySession = openViduObject.initSession();

    setSession(mySession);
    setPublishAudio(initialAudio);
    setPublishVideo(initialVideo);

    mySession.on('streamCreated', event => {
      const mySubscribers = subscribers;
      const subscriber = mySession.subscribe(event.stream, undefined);
      mySubscribers.push(subscriber);

      setSubscribers(mySubscribers);
    });

    mySession.on('streamDestroyed', event => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('signal:my-chat', event => {
      const message = event.data.split(';');
      const messageObj = {
        id: shortid.generate(),
        message: message[0],
        initials: message[1].charAt(0).toUpperCase(),
        username: message[1],
        iconColor: message[1] === username ? Colors.SHIP_COVE : Colors.BLUMINE,
        userMessage: message[1] === username,
      };

      setMessages([...messages, messageObj]);
    });

    const role = PUBLISHER_ROLE;
    const sessionRequest = {
      sessionName: appointmentId,
      username,
      role,
    };

    getToken(sessionRequest).then(tokenObj => {
      const tokenString = tokenObj.data[0];
      setSessionToken(tokenString);

      mySession
        .connect(tokenString, { clientData: username })
        .then(() => {
          const publisherObject = openViduObject.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: initialAudio,
            publishVideo: initialVideo,
            resolution: RESOLUTION,
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true,
          });

          publisherObject.on('streamAudioVolumeChange', event => {
            setIsSpeaking(isUserSpeaking(event), () => {
              if (isSpeaking) mainStreamManager(publisherObject);
            });
          });

          mySession.publish(publisherObject);

          setMainStreamManager(publisherObject);
          setPublisher(publisherObject);
          setSessionStarted(true);
        })
        .catch(error => {
          throw new Error(
            `There was an error connecting to the session: ${error.code}, ${error.message}.`,
          );
        });
    });
  };

  const showVideo = () => {
    const myPublisher = publisher;

    setPublishVideo(!publishVideo, () => {
      myPublisher.publishVideo(publishVideo);
      setPublisher(myPublisher);
    });
  };

  const muteAudio = () => {
    const myPublisher = publisher;

    setPublishAudio(!publishAudio, () => {
      myPublisher.publishAudio(publishAudio);
      setPublisher(myPublisher);
    });
  };

  const shareScreen = () => {
    const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';

    openVidu
      .getUserMedia({
        videoSource,
        publishAudio,
        publishVideo: true,
        resolution: RESOLUTION,
        mirror: true,
      })
      .then(mediaStream => {
        const videoTrack = mediaStream.getVideoTracks()[0];

        const myPublisher = publisher;
        myPublisher.replaceTrack(videoTrack);

        setPublisher(myPublisher);
        setIsSharingScreen(true);
      });
  };

  const stopSharingScreen = () => {
    openVidu
      .getUserMedia({
        videoSource: undefined,
        publishAudio,
        publishVideo,
        resolution: RESOLUTION,
        mirror: true,
      })
      .then(mediaStream => {
        const videoTrack = mediaStream.getVideoTracks()[0];

        const myPublisher = publisher;
        myPublisher.replaceTrack(videoTrack);

        setPublisher(myPublisher);
        setIsSharingScreen(false);
      });
  };

  const sendChatMessage = message => {
    const mySession = session;

    mySession.signal({
      data: `${message};${username}`,
      to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
      type: 'my-chat', // The type of message (optional)
    });
  };

  const goFullScreen = () => {
    const { document } = window;
    const fs = document.getElementById('main-video');

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    }
  };

  if (isError) {
    return <NoAppointmentFoundPlaceholder />;
  }

  return (
    <VideoConversationPageWithLoading isLoading={isLoading}>
      <VideoGrid>
        <StreamBox
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
        <ChatBox
          messages={messages}
          sendChatMessage={sendChatMessage}
          isSession={session !== undefined}
        />
      </VideoGrid>
    </VideoConversationPageWithLoading>
  );
};

VideoConversationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      callId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  getAppointmentDetailsFunc: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.call.appointmentDetails.isLoading,
  isError: state.call.appointmentDetails.isError,
  token: state.common.authUser.keycloakInfo.token,
  username: state.common.authUser.keycloakInfo.userInfo.preferred_username,
});

const mapDispatchToProps = dispatch => ({
  getAppointmentDetailsFunc: appointmentId => dispatch(getAppointmentDetails(appointmentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoConversationPage);
