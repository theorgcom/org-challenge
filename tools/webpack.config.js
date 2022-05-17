/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const overrideRules = require('./lib/overrideRules');
const pkg = require('../package.json');
const Dotenv = require('dotenv-webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');

const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze =
  process.argv.includes('--analyze') || process.argv.includes('--analyse');

const reScript = /\.(m?jsx?|tsx?)$/;
const reGraphql = /\.(graphql|gql)$/;
const reStyle = /\.(css|less|scss|sss)$/;
const reImage = /\.(bmp|gif|jpe?g|png|svg)$/;
const reFont = /\.(ttf|woff|woff2)$/;
const staticAssetName = isDebug
  ? '[path][name].[ext]?[hash:8]'
  : '[hash:8].[ext]';

const version = `${pkg.version}+${process.env.CODEBUILD_BUILD_NUMBER || '1'}`;
const publicPathPrefix = process.env.PUBLIC_PATH_PREFIX || '';

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  mode: isDebug ? 'development' : 'production',

  context: path.resolve(__dirname, '..'),

  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: `${publicPathPrefix}/assets/`,
    pathinfo: isVerbose,
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath),
  },

  resolve: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // Keep in sync with .flowconfig and .eslintrc
    modules: ['node_modules', 'src'],
    alias: {
      '@app': path.resolve(__dirname, '../src'),
    },
    extensions: ['.mjs', '.ts', '.tsx', '.jsx', '.js'],
  },

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // Rules for JS / JSX
      {
        test: reScript,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/parse5'),
          path.resolve(__dirname, '../node_modules/react-markdown'),
          path.resolve(__dirname, '../node_modules/striptags'),
        ],

        loader: 'babel-loader',

        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          compact: !isDebug,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            [
              '@babel/env',
              {
                targets: {
                  browsers: pkg.browserslist,
                  uglify: true,
                },
                modules: false,
                useBuiltIns: false,
                debug: false,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            // Adds component stack to warning messages
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-@babel/transform-react-jsx-source
            ...(isDebug ? ['@babel/transform-react-jsx-source'] : []),
            // Adds __self attribute to JSX which React will use for some warnings
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
            ...(isDebug ? ['@babel/transform-react-jsx-self'] : []),
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',
            '@loadable/babel-plugin',
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true,
              },
            ],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',
            '@babel/plugin-proposal-optional-chaining',
            ...(!isDebug
              ? [
                  [
                    'react-remove-properties',
                    { properties: ['data-testid', 'data-e2e-id'] },
                  ],
                ]
              : []),
            ['styled-components', { ssr: true, displayName: isDebug }],
          ],
        },
      },
      // Rules for GraphQL
      {
        test: reGraphql,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      // Rules for Style Sheets
      {
        test: reStyle,
        rules: [
          // Convert CSS into JS module
          {
            issuer: { not: [reStyle] },
            use: 'isomorphic-style-loader',
          },

          // Process external/third-party styles
          {
            exclude: path.resolve(__dirname, '../src'),
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
              minimize: !isDebug,
              discardComments: { removeAll: true },
            },
          },

          // Process internal/project styles (from src folder)
          {
            include: path.resolve(__dirname, '../src'),
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug
                ? '[name]-[local]-[hash:base64:5]'
                : '[hash:base64:5]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
              discardComments: { removeAll: true },
            },
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './tools/postcss.config.js',
              },
            },
          },

          // Compile Less to CSS
          // https://github.com/webpack-contrib/less-loader
          // Install dependencies before uncommenting: yarn add --dev less-loader less
          // {
          //   test: /\.less$/,
          //   loader: 'less-loader',
          // },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          // {
          //   test: /\.scss$/,
          //   loader: 'sass-loader',
          // },
        ],
      },

      // Rules for fonts
      {
        test: reFont,
        issuer: reStyle,
        loader: 'file-loader',
        options: {
          name: staticAssetName,
        },
      },

      // Rules for images
      {
        test: reImage,
        exclude: [path.resolve(__dirname, '../src/icons')],
        oneOf: [
          // Inline lightweight images into CSS
          {
            issuer: reStyle,
            oneOf: [
              // Inline lightweight SVGs as UTF-8 encoded DataUrl string
              {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                  name: staticAssetName,
                  limit: 4096, // 4kb
                },
              },

              // Inline lightweight images as Base64 encoded DataUrl string
              {
                loader: 'url-loader',
                options: {
                  name: staticAssetName,
                  limit: 4096, // 4kb
                },
              },
            ],
          },

          // Or return public URL to image resource
          {
            loader: 'file-loader',
            options: {
              name: staticAssetName,
              useRelativePath: false,
            },
          },
        ],
      },

      // SVG icons as react components
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src/icons')],
        use: {
          loader: 'svg-react-loader',
        },
      },

      // Convert plain text into JS module
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },

      // Return public URL for all assets unless explicitly excluded
      // DO NOT FORGET to update `exclude` list when you adding a new loader
      {
        exclude: [
          reScript,
          reStyle,
          reImage,
          reFont,
          reGraphql,
          /\.json$/,
          /\.txt$/,
          /\.md$/,
        ],
        loader: 'file-loader',
        options: {
          name: staticAssetName,
        },
      },

      // Exclude dev modules from production build
      ...(isDebug
        ? []
        : [
            {
              test: path.resolve(
                __dirname,
                '../node_modules/react-deep-force-update/lib/index.js',
              ),
              loader: 'null-loader',
            },
          ]),
    ],
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  // Specify what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose,
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = {
  ...config,

  name: 'client',
  target: 'web',

  entry: {
    client: ['./tools/polyfills.js', './src/client.tsx'],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
        // https://webpack.js.org/plugins/commons-chunk-plugin/
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimize: !isDebug,
    minimizer: [
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          warnings: isVerbose,
          ie8: false,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

  plugins: [
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __VERSION__: `"${version}"`,
      __DEV__: isDebug,
      __PATH_PREFIX__: `"${publicPathPrefix}"`,
    }),

    // Emit a file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),

    new LoadablePlugin({
      writeToDisk: {
        filename: path.resolve(__dirname, '../build'),
      },
    }),

    // Webpack Bundle Analyzer
    // https://github.com/th0r/webpack-bundle-analyzer
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
    // https://docs.bugsnag.com/build-integrations/webpack/
    ...(process.env.BUGSNAG_CLIENT_API_KEY
      ? [
          new BugsnagSourceMapUploaderPlugin({
            apiKey: process.env.BUGSNAG_CLIENT_API_KEY,
            appVersion: version,
            overwrite: true,
            publicPath: 'https://*theorg.com/assets',
          }),
        ]
      : []),
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.js.org/configuration/node/
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // Choose a developer tool to enhance debugging
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: isDebug ? 'eval-cheap-module-source-map' : 'hidden-source-map',
};

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = {
  ...config,

  name: 'server',
  target: 'node',

  entry: {
    server: ['./tools/polyfills.js', './src/server.tsx'],
  },

  output: {
    ...config.output,
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },

  // Webpack mutates resolve object, so clone it to avoid issues
  // https://github.com/webpack/webpack/issues/4817
  resolve: {
    ...config.resolve,
  },

  module: {
    ...config.module,

    rules: overrideRules(config.module.rules, rule => {
      // Override babel-preset-env configuration for Node.js
      if (rule.loader === 'babel-loader') {
        return {
          ...rule,
          options: {
            ...rule.options,
            presets: rule.options.presets.map(preset =>
              preset[0] !== 'env'
                ? preset
                : [
                    'env',
                    {
                      targets: {
                        node: pkg.engines.node.match(/(\d+\.?)+/)[0],
                      },
                      modules: false,
                      useBuiltIns: false,
                      debug: false,
                    },
                  ],
            ),
          },
        };
      }

      // Override paths to static assets
      if (
        rule.loader === 'file-loader' ||
        rule.loader === 'url-loader' ||
        rule.loader === 'svg-url-loader'
      ) {
        return {
          ...rule,
          options: {
            ...rule.options,
            name: `public/assets/${rule.options.name}`,
            publicPath: url => url.replace(/^public/, publicPathPrefix),
          },
        };
      }

      return rule;
    }),
  },

  externals: [
    './assets.json',
    nodeExternals({
      whitelist: [reStyle, reImage],
    }),
  ],

  /* optimization: {
    minimize: false,
  }, */

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __VERSION__: `"${version}"`,
      __DEV__: isDebug,
      __PATH_PREFIX__: `"${publicPathPrefix}"`,
    }),

    // Adds a banner to the top of each generated chunk
    // https://webpack.js.org/plugins/banner-plugin/
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),

    ...(isDebug ? [new Dotenv()] : []),
  ],

  // Do not replace node globals with polyfills
  // https://webpack.js.org/configuration/node/
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  // Choose a developer tool to enhance debugging
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: isDebug ? 'eval-cheap-module-source-map' : 'source-map',
};

//
// Configuration for the lambda bundle (lambda.js)
// -----------------------------------------------------------------------------

const lambdaConfig = {
  ...serverConfig,

  name: 'lambda',

  entry: {
    lambda: ['./tools/polyfills.js', './src/lambda.js'],
  },
};

module.exports = [
  clientConfig,
  process.argv.includes('--lambda') ? lambdaConfig : serverConfig,
];
