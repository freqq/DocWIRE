import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';
import StarsRating from 'common/components/StarsRating';

const DoctorReviewsWrppaer = styled.div.attrs({ className: 'doctor-reviews-wrapper' })`
  border-radius: 5px;
  padding: 30px;
  background: #ffffff;
  width: calc(100% - 62px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  font-size: 11px;
`;

const NoReviews = styled.div.attrs({ className: 'no-reviews' })`
  font-family: 'Roboto', sans-serif;
  border-radius: 10px;
  padding: 10px 35px;
  border: 1px solid #ccc;
  display: inline-block;
  position: relative;
`;

const ReviewsList = styled.ul.attrs({ className: 'reviews-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ReviewsListItem = styled.li.attrs({ className: 'reviews-list-item' })`
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

const ReviewCount = styled.div.attrs({ className: 'reviews-count' })`
  margin: 0 0 10px 0;
  padding: 0;
`;

const ReviewData = styled.div.attrs({ className: 'reviews-data' })`
  margin: 0 0 5px 0;
  padding: 0;
`;

const Reviewer = styled.div.attrs({ className: 'reviewer' })`
  margin: 0 0 5px 0;
  padding: 0;
`;

const Rating = styled.div.attrs({ className: 'rating' })`
  margin: 0;
  padding: 0;
`;

const ReviewsTitle = styled.div.attrs({ className: 'reviews-title' })`
  margin: 0 0 10px 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 18px;
`;

const DoctorReviews = ({ reviews }) => {
  const getFullReviewerName = user => `${user.firstName} ${user.lastName}`;

  const getFullReviewDate = dateObj => {
    const chosenDate = moment(dateObj);

    const year = chosenDate.year();
    const monthName = MONTH_FULL_NAMES[chosenDate.month()];
    const day = chosenDate.date();
    const dayOfWeek = WEEK_DAYS_NAMES[chosenDate.day()];

    return `${dayOfWeek} ${day} ${monthName}, ${year}`;
  };

  return (
    <DoctorReviewsWrppaer>
      <ReviewsTitle>List of reviews </ReviewsTitle>
      {reviews.length === 0 ? (
        <NoReviews>No reviews yet</NoReviews>
      ) : (
        <>
          <ReviewCount>{`Reviews found: ${reviews.length}`}</ReviewCount>
          <ReviewsList>
            {reviews.map(review => (
              <ReviewsListItem>
                <ReviewData>{`Review date: ${getFullReviewDate(review.dateOfReview)}`}</ReviewData>
                <Reviewer>{`Reviewer: ${getFullReviewerName(review.patientData)}`}</Reviewer>
                <Rating>
                  <StarsRating rating={review.rating} />
                </Rating>
              </ReviewsListItem>
            ))}
          </ReviewsList>
        </>
      )}
    </DoctorReviewsWrppaer>
  );
};

DoctorReviews.propTypes = {
  reviews: PropTypes.instanceOf(Object).isRequired,
};

export default DoctorReviews;
