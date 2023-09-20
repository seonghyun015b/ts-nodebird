import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { RootState } from '../reducers';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { LOAD_POST_REQUEST, IMainPost } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.user);

  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
  }: {
    mainPosts: IMainPost[];
    hasMorePosts: boolean;
    loadPostsLoading: boolean;
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;

        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post: IMainPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// SSR

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_POST_REQUEST,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Home;
