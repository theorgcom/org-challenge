/* @flow */
import * as React from 'react';

import PropTypes from 'prop-types';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import theme from '@app/styles/theme';

import Header from '@app/components/Header';
import Footer from '@app/components/Footer';

import Layout from '@app/components/Layout';
import { GlobalStyle } from '@app/styles/GlobalStyle';

type Context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: () => void;
};

interface Props {
  context: Context;
  children: React.ReactNode;
  client: ApolloClient<any>;
}

class App extends React.PureComponent<Props> {
  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext(): Context {
    return this.props.context;
  }

  render(): JSX.Element {
    return (
      <ApolloProvider client={this.props.client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Header />
            {this.props.children}
            <Footer />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
