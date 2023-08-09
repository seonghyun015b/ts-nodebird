import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Posts } from '../reducers/type';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

interface CommentFormProp {
  post: Posts;
}

const CommentForm = ({ post }: CommentFormProp) => {
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.user.me?.id);

  const { addCommentDone, addCommentLoading } = useSelector(
    (state: RootState) => state.post
  );

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        postId: post.id,
        userId: id,
      },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative' }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
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