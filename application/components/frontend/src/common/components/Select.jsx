/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectWrapper = styled.div.attrs({ className: 'select-wrapper' })``;

const OptionWrapper = styled.div.attrs({ className: 'option-wrapper' })`
  display: inline-block;
  margin-left: 20px;
`;

const Select = ({ onChange, value, options }) => (
  <SelectWrapper>
    {options.map(option => (
      <OptionWrapper key={value}>
        <label htmlFor={option.id} onClick={onChange}>
          <input type="radio" value="option3" id={option.id} checked={value === option.name} />
          {option.name}
        </label>
      </OptionWrapper>
    ))}
  </SelectWrapper>
);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
};

export default Select;
