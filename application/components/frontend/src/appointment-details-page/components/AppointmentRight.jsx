import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAppointmentStateText } from 'appointment-details-page/utils/appointmentState';
import AppointmentTimeline from 'appointment-details-page/components/AppointmentTimeline';

const AppointmentRightWrapper = styled.div.attrs({ className: 'appointment-right-wrapper' })``;

const TopGrid = styled.div.attrs({ className: 'top-grid' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const CurrentStatusCard = styled.div.attrs({ className: 'current-status-card' })`
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 20px;
`;

const CurrentPriceCard = styled.div.attrs({ className: 'current-price-card' })`
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 20px;
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  font-size: 16px;
  font-weight: 100;
  margin-bottom: 10px;
`;

const CardSubtitle = styled.div.attrs({ className: 'card-subtitle' })`
  font-size: 11px;
`;

const AppointmentRight = ({ data }) => (
  <AppointmentRightWrapper>
    <TopGrid>
      <CurrentStatusCard>
        <CardTitle>Current status</CardTitle>
        <CardSubtitle>{getAppointmentStateText(data.appointmentState)}</CardSubtitle>
      </CurrentStatusCard>
      <CurrentPriceCard>
        <CardTitle>Current price</CardTitle>
        <CardSubtitle>{`$${data.appointmentPrice}`}</CardSubtitle>
      </CurrentPriceCard>
    </TopGrid>
    <AppointmentTimeline />
  </AppointmentRightWrapper>
);

const mapStateToProps = state => ({
  data: state.appointmentDetails.details.data,
});

AppointmentRight.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(AppointmentRight);
