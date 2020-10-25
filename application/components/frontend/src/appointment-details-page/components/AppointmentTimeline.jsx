/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import ReviewDoctor from 'appointment-details-page/components/ReviewDoctor';
import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';
import { createPaymentSession } from 'appointment-details-page/actions/paymentActions';
import Tabs from 'common/components/tabs/Tabs';
import { getCurrentStepNumber } from 'appointment-details-page/utils/appointmentState';
import { acceptAppointmentRequest } from 'appointment-details-page/actions/appointmentActions';
import inlineLoaderImage from 'images/inline-loader.svg';

import AppointmentDate from 'appointment-details-page/components/tabs/AppointmentDate';
import MedicalFiles from 'appointment-details-page/components/tabs/MedicalFiles';
import QuickSurvey from 'appointment-details-page/components/tabs/QuickSurvey';
import VisitedRegions from 'appointment-details-page/components/tabs/VisitedRegions';
import LastSurvey from 'appointment-details-page/components/tabs/LastSurvey';
import DoctorInfo from 'appointment-details-page/components/tabs/DoctorInfo';
import Symptoms from 'appointment-details-page/components/tabs/Symptoms';

const AppointmentTimelineWrapper = styled.div.attrs({ className: 'appointment-timeline-wrapper' })`
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 20px;
  font-size: 12px;
  margin-top: 20px;
  max-height: 60vh;
  overflow-y: scroll;
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
  text-align: center;
`;

const StepName = styled.div.attrs({ className: 'step-name' })`
  margin: 10px 0;
`;

const DetailsTabs = styled.div.attrs({ className: 'details-tab' })``;

const InlineLoader = styled.img.attrs({ className: 'inline-loader' })`
  width: 50%;
  height: 20px;
`;

const AcceptRequestButton = styled.div.attrs({ className: 'accept-request-button' })`
  border: 1px solid #333;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;

  &:hover {
    background: #eee;
  }
`;

