import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import StreamVideo from 'video-conversation-page/components/StreamVideo';

const VideoWrapper = styled.div.attrs({ className: 'video-wrapper' })`
  position: relative;
`;

const StreamAuthor = styled.div.attrs({ className: 'stream-author' })`
  position: absolute;
  top: 0;
  right: 0;
  width: 15%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 10px;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  text-align: center;
  border-bottom-left-radius: 4px;
`;

const ShowCircleTemplate = styled.div.attrs({ className: 'show-circle-template' })`
  position: absolute;
  transition: 0.5s;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 20%;
  height: 40%;
  background: #c7d4e6;
  border: 1px solid #f0f0f0;
  color: #082654;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const RelativeBox = styled.div.attrs({ className: 'relative-box' })`
  position: relative;
  width: 100%;
  height: 100%;
`;

const NameBox = styled.div.attrs({ className: 'name-box' })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const talkingStyle = {
  border: '5px solid #787bb8',
  boxShadow: '10px 10px 114px 19px rgba(120,123,184,0.78)',
};

const bigVideoComponentText = {
  fontSize: '75px',
};

const UserVideoComponent = ({
  streamManager,
  hiddenCamera,
  currentUsername,
  isSpeaking,
  bigVideo,
}) => {
  const getNameFromConnection = () => streamManager.stream.connection.data.split('"')[3];

  return (
    <>
      {streamManager !== undefined ? (
        <VideoWrapper className="streamcomponent">
          <StreamVideo streamManager={streamManager} />
          <StreamAuthor>{getNameFromConnection()}</StreamAuthor>
          {hiddenCamera && currentUsername === getNameFromConnection() ? (
            <ShowCircleTemplate style={isSpeaking ? talkingStyle : {}}>
              <RelativeBox>
                <NameBox style={bigVideo ? bigVideoComponentText : {}}>
                  {currentUsername.charAt(0).toUpperCase()}
                </NameBox>
              </RelativeBox>
            </ShowCircleTemplate>
          ) : null}
        </VideoWrapper>
      ) : null}
    </>
  );
};

UserVideoComponent.defaultProps = {
  hiddenCamera: false,
  isSpeaking: true,
};

UserVideoComponent.propTypes = {
  streamManager: PropTypes.instanceOf(Object).isRequired,
  bigVideo: PropTypes.bool.isRequired,
  hiddenCamera: PropTypes.bool,
  isSpeaking: PropTypes.bool,
  currentUsername: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentUsername: state.common.authUser.keycloakInfo.userInfo.preferred_username,
});

export default connect(mapStateToProps, null)(UserVideoComponent);
