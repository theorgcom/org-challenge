import styled from 'styled-components';

import { media } from '@app/styles/media';
import MaxWidthContainer from '../MaxWidthContainer/MaxWidthContainer';

export const HeroSection = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: column-reverse;
  padding-top: 46px;
  padding-bottom: 40px;
  ${media.sm`
    padding-top: 56px;
    padding-bottom: 64px;
  `}

  ${media.md`
  padding-top: 112px;
  padding-bottom: 115px;
  flex-direction: row;
  justify-content: space-between
`}
`;
