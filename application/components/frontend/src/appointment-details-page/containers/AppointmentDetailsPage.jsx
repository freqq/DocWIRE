import React from 'react';
import styled from 'styled-components';

import AppointmentLeft from 'appointment-details-page/components/AppointmentLeft';
import AppointmentRight from 'appointment-details-page/components/AppointmentRight';
import AppointmentDetailsBreadcrumb from 'appointment-details-page/components/AppointmentDetailsBreadcrumb';

const AppointmentDetailsPageWrapper = styled.div.attrs({
  className: 'appointment-details-page-wrapper',
})`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
`;

const AppointmentGrid = styled.div.attrs({ className: 'message-grid' })`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  width: 100%;
`;

const AppointmentDetailsPage = () => (
  <AppointmentDetailsPageWrapper>
    <AppointmentDetailsBreadcrumb patientName="Alice Cooper" />
    <AppointmentGrid>
      <AppointmentLeft />
      <AppointmentRight />
    </AppointmentGrid>
  </AppointmentDetailsPageWrapper>
);

export default AppointmentDetailsPage;
