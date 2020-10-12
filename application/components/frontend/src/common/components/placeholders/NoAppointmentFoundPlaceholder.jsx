import React from 'react';
import Placeholder from 'common/components/placeholders/Placeholder';
import errorImage from 'images/illustrations/error.svg';

const TITLE = 'Not found.';
const SUBTITLE = 'There was an error fetching appointment data';
const ALT = 'Error fetching appointment data';

const NoAppointmentFoundPlaceholder = () => (
  <Placeholder src={errorImage} alt={ALT} title={TITLE} subtitle={SUBTITLE} />
);

export default NoAppointmentFoundPlaceholder;
