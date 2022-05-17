import { createGlobalStyle } from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const GlobalStyle = createGlobalStyle`
  html {
    color: ${props => props.theme.color('neutral')('s100')};
    font-size: 14px;
    font-family: ${props => props.theme.font.type('primary')};
    line-height: 1.375; /* ~22px */
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    /* -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility; */
  }

  body {
    margin: 0;
    background-color: ${props => props.theme.color('neutral')('s0')};
    -webkit-tap-highlight-color: transparent;
    overflow-x: hidden;
  }

  a {
    color: ${props => props.theme.color('neutral')('s100')};
    text-decoration: none;

    /* target all anchors and turn them cta color on hover */
    &:hover {
      color: ${props => props.theme.color('primary')('s100')};
    }
  }
`;
