import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import moreIcon from 'images/icons/more.svg';

const MedicationWrapper = styled.div.attrs({ className: 'medication-wrapper' })`
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  padding: 5px 15px;
  margin-bottom: 15px;
  transition: 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    opacity: 0.7;
  }
`;

const MedicationName = styled.p.attrs({ className: 'medication-name' })`
  font-weight: 400;
  font-size: 16px;
`;

const MedicationDescription = styled.p.attrs({ className: 'medication-description' })`
  font-weight: 100;
  font-size: 12px;
`;

const MedicationLastRefil = styled.p.attrs({ className: 'medication-last-refil' })`
  font-weight: 100;
  font-size: 12px;
  color: #2d4564;
`;

const MoreIcon = styled.img.attrs({ className: 'more-icon' })`
  height: 15px;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 20px;
`;

const Medication = ({ name, dose, description, lastRefil }) => (
  <MedicationWrapper>
    <MoreIcon src={moreIcon} alt="moreIcon" />
    <MedicationName>{`${name} (${dose})`}</MedicationName>
    <MedicationDescription>{description}</MedicationDescription>
    <MedicationLastRefil>{`Last Refil ${lastRefil}`}</MedicationLastRefil>
  </MedicationWrapper>
);

Medication.propTypes = {
  name: PropTypes.string.isRequired,
  dose: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lastRefil: PropTypes.string.isRequired,
};

export default Medication;
