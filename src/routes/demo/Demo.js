/* @flow */
import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Demo.css';
import type { Brand } from './assets/brand-data';

type Props = {
  brands: Array<Brand>,
  brandsLoading: boolean,
};

const Demo = (
  { brands, brandsLoading }: Props, // eslint-disable-line
) => (
  /* console.log('This is the data from the brands "service"',brands); */
  <section className={s.one}>{/* ... */}</section>
);

export default withStyles(s)(Demo);
