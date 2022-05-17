import gql from 'graphql-tag';

const typeDefs = gql`
  type Brand {
    id: ID!
    name: String!
    positionCount: Int!
    logoSrc: String
  }

  type Query {
    brands(limit: Int, offset: Int): [Brand!]
  }
`;

export default typeDefs;
