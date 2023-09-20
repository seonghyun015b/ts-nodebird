import React, { useCallback } from 'react';
import { List, Avatar, Button } from 'antd';
import { Comment, removeCommentAction } from '../reducers/post';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useDispatch } from 'react-redux';

interface CommentCardProp {
  item: Comment;
}

const CommentCard = ({ item }: CommentCardProp) => {
  const userId = useSelector((state: RootState) => state.user.me?.id);

  const dispatch = useDispatch();

  const onRemoveComment = useCallback(() => {
    return dispatch(removeCommentAction({ commentId: item.id }));
  }, []);

  return (
    <List.Item>
      <List.Item.Meta
        title={item.User.nickname}
        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
        description={item.content}
      />
      {item.UserId === userId ? (
        <Button danger onClick={onRemoveComment}>
          삭제
        </Button>
      ) : null}
    </List.Item>
  );
};

export default CommentCard;
