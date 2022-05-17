import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Logo from '@app/icons/logo.svg';

import styled from 'styled-components';
import { getSpacingPreset } from '@app/styles/theme/spacing';
import { media } from '@app/styles/media';

import MaxWidthContainer from '../MaxWidthContainer/MaxWidthContainer';

import s from './Footer.css';
import Link from '../Link/Link';

const StyledMaxwithContainer = styled(MaxWidthContainer)`
  height: ${getSpacingPreset('height-footer')};

  ${media.md`
    height: ${getSpacingPreset('height-footer-tablet')};
  `}

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

const Footer = () => (
  <footer className={s.root}>
    <StyledMaxwithContainer>
      <section className={s.topLinks}>
        <ul>
          <li>
            <Link title="Home" href="/">
              <Logo />
            </Link>
          </li>
          <li>
            <Link title="Scout" href="/scout">
              Scout
            </Link>
          </li>
          <li>
            <Link title="The Org Wiki" href="/wiki">
              Wiki
            </Link>
          </li>
          <li>
            <Link title="About The Org" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link title="Contact us at The Org" href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link title="Come work with us" href="/org/theorg/jobs">
              Careers
            </Link>
          </li>
          <li>
            <Link title="Send us an email" href="mailto:hello@theorg.com">
              hello@theorg.com
            </Link>
          </li>
        </ul>
      </section>
      <section className={s.legalSocial}>
        <ul>
          <li className={s.copyright}>© 2020 Orgio, Inc.</li>
          <li>
            <Link
              className={s.terms}
              title="Read our terms and conditions"
              href="/terms"
            >
              Terms
            </Link>
          </li>
          <li>
            <Link title="Read our privacy policy" href="/privacy">
              Privacy
            </Link>
          </li>
          <li>
            <Link title="Read our data policy" href="/data-policy">
              Data
            </Link>
          </li>
        </ul>
        <ul>
          <li>Visit us at:</li>
          <li>
            <Link
              title="The Org on Facebook"
              href="https://www.facebook.com/theorgcom"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link
              title="The Org on Twitter"
              to="https://twitter.com/theorgcom"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </Link>
          </li>
          <li>
            <Link title="Home" href="/org/theorg">
              The Org
            </Link>
          </li>
        </ul>
      </section>
    </StyledMaxwithContainer>
  </footer>
);

Footer.defaultProps = {
  style: null,
  className: null,
};

export default withStyles(s)(Footer);
