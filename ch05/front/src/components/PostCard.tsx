import React, { useState, useCallback } from 'react';

import { IMainPost, REMOVE_POST_REQUEST } from '../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { styled } from 'styled-components';
import { Avatar, Button, Card, List, Popover } from 'antd';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';

import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import FollowButton from './FollowButton';

interface PostCardProp {
  post: IMainPost;
}

const PostCardWrap = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }: PostCardProp) => {
  const id = useSelector((state: RootState) => state.user.me?.id);
  console.log('id', id);

  const { removePostLoading } = useSelector((state: RootState) => state.post);

  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const onToggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <PostCardWrap>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' />,
          liked ? (
            <HeartTwoTone
              twoToneColor='#eb2f96'
              key='heart'
              onClick={onToggleLiked}
            />
          ) : (
            <HeartOutlined key='heart' onClick={onToggleLiked} />
          ),
          <MessageOutlined key='comment' onClick={onToggleComment} />,
          <Popover
            key='more'
            content={
              <Button.Group>
                {id && post.User.id === Number(id) ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      danger
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </PostCardWrap>
  );
};

export default PostCard;
