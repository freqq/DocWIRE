import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from 'common/components/text-input/TextInput';
import TextArea from 'common/components/TextArea';

const DoctorDetailsWrapper = styled.div.attrs({ className: 'doctor-details-wrapper' })`
  margin-top: 200px;
`;

const Title = styled.div.attrs({ className: 'title' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 20px;
  margin-bottom: 20px;
`;

const DoctorGrid = styled.div.attrs({ className: 'doctor-grid' })`
  width: 80%;
  margin: 0 auto;
  display: grid;
`;

const ContinueButton = styled.button.attrs({ className: 'continue-button' })`
  cursor: pointer;
  padding: 10px 20px;
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

const DoctorDetails = ({
  nextStep,
  currentStep,
  setCurrentStep,
  price,
  setPrice,
  title,
  setTitle,
  specialization,
  setSpecialization,
  isBlocked,
  aboutMe,
  setAboutMe,
  registerMethod,
}) => {
  const goForward = () => {
    setCurrentStep(currentStep + 1);
    registerMethod();
    nextStep();
  };

  return (
    <DoctorDetailsWrapper>
      <Title>Provide us with more details about you</Title>
      <DoctorGrid>
        <TextInput
          value={title}
          onChange={evt => setTitle(evt.target.value)}
          id="title"
          type="text"
          label="Title"
        />
        <TextInput
          value={specialization}
          onChange={evt => setSpecialization(evt.target.value)}
          id="specialization"
          type="text"
          label="Medical specialization"
        />
        <TextInput
          value={price}
          onChange={evt => setPrice(evt.target.value)}
          id="price"
          type="text"
          label="Visit price"
        />
        <TextArea
          value={aboutMe}
          onChange={evt => setAboutMe(evt.target.value)}
          label="About you"
        />
        <ContinueButton onClick={goForward} disabled={isBlocked()}>
          Continue
        </ContinueButton>
      </DoctorGrid>
    </DoctorDetailsWrapper>
  );
};

DoctorDetails.defaultProps = {
  nextStep: null,
};

DoctorDetails.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func,
  price: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  aboutMe: PropTypes.string.isRequired,
  setAboutMe: PropTypes.func.isRequired,
  setSpecialization: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
  isBlocked: PropTypes.func.isRequired,
  registerMethod: PropTypes.func.isRequired,
};

export default DoctorDetails;
