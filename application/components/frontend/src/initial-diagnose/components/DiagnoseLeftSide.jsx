import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DiagnoseMainCard from 'initial-diagnose/components/DiagnoseMainCard';

const DiagnoseLeftSideWrapper = styled.div.attrs({ className: 'diagnose-left-side-wrapper' })`
  background: #f8f8f8;
`;

const DiagnoseLeftSide = ({ setCurrentStepNumber }) => (
  <DiagnoseLeftSideWrapper>
    <DiagnoseMainCard setCurrentStepNumber={setCurrentStepNumber} />
  </DiagnoseLeftSideWrapper>
);

DiagnoseLeftSide.propTypes = {
  setCurrentStepNumber: PropTypes.func.isRequired,
};

export default DiagnoseLeftSide;
