import React, { useCallback, useEffect } from 'react';
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST, MainPost } from '../reducers/post';
import { RootState } from '../reducers';
import { Button, Form, Input } from 'antd';

interface CommentFormProp {
  post: MainPost;
}

const CommentForm = ({ post }: CommentFormProp) => {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const dispatch = useDispatch();

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
  }, [id, commentText]);

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
