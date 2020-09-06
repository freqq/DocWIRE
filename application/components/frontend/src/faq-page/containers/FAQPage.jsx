import React, { useState } from 'react';
import styled from 'styled-components';

import SearchFAQ from 'faq-page/components/SearchFAQ';
import GettingStarted from 'faq-page/components/tabs/GettingStarted';

import startIcon from 'images/icons/start.svg';
import pricingIcon from 'images/icons/pricing.svg';
import algorihtmsIcon from 'images/icons/algorithms.svg';
import guideIcon from 'images/icons/guide.svg';

const FAQPageWrapper = styled.div.attrs({ className: 'faq-page-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
`;

const FAQContainer = styled.div.attrs({ className: 'faq-container' })`
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  background: #ffffff;
  border-radius: 3px;
  height: calc(100% - 20px);
  width: 100%;
  overflow: hidden;
  padding-bottom: 20px;
`;

const PageTitle = styled.div.attrs({ className: 'page-title' })`
  text-align: center;
  font-size: 40px;
  font-weight: 100;
  width: 100%;
  margin: 40px 0 20px 0;
`;

const PageSubTitle = styled.div.attrs({ className: 'page-sub-title' })`
  text-align: center;
  font-size: 14px;
  font-weight: 100;
  width: 100%;
  margin: 20px 0;
`;

const FAQCategoriesWrapper = styled.div.attrs({ className: 'faq-categories-wrapper' })`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 70%;
  margin: 0 auto;
`;

const CategoryCard = styled.div.attrs({ className: 'category-card' })`
  background: #fafbfd;
  width: calc(100% - 20px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 20px 15px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.04);
  }
`;

const CategoryIcon = styled.img.attrs({ className: 'category-icon' })`
  display: block;
  width: 20px;
  margin: 0 auto 20px auto;
`;

const CategoryName = styled.div.attrs({ className: 'category-name' })`
  display: block;
  width: 25px;
  font-weight: 100;
  text-align: center;
  width: 100%;
  font-size: 12px;
`;

const FAQ_CATEGORIES = [
  {
    id: 1,
    name: 'Getting started',
    icon: startIcon,
  },
  {
    id: 2,
    name: 'Pricing',
    icon: pricingIcon,
  },
  {
    id: 3,
    name: 'Diagnose Algorithms',
    icon: algorihtmsIcon,
  },
  {
    id: 4,
    name: 'Usage Guides',
    icon: guideIcon,
  },
];

const FAQPage = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <FAQPageWrapper>
      <FAQContainer>
        <PageTitle>Hello, how can we help you?</PageTitle>
        <SearchFAQ searchValue={searchValue} setSearchValue={setSearchValue} />
        <PageSubTitle>or choose a category to quickly find the help you need</PageSubTitle>
        <FAQCategoriesWrapper>
          {FAQ_CATEGORIES.map(faqCategory => (
            <CategoryCard key={faqCategory.id}>
              <CategoryIcon src={faqCategory.icon} alt="category-icon" />
              <CategoryName>{faqCategory.name}</CategoryName>
            </CategoryCard>
          ))}
        </FAQCategoriesWrapper>
        <GettingStarted />
      </FAQContainer>
    </FAQPageWrapper>
  );
};

export default FAQPage;
