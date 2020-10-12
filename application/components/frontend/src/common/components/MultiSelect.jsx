/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MultiSelectWrapper = styled.div.attrs({ className: 'multi-select-wrapper' })``;

const OptionWrapper = styled.div.attrs({ className: 'option-wrapper' })`
  display: block;
  margin-top: 25px;
  font-size: 14px;
  cursor: pointer;
`;

const MultiSelect = ({ onChange, value, options, question }) => (
  <MultiSelectWrapper>
    {options.map(option => (
      <OptionWrapper key={option}>
        <label htmlFor={option.question} onClick={evt => onChange(evt.target.id)}>
          <input
            type="checkbox"
            question={question}
            id={option.id}
            checked={parseInt(value, 10) === option.id}
          />
          {option.name}
        </label>
      </OptionWrapper>
    ))}
  </MultiSelectWrapper>
);

MultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
};

export default MultiSelect;
