/* @flow */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import grumpyCatImageSrc from './grumpy.jpg';

import s from './NotFound.css';

const NotFound = () => (
  <div className={s.container}>
    <h1>Whoops — there&apos;s nothing here!</h1>
    <img alt="Angry cat for effect" src={grumpyCatImageSrc} />
  </div>
);
export default withStyles(s)(NotFound);
