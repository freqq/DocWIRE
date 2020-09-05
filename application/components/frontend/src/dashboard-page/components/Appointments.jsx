import React from 'react';
import styled from 'styled-components';

import doctorImage from 'images/doctor.jpg';
import clockIcon from 'images/menu-icons/history.svg';
import cancelIcon from 'images/icons/close.svg';
import rescheduleIcon from 'images/menu-icons/reports.svg';

const AppointmentsWrapper = styled.div.attrs({ className: 'appointments-wrapper' })`
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  border-bottom: 1px solid #f0f0f0;
  padding: 10px;
  font-weight: 400;
  font-size: 15px;
`;

const SeeAllButton = styled.button.attrs({ className: 'see-all-button' })`
  float: right;
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: 100;
  background: #ffffff;
  padding: 3px 10px;
  font-size: 10px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const CardContent = styled.div.attrs({ className: 'card-content' })`
  padding: 10px 25px;
  font-size: 12px;
  font-weight: 100;
  height: calc(100% - 55px);
  overflow-x: hidden;
  overflow-y: scroll;
`;

const DoctorDetails = styled.div.attrs({ className: 'doctor-details' })`
  display: flex;
  height: 30px;
  cursor: pointer;
  transition: 0.2s;
  padding: 8px 0;
  border-radius: 5px;
  margin-bottom: 10px;

  &:hover {
    background: #f0f0f0;
  }
`;

const DoctorImage = styled.img.attrs({ className: 'doctor-image' })`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  margin-right: 10px;
`;

const DoctorData = styled.div.attrs({ className: 'doctor-data' })`
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
`;

const DoctorName = styled.p.attrs({ className: 'doctor-name' })`
  margin: 0;
  padding: 0;
  font-weight: 400;
`;

const DoctorRole = styled.p.attrs({ className: 'doctor-role' })`
  margin: 0;
  padding: 0;
  font-weight: 100;
`;

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 10px;
`;

const ActionButtons = styled.div.attrs({ className: 'action-buttons' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
`;

const ActionButton = styled.button.attrs({ className: 'action-button' })`
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: 100;
  background: #ffffff;
  padding: 10px;
  font-size: 11px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const GridElement = styled.div.attrs({ className: 'grid-element' })``;

const ClockIcon = styled.img.attrs({ className: 'clock-icon' })`
  height: 10px;
  margin-right: 2px;
`;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 400;
  margin-bottom: 5px;
`;

const Content = styled.div.attrs({ className: 'content' })`
  font-weight: 100;
`;

const VisitDuration = styled.div.attrs({ className: 'visit-duration' })`
  color: #2d4564;
  font-weight: 400;
  margin-top: 2px;
`;

const ButtonIcon = styled.img.attrs({ className: 'button-icon' })`
  height: 12px;
  margin-right: 5px;
`;

const Appointments = () => {
  const cancelBooking = () => console.log('cancelBooking');

  const rescheduleBooking = () => console.log('rescheduleBooking');

  return (
    <AppointmentsWrapper>
      <CardTitle>
        Appointments
        <SeeAllButton>See all</SeeAllButton>
      </CardTitle>
      <CardContent>
        <DoctorDetails>
          <DoctorImage src={doctorImage} alt="doctorImage" />
          <DoctorData>
            <DoctorName>Dr Ramadi Entrylols</DoctorName>
            <DoctorRole>Gastroentterologist</DoctorRole>
          </DoctorData>
        </DoctorDetails>
        <TwoSideGrid>
          <GridElement>
            <Title>Date</Title>
            <Content>Friday 17 May, 2020</Content>
          </GridElement>
          <GridElement>
            <Title>Time</Title>
            <Content>
              9:30am - 10:00am
              <br />
              <VisitDuration>
                <ClockIcon src={clockIcon} />
                30mins
              </VisitDuration>
            </Content>
          </GridElement>
        </TwoSideGrid>
        <ActionButtons>
          <ActionButton onClick={cancelBooking}>
            <ButtonIcon src={cancelIcon} alt="cancelIcon" />
            Cancel Booking
          </ActionButton>
          <ActionButton onClick={rescheduleBooking}>
            <ButtonIcon src={rescheduleIcon} alt="rescheduleIcon" />
            Reschedule
          </ActionButton>
        </ActionButtons>
      </CardContent>
    </AppointmentsWrapper>
  );
};

export default Appointments;
