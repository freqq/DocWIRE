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

const QuickSurvey = ({
  currentStep,
  totalSteps,
  smokeCigarete,
  recentlyInjured,
  highCholesterol,
  diabetes,
  setSmokeCigarete,
  setRecentlyInjured,
  setHighCholesterol,
  setDiabetes,
}) => {
  const QUESTIONS = [
    {
      id: 1,
      question: 'I smoke cigarettes',
      value: smokeCigarete,
      setter: setSmokeCigarete,
    },
    {
      id: 2,
      question: 'I’ve been recently injured',
      value: recentlyInjured,
      setter: setRecentlyInjured,
    },
    {
      id: 3,
      question: 'I have high cholesterol',
      value: highCholesterol,
      setter: setHighCholesterol,
    },
    {
      id: 4,
      question: 'I have diabetes',
      value: diabetes,
      setter: setDiabetes,
    },
  ];

  return (
    <GenericStep stepName="Quick survey" currentStep={currentStep} totalSteps={totalSteps}>
      <ChooseDescription>Select one answer in each row</ChooseDescription>
      <AnswersWrapper>
        {QUESTIONS.map(question => (
          <AnswerRow
            key={question.id}
            question={question.question}
            value={question.value}
            setter={question.setter}
          />
        ))}
      </AnswersWrapper>
    </GenericStep>
  );
};

QuickSurvey.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

QuickSurvey.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  smokeCigarete: PropTypes.number.isRequired,
  recentlyInjured: PropTypes.number.isRequired,
  highCholesterol: PropTypes.number.isRequired,
  diabetes: PropTypes.number.isRequired,
  setSmokeCigarete: PropTypes.func.isRequired,
  setRecentlyInjured: PropTypes.func.isRequired,
  setHighCholesterol: PropTypes.func.isRequired,
  setDiabetes: PropTypes.func.isRequired,
};

export default QuickSurvey;
