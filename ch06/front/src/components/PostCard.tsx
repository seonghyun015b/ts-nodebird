import React, { useState, useCallback } from 'react';

import {
  IMainPost,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  removePostRequestAction,
  retweetRequestAction,
} from '../reducers/post';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { styled } from 'styled-components';
import { Avatar, Button, Card, List, Popover } from 'antd';
import Link from 'next/link';

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
import CommentCard from './CommentCard';

interface PostCardProp {
  post: IMainPost;
}

const PostCardWrap = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }: PostCardProp) => {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const liked = post.Likers.find((v) => v.id === id);

  const { removePostLoading } = useSelector((state: RootState) => state.post);

  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostRequestAction(post.id));
  }, []);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(retweetRequestAction(post.id));
  }, []);

  return (
    <PostCardWrap>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnLike} />
          ) : (
            <HeartOutlined key='heart' onClick={onLike} />
          ),
          <MessageOutlined key='comment' onClick={onToggleComment} />,
          <Popover
            key='more'
            content={
              <Button.Group>
                {id && post.User.id === Number(id) ? (
                  <>
                    <Button>수정</Button>
                    <Button danger loading={removePostLoading} onClick={onRemovePost}>
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
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <Avatar>{post.User.nickname[0]}</Avatar>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link href={`/user/${post.User.id}`}>
                <Avatar>{post.User.nickname[0]}</Avatar>
              </Link>
            }
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            renderItem={(item) => <CommentCard item={item} />}
          />
        </div>
      )}
    </PostCardWrap>
  );
};

export default PostCard;
