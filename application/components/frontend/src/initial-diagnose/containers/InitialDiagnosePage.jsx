import React, { useState, useEffect } from 'react';
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
    name: 'Introduction',
    description: 'Few points that will provide you information about our diagnose system.',
    url: 'introduction',
  },
  {
    number: 2,
    name: 'Choose your sex',
    description: 'Select your gender to indicate biological differences.',
    url: 'choose-sex',
  },
  {
    number: 3,
    name: 'Select your age',
    description: 'Provide us with our age that plays a great role while diagnosis.',
    url: 'choose-age',
  },
  {
    number: 4,
    name: 'Quick survey',
    description: 'Answer few initial questions that will tell us more about you.',
    url: 'quick-survey',
  },
  {
    number: 5,
    name: 'Symptoms',
    description: 'Describe as many symptoms as you can, so we can correctly diagnose your disease.',
    url: 'symptoms',
  },
  {
    number: 6,
    name: 'Regions you visited',
    description: 'Select regions that you visited within last 12 months.',
    url: 'visited-regions',
  },
  {
    number: 7,
    name: 'Interview',
    description: 'Answer last few questions that are generated based on the info provided earlier.',
    url: 'last-survey',
  },
  {
    number: 8,
    name: 'Results',
    description: 'See your results!',
    url: 'results',
  },
];

const InitialDiagnosePage = () => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);

  useEffect(() => {
    const browserUrl = window.location.href;
    const stepName = browserUrl.split('#')[1];

    if (stepName !== undefined && stepName.length > 0) {
      STEPS.forEach(step => {
        if (step.url === stepName) setCurrentStepNumber(step.number);
      });
    }
  }, []);

  return (
    <InitialDiagnosePageWrapper>
      <DiagnoseLeftSide setCurrentStepNumber={setCurrentStepNumber} />
      <DiagnoseRightSide steps={STEPS} currentStepNumber={currentStepNumber} />
    </InitialDiagnosePageWrapper>
  );
};

export default InitialDiagnosePage;
