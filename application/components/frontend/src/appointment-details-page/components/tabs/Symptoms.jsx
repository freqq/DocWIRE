import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SymptomsWrapper = styled.div.attrs({ className: 'symptoms-wrapper' })`
  padding: 20px;
`;

const SymptomsList = styled.ul.attrs({ className: 'symptoms-list' })`
  margin: 0;
  padding: 0 0 0 20px;
`;

const SymptomsItem = styled.li.attrs({ className: 'symptoms-item' })`
  margin: 0;
  padding: 0;
`;

const Symptoms = ({ symptomsData }) => (
  <SymptomsWrapper>
    <SymptomsList>
      {symptomsData.map(symptom => (
        <SymptomsItem>{symptom}</SymptomsItem>
      ))}
    </SymptomsList>
  </SymptomsWrapper>
);

Symptoms.propTypes = {
  symptomsData: PropTypes.instanceOf(Object).isRequired,
};

export default Symptoms;
