import { ApolloClient, HttpLink } from '@apollo/client';
import createCache from './createCache';

type ClientConstuctInputType = {
  fetchImpl: typeof fetch;
};
export default function createApolloClient({
  fetchImpl,
}: ClientConstuctInputType): ApolloClient<any> {
  const cache = createCache();

  const link = new HttpLink({
    uri: '/graphql',
    credentials: 'include',
    fetch: fetchImpl,
  });
  const apolloState = window.App ? window.App.apolloState : {};
  return new ApolloClient({
    link,
    cache: cache.restore(apolloState),
    queryDeduplication: true,
    connectToDevTools: true,
    ssrForceFetchDelay: 100,
    assumeImmutableResults: false,
  });
}
