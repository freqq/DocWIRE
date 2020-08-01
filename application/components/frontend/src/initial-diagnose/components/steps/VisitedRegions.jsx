import React from 'react';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';

const VisitedRegions = ({ currentStep, totalSteps }) => (
  <GenericStep
    stepName="Regions you visited recently"
    currentStep={currentStep}
    totalSteps={totalSteps}
  >
    VisitedRegions
  </GenericStep>
);

VisitedRegions.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default VisitedRegions;
