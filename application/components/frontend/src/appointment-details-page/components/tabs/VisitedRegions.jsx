import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const VisitedRegionsWrapper = styled.div.attrs({ className: 'visited-regions-wrapper' })`
  padding: 20px;
`;

const VisitedRegionsList = styled.ul.attrs({ className: 'visited-regions-list' })`
  margin: 0;
  padding: 0 0 0 20px;
`;

const VisitedRegionsItem = styled.li.attrs({ className: 'visited-regions-item' })`
  margin: 0;
  padding: 0;
`;

const VisitedRegions = ({ visitedRegionsData }) => (
  <VisitedRegionsWrapper>
    <VisitedRegionsList>
      {visitedRegionsData.map(region => (
        <VisitedRegionsItem>{region}</VisitedRegionsItem>
      ))}
    </VisitedRegionsList>
  </VisitedRegionsWrapper>
);

VisitedRegions.propTypes = {
  visitedRegionsData: PropTypes.instanceOf(Object).isRequired,
};

export default VisitedRegions;
