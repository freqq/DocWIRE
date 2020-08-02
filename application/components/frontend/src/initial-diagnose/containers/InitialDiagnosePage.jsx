/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import DiagnoseLeftSide from 'initial-diagnose/components/DiagnoseLeftSide';
import DiagnoseRightSide from 'initial-diagnose/components/DiagnoseRightSide';

const InitialDiagnosePageWrapper = styled.div.attrs({ className: 'initial-diagnose-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 5fr 2fr;
`;

const STEPS = [
  {
    number: 1,
    name: 'Choose your sex',
    description: 'Select your gender to indicate biological differences.',
  },
  {
    number: 2,
    name: 'Select your age',
    description: 'Provide us with our age that plays a great role while diagnosis.',
  },
  {
    number: 3,
    name: 'Quick survey',
    description: 'Answer few initial questions that will tell us more about you.',
  },
  {
    number: 4,
    name: 'Symptoms',
    description: 'Describe as many symptoms as you can, so we can correctly diagnose your disease.',
  },
  {
    number: 5,
    name: 'Regions you visited',
    description: 'Select regions that you visited within last 12 months.',
  },
  {
    number: 6,
    name: 'Interview',
    description: 'Answer last few questions that are generated based on the info provided earlier.',
  },
  {
    number: 7,
    name: 'Results',
    description: 'See your results!',
  },
];

const InitialDiagnosePage = () => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);

  return (
    <InitialDiagnosePageWrapper>
      <DiagnoseLeftSide setCurrentStepNumber={setCurrentStepNumber} />
      <DiagnoseRightSide steps={STEPS} currentStepNumber={currentStepNumber} />
    </InitialDiagnosePageWrapper>
  );
};

export default InitialDiagnosePage;
