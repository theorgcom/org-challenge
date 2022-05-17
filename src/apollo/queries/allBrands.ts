import { gql } from '@apollo/client';

export default gql`
  query allBrands($limit: Int!, $offset: Int!) {
    brands(limit: $limit, offset: $offset) {
      id
      name
      positionCount
      logoSrc
    }
  }
`;
