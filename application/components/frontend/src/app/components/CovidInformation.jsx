import React from 'react';
import styled from 'styled-components';

const CovidInformationWrapper = styled.div.attrs({ className: 'covid-information-wrapper' })`
  width: calc(100% - 30px);
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 40px 8fr 1fr;
  padding: 15px;
  gap: 30px;
`;

const CovidInfoIcon = styled.div.attrs({ className: 'covid-info-icon' })`
  border-radius: 50%;
  background: #c1e5fd;
  font-style: italic;
  color: #1894f8;
  font-weight: 900;
  text-align: center;
  line-height: 40px;
  height: 40px;
`;

const SectionTitle = styled.div.attrs({ className: 'section-title' })``;

const BoldText = styled.span.attrs({ className: 'bold-text' })`
  font-weight: 400;
`;

const SectionSubtitle = styled.div.attrs({ className: 'section-subtitle' })`
  font-weight: 100;
  margin-top: 5px;
  font-size: 13px;
`;

const SectionTitleText = styled.p.attrs({ className: 'section-title-text' })`
  margin: 0;
  padding: 0;
  font-weight: 400;
  display: inline-block;
`;

const SectionTitleBadge = styled.div.attrs({ className: 'section-title-text' })`
  margin: 0;
  padding: 0;
  border-radius: 5px;
  font-weight: 400;
  display: inline-block;
  background: #c1e5fd;
  color: #1894f8;
  text-transform: uppercase;
  padding: 3px 8px;
  margin-left: 10px;
  font-size: 11px;
`;

const CovidInfoContent = styled.div.attrs({ className: 'covid-info-icon' })``;

const CovidInfoButton = styled.div.attrs({ className: 'covid-info-icon' })`
  border: 1px solid #f0f0f0;
  padding: 10px;
  font-size: 13px;
  height: 20px;
  text-align: center;
  transition: 0.2s;
  cursor: pointer;
  line-height: 20px;

  &:hover {
    background: #f0f0f0;
  }
`;

const CovidInformation = () => (
  <CovidInformationWrapper>
    <CovidInfoIcon>i</CovidInfoIcon>
    <CovidInfoContent>
      <SectionTitle>
        <SectionTitleText>New COVID-19 update for patients</SectionTitleText>
        <SectionTitleBadge>NEW</SectionTitleBadge>
      </SectionTitle>
      <SectionSubtitle>
        All patients that have not received their results for
        <BoldText> COVID-19 </BoldText>
        will need to ensure they stay isolated for a minimum of
        <BoldText> 14 days. </BoldText>
      </SectionSubtitle>
    </CovidInfoContent>
    <CovidInfoButton>See Details</CovidInfoButton>
  </CovidInformationWrapper>
);

export default CovidInformation;
