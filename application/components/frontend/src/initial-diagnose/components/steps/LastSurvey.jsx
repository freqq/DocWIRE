import React from 'react';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';

const LastSurvey = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Few more questions" currentStep={currentStep} totalSteps={totalSteps}>
    LastSurvey
  </GenericStep>
);

LastSurvey.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default LastSurvey;
