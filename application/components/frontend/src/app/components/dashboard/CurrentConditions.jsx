import React from 'react';
import styled from 'styled-components';

import moreIcon from 'images/icons/more.svg';
import doctorImage from 'images/doctor.jpg';

const CurrentConditionsWrapper = styled.div.attrs({ className: 'appointments-wrapper' })`
  border-radius: 5px;
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  border-bottom: 1px solid #f0f0f0;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 15px;
`;

const CardContent = styled.div.attrs({ className: 'card-content' })`
  padding: 15px;
  font-size: 12px;
  font-weight: 100;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  position: relative;
`;

const MoreIcon = styled.img.attrs({ className: 'more-icon' })`
  height: 15px;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 20px;
`;

const ConditionStatus = styled.div.attrs({ className: 'condition-status' })`
  background: #ffe8cc;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-weight: 400;
  color: #fea64a;
  display: inline-block;
`;

const ConditionTitle = styled.div.attrs({ className: 'condition-title' })`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 10px;
`;

const ConditionDescription = styled.div.attrs({ className: 'condition-description' })`
  font-weight: 100;
  font-size: 13px;
  margin-bottom: 20px;
`;

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 10px;
`;

const GridElement = styled.div.attrs({ className: 'grid-element' })``;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 400;
  margin-bottom: 5px;
`;

const Content = styled.div.attrs({ className: 'content' })`
  font-weight: 100;
  display: flex;
  line-height: 30px;
`;

const MedicationContent = styled.div.attrs({ className: 'medication-content' })`
  font-weight: 100;
`;

const DoctorName = styled.span.attrs({ className: 'doctor-name' })`
  font-weight: 100;
  display: inline-block;
`;

const MedicationName = styled.p.attrs({ className: 'medication-name' })`
  margin: 0;
  font-weight: 900;
  margin-bottom: 5px;
`;

const MedicationDescription = styled.p.attrs({ className: 'medication-description' })`
  margin: 0;
  font-weight: 100;
`;

const DoctorImage = styled.img.attrs({ className: 'doctor-image' })`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  margin-right: 10px;
`;

const ScheduleButton = styled.div.attrs({ className: 'schedule-button' })`
  border: 1px solid #f0f0f0;
  padding: 5px 10px;
  font-size: 11px;
  height: 20px;
  text-align: center;
  transition: 0.2s;
  cursor: pointer;
  font-weight: 400;
  line-height: 20px;
  width: 100%;
  border-radius: 5px;

  &:hover {
    background: #f0f0f0;
  }
`;

const CurrentConditions = () => (
  <CurrentConditionsWrapper>
    <CardTitle>Current Condition</CardTitle>
    <CardContent>
      <MoreIcon src={moreIcon} alt="moreIcon" />
      <ConditionStatus>Moderate</ConditionStatus>
      <ConditionTitle>Sinusitis</ConditionTitle>
      <ConditionDescription>
        A condition in which the cavities around the nasal passages become inflamed
      </ConditionDescription>
      <TwoSideGrid>
        <GridElement>
          <Title>Primary</Title>
          <Content>
            <DoctorImage src={doctorImage} alt="doctorImage" />
            <DoctorName>Dr Steven Kalish</DoctorName>
          </Content>
        </GridElement>
        <GridElement>
          <Title>Last seen</Title>
          <Content>05 Mar, 2020</Content>
        </GridElement>
      </TwoSideGrid>
      <TwoSideGrid>
        <GridElement>
          <Title>Treatment</Title>
          <MedicationContent>
            <MedicationName>Nasonex Aerosol</MedicationName>
            <MedicationDescription>Mometasone furate 50mcg/spray</MedicationDescription>
          </MedicationContent>
        </GridElement>
        <GridElement>
          <Title>Next Appointment</Title>
          <Content>
            <ScheduleButton>Schedule</ScheduleButton>
          </Content>
        </GridElement>
      </TwoSideGrid>
    </CardContent>
  </CurrentConditionsWrapper>
);

export default CurrentConditions;
