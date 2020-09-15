/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StepWizard from 'react-step-wizard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mainLogo from 'images/main_only_logo.svg';

import { createAccount } from 'common/actions/accountActions';
import { APP_TITLE } from 'common/constants';

import availableGenders from 'initial-diagnose/utils/genders';
import AccountType from 'create-account-page/components/AccountType';
import UserData from 'create-account-page/components/UserData';
import DoctorDetails from 'create-account-page/components/DoctorDetails';
import PatientDetails from 'create-account-page/components/PatientDetails';
import Summary from 'create-account-page/components/Summary';

const CreateAccountPageWrapper = styled.div.attrs({ className: 'create-account-page-wrapper' })`
  width: calc(100vw - 280px);
  height: calc(100vh - 160px);
  overflow: hidden;
  padding: 80px 140px;
  background: #2d4564;
`;

const MainText = styled.div.attrs({ className: 'main-text' })`
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  font-size: 14px;
  font-weight: 100;
`;

const BottomText = styled.div.attrs({ className: 'bottom-text' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 12px;
  margin-top: 20px;
  color: #fff;
`;

const CreateGrid = styled.div.attrs({ className: 'create-grid' })`
  height: 100%;
  width: 100%;
  position: relative;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  border-top: none;
`;

const MainLogo = styled.img.attrs({ className: 'main-logo' })`
  width: 155px;
  position: absolute;
  top: -3%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
`;

const StepCounter = styled.div.attrs({ className: 'main-logo' })`
  width: 100%;
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
  font-size: 14px;
  text-align: center;
  font-weight: 100;
`;

const NoMargin = styled.p.attrs({ className: 'no-margin' })`
  margin: 0 0 4px 0;
`;

const STEPS_COUNT = 4;

const CreateAccountPage = ({ accountCreation }) => {
  useEffect(() => {
    document.title = `Account details - ${APP_TITLE}`;
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState(availableGenders[0].value);

  const [cvc, setCvc] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [title, setTitle] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [price, setPrice] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const isAccountCreationBlocked = () =>
    gender.length === 0 || firstName.length === 0 || lastName.length === 0 || birthday.length === 0;

  const isPatientDetailsBlocked = () =>
    weight.length === 0 ||
    height.length === 0 ||
    address.length === 0 ||
    zipCode.length === 0 ||
    city.length === 0 ||
    country.length === 0 ||
    cvc.length === 0 ||
    number.length === 0 ||
    name.length === 0 ||
    expiry.length === 0;

  const isDoctorDetailsBlocked = () =>
    title.length === 0 || price.length === 0 || specialization.length === 0 || aboutMe.length === 0;

  const registerPatient = () => {
    const registerObject = {
      accountType,
      firstName,
      lastName,
      birthday,
      gender,
      langKey: 'en',
      patientInfo: {
        creditCard: {
          cvc,
          number,
          name,
          expiry,
        },
        weight,
        height,
        address,
        zipCode,
        city,
        country,
      },
    };

    console.log(registerObject);
    accountCreation(registerObject);
  };

  const registerDoctor = () => {
    const registerObject = {
      accountType,
      firstName,
      lastName,
      birthday,
      gender,
      langKey: 'en',
      doctorInfo: {
        title,
        specialization,
        price,
        aboutMe,
      },
    };

    console.log(registerObject);
    accountCreation(registerObject);
  };

  return (
    <CreateAccountPageWrapper>
      <CreateGrid>
        <MainLogo src={mainLogo} alt="mainLogo" />
        <MainText>DocWIRE - Your Online Doctor</MainText>
        <StepWizard className="step-wizard" isHashEnabled>
          <AccountType
            hashKey="account-type"
            setAccountType={setAccountType}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <UserData
            hashKey="user-data"
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            gender={gender}
            setGender={setGender}
            birthday={birthday}
            setBirthday={setBirthday}
            availableGenders={availableGenders}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isAccountCreationBlocked={isAccountCreationBlocked}
          />
          {accountType === 'DOCTOR' ? (
            <DoctorDetails
              hashKey="doctor-details"
              registerMethod={registerDoctor}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isBlocked={isDoctorDetailsBlocked}
              price={price}
              title={title}
              specialization={specialization}
              setPrice={setPrice}
              setTitle={setTitle}
              setSpecialization={setSpecialization}
              aboutMe={aboutMe}
              setAboutMe={setAboutMe}
            />
          ) : (
            <PatientDetails
              hashKey="patient-details"
              registerMethod={registerPatient}
              cvc={cvc}
              setCvc={setCvc}
              number={number}
              setNumber={setNumber}
              expiry={expiry}
              setExpiry={setExpiry}
              focus={focus}
              setFocus={setFocus}
              name={name}
              setName={setName}
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              address={address}
              setAddress={setAddress}
              zipCode={zipCode}
              setZipCode={setZipCode}
              city={city}
              setCity={setCity}
              country={country}
              setCountry={setCountry}
              isBlocked={isPatientDetailsBlocked}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          <Summary accountType={accountType} hashKey="summary" />
        </StepWizard>
        <StepCounter>
          <NoMargin>Initial account settings</NoMargin>
          <>{`STEP ${currentStep}/${STEPS_COUNT}`}</>
        </StepCounter>
      </CreateGrid>
      <BottomText>2020 &copy; DOCWIRE.com</BottomText>
    </CreateAccountPageWrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  accountCreation: (accountData, nextStep) => dispatch(createAccount(accountData, nextStep)),
});

CreateAccountPage.propTypes = {
  accountCreation: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CreateAccountPage);
