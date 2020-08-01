import React from 'react';
import PropTypes from 'prop-types';

import 'common/components/text-input/TextInput.css';

const EMPTY_PLACEHOLDER = ' ';

const TextInput = ({ id, type, label, disabled, isError }) => (
  <div className={`textfield-outlined ${isError ? 'textfield-outlined--error' : ''}`}>
    <input id={id} type={type} placeholder={EMPTY_PLACEHOLDER} disabled={disabled} />
    <label htmlFor={id}>{label}</label>
  </div>
);

TextInput.defaultProps = {
  disabled: false,
  isError: false,
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
