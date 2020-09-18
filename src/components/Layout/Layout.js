/* @flow */
import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Layout.css';

type Props = {
  children: React.Node,
};

const Layout = ({ children }: Props) => (
  <div className={s.root}>{children}</div>
);

export default withStyles(s)(Layout);
