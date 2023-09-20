import React, { useCallback } from 'react';

import { MainPost, addCommentAction } from '../toolkit/post';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../toolkit/index';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';

interface CommentFormProp {
  post: MainPost;
}

const CommentForm = ({ post }: CommentFormProp) => {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const dispatch = useDispatch<AppDispatch>();

  const { addCommentLoading } = useSelector((state: RootState) => state.post);

  const [commentText, onChanteCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentAction({ PostId: post.id, content: commentText, UserId: id })
    );
    setCommentText('');
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative' }}>
        <Input.TextArea
          value={commentText}
          onChange={onChanteCommentText}
          rows={4}
        />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type='primary'
          htmlType='submit'
          loading={addCommentLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
