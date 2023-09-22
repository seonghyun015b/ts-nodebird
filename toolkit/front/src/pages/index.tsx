import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import { AppDispatch, RootState } from '../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { loadPostsAction } from '../toolkit/post';
import { loadMyInfoAction } from '../toolkit/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { me } = useSelector((state: RootState) => state.user);

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;

        if (hasMorePosts && !loadPostsLoading) {
          dispatch(loadPostsAction(lastId));
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

// SSR

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    await store.dispatch(loadPostsAction());
    await store.dispatch(loadMyInfoAction());

    return {
      props: {},
    };
  });

export default Home;
