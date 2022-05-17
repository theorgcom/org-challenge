module.exports = {
  client: {
    service: {
      name: 'The Org',
      url: 'http://localhost:3000/graphql',
    },
    includes: ['./src/apollo/**/*.ts'],
    excludes: ['./src/apollo/types.ts'],
  },
};
