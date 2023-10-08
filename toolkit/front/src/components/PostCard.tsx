import React, { useCallback, useState } from 'react';

import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, List, Popover } from 'antd';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';

import Link from 'next/link';

import { AppDispatch, RootState } from '../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import {
  MainPost,
  likePostAction,
  removePostAction,
  retweetAction,
  unlikePostAction,
} from '../toolkit/post';

import { styled } from 'styled-components';
import CommentCard from './CommentCard';

import dayjs from 'dayjs';
dayjs.locale('ko');

const PostCardWrapper = styled.div`
  margin-bottom: 20px;
`;

interface PostCardProp {
  post: MainPost;
}

const PostCard = ({ post }: PostCardProp) => {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch<AppDispatch>();

  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    dispatch(likePostAction(post.id));
  }, []);

  const onUnLike = useCallback(() => {
    dispatch(unlikePostAction(post.id));
  }, []);

  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch(removePostAction(post.id));
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(retweetAction(post.id));
  }, [id]);

  return (
    <PostCardWrapper>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone key='heart' twoToneColor='#eb2f96' onClick={onUnLike} />
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
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셧습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <div style={{ float: 'right' }}>{dayjs(post.createdAt).format('YYYY.MM.DD')}</div>
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
          <>
            <div style={{ float: 'right' }}>{dayjs(post.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <Avatar>{post.User.nickname[0]}</Avatar>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
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
    </PostCardWrapper>
  );
};

export default PostCard;
