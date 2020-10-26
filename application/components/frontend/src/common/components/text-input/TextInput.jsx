import React, { useState } from 'react';
import PropTypes from 'prop-types';

import showPasswordIcon from 'images/icons/eye.svg';
import hidePasswordIcon from 'images/icons/hide.svg';

import 'common/components/text-input/TextInput.css';

const EMPTY_PLACEHOLDER = ' ';

const TextInput = ({
  id,
  type,
  label,
  disabled,
  isError,
  value,
  onChange,
  errorText,
  onFocus,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const switchShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <div style={isError ? { display: 'block' } : { visibility: 'hidden' }} className="error-box">
        {errorText}
      </div>

      <div className={`textfield-outlined ${isError ? 'textfield-outlined--error' : ''}`}>
        <input
          onChange={onChange}
          id={id}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={EMPTY_PLACEHOLDER}
          disabled={disabled}
          value={value}
          onFocus={onFocus}
          maxLength={maxLength}
        />
        <label htmlFor={id}>{label}</label>
        {type === 'password' && (
          <img
            onClick={switchShowPassword}
            className="show-password-icon"
            src={showPassword ? hidePasswordIcon : showPasswordIcon}
            alt="showPasswordIcon"
          />
        )}
      </div>
    </div>
  );
};

TextInput.defaultProps = {
  disabled: false,
  isError: false,
  errorText: '',
  onFocus: null,
  maxLength: null,
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  maxLength: PropTypes.number,
};

export default TextInput;
