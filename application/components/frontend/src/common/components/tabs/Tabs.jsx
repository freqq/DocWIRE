import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tab from 'common/components/tabs/Tab';

const ProfileMenu = styled.ul.attrs({ className: 'profile-menu' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
`;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ProfileMenu className="tab-list">
        {children.map(child => {
          const { label } = child.props;

          return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
        })}
      </ProfileMenu>
      <div className="tab-content">
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
