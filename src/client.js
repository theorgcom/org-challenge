import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';

import App from './components/App';
import history from './history';
import router from './router';

/* eslint-disable global-require */

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
};

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  try {
    const path = location.pathname;
    const isInitialRender = !action;

    const route = await router.resolve({
      ...context,
      path,
      query: queryString.parse(location.search),
    });

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    currentLocation = location;

    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(
      <App context={context}>{route.component}</App>,
      container,
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
