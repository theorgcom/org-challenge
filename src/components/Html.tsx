import React from 'react';
import serialize from 'serialize-javascript';

interface Props {
  styles: Array<{
    id: string;
    cssText: string;
  }>;
  app: Record<string, any>;
  scripts: Array<React.ReactElement>;
  styledComponentsStyles: Array<React.ReactElement>;
  children: string;
}

/* eslint-disable react/no-danger */
const Html = ({
  styles,
  app,
  styledComponentsStyles,
  scripts,
  children,
}: Props): JSX.Element => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
      />
      {styles.map(style => (
        <style
          key={style.id}
          id={style.id}
          dangerouslySetInnerHTML={{ __html: style.cssText }}
        />
      ))}
      {styledComponentsStyles}
    </head>
    <body>
      <main id="app" dangerouslySetInnerHTML={{ __html: children }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.App=${serialize(app)}`,
        }}
      />
      {scripts}
    </body>
  </html>
);

export default Html;
