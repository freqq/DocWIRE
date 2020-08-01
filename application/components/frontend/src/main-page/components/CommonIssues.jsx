import React from 'react';
import styled from 'styled-components';
import IssueCard from 'main-page/components/IssueCard';
import CommonIssuesNavigation from 'main-page/components/CommonIssuesNavigation';

import pharmacyIcon from 'images/icons/main-page/pharmacy.svg';
import dnaIcon from 'images/icons/main-page/dna.svg';
import earIcon from 'images/icons/main-page/ear.svg';

const CommonIssuesWrapper = styled.div.attrs({ className: 'common-issues-wrapper' })`
  width: 50%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const ISSUE_CARDS = [
  {
    id: 0,
    name: 'Block Pain',
    image: pharmacyIcon,
  },
  {
    id: 1,
    name: 'Hearing Problems',
    image: earIcon,
  },
  {
    id: 2,
    name: 'DNA Pain',
    image: dnaIcon,
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
