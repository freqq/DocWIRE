import React from 'react';
import styled from 'styled-components';

import DiagnoseMainCard from 'initial-diagnose/components/DiagnoseMainCard';

const DiagnoseLeftSideWrapper = styled.div.attrs({ className: 'diagnose-left-side-wrapper' })`
  background: #f8f8f8;
`;

const DiagnoseLeftSide = () => (
  <DiagnoseLeftSideWrapper>
    <DiagnoseMainCard />
  </DiagnoseLeftSideWrapper>
);

export default DiagnoseLeftSide;
