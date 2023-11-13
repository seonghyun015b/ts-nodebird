import React, { useCallback } from 'react';
import { List, Avatar, Button } from 'antd';
import Comment from '../interface/comments';
import useMyInfoQuery from '../hooks/queries/useMyInfoQuery';
import { useMutation, useQueryClient } from 'react-query';
import { removeCommentAPI } from '../apis/post';

interface Props {
  item: Comment;
}

const CommentCard = ({ item }: Props) => {
  const { data: me } = useMyInfoQuery();

  const queryClient = useQueryClient();

  const { mutate: removeComment, isLoading: removeCommentLoading } = useMutation(removeCommentAPI, {
    onSuccess: () => {
      queryClient.refetchQueries('comments');
    },
  });

  const onRemoveComment = useCallback(() => {
    removeComment(item.id);
  }, [item.id, removeComment]);

  return (
    <List.Item>
      <List.Item.Meta
        title={item.User.nickname}
        avatar={<Avatar>{item.User.nickname![0]}</Avatar>}
        description={item.content}
      />
      {item.UserId === me?.id ? (
        <Button danger onClick={onRemoveComment} loading={removeCommentLoading}>
          삭제
        </Button>
      ) : null}
    </List.Item>
  );
};

export default CommentCard;
