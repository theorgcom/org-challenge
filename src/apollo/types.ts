import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['ID'];
  name: Scalars['String'];
  positionCount: Scalars['Int'];
  logoSrc?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  brands?: Maybe<Array<Brand>>;
};


export type QueryBrandsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AllBrandsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type AllBrandsQuery = (
  { __typename?: 'Query' }
  & { brands?: Maybe<Array<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'name' | 'positionCount' | 'logoSrc'>
  )>> }
);


export const AllBrandsDocument = gql`
    query allBrands($limit: Int!, $offset: Int!) {
  brands(limit: $limit, offset: $offset) {
    id
    name
    positionCount
    logoSrc
  }
}
    `;

/**
 * __useAllBrandsQuery__
 *
 * To run a query within a React component, call `useAllBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBrandsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useAllBrandsQuery(baseOptions: Apollo.QueryHookOptions<AllBrandsQuery, AllBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBrandsQuery, AllBrandsQueryVariables>(AllBrandsDocument, options);
      }
export function useAllBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBrandsQuery, AllBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBrandsQuery, AllBrandsQueryVariables>(AllBrandsDocument, options);
        }
export type AllBrandsQueryHookResult = ReturnType<typeof useAllBrandsQuery>;
export type AllBrandsLazyQueryHookResult = ReturnType<typeof useAllBrandsLazyQuery>;
export type AllBrandsQueryResult = Apollo.QueryResult<AllBrandsQuery, AllBrandsQueryVariables>;