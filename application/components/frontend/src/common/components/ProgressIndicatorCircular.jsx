import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import progressImage from 'images/loading_image.svg';

const ImageContainer = styled.img.attrs({
  className: 'image-container-progress',
  alt: 'image-container-progress',
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const ProgressIndicatorCircular = ({ size }) => (
  <ImageContainer style={{ height: `${size}px` }} src={progressImage} alt="progress-circular" />
);

ProgressIndicatorCircular.defaultProps = {
  size: 100,
};

ProgressIndicatorCircular.propTypes = {
  size: PropTypes.number,
};

export default ProgressIndicatorCircular;
