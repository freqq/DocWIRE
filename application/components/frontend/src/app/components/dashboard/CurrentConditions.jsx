import React from 'react';
import styled from 'styled-components';

const CurrentConditionsWrapper = styled.div.attrs({ className: 'appointments-wrapper' })`
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  border-bottom: 1px solid #f0f0f0;
  padding: 10px;
  font-weight: 400;
  font-size: 15px;
`;

const CardContent = styled.div.attrs({ className: 'card-content' })`
  padding: 10px;
  font-size: 12px;
  font-weight: 100;
`;

const CurrentConditions = () => (
  <CurrentConditionsWrapper>
    <CardTitle>CurrentConditions</CardTitle>
    <CardContent>123</CardContent>
  </CurrentConditionsWrapper>
);

export default CurrentConditions;
