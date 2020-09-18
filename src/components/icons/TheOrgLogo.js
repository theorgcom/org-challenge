/* @flow */
import React from 'react';

type Props = {
  className?: ?string,
  width?: number,
};

export const LogoIcon = ({ className, width }: Props) => (
  <svg
    className={className}
    width={width}
    fill="none"
    viewBox="0 0 34 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9.9A5.002 5.002 0 0 0 17 0a5 5 0 0 0-1 9.9v3.104c-4.338.042-6.581.378-8.649 1.46-1.804.944-2.698 2.185-3.08 3.734-.288 1.162-.28 2.512-.267 3.901A5.002 5.002 0 0 0 5 32a5 5 0 0 0 1.005-9.899v-.064c-.01-1.4-.018-2.452.207-3.36.24-.968.748-1.751 2.066-2.441 1.626-.85 3.451-1.188 7.722-1.231V18.1a5.002 5.002 0 0 0 1 9.9 5 5 0 0 0 1-9.9v-3.095c4.27.043 6.096.38 7.722 1.231 1.318.69 1.827 1.473 2.066 2.442.225.907.217 1.96.207 3.359v.064A5.002 5.002 0 0 0 29 32a5 5 0 0 0 .997-9.9c.012-1.39.02-2.74-.267-3.902-.383-1.549-1.277-2.79-3.081-3.734-2.068-1.082-4.31-1.418-8.649-1.46V9.9zM17 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm3 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM5 30a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm27-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
    />
  </svg>
);

LogoIcon.defaultProps = {
  className: null,
  width: 34,
};

export const LogoTextIcon = ({ className, width }: Props) => (
  <svg
    className={className}
    width={width}
    fill="none"
    viewBox="0 0 86 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.244 17h3.289V2.993h5.152V.325H.115v2.668h5.129V17zM17.942.325h-3.174V17h3.174v-6.44c0-1.955.46-3.657 2.553-3.657 1.794 0 2.139 1.403 2.139 2.99V17h3.174V9.203c0-3.105-1.265-4.853-4.278-4.853-1.541 0-2.875.644-3.588 1.909V.325zM39.946 11.687c.115-4.37-2.254-7.337-6.072-7.337-3.657 0-6.21 2.737-6.21 6.417 0 3.565 2.323 6.532 6.302 6.532 3.381 0 5.175-2.047 5.842-3.887h-3.266c-.644 1.08-1.61 1.426-2.599 1.426-1.518 0-2.944-1.035-3.128-3.151h9.131zm-6.095-5.014c1.334 0 2.806.736 2.875 2.829h-5.865c.253-2.093 1.794-2.83 2.99-2.83zM49.985 8.65c0-3.91 2.162-6.002 4.76-6.002 2.6 0 4.762 2.093 4.762 6.003 0 3.933-2.162 6.026-4.761 6.026-2.6 0-4.761-2.093-4.761-6.026zm12.926 0c0-5.174-3.197-8.624-8.165-8.624-4.968 0-8.165 3.45-8.165 8.625s3.197 8.648 8.165 8.648c4.968 0 8.165-3.473 8.165-8.648zM72.254 4.695a6.12 6.12 0 0 0-.69-.046c-1.449 0-2.553.598-3.266 2.139V4.626H65.17V17h3.174v-6.486c0-2.323 1.035-2.898 2.6-2.898.46 0 .85 0 1.31.069v-2.99zM79.267 14.148c-1.633 0-2.852-1.633-2.852-3.68 0-2.07 1.219-3.703 2.852-3.703 1.771 0 2.852 1.495 2.852 3.68 0 2.208-1.081 3.703-2.852 3.703zm2.737-9.522v1.61c-.552-1.081-1.978-1.886-3.542-1.886-3.105 0-5.382 2.576-5.382 6.095 0 3.61 2.346 6.118 5.382 6.118 1.288 0 2.737-.506 3.542-1.863v1.656c0 1.863-1.104 2.645-2.76 2.645-1.426 0-2.277-.506-2.553-1.518h-3.013c.437 2.875 2.76 3.84 5.405 3.84 3.795 0 6.072-1.517 6.072-5.565V4.626h-3.151z" />
  </svg>
);

LogoTextIcon.defaultProps = {
  className: null,
  width: 86,
};

export default LogoIcon;
