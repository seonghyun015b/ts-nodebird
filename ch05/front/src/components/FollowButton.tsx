import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { IMainPost } from '../reducers/post';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

interface FollowButtonProp {
  post: IMainPost;
}

const FollowButton = ({ post }: FollowButtonProp) => {
  const dispatch = useDispatch();

  const { me, followLoading, unfollowLoading } = useSelector(
    (state: RootState) => state.user
  );

  const isFollowings = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowings) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowings]);

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
