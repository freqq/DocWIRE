/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

import styled from 'styled-components';

const PasswordStrengthWrapper = styled.div.attrs({ className: 'password-strength-wrapper' })`
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
`;

const PaswordStrengthDesc = styled.p.attrs({ className: 'password-strength-desc' })`
  font-size: 10px;
  text-align: center;
  font-weight: 100;
  padding: 10px 0;
`;

const PasswordStrengthBarsGrid = styled.div.attrs({ className: 'password-strength-bars-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
`;

const PasswordStrengthBarItem = styled.div.attrs({ className: 'password-strength-bar-item' })`
  height: 6px;
  background: #f0f0f0;
  width: 100%;
`;

const MIN_STRENGTH = 3;
const THRESHOLD_LENGTH = 7;

const PaswordStrength = ({ password }) => {
  const [strength, setStrength] = useState(zxcvbn(password).score);

  return (
    <PasswordStrengthWrapper>
      <PaswordStrengthDesc>
        To conform with our Strong Password policy, you are required to use a sufficiently strong
        password. Password must be more than 7 characters.
      </PaswordStrengthDesc>
      <PasswordStrengthBarsGrid>
        {[...Array(5)].map((_, index) => (
          <PasswordStrengthBarItem
            style={
              zxcvbn(password).score >= index + 1
                ? zxcvbn(password).score >= MIN_STRENGTH
                  ? { background: '#3CB371' }
                  : { background: 'red' }
                : {}
            }
          />
        ))}
      </PasswordStrengthBarsGrid>
    </PasswordStrengthWrapper>
  );
};

PaswordStrength.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PaswordStrength;
