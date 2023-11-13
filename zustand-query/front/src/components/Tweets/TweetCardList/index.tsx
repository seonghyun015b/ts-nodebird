'use client';

import { CircularProgress } from '@mui/material';
import { InfiniteData } from '@tanstack/react-query';

import Tweet from '../../../types/tweet';
import { ReTweetCard, TweetCard } from '../TweetCard';

interface Props {
  data: InfiniteData<Tweet[]>;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
}

const TweetCardList = ({ data, fetchNextPage, hasNextPage, isLoading }: Props) => {
  return data ? (
    <>
      {data.pages.map((page) =>
        page.map((tweet) =>
          tweet.Retweet && tweet.RetweetId ? (
            <ReTweetCard retweet={tweet.Retweet} key={tweet.id} data={tweet} />
          ) : (
            <TweetCard key={tweet.id} data={tweet} />
          )
        )
      )}
      {isLoading && <CircularProgress />}
    </>
  ) : (
    <></>
  );
};

export default TweetCardList;
