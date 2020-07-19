import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IssueCardWrapper = styled.div.attrs({ className: 'issue-card-wrapper' })`
  border-radius: 5px;
  padding: 30px 10px;
  height: calc(100%-20px);
  border: 1px solid #f0f0f0;
  display: inline-block;
  width: calc(33% - 40px);
  margin-right: 20px;
  transition: 0.2s;
  cursor: pointer;
  -webkit-box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  -mozbox-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  background: #ffffff;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img.attrs({ className: 'card-image' })`
  width: 50px;
  display: block;
  margin: 0 auto;
`;

const CardName = styled.p.attrs({ className: 'card-name' })`
  font-size: 12px;
  marign: 0;
  text-align: center;
  width: 100%;
`;

const IssueCard = ({ name, image }) => (
  <IssueCardWrapper>
    <CardImage src={image} alt="card-image" />
    <CardName>{name}</CardName>
  </IssueCardWrapper>
);

IssueCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
};

export default IssueCard;
