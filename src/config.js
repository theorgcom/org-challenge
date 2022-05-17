/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  environment: process.env.NODE_ENV || 'development',

  // Node.js app
  port: process.env.PORT || 3000,

};
