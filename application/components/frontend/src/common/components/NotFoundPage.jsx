import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MainPageNavbar from 'main-page/components/MainPageNavbar';
import OverNavBar from 'main-page/components/OverNavBar';
import MainPageFooter from 'main-page/components/MainPageFooter';
import notFoundImage from 'images/not_found.svg';

const NotFoundWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;
  position: relative;
`;

const NotFoundPageContainer = styled.div.attrs({ className: 'not-found-page-container' })`
  width: 70%;
  margin: 0 auto;
`;

const NotFoundPageGrid = styled.div.attrs({ className: 'not-found-page-grid' })`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 2fr 1fr;
  margin-top: 100px;
`;

const NotFoundPageImage = styled.img.attrs({ className: 'not-found-page-image' })`
  width: 70%;
  display: block;
  margin: 0 auto;
`;

const NotFoundPageContent = styled.div.attrs({ className: 'not-found-page-image' })`
  width: 100%;
  padding-top: 60px;
`;

const NotFoundPageTitle = styled.p.attrs({ className: 'not-found-page-title' })`
  width: 100%;
  font-weight: 900;
  font-size: 160px;
  margin: 0;
  text-align: center;
  color: #2e4663;
`;

const NotFoundPageSubTitle = styled.p.attrs({ className: 'not-found-page-sub-title' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  margin-top: 0;
`;

const NotFoundPageButton = styled.button.attrs({ className: 'not-found-page-button' })`
  width: 70%;
  display: block;
  margin: 0 auto;
  padding: 15px 10px;
  background: #2e4663;
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const NotFoundPage = ({ history }) => (
  <NotFoundWrapper>
    <OverNavBar />
    <NotFoundPageContainer>
      <MainPageNavbar />
      <NotFoundPageGrid>
        <NotFoundPageImage src={notFoundImage} alt="notFoundImage" />
        <NotFoundPageContent>
          <NotFoundPageTitle>404</NotFoundPageTitle>
          <NotFoundPageSubTitle>Page Not Found</NotFoundPageSubTitle>
          <NotFoundPageButton onClick={history.goBack}>Go back</NotFoundPageButton>
        </NotFoundPageContent>
      </NotFoundPageGrid>
      <MainPageFooter />
    </NotFoundPageContainer>
  </NotFoundWrapper>
);

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NotFoundPage);
