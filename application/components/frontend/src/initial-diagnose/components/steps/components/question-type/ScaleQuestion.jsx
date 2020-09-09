/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ScaleQuestionWrapper = styled.span.attrs({ className: 'scale-question-wrapper' })`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

const ScaleBoxesGrid = styled.span.attrs({ className: 'scale-boxes-grid' })`
  display: grid;
  grid-template-columns: repeat(${props => props.questionBody.scaleRange || 10}, 1fr);
`;

const Box = styled.span.attrs({ className: 'box' })`
  height: 50px;
  width: 100%;
`;

const ScaletQuestion = ({ questionBody, onChose }) => (
  <ScaleQuestionWrapper>
    <ScaleBoxesGrid>
      {[...Array(questionBody.scaleRange).keys()].forEach(box => (
        <Box onClick={onChose} />
      ))}
    </ScaleBoxesGrid>
  </ScaleQuestionWrapper>
);

ScaletQuestion.propTypes = {
  questionBody: PropTypes.instanceOf(Object).isRequired,
  onChose: PropTypes.func.isRequired,
};

export default ScaletQuestion;
