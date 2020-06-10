import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Title, Subtitle, Center } from 'common/components/TextTransform';

const PlaceholderContainer = styled.div.attrs({
  className: props => `${props.customClassName}`,
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px;
`;

const Img = styled.img.attrs({
  src: props => props.src,
  alt: props => props.alt,
})``;

const Placeholder = props => (
  <PlaceholderContainer customClassName={props.customClassName}>
    <Img src={props.src} alt={props.alt} />
    <Center>
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </Center>
  </PlaceholderContainer>
);

Placeholder.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  customClassName: PropTypes.string,
};

Placeholder.defaultProps = {
  customClassName: '',
  subtitle: '',
};

export default Placeholder;
