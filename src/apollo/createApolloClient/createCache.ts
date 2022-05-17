import { InMemoryCache } from '@apollo/client';

export default function createCache() {
  // https://www.apollographql.com/docs/react/basics/caching.html#configuration
  return new InMemoryCache();
}
