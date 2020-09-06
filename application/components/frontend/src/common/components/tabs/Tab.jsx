import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabItem = styled.li.attrs({ className: 'tab-item' })`
  margin: 0 20px;
  padding: 10px 0 20px 0;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  border-bottom: ;
  font-size: 12px;
  font-family: 'Titillium Web', sans-serif;
  color: #919fac;

  &:hover {
    border-bottom: 2px solid #456aa0;
    color: #2e3b5c;
  }
`;

const ACTIVE_TAB = { borderBottom: '2px solid #456aa0', color: '#2e3b5c' };

const Tab = ({ activeTab, label, onClick }) => {
  const onClickMethod = () => {
    onClick(label);
  };

  return (
    <TabItem style={activeTab === label ? ACTIVE_TAB : {}} onClick={onClickMethod}>
      {label}
    </TabItem>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
