import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CheckboxSVGMap } from 'react-svg-map';
import World from '@svg-maps/world';
import GenericStep from 'initial-diagnose/components/GenericStep';

import 'initial-diagnose/components/steps/styles/VisitedRegions.css';

const RegionsDescription = styled.p.attrs({ className: 'regions-description' })`
  text-align: center;
  font-size: 15px;
  margin-bottom: 40px;
  font-weight: 100;
  margin: 0;
`;

const VisitedRegions = ({ currentStep, totalSteps, setVisitedRegions }) => (
  <GenericStep
    stepName="Regions you visited recently"
    currentStep={currentStep}
    totalSteps={totalSteps}
  >
    <RegionsDescription>
      Please select the region you live in and places you&apos;ve traveled to in the last 12 months.
    </RegionsDescription>
    <CheckboxSVGMap map={World} onChange={regions => setVisitedRegions(regions)} />
  </GenericStep>
);

VisitedRegions.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

VisitedRegions.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  setVisitedRegions: PropTypes.func.isRequired,
};

export default VisitedRegions;
