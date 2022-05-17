import React from 'react';

import { getMarkupFromTree } from '@apollo/client/react/ssr';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import nodeFetch from 'node-fetch';
import ReactDOM from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';
import createApolloClient from './apollo/createApolloClient/createApolloClient.server';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import config from './config';
import { ComponentReturnType, RedirectionReturnType } from './routes/types';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (__DEV__) {
  app.enable('trust proxy');
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    if (req.path.substr(-1) === '/' && req.path.substr(0) !== '/') {
      res.redirect(301, req.path.substr(0, req.path.length - 1));
      return;
    }
    const styledSheet = new ServerStyleSheet();
    const css = new Set();

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      userAgent: 'TheOrg/1.100.x (Lambda) node-fetch',
    });

    const apolloClient = createApolloClient({
      fetch,
    });

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
    };

    const route = await router.resolve({
      ...context,
      cookies: req.cookies,
      pathname: req.path,
      query: req.query,
    });

    if (route && (route as RedirectionReturnType).redirect) {
      res.redirect(
        route.status || 301,
        (route as RedirectionReturnType).redirect,
      );
    }

    const statsFile = path.resolve(__dirname, './loadable-stats.json');
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
    });

    const jsx = extractor.collectChunks(
      <App context={context} client={apolloClient}>
        {(route as ComponentReturnType)?.component}
      </App>,
    );

    const data = {
      ...route,
      children: await getMarkupFromTree({
        renderFunction: ReactDOM.renderToString,
        tree: styledSheet.collectStyles(jsx),
      }),
      styles: [{ id: 'css', cssText: [...css].join('') }],
      styledComponentsStyles: styledSheet.getStyleElement(),
      scripts: extractor.getScriptElements(),
      app: {
        apolloState: apolloClient.extract(),
      },
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

    res.status(route?.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
app.use((err, _, res) => {
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      app={{}}
      scripts={[]}
      styledComponentsStyles={[]}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
