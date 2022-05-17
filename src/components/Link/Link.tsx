import history from '@app/history';
import * as React from 'react';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default (props: AnchorProps): JSX.Element => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (props.href) history.push(props.href);
    if (props.onClick) props.onClick(e);
  };
  return (
    <a role="link" onClick={onClick} tabIndex={0} {...props}>
      {props.children}
    </a>
  );
};
