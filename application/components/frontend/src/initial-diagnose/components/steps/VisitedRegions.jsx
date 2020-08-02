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

VisitedRegions.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

VisitedRegions.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};

export default VisitedRegions;
