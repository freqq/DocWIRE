/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';

import UserSection from 'common/components/layout/navbar/UserSection';
import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import { getRecentBill } from 'dashboard-page/actions/recentBillActions';
import fileIcon from 'images/icons/document.svg';
import moreIcon from 'images/icons/more.svg';

const RecentBillsWrapper = styled.div.attrs({ className: 'recent-bills-wrapper' })`
  height: calc(100% - 40px);
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
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
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  position: relative;
  max-height: calc(100% - 80px);
  overflow-y: scroll;
  overflow-x: hidden;
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
`;

const PaymentBig = styled.div.attrs({ className: 'payment-big' })`
  font-weight: 400;
  font-size: 30px;
`;

const DoctorDetails = styled.div.attrs({ className: 'doctor-details' })`
  display: flex;
  height: 30px;
  cursor: pointer;
  transition: 0.2s;
  padding: 8px;
  border-radius: 5px;
  margin: 20px 0;

  &:hover {
    background: #f0f0f0;
  }
`;

const CheckmarkIcon = styled.span.attrs({ className: 'checkmark-icon' })`
  height: 14px;
  width: 14px;
  line-height: 14px;
  text-align: center;
  font-size: 9px;
  background: #0081f7;
  border-radius: 50%;
  margin: 0 4px;
  color: #ffffff;
  display: inline-block;
`;

const DoctorImage = styled.img.attrs({ className: 'doctor-image' })`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  margin-right: 10px;
`;

const BillDetails = styled.div.attrs({ className: 'bill-details' })`
  margin-top: 25px;
`;

const NoRecentBill = styled.div.attrs({ className: 'no-recent-bill' })`
  width: 80%;
  background: #ccc;
  borde-radius: 4px;
  text-align: center;
`;

const BillDetailItem = styled.div.attrs({ className: 'bill-details-item' })`
  display: flex;
  margin-bottom: 15px;
`;

const BillDetailItemIcon = styled.img.attrs({ className: 'bill-details-item-icon' })`
  height: 20px;
  width: 20px;
  margin-right: 15px;
`;

const BillDetailItemContent = styled.p.attrs({ className: 'bill-details-item-content' })`
  margin: 0;
  font-weight: 100;
  line-height: 20px;
`;

const BillDetailItemFile = styled.p.attrs({ className: 'bill-details-item-file' })`
  margin: 0;
  font-weight: 100;
  text-decoration: underline;
  cursor: pointer;
  line-height: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const MoreIcon = styled.img.attrs({ className: 'more-icon' })`
  height: 15px;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 20px;
`;

const RecentBills = ({ isLoading, isError, data, getRecentBillFunc }) => {
  useEffect(() => {
    getRecentBillFunc();
  }, []);

  const getAppointmentDate = dateObj => {
    const chosenDate = moment(dateObj);

    const year = chosenDate.year();
    const monthName = MONTH_FULL_NAMES[chosenDate.month()];
    const day = chosenDate.date();
    const dayOfWeek = WEEK_DAYS_NAMES[chosenDate.day()];

    return `${dayOfWeek} ${day} ${monthName}, ${year}`;
  };

  const getPrice = price => (price / 100).toFixed(2);

  return (
    <RecentBillsWrapper>
      <CardTitle>Recent Bill</CardTitle>
      <CardContent>
        <MoreIcon src={moreIcon} alt="moreIcon" />
        {isLoading ? (
          <ProgressIndicatorCircular />
        ) : (
          <>
            {data.paidAt !== undefined ? (
              <>
                <TwoSideGrid>
                  <GridElement>
                    <Title>Your payment</Title>
                    <PaymentBig>{`$${getPrice(data.price)}`}</PaymentBig>
                  </GridElement>
                  <GridElement>
                    <Title>Medicare</Title>
                    <Content>{`$${getPrice(data.price)}`}</Content>
                  </GridElement>
                </TwoSideGrid>
                <TwoSideGrid>
                  <GridElement>
                    <Content>{`Paid on ${getAppointmentDate(data.paitAd)}`}</Content>
                  </GridElement>
                </TwoSideGrid>
                <UserSection
                  userId={data.doctor.userId}
                  firstName={data.doctor.firstName}
                  lastName={data.doctor.lastName}
                  bottomText="Doctor"
                  showIcon={false}
                  circleSize={30}
                  circleFontSize={9}
                />
                <BillDetails>
                  <BillDetailItem>
                    <BillDetailItemIcon src={fileIcon} />
                    123
                  </BillDetailItem>
                </BillDetails>
              </>
            ) : (
              <NoRecentBill>No recent bill found.</NoRecentBill>
            )}
          </>
        )}
      </CardContent>
    </RecentBillsWrapper>
  );
};

RecentBills.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  data: PropTypes.bool.isRequired,
  getRecentBillFunc: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.dashboard.recentBill.isLoading,
  isError: state.dashboard.recentBill.isError,
  data: state.dashboard.recentBill.data,
});

const mapDispatchToProps = dispatch => ({
  getRecentBillFunc: () => dispatch(getRecentBill()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentBills);
