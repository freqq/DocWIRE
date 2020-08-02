import React from 'react';
import styled from 'styled-components';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';

import MainCardFooter from 'initial-diagnose/components/MainCardFooter';
import DiagnoseFooter from 'initial-diagnose/components/DiagnoseFooter';

import Introduction from 'initial-diagnose/components/steps/Introduction';
import ChooseSex from 'initial-diagnose/components/steps/ChooseSex';
import ChooseAge from 'initial-diagnose/components/steps/ChooseAge';
import QuickSurvey from 'initial-diagnose/components/steps/QuickSurvey';
import Symptoms from 'initial-diagnose/components/steps/Symptoms';
import VisitedRegions from 'initial-diagnose/components/steps/VisitedRegions';
import LastSurvey from 'initial-diagnose/components/steps/LastSurvey';
import Results from 'initial-diagnose/components/steps/Results';
import mainLogo from 'images/main_logo.svg';

import 'initial-diagnose/components/styles/DiagnoseMainCard.css';

const DiagnoseMainCardWrapper = styled.div.attrs({ className: 'diagnose-main-card-wrapper' })`
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
`;

const CardWrapper = styled.div.attrs({ className: 'card-wrapper' })`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  height: 70vh;
  width: 60vw;
  overflow: hidden;
  padding: 15px 15px 0 15px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.07);
`;

const RelativeWrapper = styled.div.attrs({ className: 'relative-wrapper' })`
  position: relative;
  height: 100%;
  width: 100%;
`;

const DiagnoseMainLogo = styled.img.attrs({ className: 'diagnose-main-logo' })`
  height: 50px;
  transition: 0.2s;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const DiagnoseMainCard = ({ setCurrentStepNumber }) => (
  <DiagnoseMainCardWrapper>
    <DiagnoseMainLogo src={mainLogo} alt="mainLogo" />
    <CardWrapper>
      <RelativeWrapper>
        <StepWizard
          className="step-wizard"
          isHashEnabled
          nav={<MainCardFooter setCurrentStepNumber={setCurrentStepNumber} />}
        >
          <Introduction hashKey="Introduction" />
          <ChooseSex hashKey="choose-sex" />
          <ChooseAge hashKey="choose-age" />
          <QuickSurvey hashKey="quick-survey" />
          <Symptoms hashKey="symptoms" />
          <VisitedRegions hashKey="visited-regions" />
          <LastSurvey hashKey="last-survey" />
          <Results hashKey="results" />
        </StepWizard>
      </RelativeWrapper>
    </CardWrapper>
    <DiagnoseFooter />
  </DiagnoseMainCardWrapper>
);

DiagnoseMainCard.propTypes = {
  setCurrentStepNumber: PropTypes.func.isRequired,
};

export default DiagnoseMainCard;
