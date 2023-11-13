import React, { useCallback } from 'react';
import { Button } from 'antd';
import Post from '../interface/post';
import useMyInfoQuery from '../hooks/queries/useMyInfoQuery';
import useFollowMutation from '../hooks/mutations/useFollowMutation';
import useUnFollowMutation from '../hooks/mutations/useUnFollowMutation';
import User from '../interface/user';

interface Props {
  post: Post;
}

const FollowButton = ({ post }: Props) => {
  const { data: me } = useMyInfoQuery();

  const { mutate: followMutate, isLoading: followLoading } = useFollowMutation();

  const { mutate: unfollowMutate, isLoading: unfollowLoading } = useUnFollowMutation();

  const isFollowings = me?.Followings?.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowings) {
      unfollowMutate(post.User.id);
    } else {
      followMutate(post.User.id);
    }
  }, [post.User.id, isFollowings]);

  if (post.User.id === me?.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowings ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
