import React from 'react';
import Placeholder from 'common/components/placeholders/Placeholder';
import errorImage from 'images/illustrations/error.svg';

const TITLE = 'Internal server error';
const SUBTITLE = 'There was an error fetching authenticated user data';
const ALT = 'Error fetching authenticated user data';

const AuthErrorPlaceholder = () => (
  <Placeholder src={errorImage} alt={ALT} title={TITLE} subtitle={SUBTITLE} />
);

export default AuthErrorPlaceholder;
