import React from 'react';

import NotFound from './NotFound';

function action() {
  return {
    component: <NotFound />,
    status: 404,
  };
}

export default action;
