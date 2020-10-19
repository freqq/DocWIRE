import React from 'react';
import styled from 'styled-components';

import locationIcon from 'images/icons/pin.svg';
import fileIcon from 'images/icons/document.svg';
import doctorImage from 'images/doctor.jpg';
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

const BillDetails = styled.div.attrs({ className: 'bill-details' })``;

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
`;

const MoreIcon = styled.img.attrs({ className: 'more-icon' })`
  height: 15px;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 20px;
`;

const RecentBills = () => (
  <RecentBillsWrapper>
    <CardTitle>Recent Bill</CardTitle>
    <CardContent>
      <MoreIcon src={moreIcon} alt="moreIcon" />
      <TwoSideGrid>
        <GridElement>
          <Title>Your payment</Title>
          <PaymentBig>$110.00</PaymentBig>
        </GridElement>
        <GridElement>
          <Title>Medicare</Title>
          <Content>$124.00</Content>
        </GridElement>
      </TwoSideGrid>
      <TwoSideGrid>
        <GridElement>
          <Content>Paid on the 27 april, 2020</Content>
          <Content>
            to
            <CheckmarkIcon>&#x2713;</CheckmarkIcon>
            Dorian Med Pty Ltd
          </Content>
        </GridElement>
        <GridElement>
          <Title>Total</Title>
          <Content>$234.00</Content>
        </GridElement>
      </TwoSideGrid>
      <DoctorDetails>
        <DoctorImage src={doctorImage} alt="doctorImage" />
        <DoctorData>
          <DoctorName>Dr Ramadi Entrylols</DoctorName>
          <DoctorRole>Gastroentterologist</DoctorRole>
        </DoctorData>
      </DoctorDetails>
      <BillDetails>
        <BillDetailItem>
          <BillDetailItemIcon src={locationIcon} />
          <BillDetailItemContent>
            Suite 206/203-233 New King James Rd, Edgecliff NSW 2027
          </BillDetailItemContent>
        </BillDetailItem>
        <BillDetailItem>
          <BillDetailItemIcon src={fileIcon} />
          <BillDetailItemFile>Standard_ENT_Consult.pdf</BillDetailItemFile>
        </BillDetailItem>
      </BillDetails>
    </CardContent>
  </RecentBillsWrapper>
);

export default RecentBills;
