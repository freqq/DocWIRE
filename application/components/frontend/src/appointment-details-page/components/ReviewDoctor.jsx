import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { APPOINTMENT_STATES } from 'appointment-details-page/utils/appointmentState';
import StarsRating from 'common/components/StarsRating';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import { doctorReview } from 'appointment-details-page/actions/reviewActions';

const ReviewDoctorWrapper = styled.div.attrs({ className: 'review-doctor-wrapper' })`
  font-family: 'Roboto', sans-serif;
  border-radius: 10px;
  padding: 10px 35px;
  border: 1px solid #ccc;
  display: inline-block;
  position: relative;
`;

const ReviewDoctorTitle = styled.h2.attrs({ className: 'review-doctor-title' })`
  font-size: 14px;
  font-weight: 400;
`;

const Rating = styled.div.attrs({ className: 'rating' })`
  display: flex;
  margin-top: 10px;
`;

const ReviewSuccess = styled.div.attrs({ className: 'review-success' })`
  padding: 10px 35px;
  display: inline-block;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  border: 1px solid #ccc;
  font-weight: 100;
  background: #91d18b;
`;

const RatingName = styled.span.attrs({ className: 'rating-name' })`
  display: inline-block;
  margin-right: 5px;
  font-weight: 100;
`;

const DoctorName = styled.div.attrs({ className: 'doctor-name' })``;

const AlreadyReviewed = styled.div.attrs({ className: 'already-reviewed' })``;

const ReviewDoctor = ({
  doctorData,
  appointmentId,
  patientId,
  doctorReviewFunc,
  isReviewLoading,
  appointmentState,
  reviewData,
}) => {
  const onReviewClick = rating => {
    const ratingObject = {
      rating,
      appointmentId,
      patientId,
      doctorId: doctorData.userID,
    };

    if (!isReviewLoading) doctorReviewFunc(ratingObject);
  };

  const getDoctorFullName = () => `${doctorData.firstName} ${doctorData.lastName}`;

  return (
    <ReviewDoctorWrapper style={isReviewLoading && { opacity: '0.4' }}>
      {reviewData !== undefined && reviewData.status ? (
        <ReviewSuccess>Succesfully reviewed.</ReviewSuccess>
      ) : (
        <>
          {appointmentState === APPOINTMENT_STATES.REVIEWED ? (
            <AlreadyReviewed>Appointment already reviewed</AlreadyReviewed>
          ) : (
            <>
              <ReviewDoctorTitle>Review your doctor</ReviewDoctorTitle>
              <DoctorName>{`Doctor name: ${getDoctorFullName()}`}</DoctorName>
              <Rating>
                <RatingName>Choose rating: </RatingName>
                <StarsRating isReviewLoading={isReviewLoading} onClick={onReviewClick} />
              </Rating>
            </>
          )}
        </>
      )}
      {isReviewLoading && <ProgressIndicatorCircular size={70} />}
    </ReviewDoctorWrapper>
  );
};

const mapStateToProps = state => ({
  data: state.appointmentDetails.details.data,
  isReviewLoading: state.appointmentDetails.review.isLoading,
  reviewData: state.appointmentDetails.review.data,
});

const mapDispatchToProps = dispatch => ({
  doctorReviewFunc: appointmentId => dispatch(doctorReview(appointmentId)),
});

ReviewDoctor.propTypes = {
  doctorData: PropTypes.instanceOf(Object).isRequired,
  appointmentId: PropTypes.string.isRequired,
  appointmentState: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  doctorReviewFunc: PropTypes.func.isRequired,
  isReviewLoading: PropTypes.bool.isRequired,
  reviewData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDoctor);
