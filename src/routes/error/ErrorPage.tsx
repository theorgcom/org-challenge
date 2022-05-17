import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Logo from '@app/icons/logo.svg';

import s from './ErrorPage.css';

interface Props {
  error?: Error | null;
}

const ErrorPage = ({ error = null }: Props) => {
  if (__DEV__ && error) {
    return (
      <div style={{ padding: '30px' }}>
        <h1>{error.name}</h1>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return (
    <section>
      <a href="/">
        <Logo />
        <div>THE ORG</div>
      </a>
      <h1>Whoops — we&apos;re sorry!</h1>
      <p>
        This page is temporarily down for maintenance. We&apos;ll be right back.
      </p>
    </section>
  );
};

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
