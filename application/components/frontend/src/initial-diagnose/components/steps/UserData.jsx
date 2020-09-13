import React from 'react';
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

const CreateAccountButton = styled.button.attrs({ className: 'create-account-button' })`
  width: 100%;
  margin: 15px auto 0 auto;
  font-size: 11px;
  border-radius: 4px;
  display: block;
  cursor: pointer;
  outline: none;
  background: #2d4564;
  padding: 10px;
  color: #fff;
  text-align: center;
  font-weight: 100;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

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
  availableGenders,
  accountCreation,
  nextStep,
  isAccountCreationBlocked,
}) => {
  const registerAccount = () => {
    const registerObject = {
      firstName,
      lastName,
      birthday,
      gender,
      langKey: 'en',
    };

    accountCreation(registerObject, nextStep);
  };

  return (
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
          options={availableGenders}
        />
        <DatePickerField value={birthday} onChange={setBirthday} label="Birthday" />
        <CreateAccountButton onClick={registerAccount} disabled={isAccountCreationBlocked()}>
          Save user data
        </CreateAccountButton>
      </UserDataWrapper>
    </GenericStep>
  );
};

UserData.defaultProps = {
  currentStep: null,
  totalSteps: null,
  nextStep: null,
};

UserData.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  nextStep: PropTypes.func,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  accountCreation: PropTypes.func.isRequired,
  isAccountCreationBlocked: PropTypes.func.isRequired,
  setGender: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  availableGenders: PropTypes.instanceOf(Array).isRequired,
};

export default UserData;
