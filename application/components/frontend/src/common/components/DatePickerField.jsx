/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import { subDays } from 'date-fns';
import en from 'date-fns/locale/en-US';

registerLocale('en-US', en);

const DatePickerFieldWrapper = styled.div.attrs({
  className: 'date-picker-field-wrapper-wrapper',
})`
  margin-top: 10px;
`;

const Label = styled.p.attrs({ className: 'label' })`
  margin: 0 0 5px 0;
`;

const DatePickerField = ({ value, onChange, label }) => (
  <DatePickerFieldWrapper>
    <Label>{label}</Label>
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(val);
      }}
      className="date-picker-component"
      dateFormat="dd.MM.yyyy"
      placeholderText="Birthday"
      maxDate={subDays(new Date(), 1)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      locale="en"
    />
  </DatePickerFieldWrapper>
);

DatePickerField.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerField;
