import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import deepForceUpdate from 'react-deep-force-update';
import Scroll from 'react-scroll';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import { loadableReady } from '@loadable/component';
import { Action, Location as HistoryLocation } from 'history';

import App from './components/App';
import createFetch from './createFetch';
import history from './history';
import createApolloClient from './apollo/createApolloClient/createApolloClient.client';
import router from './router';

import { ComponentReturnType, RedirectionReturnType } from './routes/types';
import { SDLValidationContext } from 'graphql/validation/ValidationContext';

// Universal HTTP client
global.fetch = createFetch(window.fetch, {
  userAgent: `TheOrg/web-client node-fetch`,
});

const apolloClient = createApolloClient({
  fetchImpl: fetch,
});

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

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const scroll = Scroll.animateScroll;

const onRenderComplete = (
  location: HistoryLocation,
  isInitialRender: boolean,
) => {
  if (isInitialRender) {
    const elem = document.getElementById('css');
    if (elem) elem.parentNode?.removeChild(elem);

    return;
  }
  let scrollX = 0;
  let scrollY = 0;
  const pos = scrollPositionsHistory[location.pathname];
  if (pos) {
    scrollX = pos.scrollX;
    scrollY = pos.scrollY;
  }

  // Restore the scroll position if it was saved into the state
  // or scroll to the given #hash anchor
  // or scroll to top of the page
  window.scrollTo(scrollX, scrollY);
};

const container = document.getElementById('app');
let appInstance;
let currentLocation = history.location;

// Re-render the app when window.location changes
async function onLocationChange(
  location: HistoryLocation<Record<string, unknown>>,
  action: Action | undefined,
) {
  const isInitialRender = !action;

  // If path doesn't actually change don't reload component
  const locationKey = location.pathname;
  const currentLocationKey = currentLocation.pathname;
  if (!isInitialRender && locationKey === currentLocationKey) {
    scroll.scrollToTop();
    return;
  }

  // Remember the latest scroll position for the previous location
  if (currentLocation) {
    scrollPositionsHistory[currentLocation.pathname] = {
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    };
  }
  currentLocation = location;

  try {
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const path = location.pathname;
    const route = await router.resolve({
      ...context,
      cookies: Cookies.get(),
      pathname: path,
      query: queryString.parse(location.search),
    });

    // Prevent multiple page renders during the routing process
    if (currentLocation.pathname !== location.pathname) {
      // return;
    }

    if (route && (route as RedirectionReturnType).redirect) {
      history.replace((route as RedirectionReturnType).redirect);
      return;
    }

    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = await loadableReady(() => {
      renderReactApp(
        <App context={context} client={apolloClient}>
          {(route as ComponentReturnType)?.component}
        </App>,
        container,
        () => onRenderComplete(location, isInitialRender),
      );
    });
  } catch (error) {
    if (__DEV__) {
      throw error;
    }
    // Do a full page reload if error occurs during client-side navigation
    if (action && currentLocation.pathname === location.pathname) {
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);

onLocationChange(currentLocation, undefined);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation, undefined);
  });
}
