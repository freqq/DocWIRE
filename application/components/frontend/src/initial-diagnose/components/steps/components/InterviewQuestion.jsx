import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MultiSelectQuestion from 'initial-diagnose/components/steps/components/question-type/MultiSelectQuestion';
import SingleSelectQuestion from 'initial-diagnose/components/steps/components/question-type/SingleSelectQuestion';
import ScaleQuestion from 'initial-diagnose/components/steps/components/question-type/ScaleQuestion';
import questionTypes from 'initial-diagnose/components/steps/components/question-type/QuestionTypes';

const InterviewQuestionWrapper = styled.span.attrs({ className: 'interview-question-wrapper' })`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

const Question = styled.span.attrs({ className: 'question' })`
  font-weight: 400;
  font-size: 16px;
`;

const QuestionBody = styled.span.attrs({ className: 'question-body' })`
  font-weight: 100;
  font-size: 12px;
`;

const WrongQuestionBody = styled.span.attrs({ className: 'wrong-question-body' })`
  font-weight: 100;
  font-size: 12px;
  color: red;
`;

const InterviewQuestion = ({ question, questionBody, type }) => {
  const renderQuestionBody = () => {
    switch (type) {
      case questionTypes.SINGLE_SELECT_QUESTON:
        return <SingleSelectQuestion questionBody={questionBody} />;
      case questionTypes.MULTI_SELECT_QUESTION:
        return <MultiSelectQuestion questionBody={questionBody} />;
      case questionTypes.SCALE_QUESTION:
        return <ScaleQuestion questionBody={questionBody} />;
      default:
        return (
          <WrongQuestionBody>There was an error while rendering this question.</WrongQuestionBody>
        );
    }
  };

  return (
    <InterviewQuestionWrapper>
      <Question>{question}</Question>
      <QuestionBody>{renderQuestionBody()}</QuestionBody>
    </InterviewQuestionWrapper>
  );
};

InterviewQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  questionBody: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.number.isRequired,
};

export default InterviewQuestion;
