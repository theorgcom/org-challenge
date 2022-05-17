import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { RouteContext, RouterContext } from 'universal-router';

interface ComponentReturnType {
  status?: number;
  component: React.ReactElement;
  description?: string;
  title?: string;
}

interface RedirectionReturnType {
  status?: number;
  redirect: string;
  title?: string;
  description?: string;
}

export declare type ActionReturnType =
  | ComponentReturnType
  | RedirectionReturnType;

export interface OrgRouterContext
  extends RouteContext<ActionReturnType, RouterContext> {
  cookies: Record<string, string>;
  path: string;
  query: Record<string, string>;
  insertCss: (...args: string[]) => void;
  fetch: typeof fetch;
  // Apollo Client for use with react-apollo
  client: ApolloClient<NormalizedCacheObject>;
}
