import React from 'react';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';

const QuickSurvey = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Quick survey" currentStep={currentStep} totalSteps={totalSteps}>
    QuickSurver
  </GenericStep>
);

QuickSurvey.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default QuickSurvey;
