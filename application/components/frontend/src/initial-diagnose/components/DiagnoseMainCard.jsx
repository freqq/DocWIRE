/* eslint-disable prefer-template */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import MainCardFooter from 'initial-diagnose/components/MainCardFooter';
import DiagnoseFooter from 'initial-diagnose/components/DiagnoseFooter';

import { getCurrentYear, getCurrentMonth } from 'common/utils/date_utils';
import { createAppointment } from 'initial-diagnose/actions/diagnoseActions';

import Introduction from 'initial-diagnose/components/steps/Introduction';
import QuickSurvey from 'initial-diagnose/components/steps/QuickSurvey';
import Symptoms from 'initial-diagnose/components/steps/Symptoms';
import VisitedRegions from 'initial-diagnose/components/steps/VisitedRegions';
import LastSurvey from 'initial-diagnose/components/steps/LastSurvey';
import ChooseDoctor from 'initial-diagnose/components/steps/ChooseDoctor';
import PickAppointmentDate from 'initial-diagnose/components/steps/PickAppointmentDate';
import Sumup from 'initial-diagnose/components/steps/Sumup';
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

const DiagnoseMainCard = ({ setCurrentStepNumber, createAppointmentFunc }) => {
  const [chosenSymptoms, setChosenSymptoms] = useState([]);
  const [visitedRegions, setVisitedRegions] = useState([]);
  const [surveyObject, setSurveyObject] = useState([]);

  const [smokeCigarette, setSmokeCigarete] = useState(null);
  const [recentlyInjured, setRecentlyInjured] = useState(null);
  const [highCholesterol, setHighCholesterol] = useState(null);
  const [diabetes, setDiabetes] = useState(null);

  const [doctor, setDoctor] = useState(null);
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);

  const sendDiagnose = () => {
    const chosenDate = getCurrentYear() + '-' + getCurrentMonth() + '-' + pickedDate;
    const dateFormat = chosenDate + ' ' + pickedTime;
    const appointmentDate = moment(dateFormat);

    const diagnoseObject = {
      quickSurvey: {
        smokeCigarette,
        recentlyInjured,
        highCholesterol,
        diabetes,
      },
      chosenSymptoms,
      visitedRegions,
      lastSurvey: surveyObject,
      doctorId: doctor.userId,
      appointmentDate,
    };

    createAppointmentFunc(diagnoseObject);
  };

  const isQuickSurveyBlocked = () =>
    smokeCigarette === null ||
    recentlyInjured === null ||
    highCholesterol === null ||
    diabetes === null;

  const isSymptomsBlocked = () => chosenSymptoms.length === 0;

  const isRegionsBlocked = () => visitedRegions.length === 0;

  const isPickAppointmentsDateBlocked = () => pickedDate === null || pickedTime === null;

  const setSurveyObjectAndSend = surv => {
    setSurveyObject(surv);
  };

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
                isPickAppointmentsDateBlocked={isPickAppointmentsDateBlocked}
                sendDiagnose={sendDiagnose}
              />
            }
          >
            <Introduction hashKey="Introduction" />
            <QuickSurvey
              hashKey="quick-survey"
              smokeCigarete={smokeCigarette}
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
            <ChooseDoctor
              hashKey="choose-doctor"
              setDoctor={setDoctor}
              setCurrentStepNumber={setCurrentStepNumber}
            />
            <PickAppointmentDate
              hashKey="pick-date"
              pickedDate={pickedDate}
              setPickedDate={setPickedDate}
              pickedTime={pickedTime}
              setPickedTime={setPickedTime}
            />
            <Sumup hashKey="sum-up" />
          </StepWizard>
        </RelativeWrapper>
      </CardWrapper>
      <DiagnoseFooter />
    </DiagnoseMainCardWrapper>
  );
};

DiagnoseMainCard.propTypes = {
  setCurrentStepNumber: PropTypes.func.isRequired,
  createAppointmentFunc: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createAppointmentFunc: appointmentData => dispatch(createAppointment(appointmentData)),
});

export default connect(null, mapDispatchToProps)(DiagnoseMainCard);
