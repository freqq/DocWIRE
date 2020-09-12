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

const Placeholder = ({ customClassName, alt, title, subtitle, src }) => (
  <PlaceholderContainer customClassName={customClassName}>
    <Img src={src} alt={alt} />
    <Center>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
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
