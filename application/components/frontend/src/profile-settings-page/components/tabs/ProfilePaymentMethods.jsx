import React, { useState } from 'react';
import styled from 'styled-components';
import Cards from 'react-credit-cards';

import TextInput from 'common/components/text-input/TextInput';

const ProfilePaymentMethodsWrapper = styled.div.attrs({
  className: 'profile-payment-methods-wrapper',
})`
  padding: 20px;
`;

const PaymentGrid = styled.div.attrs({ className: 'input-elements' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const InputElements = styled.div.attrs({ className: 'input-elements' })``;

const TabTitle = styled.div.attrs({ className: 'tab-title' })`
  font-size: 16px;
  font-weight: 100;
  margin-bottom: 10px;
`;

const UpdateButton = styled.div.attrs({ className: 'update-button' })`
  width: 95%;
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
  float: right;
  font-size: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfilePaymentMethods = () => {
  const [cvc, setCvc] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');

  return (
    <ProfilePaymentMethodsWrapper>
      <TabTitle>Credit card details</TabTitle>
      <PaymentGrid>
        <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
        <InputElements>
          <TextInput
            value={number}
            onChange={evt => setNumber(evt.target.value)}
            onFocus={evt => setFocus(evt.target.id)}
            id="number"
            type="number"
            label="Card number"
          />
          <TextInput
            value={name}
            onChange={evt => setName(evt.target.value)}
            onFocus={evt => setFocus(evt.target.id)}
            id="name"
            type="text"
            label="Name"
          />
          <TextInput
            value={expiry}
            onChange={evt => setExpiry(evt.target.value)}
            onFocus={evt => setFocus(evt.target.id)}
            id="expiry"
            type="text"
            label="Valid date"
          />
          <TextInput
            value={cvc}
            onChange={evt => setCvc(evt.target.value)}
            onFocus={evt => setFocus(evt.target.id)}
            id="cvc"
            type="text"
            label="CVC"
            maxLength={3}
          />
        </InputElements>
      </PaymentGrid>
      <UpdateButton>Update data</UpdateButton>
    </ProfilePaymentMethodsWrapper>
  );
};

export default ProfilePaymentMethods;
