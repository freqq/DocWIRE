/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InterviewQuestion from 'initial-diagnose/components/steps/components/InterviewQuestion';
import GenericStep from 'initial-diagnose/components/GenericStep';
import interviewQuestions from 'initial-diagnose/components/steps/utils/questions_list';

const CHOSEN_QUESTIONS = interviewQuestions;
const QUESTIONS_NUMBER = 4;

const LastSurvey = ({
  currentStep,
  totalSteps,
  nextStep,
  setSurveyObject,
  setCurrentStepNumber,
}) => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [firstAnswer, setFirstAnswer] = useState(null);
  const [secondAnswer, setSecondAnswer] = useState(null);
  const [thirdAnswer, setThirdAnswer] = useState(null);
  const [fourthAnswer, setFourthAnswer] = useState(null);

  const constructSurveyObject = () => [
    {
      question: CHOSEN_QUESTIONS[0].question,
      answer: firstAnswer,
    },
    {
      question: CHOSEN_QUESTIONS[1].question,
      answer: secondAnswer,
    },
    {
      question: CHOSEN_QUESTIONS[2].question,
      answer: thirdAnswer,
    },
    {
      question: CHOSEN_QUESTIONS[3].question,
      answer: fourthAnswer,
    },
  ];

  const answerFirst = answer => {
    setFirstAnswer(answer);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const answerSecond = answer => {
    setSecondAnswer(answer);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const answerThird = answer => {
    setThirdAnswer(answer);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const answerFourth = answer => {
    setFourthAnswer(answer);
    setSurveyObject(constructSurveyObject());
    setCurrentStepNumber(currentStep + 1);
    nextStep();
  };

  const valuesArray = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
  const settersArray = [answerFirst, answerSecond, answerThird, answerFourth];

  return (
    <GenericStep stepName="Interview" currentStep={currentStep} totalSteps={totalSteps}>
      <InterviewQuestion
        question={CHOSEN_QUESTIONS[currentQuestionNumber].question}
        questionBody={CHOSEN_QUESTIONS[currentQuestionNumber].questionBody}
        type={CHOSEN_QUESTIONS[currentQuestionNumber].type}
        value={valuesArray[currentQuestionNumber]}
        setter={settersArray[currentQuestionNumber]}
      />
    </GenericStep>
  );
};

LastSurvey.defaultProps = {
  currentStep: null,
  totalSteps: null,
  nextStep: null,
};

LastSurvey.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  nextStep: PropTypes.func,
  setSurveyObject: PropTypes.func.isRequired,
  setCurrentStepNumber: PropTypes.func.isRequired,
};

export default LastSurvey;