const GoToCallButton = styled.div.attrs({ className: 'go-to-call-button' })`
  border: 1px solid #333;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;

  &:hover {
    background: #eee;
  }
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
      'New appointment request was filed. Waiting for doctor to decide wheter he wants to take this case.',
    notDone: 'Waiting for request approval...',
    done: 'Request has been accepted',
  },
  {
    id: 2,
    name: 'Patient booking and payment',
    description: 'Appointment request accepted. Waiting for patient to pay for the consultation',
    notDone: 'Awaiting for patient booking and payment...',
    done: 'Payment has been done.',
  },
  {
    id: 3,
    name: 'Video call with patient',
    description: 'Make a call and consult about patients issue.',
    notDone: 'Waiting for the video call deadline...',
    done: 'Consultation took place.',
  },
  {
    id: 4,
    name: 'Appointment finished',
    description: 'Call was made and this issue is closed. Now you can review your doctor.',
    notDone: 'Meeting has ended',
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

const AppointmentTimeline = ({
  data,
  loggedInUserId,
  acceptAppointmentRequestFunc,
  createPaymentSessionFunc,
  isAcceptRequestLoading,
  isAcceptRequestError,
  isPaymentLoading,
  history,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(getCurrentStepNumber(data.appointmentState));
  }, [data]);

  const acceptRequest = appointmentId => {
    acceptAppointmentRequestFunc(appointmentId);
  };

  const goToCall = callId => history.push(`/call/${callId}`);

  const leadingZeros = param => (param < 10 ? '0' : '') + param;

  const getAppointmentDate = dateObj => {
    const chosenDate = moment(dateObj);

    const year = chosenDate.year();
    const monthName = MONTH_FULL_NAMES[chosenDate.month()];
    const day = chosenDate.date();
    const dayOfWeek = WEEK_DAYS_NAMES[chosenDate.day()];

    return `${dayOfWeek} ${day} ${monthName}, ${year}`;
  };

  const getAppointmentTime = dateObj => {
    const chosenDate = moment(dateObj);
    const chosenDateEnd = moment(dateObj).add('30', 'minutes');

    const hour = leadingZeros(chosenDate.hour());
    const minutes = leadingZeros(chosenDate.minutes());

    const hourEnd = leadingZeros(chosenDateEnd.hour());
    const minutesEnd = leadingZeros(chosenDateEnd.minutes());

    return `${hour}:${minutes} - ${hourEnd}:${minutesEnd}`;
  };

  const isTimeForAppointment = date => {
    const currentTime = moment();
    const appointmentDateTIme = moment(date);

    const timeDiff = moment.duration(currentTime.diff(appointmentDateTIme));

    return timeDiff.asMinutes() <= 10;
  };

  const getFullDate = appointmentDate =>
    `${getAppointmentDate(appointmentDate)}, ${getAppointmentTime(appointmentDate)}`;

  const getFullNameWithSpec = doctorData =>
    `${doctorData.doctorInfo.title} ${doctorData.firstName} ${doctorData.lastName}`;

  const payForAppointment = appointmentId => {
    const paymentDescription = `Appointment with doctor ${getFullNameWithSpec(
      data.doctor,
    )} on ${getFullDate(data.appointmentDate)}`;

    const sessionRequest = {
      appointmentId,
      price: data.appointmentPrice,
      paymentDescription,
    };

    createPaymentSessionFunc(sessionRequest);
  };

  const renderStepStatus = step => {
    if (activeStep >= step.id) {
      return <>{step.done}</>;
    }

    if (activeStep === 0 && data.doctor.userId === loggedInUserId) {
      return (
        <AcceptRequestButton onClick={() => acceptRequest(data.id)}>
          {isAcceptRequestLoading ? (
            <InlineLoader src={inlineLoaderImage} alt="inlineLoaderImage" />
          ) : (
            <>Accept request</>
          )}
        </AcceptRequestButton>
      );
    }

    if (activeStep === 1 && data.patient.userId === loggedInUserId) {
      return (
        <AcceptRequestButton onClick={() => payForAppointment(data.id)}>
          {isPaymentLoading ? (
            <InlineLoader src={inlineLoaderImage} alt="inlineLoaderImage" />
          ) : (
            <>Pay for appointment</>
          )}
        </AcceptRequestButton>
      );
    }

    if (activeStep === 2 && isTimeForAppointment(data.appointmentDate)) {
      return <GoToCallButton onClick={() => goToCall(data.id)}>Go to call page</GoToCallButton>;
    }

    return <>{activeStep >= step.id ? <>{step.done}</> : <>{step.notDone}</>}</>;
  };

  return (
    <AppointmentTimelineWrapper>
      <CardTitle>Appointment details</CardTitle>
      <DetailsTabs>
        <Tabs>
          <div label="Appointment date">
            <AppointmentDate appointmentDate={data.appointmentDate} />
          </div>
          <div label="Medical files">
            <MedicalFiles appointmentId={data.id} patientId={data.patient.userId} />
          </div>
          <div label="Doctor info">
            <DoctorInfo doctorData={data.doctor} />
          </div>
          <div label="Symptoms">
            <Symptoms symptomsData={data.chosenSymptoms} />
          </div>
          <div label="Quick survey">
            <QuickSurvey quickSurveyData={data.quickSurvey} />
          </div>
          <div label="Visited regions">
            <VisitedRegions visitedRegionsData={data.visitedRegions} />
          </div>
          <div label="Last survey">
            <LastSurvey lastSurveyData={data.lastSurvey} />
          </div>
        </Tabs>
      </DetailsTabs>
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
              {step.id === 4 && activeStep === 3 && (
                <ReviewDoctor
                  doctorData={data.doctor}
                  appointmentId={data.id}
                  patientId={data.patient.userId}
                  appointmentState={data.appointmentState}
                />
              )}
            </StepDetails>
            {activeStep + 1 >= step.id && (
              <StepStatus style={activeStep >= step.id ? DONE_TEXT_COLOR : {}}>
                {renderStepStatus(step)}
              </StepStatus>
            )}
          </StepsItem>
        ))}
      </StepsWrapper>
    </AppointmentTimelineWrapper>
  );
};

const mapStateToProps = state => ({
  data: state.appointmentDetails.details.data,
  isAcceptRequestLoading: state.appointmentDetails.details.isAcceptRequestLoading,
  isAcceptRequestError: state.appointmentDetails.details.isAcceptRequestError,
  isPaymentLoading: state.appointmentDetails.payment.isLoading,
  loggedInUserId: state.common.authUser.keycloakInfo.subject,
});

const mapDispatchToProps = dispatch => ({
  acceptAppointmentRequestFunc: appointmentId => dispatch(acceptAppointmentRequest(appointmentId)),
  createPaymentSessionFunc: sessionRequest => dispatch(createPaymentSession(sessionRequest)),
});

AppointmentTimeline.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  acceptAppointmentRequestFunc: PropTypes.func.isRequired,
  createPaymentSessionFunc: PropTypes.func.isRequired,
  isAcceptRequestLoading: PropTypes.bool.isRequired,
  isAcceptRequestError: PropTypes.bool.isRequired,
  isPaymentLoading: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppointmentTimeline));
