import styled from 'styled-components';
import Color from 'common/colors';

const Subtitle = styled.div.attrs({ className: 'n-subtitle' })`
  font-family: 'NokiaPureTextRegular';
  font-size: 13px;
  padding: 10px;
  color: ${Color.GRAY};
`;

export default Subtitle;
