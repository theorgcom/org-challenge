type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
type Options = {
  userAgent?: string;
};
type Defaults = {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'OPTIONS';
  mode: 'cors' | 'same-origin';
  credentials: 'include' | 'same-origin';
  headers: {
    Accept: string;
    'X-Auth-Token'?: string;
    userAgent?: string;
  };
};

/*
const fakeDelay = ms => props =>
  new Promise(resolve => setTimeout(() => resolve(props), ms));
*/

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch: Fetch, { userAgent }: Options): Fetch {
  // NOTE: Tweak the default options to suite your application needs
  const defaults: Defaults = {
    method: 'POST',
    // handy with GraphQL backends
    mode: 'same-origin',
    credentials: 'same-origin',
    // referrerPolicy: 'unsafe-url',
    headers: {
      Accept: 'application/json',
      ...(userAgent
        ? {
            'user-agent': userAgent,
          }
        : null),
    },
  };
  return (url, options) => {
    if (typeof url === 'string' && url.startsWith('/graphql')) {
      return fetch(url, {
        ...defaults,
        ...options,
        headers: { ...defaults.headers, ...(options && options.headers) },
      });
    }
    return fetch(url, options);
  };
}

export default createFetch;
