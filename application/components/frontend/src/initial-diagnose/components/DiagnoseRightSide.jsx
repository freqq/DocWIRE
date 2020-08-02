import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DiagnoseStep from 'initial-diagnose/components/DiagnoseStep';

const DiagnoseRightSideWrapper = styled.div.attrs({ className: 'diagnose-right-side-wrapper' })`
  background: #2e4663;
`;

const DiagnoseStepsWrapper = styled.div.attrs({ className: 'diagnose-steps-wrapper' })`
  position: absolute;
  top: 52%;
  left: 105%;
  height: 70vh;
  width: 60vw;
  transform: translate(-50%, -50%);
`;

const DiagnoseRightSide = ({ steps, currentStepNumber }) => (
  <DiagnoseRightSideWrapper>
    <DiagnoseStepsWrapper>
      {steps.map(step => (
        <DiagnoseStep
          key={step.name}
          name={step.name}
          number={step.number}
          description={step.description}
          isCurrent={currentStepNumber === step.number}
          isCompleted={currentStepNumber > step.number}
        />
      ))}
    </DiagnoseStepsWrapper>
  </DiagnoseRightSideWrapper>
);

DiagnoseRightSide.propTypes = {
  steps: PropTypes.instanceOf(Array).isRequired,
  currentStepNumber: PropTypes.number.isRequired,
};

export default DiagnoseRightSide;
