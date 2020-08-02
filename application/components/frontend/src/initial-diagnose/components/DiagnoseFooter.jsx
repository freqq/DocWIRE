import React from 'react';
import styled from 'styled-components';

const DiagnoseFooterWrapper = styled.div.attrs({ className: 'diagnose-footer-wrapper' })`
  width: 100%;
  font-size: 12px;
  margin-top: 20px;
  font-weight: 100;
  color: #2e4663;
`;

const DiagnoseFooterList = styled.ul.attrs({ className: 'diagnose-footer-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const DiagnoseFooterListItem = styled.li.attrs({ className: 'diagnose-footer-list-item' })`
  margin: 0 25px;
  display: inline-block;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: #4e93d7;
  }
`;

const FOOTER_ITEMS = [
  {
    id: 1,
    content: 'CE Marking',
  },
  {
    id: 2,
    content: 'For business',
  },
  {
    id: 3,
    content: 'Terms of Service',
  },
  {
    id: 4,
    content: 'Privacy Policy',
  },
];

const DiagnoseFooter = () => {
  return (
    <DiagnoseFooterWrapper>
      <DiagnoseFooterList>
        {FOOTER_ITEMS.map(item => (
          <DiagnoseFooterListItem key={item.id}>{item.content}</DiagnoseFooterListItem>
        ))}
      </DiagnoseFooterList>
    </DiagnoseFooterWrapper>
  );
};

export default DiagnoseFooter;
