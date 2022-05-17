// ESLint configuration
// http://eslint.org/docs/user-guide/configuring

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:postcss-modules/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
    'plugin:import/typescript',
  ],

  plugins: ['postcss-modules', 'prettier', '@typescript-eslint'],

  globals: {
    __DEV__: true,
    __VERSION__: true,
    __PATH_PREFIX__: true,
  },

  env: {
    browser: true,
  },

  rules: {
    // `js` and `jsx` are common extensions
    // `mjs` is for `universal-router` only, for now
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],

    'postcss-modules/no-unused-class': 'off',
    'postcss-modules/no-undef-class': 'warn',

    'jsx-a11y/media-has-caption': 'off',

    // Not supporting nested package.json yet
    // https://github.com/benmosher/eslint-plugin-import/issues/458
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // a11y removed rule, ignore them
    'jsx-a11y/href-no-hash': 'off',

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/308#issuecomment-322954274
    'jsx-a11y/label-has-for': 'off',

    'jsx-a11y/aria-role': [
      2,
      {
        ignoreNonDOM: true,
      },
    ],

    // Allow js files to use jsx syntax, too
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    // Automatically convert pure class to function by
    // babel-plugin-transform-react-pure-class-to-function
    // https://github.com/kriasoft/react-starter-kit/pull/961
    'react/prefer-stateless-function': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': 'warn',

    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      'error',
      {
        // https://github.com/prettier/prettier#options
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-empty-function': 'warn',

    // Overwritting the default airbnb config to make it ts compatible
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    strict: 0,
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      typescript: {},
    },
  },
};
