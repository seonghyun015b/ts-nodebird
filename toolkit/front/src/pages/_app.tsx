import Head from 'next/head';
import wrapper from '../store/configureStore';

interface NodeBirdProp {
  Component: React.ElementType;
}

const NodeBird = ({ Component }: NodeBirdProp) => {
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
