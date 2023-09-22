import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import axios from 'axios';
import PostCard from '../../components/PostCard';
import wrapper, { AppDispatch, RootState } from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import { loadMyInfoAction } from '../../toolkit/user';
import { loadHashtagAction } from '../../toolkit/post';

const Hashtag = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadHashtagPostsLoading } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadHashtagPostsLoading) {
          dispatch(
            loadHashtagAction({
              data: tag as string,
              lastId:
                mainPosts[mainPosts.length - 1] &&
                mainPosts[mainPosts.length - 1].id,
            })
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, tag]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : '';

      axios.defaults.headers.Cookie = '';

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      await store.dispatch(loadMyInfoAction());

      await store.dispatch(
        loadHashtagAction({ data: params?.tag as string, lastId: null })
      );

      return {
        props: {},
      };
    }
);

export default Hashtag;
