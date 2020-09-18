// @flow
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { LogoIcon } from '@app/components/icons/TheOrgLogo';

import s from './ErrorPage.css';

type Props = {
  error: ?Error,
};

class ErrorPage extends React.Component<Props> {
  static defaultProps = {
    error: null,
  };

  constructor(props: Props) {
    super(props);
    this.tO = null;
  }

  componentDidMount() {
    this.reload();
  }

  componentWillUnmount() {
    clearTimeout(this.tO);
  }

  props: Props;
  tO: ?TimeoutID;

  reload() {
    this.tO = setTimeout(() => {
      if (!__DEV__) window.location.reload(true);
      this.reload();
    }, 5000);
  }

  render() {
    if (__DEV__ && this.props.error) {
      return (
        <div style={{ padding: '30px' }}>
          <h1>{this.props.error.name}</h1>
          <pre>{this.props.error.stack}</pre>
        </div>
      );
    }

    return (
      <section>
        <a href="/">
          <LogoIcon width={60} />
          <div>THE ORG</div>
        </a>
        <h1>Whoops — we&apos;re sorry!</h1>
        <p>
          This page is temporarily down for maintenance. We&apos;ll be right
          back.
        </p>
      </section>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
