import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { wrapper, SagaStore } from '../../store/configureStore';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POSTS_REQUEST, LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { RootState } from '../../reducers';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { singlePost } = useSelector((state: RootState) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost?.User.nickname}님의 글</title>
        <meta name='description' content={singlePost?.content} />
        <meta
          property='og:title'
          content={`${singlePost?.User.nickname}님의 글`}
        />
        <meta property='og:description' content={singlePost?.content} />
        <meta
          property='og:image'
          content={
            singlePost?.Images[0]
              ? singlePost?.Images[0].src
              : 'https://nodebird.com/favicon.ico'
          }
        />
        <meta property='og:url' content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost!} />
    </AppLayout>
  );
};

// SSR

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : '';

      axios.defaults.headers.Cookie = cookie as string;

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: params?.id,
      });

      store.dispatch(END);
      await (store as SagaStore).sagaTask?.toPromise();
      return {
        props: {},
      };
    }
);
export default Post;
