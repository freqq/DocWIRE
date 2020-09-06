import React from 'react';
import styled from 'styled-components';

import PatientDetailsGridLeftSide from 'patient-details-page/containers/PatientDetailsGridLeftSide';
import PatientDetailsGridRightSide from 'patient-details-page/containers/PatientDetailsGridRightSide';
import PatientDetailsBreadcrumb from 'patient-details-page/components/PatientDetailsBreadcrumb';

const PatientDetailsPageWrapper = styled.div.attrs({ className: 'patient-details-page-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
  overflow: hidden;
`;

const PatientDetailsGrid = styled.div.attrs({ className: 'patient-details-grid' })`
  display: grid;
  grid-template-columns: 60% 40%;
  height: calc(100% - 56px);
  overflow: hidden;
  font-size: 12px;
  gap: 20px;
`;

const FIRST_NAME = 'Diane';
const LAST_NAME = 'Cooper';
const EMAIL = 'diane.cooper@example.com';
const TREATMENT_HISTORY = [
  {
    id: 1,
    treatmentName: 'Root Canal Treatment',
    meetingsList: [
      {
        id: 2,
        date: "26 Nov'19",
        time: '09:00 - 10:00',
        treatmentType: 'Open Access',
        doctorName: 'Drag Piotr',
      },
      {
        id: 3,
        date: "12 Sep'19",
        time: '14:15 - 14:45',
        treatmentType: 'Root Canal prep',
        doctorName: 'Wasik Magdalena',
      },
    ],
  },
  {
    id: 4,
    treatmentName: 'Boobs job',
    meetingsList: [
      {
        id: 5,
        date: "26 Nov'19",
        time: '09:00 - 10:00',
        treatmentType: 'Open Access',
        doctorName: 'Drag Piotr',
      },
      {
        id: 6,
        date: "12 Sep'19",
        time: '14:15 - 14:45',
        treatmentType: 'Root Canal prep',
        doctorName: 'Wasik Magdalena',
      },
    ],
  },
];

const PatientDetailsPage = () => (
  <PatientDetailsPageWrapper>
    <PatientDetailsBreadcrumb patientName="Diane Cooper" />
    <PatientDetailsGrid>
      <PatientDetailsGridLeftSide
        firstName={FIRST_NAME}
        lastName={LAST_NAME}
        email={EMAIL}
        treatmentHistory={TREATMENT_HISTORY}
      />
      <PatientDetailsGridRightSide />
    </PatientDetailsGrid>
  </PatientDetailsPageWrapper>
);

export default PatientDetailsPage;
