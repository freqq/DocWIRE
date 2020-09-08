import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MultiSelectQuestionWrapper = styled.span.attrs({
  className: 'multi-select-question-wrapper',
})`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

const MultiSelectQuestion = ({ questionBody }) => (
  <MultiSelectQuestionWrapper>123</MultiSelectQuestionWrapper>
);

MultiSelectQuestion.propTypes = {
  questionBody: PropTypes.instanceOf(Object).isRequired,
};

export default MultiSelectQuestion;
