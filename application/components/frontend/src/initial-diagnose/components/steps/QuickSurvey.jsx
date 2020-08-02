import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GenericStep from 'initial-diagnose/components/GenericStep';
import AnswerRow from 'initial-diagnose/components/steps/components/AnswerRow';

const ChooseDescription = styled.p.attrs({ className: 'choose-description' })`
  text-align: center;
  font-size: 15px;
  margin-bottom: 40px;
  font-weight: 100;
  margin: 0;
`;

const AnswersWrapper = styled.div.attrs({ className: 'answers-wrapper' })`
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
`;

const QUESTIONS = [
  {
    id: 1,
    question: 'I smoke cigarettes',
  },
  {
    id: 2,
    question: 'I’ve been recently injured',
  },
  {
    id: 3,
    question: 'I have high cholesterol',
  },
  {
    id: 4,
    question: 'I have diabetes',
  },
];

const QuickSurvey = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Quick survey" currentStep={currentStep} totalSteps={totalSteps}>
    <ChooseDescription>Select one answer in each row</ChooseDescription>
    <AnswersWrapper>
      {QUESTIONS.map(question => (
        <AnswerRow key={question.id} question={question.question} />
      ))}
    </AnswersWrapper>
  </GenericStep>
);

QuickSurvey.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

QuickSurvey.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};

export default QuickSurvey;
