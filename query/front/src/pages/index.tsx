import React from 'react';
import AppLayout from '../components/AppLayout';
import useMyInfoQuery from '../hooks/queries/useMyInfoQuery';
import PostForm from '../components/PostForm';
import { InfiniteData, QueryClient, dehydrate, useInfiniteQuery } from 'react-query';
import { loadPostsAPI } from '../apis/post';
import Post from '../interface/post';
import PostCard from '../components/PostCard';

interface Props {
  initialData: InfiniteData<Post[]>;
}

const Home = ({ initialData }: Props) => {
  const { data: me } = useMyInfoQuery();

  const {
    data,
    isFetching: loadPostsLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('posts', ({ pageParam = '' }) => loadPostsAPI(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage?.[lastPage.length - 1]?.id;
    },
    initialData: initialData,
    enabled: true,
  });

  const mainPosts = data?.pages.flat();

  return (
    <>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery('posts', () => loadPostsAPI());
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
