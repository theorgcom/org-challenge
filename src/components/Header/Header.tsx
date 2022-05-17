import React from 'react';

import LogoAndText from '@app/icons/logo-and-text.svg';
import {
  LogoContainerLink,
  StyledHeader,
  StyledLink,
  StyledLinkButton,
  StyledMaxWidthContainer,
  StyledNav,
} from './styles';

export default (): JSX.Element => (
  <StyledHeader>
    <StyledMaxWidthContainer>
      <LogoContainerLink title="The Org Home" href="/">
        <LogoAndText />
      </LogoContainerLink>
      <StyledNav>
        <StyledLink href="/login">Login</StyledLink>
        <StyledLinkButton href="/sign-up">Sign up</StyledLinkButton>
      </StyledNav>
    </StyledMaxWidthContainer>
  </StyledHeader>
);
