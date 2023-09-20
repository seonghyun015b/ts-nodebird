import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import { AppDispatch, RootState } from '../toolkit/index';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { loadPostAction } from '../toolkit/post';
import { loadUserAction } from '../toolkit/user';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { me } = useSelector((state: RootState) => state.user);

  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    dispatch(loadPostAction());

    dispatch(loadUserAction());
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;

        if (hasMorePosts && !loadPostLoading) {
          dispatch(loadPostAction());
          lastId;
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostLoading, mainPosts]);

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

export default Home;
