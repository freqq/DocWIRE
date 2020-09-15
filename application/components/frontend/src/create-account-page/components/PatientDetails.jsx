/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cards from 'react-credit-cards';

import TextInput from 'common/components/text-input/TextInput';

const PatientDetailsWrapper = styled.div.attrs({ className: 'patient-details-wrapper' })`
  margin-top: 180px;
`;

const Title = styled.div.attrs({ className: 'title' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 20px;
  margin-bottom: 20px;
`;

const PatientGrid = styled.div.attrs({ className: 'patient-grid' })`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr) 20%;
`;

const Card = styled.div.attrs({ className: 'card' })`
  width: 80%;
  margin: 0 auto;
`;

const Details = styled.div.attrs({ className: 'details' })`
  width: 80%;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div.attrs({ className: 'button-wrapper' })`
  width: 100%;
  heigh: 100%;
  position: relative;
`;

const ContinueButton = styled.button.attrs({ className: 'continue-button' })`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  padding: 30px;
  border-radius: 4px;
  border: none;
  outline: none;
  background: #2d4564;
  font-size: 12px;
  font-weigh: 100;
  color: #fff;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const InputElements = styled.div.attrs({ className: 'input-elements' })``;

const PatientDetails = ({
  cvc,
  setCvc,
  focus,
  setFocus,
  name,
  setName,
  number,
  setNumber,
  expiry,
  setExpiry,
  weight,
  setWeight,
  height,
  setHeight,
  address,
  setAddress,
  zipCode,
  setZipCode,
  city,
  setCity,
  country,
  setCountry,
  nextStep,
  isBlocked,
  currentStep,
  registerMethod,
  setCurrentStep,
}) => {
  const goForward = () => {
    setCurrentStep(currentStep + 1);
    registerMethod();
    nextStep();
  };

  return (
    <PatientDetailsWrapper>
      <Title>Provide us with more details about you</Title>
      <PatientGrid>
        <Card>
          <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
          <InputElements>
            <TwoSideGrid>
              <TextInput
                value={number}
                onChange={evt => setNumber(evt.target.value)}
                onFocus={evt => setFocus(evt.target.id)}
                id="number"
                type="number"
                label="Card number"
                maxLength={16}
              />
              <TextInput
                value={name}
                onChange={evt => setName(evt.target.value)}
                onFocus={evt => setFocus(evt.target.id)}
                id="name"
                type="text"
                label="Name"
              />
            </TwoSideGrid>
            <TwoSideGrid>
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
            </TwoSideGrid>
          </InputElements>
        </Card>
        <Details>
          <TextInput
            value={weight}
            onChange={evt => setWeight(evt.target.value)}
            id="weight"
            type="text"
            label="Weight"
          />
          <TextInput
            value={height}
            onChange={evt => setHeight(evt.target.value)}
            id="height"
            type="text"
            label="Height"
          />
          <TextInput
            value={address}
            onChange={evt => setAddress(evt.target.value)}
            id="address"
            type="text"
            label="Address"
          />
          <TextInput
            value={zipCode}
            onChange={evt => setZipCode(evt.target.value)}
            id="postCode"
            type="text"
            label="Zip code"
          />
          <TextInput
            value={city}
            onChange={evt => setCity(evt.target.value)}
            id="city"
            type="text"
            label="City"
          />
          <TextInput
            value={country}
            onChange={evt => setCountry(evt.target.value)}
            id="country"
            type="text"
            label="Country"
          />
        </Details>
        <ButtonWrapper>
          <ContinueButton disabled={isBlocked()} onClick={goForward}>
            Continue &gt;
          </ContinueButton>
        </ButtonWrapper>
      </PatientGrid>
    </PatientDetailsWrapper>
  );
};

PatientDetails.defaultProps = {
  nextStep: null,
};

PatientDetails.propTypes = {
  cvc: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  focus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  expiry: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  height: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  setCvc: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setNumber: PropTypes.func.isRequired,
  setFocus: PropTypes.func.isRequired,
  setExpiry: PropTypes.func.isRequired,
  setWeight: PropTypes.func.isRequired,
  setHeight: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setZipCode: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setCountry: PropTypes.func.isRequired,
  isBlocked: PropTypes.func.isRequired,
  registerMethod: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func,
};

export default PatientDetails;
