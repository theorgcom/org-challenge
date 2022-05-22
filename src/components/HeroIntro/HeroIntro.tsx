import React, { FC } from 'react';
import {
  ButtonWrapper,
  IntroHeadline,
  IntroLink,
  IntroLinkButton,
  IntroSubtitle,
  IntroWrapper,
} from './style';

const HeroIntro: FC = () => (
  <IntroWrapper>
    <IntroHeadline>Transparency starts here</IntroHeadline>
    <IntroSubtitle>
      Join the world’s biggest professional community for teams
    </IntroSubtitle>
    <ButtonWrapper>
      <IntroLinkButton>Get started</IntroLinkButton>
      <IntroLink>Why The Org?</IntroLink>
    </ButtonWrapper>
  </IntroWrapper>
);

export default HeroIntro;
