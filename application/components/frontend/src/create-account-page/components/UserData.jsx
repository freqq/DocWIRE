import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from 'common/components/text-input/TextInput';
import SelectComponent from 'common/components/SelectComponent';
import DatePickerField from 'common/components/DatePickerField';

const UserDataWrapper = styled.div.attrs({ className: 'user-data-wrapper' })`
  width: 70%;
  margin: 0 auto;
  font-size: 12px;
  margin-top: 180px;
`;

const Title = styled.div.attrs({ className: 'title' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 20px;
  margin-bottom: 20px;
`;

const CreateAccountButton = styled.button.attrs({ className: 'create-account-button' })`
  width: 100%;
  margin: 15px auto 0 auto;
  font-size: 11px;
  border-radius: 4px;
  display: block;
  cursor: pointer;
  outline: none;
  border: none;
  background: #2d4564;
  padding: 15px;
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
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthday,
  setBirthday,
  gender,
  setGender,
  availableGenders,
  nextStep,
  isAccountCreationBlocked,
  currentStep,
  setCurrentStep,
}) => {
  const registerAccount = () => {
    setCurrentStep(currentStep + 1);
    nextStep();
  };

  return (
    <UserDataWrapper>
      <Title>Provide us with a basic info about you</Title>
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
        Continue
      </CreateAccountButton>
    </UserDataWrapper>
  );
};

UserData.defaultProps = {
  nextStep: null,
};

UserData.propTypes = {
  nextStep: PropTypes.func,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  isAccountCreationBlocked: PropTypes.func.isRequired,
  setGender: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  availableGenders: PropTypes.instanceOf(Array).isRequired,
};

export default UserData;
