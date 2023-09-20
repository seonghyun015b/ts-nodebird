import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainPost } from '../toolkit/post';
import { AppDispatch, RootState } from '../toolkit/index';
import { Button } from 'antd';
import { followAction, unfollowAction } from '../toolkit/user';

interface FolloButton {
  post: MainPost;
}

const FollowButton = ({ post }: FolloButton) => {
  const dispatch = useDispatch<AppDispatch>();

  const { me, followLoading, unfollowLoading } = useSelector(
    (state: RootState) => state.user
  );

  const isFollowings = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowings) {
      dispatch(unfollowAction(post.User.id));
    } else {
      dispatch(followAction(post.User.id));
    }
  }, [isFollowings]);

  if (post.User.id === me?.id) {
    return null;
  }

  return (
    <>
      <Button
        loading={followLoading || unfollowLoading}
        onClick={onClickButton}
      >
        {isFollowings ? '언팔로우' : '팔로우'}
      </Button>
    </>
  );
};

export default FollowButton;
