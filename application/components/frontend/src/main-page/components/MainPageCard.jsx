import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import nextIcon from 'images/icons/next.svg';

const MainPageCardWrapper = styled.div.attrs({ className: 'main-page-card-wrapper' })`
  margin: 7% auto 0 auto;
  font-family: 'Roboto', sans-serif;
`;

const TopSign = styled.p.attrs({ className: 'top-sign' })`
  margin: 0;
  font-weight: 100;
  font-size: 60px;
`;

const BottomSign = styled.p.attrs({ className: 'bottom-sign' })`
  margin: 0;
  font-weight: 900;
  font-size: 60px;
`;

const SubSign = styled.p.attrs({ className: 'sub-sign' })`
  margin: 0;
  font-weight: 100;
  font-size: 15px;
  margin-top: 10px;
`;

const StartDiagnosisButton = styled.button.attrs({ className: 'start-diagnosis-button' })`
  padding: 15px 30px;
  border-radius: 5px;
  text-transform: uppercase;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;
  background: #2e4663;
  position: relative;
  outline: none;

  &:hover {
    opacity: 0.8;
  }
`;

const ButtonText = styled.span.attrs({ className: 'button-text' })`
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
  font-size: 12px;
  color: #ffffff;
`;

const ButtonIcon = styled.img.attrs({ className: 'button-icon' })`
  width: 10px;
  margin-left: 20px;
`;

const MainPageCard = ({ setStartDiagnose }) => (
  <MainPageCardWrapper>
    <TopSign>Medical care</TopSign>
    <BottomSign>anytime, anywhere</BottomSign>
    <SubSign>Speak to the doctor, therapist or nurse from any place in the world!</SubSign>
    <StartDiagnosisButton onClick={setStartDiagnose}>
      <ButtonText>Start diagnosis</ButtonText>
      <ButtonIcon src={nextIcon} alt="button-icon" />
    </StartDiagnosisButton>
  </MainPageCardWrapper>
);

MainPageCard.propTypes = {
  setStartDiagnose: PropTypes.func.isRequired,
};

export default MainPageCard;
