import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import accountTypes from 'create-account-page/utils/account_types';

const AccountTypeWrapper = styled.div.attrs({ className: 'account-type-page-wrapper' })`
  margin-top: 200px;
`;

const Title = styled.div.attrs({ className: 'title' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 20px;
  margin-bottom: 20px;
`;

const AccountTypesWrapper = styled.ul.attrs({ className: 'account-types-wrapper' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  width: 50%;
  margin: 0 auto;
`;

const AccountIcon = styled.img.attrs({ className: 'account-icon' })`
  display: block;
  margin: 0 auto 10px auto;
  width: 90px;
`;

const AccountName = styled.div.attrs({ className: 'account-name' })`
  text-align: center;
  margin: 0 auto;
`;

const AccountTypeItem = styled.div.attrs({ className: 'account-types-item' })`
  border-radius: 5px;
  transition: 0.2s;
  border: 1px solid #f0f0f0;
  font-weight: 100;
  cursor: pointer;
  text-align: center;
  padding: 40px;
  background: #fafafa;

  &:hover {
    opacity: 0.5;
  }
`;

const AccountType = ({ setAccountType, nextStep, currentStep, setCurrentStep }) => {
  const goForward = value => {
    setCurrentStep(currentStep + 1);
    setAccountType(value);
    nextStep();
  };

  return (
    <AccountTypeWrapper>
      <Title>Select your account type</Title>
      <AccountTypesWrapper>
        {accountTypes.map(type => (
          <AccountTypeItem id={type.id} onClick={() => goForward(type.value)}>
            <AccountIcon src={type.icon} alt="icon" />
            <AccountName>{type.name}</AccountName>
          </AccountTypeItem>
        ))}
      </AccountTypesWrapper>
    </AccountTypeWrapper>
  );
};

AccountType.defaultProps = {
  nextStep: null,
};

AccountType.propTypes = {
  setAccountType: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func,
};

export default AccountType;
