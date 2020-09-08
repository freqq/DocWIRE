import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SingleSelectQuestionWrapper = styled.span.attrs({
  className: 'single-select-question-wrapper',
})`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

const SingleSelectQuestion = ({ questionBody }) => (
  <SingleSelectQuestionWrapper>123</SingleSelectQuestionWrapper>
);

SingleSelectQuestion.propTypes = {
  questionBody: PropTypes.instanceOf(Object).isRequired,
};

export default SingleSelectQuestion;
