/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const StreamVideo = ({ streamManager }) => {
  const videoRef = React.createRef();

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video autoPlay ref={videoRef} />;
};

StreamVideo.propTypes = {
  streamManager: PropTypes.instanceOf(Object).isRequired,
};

export default StreamVideo;
