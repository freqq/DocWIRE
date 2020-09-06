import React, { useState } from 'react';
import styled from 'styled-components';

import TextInput from 'common/components/text-input/TextInput';

const ProfileEditWrapper = styled.div.attrs({ className: 'profile-edit-wrapper' })`
  padding: 20px;
`;

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 10px;
`;

const TabTitle = styled.div.attrs({ className: 'tab-title' })`
  font-size: 16px;
  font-weight: 100;
  margin-bottom: 10px;
`;

const UpdateButton = styled.div.attrs({ className: 'update-button' })`
  width: 100%;
  padding: 16px 0;
  text-align: center;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #2d4564;
  color: #ffffff;
  font-weigh: 100;
  cursor: pointer;
  transition: 0.2s;
  margin: 10px auto 0 auto;
  font-size: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileEdit = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');

  return (
    <ProfileEditWrapper>
      <TabTitle>Set your profile details below</TabTitle>
      <TwoSideGrid>
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
      </TwoSideGrid>
      <TwoSideGrid>
        <TextInput
          value={phoneNumber}
          onChange={evt => setPhoneNumber(evt.target.value)}
          id="phoneNumber"
          type="text"
          label="Phone number"
        />
        <TextInput
          value={emailAddress}
          onChange={evt => setEmailAddress(evt.target.value)}
          id="emailAddress"
          type="text"
          label="E-mail address"
        />
      </TwoSideGrid>
      <TwoSideGrid>
        <TextInput
          value={city}
          onChange={evt => setCity(evt.target.value)}
          id="city"
          type="text"
          label="City"
        />
        <TextInput
          value={street}
          onChange={evt => setStreet(evt.target.value)}
          id="street"
          type="text"
          label="Street"
        />
      </TwoSideGrid>
      <TwoSideGrid>
        <TextInput
          value={postCode}
          onChange={evt => setPostCode(evt.target.value)}
          id="postCode"
          type="text"
          label="Post code"
        />
        <TextInput
          value={country}
          onChange={evt => setCountry(evt.target.value)}
          id="country"
          type="text"
          label="Country"
        />
      </TwoSideGrid>
      <UpdateButton>Update data</UpdateButton>
    </ProfileEditWrapper>
  );
};

export default ProfileEdit;
