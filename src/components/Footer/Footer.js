// @flow
import React from 'react';

import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import type { Style } from 'react-style-proptype/src/Style.flow';

import { LogoIcon } from '@app/components/icons/TheOrgLogo';

import s from './Footer.css';

type Props = {
  style?: Style,
  className?: ?string,
};

const Footer = ({ className, style }: Props) => (
  <footer className={classnames([s.root, className])} style={style}>
    <div className={s.container}>
      <section className={s.topLinks}>
        <ul>
          <li>
            <a title="Home" href="/">
              <LogoIcon width={34} />
            </a>
          </li>
          <li>
            <a title="Scout" href="/scout">
              Scout
            </a>
          </li>
          <li>
            <a title="The Org Wiki" href="/wiki">
              Wiki
            </a>
          </li>
          <li>
            <a title="About The Org" href="/about">
              About
            </a>
          </li>
          <li>
            <a title="Contact us at The Org" href="/contact">
              Contact
            </a>
          </li>
          <li>
            <a title="Come work with us" href="/org/theorg/jobs">
              Careers
            </a>
          </li>
          <li>
            <a title="Send us an email" href="mailto:hello@theorg.com">
              hello@theorg.com
            </a>
          </li>
        </ul>
      </section>
      <section className={s.legalSocial}>
        <ul>
          <li className={s.copyright}>© 2020 Orgio, Inc.</li>
          <li>
            <a
              className={s.terms}
              title="Read our terms and conditions"
              href="/terms"
            >
              Terms
            </a>
          </li>
          <li>
            <a title="Read our privacy policy" href="/privacy">
              Privacy
            </a>
          </li>
          <li>
            <a title="Read our data policy" href="/data-policy">
              Data
            </a>
          </li>
        </ul>
        <ul>
          <li>Visit us at:</li>
          <li>
            <a
              title="The Org on Facebook"
              href="https://www.facebook.com/theorgcom"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              title="The Org on Twitter"
              to="https://twitter.com/theorgcom"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a title="Home" href="/org/theorg">
              The Org
            </a>
          </li>
        </ul>
      </section>
    </div>
  </footer>
);

Footer.defaultProps = {
  style: null,
  className: null,
};

export default withStyles(s)(Footer);
