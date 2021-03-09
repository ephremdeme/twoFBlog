import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
	children: JSX.Element | JSX.Element[];
	title: string;
}

const Page = forwardRef(({
  children,
  title = '',
  ...rest
}:IProps) => {
  return (
    <div
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
