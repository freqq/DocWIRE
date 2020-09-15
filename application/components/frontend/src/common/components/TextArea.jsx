import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextAreaWrapper = styled.div.attrs({ className: 'text-area-wrapper' })``;

const TextAreaComponent = styled.textarea.attrs({ className: 'text-area-component' })`
  width: calc(100% - 25px);
  border: 1px solid #92969a;
  resize: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 100;
  outline: none;
  margin-bottom: 10px;
  min-height: 50px;
  padding: 10px;
`;

const Label = styled.span.attrs({ className: 'label' })`
  font-size: 12px;
`;

const TextArea = ({ value, onChange, label }) => (
  <TextAreaWrapper>
    <Label>{label}</Label>
    <TextAreaComponent onChange={onChange} value={value} />
  </TextAreaWrapper>
);

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
