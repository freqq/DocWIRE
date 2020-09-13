import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectComponentWrapper = styled.div.attrs({ className: 'select-component-wrapper' })``;

const Select = styled.select.attrs({ className: 'select' })`
  outline: none;
  width: 100%;
  padding: 9px;
  border-color: #92969a;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
`;

const Option = styled.option.attrs({ className: 'option' })``;

const Label = styled.p.attrs({ className: 'label' })`
  margin: 0 0 5px 0;
`;

const SelectComponent = ({ value, onChange, label, options }) => (
  <SelectComponentWrapper>
    <Label>{label}</Label>
    <Select onChange={onChange}>
      {options.map(option => (
        <Option value={option.value} selected={option.value === value}>
          {option.name}
        </Option>
      ))}
    </Select>
  </SelectComponentWrapper>
);

SelectComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
};

export default SelectComponent;
