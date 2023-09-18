import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const NodeBird = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>NodeBird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(NodeBird);
