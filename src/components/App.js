/* @flow */
import * as React from 'react';

import PropTypes from 'prop-types';

import Header from '@app/components/Header';
import Footer from '@app/components/Footer';

import Layout from '@app/components/Layout';

type Context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: () => void,
};

type Props = {
  context: Context,
  children: React.Node,
};

class App extends React.PureComponent<Props> {
  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <Layout>
        <Header />
        {this.props.children}
        <Footer />
      </Layout>
    );
  }
}

export default App;
