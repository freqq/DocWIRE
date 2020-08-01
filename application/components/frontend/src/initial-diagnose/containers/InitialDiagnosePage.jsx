import React from 'react';
import styled from 'styled-components';
import DiagnoseLeftSide from 'initial-diagnose/components/DiagnoseLeftSide';

const InitialDiagnosePageWrapper = styled.div.attrs({ className: 'initial-diagnose-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const InitialDiagnosePage = () => (
  <InitialDiagnosePageWrapper>
    <DiagnoseLeftSide />
  </InitialDiagnosePageWrapper>
);

export default InitialDiagnosePage;
