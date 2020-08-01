import React from 'react';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';

const Results = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Results" currentStep={currentStep} totalSteps={totalSteps}>
    Results
  </GenericStep>
);

Results.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default Results;
