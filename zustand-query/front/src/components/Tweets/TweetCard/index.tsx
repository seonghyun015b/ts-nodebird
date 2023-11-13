'use client';

import { useState } from 'react';
import Tweet from '../../../types/tweet';
import TweetCardHeader from './TweetCardHeader';
import TweetCardLayout from './TweetCardLayout';
import RetweetCardHeader from './RetweetCardHeader';
import RetweetCardLayout from './RetweetCardLayout';
import TweetCardContent from './TweetCardContent';
import TweetCardActions from './TweetCardActions';
import TweetCommentList from '../TweetCommentList';

interface TweetProps {
  data: Tweet;
}

export const TweetCard = ({ data }: TweetProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <TweetCardLayout>
      <TweetCardHeader user={data.User} postId={data.id} createdAt={data.createAt} />
      <TweetCardContent content={data.content} images={data.Images} />
      <TweetCardActions setIsCommentOpen={setIsCommentOpen} likers={data.Likers} postId={data.id} />
      <TweetCommentList open={isCommentOpen} data={data} />
    </TweetCardLayout>
  );
};

interface RetweetProps extends TweetProps {
  retweet: Tweet;
}

export const ReTweetCard = ({ data, retweet }: RetweetProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <TweetCardLayout>
      <RetweetCardHeader data={data} />
      <RetweetCardLayout>
        <TweetCardHeader
          user={data.User}
          postId={data.id}
          createdAt={retweet.createAt}
          disableAction
        />
        <TweetCardContent content={retweet.content} images={retweet.Images} />
      </RetweetCardLayout>
      <TweetCardActions setIsCommentOpen={setIsCommentOpen} likers={data.Likers} postId={data.id} />
      <TweetCommentList open={isCommentOpen} data={data} />
    </TweetCardLayout>
  );
};
