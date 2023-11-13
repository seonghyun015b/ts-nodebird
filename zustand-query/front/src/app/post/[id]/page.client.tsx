'use client';

import { useQuery } from '@tanstack/react-query';
import { ReTweetCard, TweetCard } from '../../../components/Tweets/TweetCard';
import Tweet from '../../../types/tweet';
import { loadPostAPI } from '../../../api/tweet';

interface Props {
  params: { id: string };
  initialTweet: Tweet;
}

const ClientPage = ({ params, initialTweet }: Props) => {
  const id = params.id;
  const { data: tweet } = useQuery(['tweet', id], () => loadPostAPI(Number(id)), {
    initialData: initialTweet,
    enabled: false,
  });

  // console.log('id', id);
  // console.log('tweet', tweet);

  if (!tweet) return <></>;

  return tweet.Retweet && tweet.RetweetId ? (
    <>
      <ReTweetCard retweet={tweet.Retweet} data={tweet} key={tweet.id} />
    </>
  ) : (
    <TweetCard data={tweet} key={tweet.id} />
  );
};

export default ClientPage;
