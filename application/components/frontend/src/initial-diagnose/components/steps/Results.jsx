import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const WaitingForResults = styled.div.attrs({ className: 'waiting-for-results' })`
  display: block;
  width: 80%;
  margin: 0 auto;
`;

const AnalyzeText = styled.div.attrs({ className: 'analyze-text' })`
  display: block;
  margin: 0 auto;
  text-align: center;
  font-weight: 100;
  position: absolute;
  top: 63%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ResultsWrapper = styled.div.attrs({ className: 'results-wrapper' })`
  display: block;
  width: 80%;
  height: 90%;
  margin: 0 auto;
`;

const Results = ({ currentStep, totalSteps }) => {
  const isLoading = true;

  return (
    <GenericStep stepName="Results" currentStep={currentStep} totalSteps={totalSteps}>
      {isLoading ? (
        <WaitingForResults>
          <ProgressIndicatorCircular />
          <AnalyzeText>Analyzing your answers...</AnalyzeText>
        </WaitingForResults>
      ) : (
        <ResultsWrapper>Results</ResultsWrapper>
      )}
    </GenericStep>
  );
};

Results.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

Results.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};

export default Results;
