/* @flow */
import * as React from 'react';

import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './MaxWidthContainer.css';

type Props = {
  children: Array<React.Node> | React.Node,
  className: string,
};

const MaxWidthContainer = ({ children, className }: Props) => (
  <div className={classnames([s.root, className])}>{children}</div>
);

export default withStyles(s)(MaxWidthContainer);
