import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ScaleQuestionWrapper = styled.span.attrs({
  className: 'scale-question-wrapper',
})`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

const ScaletQuestion = ({ questionBody }) => <ScaleQuestionWrapper>123</ScaleQuestionWrapper>;

ScaletQuestion.propTypes = {
  questionBody: PropTypes.instanceOf(Object).isRequired,
};

export default ScaletQuestion;
