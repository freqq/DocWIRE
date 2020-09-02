import React from 'react';
import styled from 'styled-components';

import Medication from 'dashboard-page/components/Medication';

const MedicationsWrapper = styled.div.attrs({ className: 'appointments-wrapper' })`
  border-radius: 5px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  border-bottom: 1px solid #f0f0f0;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 15px;
`;

const CardContent = styled.div.attrs({ className: 'card-content' })`
  font-size: 12px;
  font-weight: 100;
`;

const MEDICATIONS_LIST = [
  {
    name: 'Fenofibrate',
    dose: '48mg',
    description: 'Take with food every morning',
    lastRefil: '27 Apr, 2020',
  },
  {
    name: 'Alfuzosin',
    dose: '10mg',
    description: 'Take 1 with food twice a day and avoid drinking alcohol for 2 hours after',
    lastRefil: '27 Apr, 2019',
  },
];

const Medications = () => (
  <MedicationsWrapper>
    <CardTitle>Medications</CardTitle>
    <CardContent>
      {MEDICATIONS_LIST.map(item => (
        <Medication
          name={item.name}
          dose={item.dose}
          description={item.description}
          lastRefil={item.lastRefil}
        />
      ))}
    </CardContent>
  </MedicationsWrapper>
);

export default Medications;
