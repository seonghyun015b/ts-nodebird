import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';
import Post from '../interface/post';
import useMyInfoQuery from '../hooks/queries/useMyInfoQuery';
import { useMutation, useQueryClient } from 'react-query';
import { addCommentAPI } from '../apis/post';

interface Props {
  post: Post;
}

const CommentForm = ({ post }: Props) => {
  const [commentText, onChangeCommentText] = useInput('');

  const queryClient = useQueryClient();

  const { data: me } = useMyInfoQuery();

  const { mutate, isLoading } = useMutation(addCommentAPI, {
    onSuccess: () => {
      queryClient.refetchQueries('comment');
    },
  });

  const onSubmitComment = useCallback(() => {
    if (me) {
      mutate({ userId: me.id, content: commentText, postId: post.id });
    }
  }, [me, mutate, post.id, commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative' }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40 }}
          type='primary'
          htmlType='submit'
          loading={isLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
