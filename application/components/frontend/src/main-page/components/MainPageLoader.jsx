import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Redirect } from 'react-router';
import { DIAGNOSE_PATH } from 'RootRouter';

import loadingThreeDots from 'images/three-dots.svg';
import mainLogo from 'images/main_logo.svg';

import 'main-page/components/styles/MainPageLoader.css';

const MainPageLoaderWrapper = styled.div.attrs({ className: 'main-page-loader-wrapper' })`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  -webkit-transition: 0.5s;
  overflow: hidden;
`;

const MainLoaderWrapper = styled.div.attrs({ className: 'main-loader-wrapper' })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MainLogo = styled.img.attrs({ className: 'main-logo' })`
  height: 90px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const MainLoader = styled.img.attrs({ className: 'main-loader' })`
  height: 25px;
  display: block;
  margin: 10px auto;

  &:hover {
    opacity: 0.8;
  }
`;

const REDIRECT_TIME = 3000;

const MainPageLoader = ({ startDiagnose }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShouldRedirect(true);
    }, REDIRECT_TIME);
  });

  return shouldRedirect ? (
    <Redirect to={DIAGNOSE_PATH} />
  ) : (
    <CSSTransition in={startDiagnose} timeout={500} classNames="diagnose-loader" unmountOnExit>
      <MainPageLoaderWrapper>
        <MainLoaderWrapper>
          <MainLogo src={mainLogo} alt="mainLogo" />
          <MainLoader src={loadingThreeDots} alt="loadingThreeDots" />
        </MainLoaderWrapper>
      </MainPageLoaderWrapper>
    </CSSTransition>
  );
};

MainPageLoader.propTypes = {
  startDiagnose: PropTypes.instanceOf(Object).isRequired,
};

export default MainPageLoader;
