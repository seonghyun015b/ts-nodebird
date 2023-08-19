import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';

import { MainPost } from '../reducers/post';
import { RootState } from '../reducers';

interface CommentFormProp {
  post: MainPost;
}

const CommentForm = ({ post }: CommentFormProp) => {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const [commentText, onChangeCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [post.id, commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative' }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40 }}
          type='primary'
          htmlType='submit'
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
