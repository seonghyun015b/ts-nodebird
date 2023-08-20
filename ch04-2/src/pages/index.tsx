import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { RootState } from '../reducers';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { LOAD_POST_REQUEST, MainPost } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
  }: {
    mainPosts: MainPost[];
    hasMorePosts: boolean;
    loadPostsLoading: boolean;
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post: MainPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
