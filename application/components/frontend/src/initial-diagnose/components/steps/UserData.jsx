/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TextInput from 'common/components/text-input/TextInput';
import SelectComponent from 'common/components/SelectComponent';
import DatePickerField from 'common/components/DatePickerField';

import GenericStep from 'initial-diagnose/components/GenericStep';

const UserDataWrapper = styled.div.attrs({ className: 'user-data-wrapper' })`
  width: 70%;
  margin: 0 auto;
`;

const AVAILABLE_GENDER = [
  {
    name: 'Male',
    value: 'MALE',
  },
  {
    name: 'Female',
    value: 'FEMALE',
  },
  {
    name: 'Other',
    value: 'OTHER',
  },
];

const UserData = ({
  currentStep,
  totalSteps,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthday,
  setBirthday,
  gender,
  setGender,
}) => (
  <GenericStep stepName="User data" currentStep={currentStep} totalSteps={totalSteps}>
    <UserDataWrapper>
      <TextInput
        value={firstName}
        onChange={evt => setFirstName(evt.target.value)}
        id="firstName"
        type="text"
        label="First name"
      />
      <TextInput
        value={lastName}
        onChange={evt => setLastName(evt.target.value)}
        id="lastName"
        type="text"
        label="Last name"
      />
      <SelectComponent
        value={gender}
        onChange={evt => setGender(evt.target.value)}
        label="Gender"
        options={AVAILABLE_GENDER}
      />
      <DatePickerField value={birthday} onChange={setBirthday} label="Birthday" />
    </UserDataWrapper>
  </GenericStep>
);

UserData.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

UserData.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setGender: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
};

export default UserData;
