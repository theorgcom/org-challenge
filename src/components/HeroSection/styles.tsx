import { getSpacingPreset } from '@app/styles/theme/spacing';
import styled from 'styled-components';

import { media } from '@app/styles/media';

export const HeroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${getSpacingPreset('height-header')});
  padding: 0 ${getSpacingPreset('sp-4')};
  ${media.md`
    flex-direction: row;
  `}
  }
`;
const StyledSection = styled.div`
  height: 50%;
  ${media.md`
    height: 100%;
    width:50%;
  `}
`;

export const LeftSection = styled(StyledSection)``;

export const RightSection = styled(StyledSection)``;
