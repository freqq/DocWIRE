import React from 'react';
import styled from 'styled-components';

const DoctorReviewsWrppaer = styled.div.attrs({
  className: 'doctor-reviews-wrapper',
})`
  border-radius: 5px;
  padding: 30px;
  background: #ffffff;
  width: calc(100% - 62px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  font-size: 11px;
`;

const DoctorReviews = () => <DoctorReviewsWrppaer>reviews</DoctorReviewsWrppaer>;

export default DoctorReviews;
