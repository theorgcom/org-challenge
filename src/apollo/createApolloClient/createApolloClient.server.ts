import { ApolloClient, HttpLink } from '@apollo/client';
import { Fetch } from '@app/createFetch';
import createCache from './createCache';

type ClientConstuctInputType = {
  fetch: Fetch;
};
export default function createApolloClient({ fetch }: ClientConstuctInputType) {
  const link = new HttpLink({
    uri: '/graphql',
    credentials: 'include',
    fetch,
  });
  return new ApolloClient({
    link,
    cache: createCache(),
    ssrMode: true,
    queryDeduplication: true,
    assumeImmutableResults: false,
  });
}
