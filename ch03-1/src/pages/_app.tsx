import Head from 'next/head';
import React, { ElementType } from 'react';
import wrapper from '../store/configureStore';

interface NodeBirdProps {
  Component: ElementType;
}

const NodeBird = ({ Component }: NodeBirdProps) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(NodeBird);
