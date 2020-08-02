import React from 'react';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';

const Results = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Results" currentStep={currentStep} totalSteps={totalSteps}>
    Results
  </GenericStep>
);

Results.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

Results.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};

export default Results;
