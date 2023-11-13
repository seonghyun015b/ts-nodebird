'use client';

import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Tweet from '../../../types/tweet';
import { loadUserAPI, loadUserPostsAPI } from '../../../api/user';
import UserProfile from '../../../components/Users/UserProfile';
import TweetCardList from '../../../components/Tweets/TweetCardList';

interface Props {
  params: { id: string };
  initialUserInfo: any;
  initialPostData: InfiniteData<Tweet[]>;
}

const ClientPage = ({ params, initialUserInfo, initialPostData }: Props) => {
  const id = params.id;
  const {
    data,
    isFetching: loadPostsLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['tweets', 'user', id],
    ({ pageParam = '' }) => loadUserPostsAPI(Number(id), pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.id;
      },
      initialData: initialPostData,
      enabled: false,
    }
  );

  const { data: userInfo } = useQuery(['user', id], () => loadUserAPI(Number(id)), {
    initialData: initialUserInfo,
    enabled: false,
  });

  if (!data || !userInfo) return <></>;

  return (
    <>
      <UserProfile userInfo={userInfo} />
      <TweetCardList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={loadPostsLoading}
      />
    </>
  );
};

export default ClientPage;
