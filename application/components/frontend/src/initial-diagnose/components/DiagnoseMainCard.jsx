/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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

const DiagnoseMainCard = ({ setCurrentStepNumber }) => {
  const [chosenSex, setChosenSex] = useState('');
  const [chosenAge, setChosenAge] = useState(70);
  const [chosenSymptoms, setChosenSymptoms] = useState([]);
  const [visitedRegions, setVisitedRegions] = useState([]);

  const [smokeCigarete, setSmokeCigarete] = useState(null);
  const [recentlyInjured, setRecentlyInjured] = useState(null);
  const [highCholesterol, setHighCholesterol] = useState(null);
  const [diabetes, setDiabetes] = useState(null);

  const sendDiagnose = () => {
    const diagnoseObject = {
      chosenSex,
      chosenAge,
      quickSurvey: {
        smokeCigarete,
        recentlyInjured,
        highCholesterol,
        diabetes,
      },
      chosenSymptoms,
      visitedRegions,
    };

    console.log(diagnoseObject);
  };

  const isQuickSurveyBlocked = () =>
    smokeCigarete === null ||
    recentlyInjured === null ||
    highCholesterol === null ||
    diabetes === null;

  const isSymptomsBlocked = () => chosenSymptoms.length === 0;

  const isRegionsBlocked = () => visitedRegions.length === 0;

  return (
    <DiagnoseMainCardWrapper>
      <DiagnoseMainLogo src={mainLogo} alt="mainLogo" />
      <CardWrapper>
        <RelativeWrapper>
          <StepWizard
            className="step-wizard"
            isHashEnabled
            nav={
              <MainCardFooter
                setCurrentStepNumber={setCurrentStepNumber}
                isQuickSurveyBlocked={isQuickSurveyBlocked}
                isSymptomsBlocked={isSymptomsBlocked}
                isRegionsBlocked={isRegionsBlocked}
              />
            }
          >
            <Introduction hashKey="Introduction" />
            <ChooseSex
              hashKey="choose-sex"
              setCurrentStepNumber={setCurrentStepNumber}
              chosenSex={chosenSex}
              setChosenSex={setChosenSex}
            />
            <ChooseAge hashKey="choose-age" setChosenAge={setChosenAge} chosenAge={chosenAge} />
            <QuickSurvey
              hashKey="quick-survey"
              smokeCigarete={smokeCigarete}
              recentlyInjured={recentlyInjured}
              highCholesterol={highCholesterol}
              diabetes={diabetes}
              setSmokeCigarete={setSmokeCigarete}
              setRecentlyInjured={setRecentlyInjured}
              setHighCholesterol={setHighCholesterol}
              setDiabetes={setDiabetes}
            />
            <Symptoms
              hashKey="symptoms"
              chosenSymptoms={chosenSymptoms}
              setChosenSymptoms={setChosenSymptoms}
            />
            <VisitedRegions hashKey="visited-regions" setVisitedRegions={setVisitedRegions} />
            <LastSurvey hashKey="last-survey" sendDiagnose={sendDiagnose} />
            <Results hashKey="results" />
          </StepWizard>
        </RelativeWrapper>
      </CardWrapper>
      <DiagnoseFooter />
    </DiagnoseMainCardWrapper>
  );
};

DiagnoseMainCard.propTypes = {
  setCurrentStepNumber: PropTypes.func.isRequired,
};

export default DiagnoseMainCard;
