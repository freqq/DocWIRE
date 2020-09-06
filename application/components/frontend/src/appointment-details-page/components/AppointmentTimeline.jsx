/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

const AppointmentTimelineWrapper = styled.div.attrs({ className: 'appointment-timeline-wrapper' })`
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 20px;
  font-size: 12px;
  margin-top: 20px;
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  font-weight: 100;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const VerticalLine = styled.div.attrs({ className: 'vertical-line' })`
  background: #2d4564;
  width: 2px;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StepsWrapper = styled.ul.attrs({ className: 'steps-wrapper' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StepsItem = styled.li.attrs({ className: 'steps-item' })`
  margin: 0;
  display: grid;
  grid-template-columns: 10% 1fr 20%;
`;

const DotWrapper = styled.div.attrs({ className: 'dot-wrapper' })`
  position: relative;
`;

const StepDetails = styled.div.attrs({ className: 'step-details' })``;

const StepStatus = styled.div.attrs({ className: 'step-status' })`
  padding-top: 10px;
  font-weight: 100;
`;

const StepName = styled.div.attrs({ className: 'step-name' })`
  margin: 10px 0;
`;

const StepDescription = styled.div.attrs({ className: 'step-description' })`
  font-weight: 100;
  font-size: 10px;
  margin-bottom: 40px;
`;

const Dot = styled.div.attrs({ className: 'dot' })`
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  background: #ffffff;
  border: 1px solid #2d4564;
  z-index: 10;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  color: #2d4564;
`;

const ACTIVITY_STEPS = [
  {
    id: 1,
    name: 'Request received',
    description:
      'You received new request. Check medical files for this case and decide wheter you want to take it',
    notDone: 'Waiting for request approval...',
    done: 'Request has been accepted',
  },
  {
    id: 2,
    name: 'Patient booking and payment',
    description: 'Waiting for patient to pay for the consultation',
    notDone: 'Awaiting for patient booking and payment...',
    done: 'Payment has been done.',
  },
  {
    id: 3,
    name: 'Video call with patient',
    description: 'Connect with booked client and consult about his issue.',
    notDone: 'Waiting for the video call deadline...',
    done: 'Consultation took place.',
  },
];

const COMPLETED_STEP_STYLE = {
  background: '#2d4564',
  color: '#ffffff',
};

const DONE_TEXT_COLOR = {
  color: '#2d4564',
  fontWeight: '400',
};

const AppointmentTimeline = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <AppointmentTimelineWrapper>
      <CardTitle>Consultation activity</CardTitle>
      <StepsWrapper>
        {ACTIVITY_STEPS.map(step => (
          <StepsItem key={step.id}>
            <DotWrapper>
              <Dot style={activeStep >= step.id ? COMPLETED_STEP_STYLE : {}}>
                {activeStep >= step.id ? <>&#10003;</> : <>{step.id}</>}
              </Dot>
              <VerticalLine />
            </DotWrapper>
            <StepDetails>
              <StepName>{step.name}</StepName>
              <StepDescription>{step.description}</StepDescription>
            </StepDetails>
            {activeStep + 1 >= step.id && (
              <StepStatus style={activeStep >= step.id ? DONE_TEXT_COLOR : {}}>
                {activeStep >= step.id ? <>{step.done}</> : <>{step.notDone}</>}
              </StepStatus>
            )}
          </StepsItem>
        ))}
      </StepsWrapper>
    </AppointmentTimelineWrapper>
  );
};

export default AppointmentTimeline;
