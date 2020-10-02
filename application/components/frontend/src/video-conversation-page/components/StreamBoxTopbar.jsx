import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Colors from 'common/colors';

const StreamBoxTopbarWrapper = styled.div.attrs({ className: 'stream-box-topbar' })`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    'bar-left-area'
    'bar-right-area';

  height: 100%;
  background: ${Colors.WHITE};
  padding: 20px;
  border-bottom: 1px solid ${Colors.GALLERY};
  height: 14px;
  line-height: 14px;
`;

const TopBarLeft = styled.div.attrs({ className: 'top-bar-left' })`
  grid: bar-left-area;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
`;

const TopBarRight = styled.div.attrs({ className: 'top-bar-right' })`
  grid: bar-right-area;
  text-align: right;
`;

const LiveCount = styled.span.attrs({ className: 'live-count' })`
  background: #fff;
  padding: 5px 10px;
  text-align: center;
  font-size: 12px;
  border: 1px solid ${Colors.SCIENCE_BLUE};
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const LiveName = styled.span.attrs({ className: 'live-count' })`
  background: #2d4564;
  padding: 5px 15px;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
  border: 1px solid #2d4564;
  color: #fff;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const StreamBoxTopbar = ({ appointmentId }) => {
  return (
    <StreamBoxTopbarWrapper>
      <TopBarLeft>{`Room id: ${appointmentId}`}</TopBarLeft>
      <TopBarRight>
        <LiveCount>00:18:29</LiveCount>
        <LiveName>LIVE</LiveName>
      </TopBarRight>
    </StreamBoxTopbarWrapper>
  );
};

StreamBoxTopbar.propTypes = {
  appointmentId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  appointmentId: state.session.appointmentDetails.appointmentId,
});

export default connect(mapStateToProps, null)(StreamBoxTopbar);
