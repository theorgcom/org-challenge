import React from 'react';

import { getSpacingPreset } from '@app/styles/theme/spacing';
import styled from 'styled-components';
import MaxWidthContainer from '../MaxWidthContainer/MaxWidthContainer';
import Link from '../Link/Link';

export const StyledHeader = styled.header`
  background-color: #fff;
  z-index: 410;
  transform: translateY(0);
  opacity: 1;
  transition: transform 200ms ease, opacity 200ms ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
  box-shadow: 0px 9px 12px -10px #3333381a;
`;

export const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${getSpacingPreset('height-header')};
`;

export const LogoContainerLink = styled(Link)`
  margin-right: 20px;
  outline: 0;
  display: flex;
  align-items: center;
  text-decoration: none;

  svg {
    path {
      fill: ${props => props.theme.color('neutral')('s100')};
    }
  }
`;

export const StyledNav = styled.div`
  position: relative;
  display: flex;
  margin-left: auto;
  align-items: center;
  height: 39px;
  outline: none;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: normal;
  white-space: nowrap;
  font-size: 15px;
  margin-left: 10px;
  padding: 0 30px;
  cursor: pointer;
  outline: none;
  line-height: 1.5;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const StyledLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
  transition: all 100ms ease;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  height: 40px;
  min-width: 0;
  font-size: 15px;
  line-height: 20px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 10px;
  background-color: ${props => props.theme.color('primary')('s100')};
  color: white;

  &:hover {
    opacity: 0.8;
    color: white !important;
  }
`;
