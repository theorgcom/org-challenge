// eslint-disable-next-line no-underscore-dangle
declare const __DEV__: string;

interface Styles {
  [key: string]: string;
}

declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: Styles;
  export default content;
}

declare module '*.graphql' {
  const content: unknown;
  export default content;
}

declare module 'isomorphic-style-loader/lib/withStyles' {
  const withStyles = (...styles: Styles[]) => <T>(component: T): T => T;

  export default withStyles;
}

declare module 'dom-to-image-more' {
  import domToImage = require('dom-to-image');

  export = domToImage;
}

interface Window {
  App: {
    apolloState: Record<string, any>;
  };
}
