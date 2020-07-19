import React from 'react';
import styled from 'styled-components';
import IssueCard from 'main-page/components/IssueCard';
import CommonIssuesNavigation from 'main-page/components/CommonIssuesNavigation';

import boneIcon from 'images/icons/bone.svg';
import lungsIcon from 'images/icons/lungs.svg';
import earIcon from 'images/icons/ear.svg';

const CommonIssuesWrapper = styled.div.attrs({ className: 'common-issues-wrapper' })`
  width: 60%;
  margin-top: 50px;
`;

const ISSUE_CARDS = [
  {
    id: 0,
    name: 'Infections',
    image: lungsIcon,
  },
  {
    id: 1,
    name: 'Hearing Problems',
    image: earIcon,
  },
  {
    id: 2,
    name: 'Joint Pain',
    image: boneIcon,
  },
];

const CommonIssues = () => (
  <CommonIssuesWrapper>
    {ISSUE_CARDS.map(issue => (
      <IssueCard key={issue.id} name={issue.name} image={issue.image} />
    ))}
    <CommonIssuesNavigation isNext isPrevious={false} />
  </CommonIssuesWrapper>
);

export default CommonIssues;
