/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

export const ProgIndSize = {
  SMALL: { small: true },
  MEDIUM: { medium: true },
  LARGE: { large: true },
  X_LARGE: { xlarge: true },
  XX_LARGE: { xxlarge: true },
};

const CenteringWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  weight: 100%;
`;

const withLoading = (Component, size = ProgIndSize.SMALL) => {
  const wrapped = ({ isLoading, ...props }) => {
    if (!isLoading) {
      return <Component {...props} />;
    }
    return (
      <CenteringWrapper>
        <ProgressIndicatorCircular css={size} />
      </CenteringWrapper>
    );
  };
  wrapped.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };
  return wrapped;
};

export default withLoading;
