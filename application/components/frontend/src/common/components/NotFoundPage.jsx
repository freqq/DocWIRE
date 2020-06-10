import React from 'react';
import styled from 'styled-components';
import Placeholder from 'common/components/Placeholder';
import errorImage from 'images/404_Not_Found.svg';

const TITLE = 'Sorry, the page you are looking for cannot be displayed';
const SUBTITLE = 'Following error occured: requested URL not found';
const ALT = 'Requested URL not found';
const CUSTOM_CLASS_NAME = 'not-found-error-placeholder';

const NotFoundWrapper = styled.div`
  padding-top: 60px;
`;

const NotFoundPage = () => (
  <NotFoundWrapper>
    <Placeholder
      src={errorImage}
      alt={ALT}
      title={TITLE}
      subtitle={SUBTITLE}
      customClassName={CUSTOM_CLASS_NAME}
    />
  </NotFoundWrapper>
);

export default NotFoundPage;
