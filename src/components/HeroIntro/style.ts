import styled from 'styled-components';

import { media } from '@app/styles/media';
import { getFont, getFontSize, getLineHeight } from '@app/styles/theme/font';
import { StyledLinkButton } from '../Header/styles';

export const IntroWrapper = styled.div`
  max-width: 418px;
`;

export const IntroHeadline = styled.h1`
  font-family: ${getFont('primary')};
  font-style: normal;
  font-weight: 700;
  font-size: ${getFontSize('fs105')};
  line-height: ${getLineHeight('lh2')};
  /* or 127% */
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: center;
  color: #000000;
  ${media.sm`
    font-size: ${getFontSize('fs125')}
  `}
  ${media.md`
    text-align: left;
  `}
`;

export const IntroSubtitle = styled.p`
  font-family: ${getFont('primary')};
  font-style: normal;
  font-weight: 400;
  font-size: ${getFontSize('fs65')};
  line-height: ${getLineHeight('lh4')};
  /* or 154% */
  text-align: center;
  color: #767676;
  ${media.md`
    text-align: left;
  `}
`;

export const IntroLinkButton = styled(StyledLinkButton)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 4px;
  background: #1e2ff1;
  border-radius: 10px;
  font-size: ${getFontSize('fs5')};
  line-height: ${getLineHeight('lh4')};
  /* or 34px */
  color: #ffffff;
  height: 56px;
`;

export const IntroLink = styled(IntroLinkButton)`
  font-family: ${getFont('primary')};
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 156.7%;
  background: #fff;
  color: #000000;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  > * {
    width: 100%;
  }

  ${media.sm`
    gap: 0;
    flex-direction: row;
  `}

  ${media.md`
    width: 94%;
  `}
`;
