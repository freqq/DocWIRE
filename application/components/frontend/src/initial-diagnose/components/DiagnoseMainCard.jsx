/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createAccount } from 'common/actions/accountActions';
import availableGenders from 'initial-diagnose/utils/genders';

import MainCardFooter from 'initial-diagnose/components/MainCardFooter';
import DiagnoseFooter from 'initial-diagnose/components/DiagnoseFooter';

import Introduction from 'initial-diagnose/components/steps/Introduction';
import UserData from 'initial-diagnose/components/steps/UserData';
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

const DiagnoseMainCard = ({ setCurrentStepNumber, accountCreation }) => {
  const [chosenSymptoms, setChosenSymptoms] = useState([]);
  const [visitedRegions, setVisitedRegions] = useState([]);
  const [surveyObject, setSurveyObject] = useState([]);

  const [smokeCigarete, setSmokeCigarete] = useState(null);
  const [recentlyInjured, setRecentlyInjured] = useState(null);
  const [highCholesterol, setHighCholesterol] = useState(null);
  const [diabetes, setDiabetes] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState(availableGenders[0].value);

  const sendDiagnose = () => {
    const diagnoseObject = {
      quickSurvey: {
        smokeCigarete,
        recentlyInjured,
        highCholesterol,
        diabetes,
      },
      chosenSymptoms,
      visitedRegions,
      surveyObject,
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

  const setSurveyObjectAndSend = surv => {
    setSurveyObject(surv);
    sendDiagnose();
  };

  const isAccountCreationBlocked = () =>
    gender.length === 0 || firstName.length === 0 || lastName.length === 0 || birthday.length === 0;

  const getNamesFromVisitedRegionsAndSave = regions => {
    const arrayOfRegionsNames = regions.map(a => a.ariaLabel);
    setVisitedRegions(arrayOfRegionsNames);
  };

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
            <UserData
              hashKey="user-data"
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              gender={gender}
              setGender={setGender}
              birthday={birthday}
              setBirthday={setBirthday}
              availableGenders={availableGenders}
              accountCreation={accountCreation}
              isAccountCreationBlocked={isAccountCreationBlocked}
            />
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
            <VisitedRegions
              hashKey="visited-regions"
              setVisitedRegions={getNamesFromVisitedRegionsAndSave}
            />
            <LastSurvey
              hashKey="last-survey"
              sendDiagnose={sendDiagnose}
              setSurveyObject={setSurveyObjectAndSend}
              setCurrentStepNumber={setCurrentStepNumber}
            />
            <Results hashKey="results" />
          </StepWizard>
        </RelativeWrapper>
      </CardWrapper>
      <DiagnoseFooter />
    </DiagnoseMainCardWrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  accountCreation: (accountData, nextStep) => dispatch(createAccount(accountData, nextStep)),
});

DiagnoseMainCard.propTypes = {
  setCurrentStepNumber: PropTypes.func.isRequired,
  accountCreation: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DiagnoseMainCard);
