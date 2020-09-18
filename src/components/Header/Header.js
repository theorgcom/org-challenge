/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { LogoIcon, LogoTextIcon } from '@app/components/icons/TheOrgLogo';
import MaxWidthContainer from '@app/components/MaxWidthContainer';

import s from './Header.css';

const Header = () => (
  <header className={s.root}>
    <MaxWidthContainer className={s.container}>
      <a title="The Org Home" href="/" className={s.logoContainer}>
        <LogoIcon />
        <LogoTextIcon className={s.logoText} />
      </a>
      <div className={s.control}>
        <a className={s.controlAction} href="/login">
          Login
        </a>
        <a className={s.button} href="/sign-up">
          Sign up
        </a>
      </div>
    </MaxWidthContainer>
  </header>
);

export default withStyles(s)(Header);
