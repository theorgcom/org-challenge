import React from 'react';
import ErrorPage from './ErrorPage';

function action() {
  return {
    component: <ErrorPage />,
    status: 503,
  };
}

export default action;
