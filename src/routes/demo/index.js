import React from 'react';
import brands from './assets/brand-data';

import Demo from './Demo';

function action() {
  return {
    component: <Demo brands={brands} brandsLoading={false} />,
  };
}
export default action;
