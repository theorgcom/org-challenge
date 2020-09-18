/* @flow */
import React from 'react';

type Props = {
  styles: Array<{
    id: string,
    cssText: string,
  }>,
  scripts: Array<string>,
  children: string,
};

/* eslint-disable react/no-danger */

class Html extends React.Component<Props> {
  render() {
    const { styles, scripts, children } = this.props;
    return (
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
        </head>
        <body>
          <main id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {scripts.map(script => (
            <script key={script} src={script} />
          ))}
        </body>
      </html>
    );
  }
}

export default Html;
