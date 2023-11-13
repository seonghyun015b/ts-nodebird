import React, { useState, useCallback } from 'react';

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
import CommentCard from './CommentCard';
import Post from '../interface/post';
import useMyInfoQuery from '../hooks/queries/useMyInfoQuery';
import { useMutation, useQueryClient } from 'react-query';
import { removePostAPI, retweetAPI } from '../apis/post';
import useLikeMutation from '../hooks/mutations/useLikeMutation';
import useUnLikeMutation from '../hooks/mutations/useUnLikeMutation';
import { AxiosError } from 'axios';

const PostCardWrap = styled.div`
  margin-bottom: 20px;
`;

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const queryClient = useQueryClient();

  const { data: me } = useMyInfoQuery();

  const { mutate, isLoading: removePostLoading } = useMutation(() => removePostAPI(post.id), {
    onError: (error: any) => {
      alert(error.response.data);
    },
    onSuccess: () => {
      queryClient.refetchQueries('posts');
    },
  });

  const { mutate: reTweetMutation } = useMutation(retweetAPI, {
    onError: (e: AxiosError) => {
      alert(e.response?.data);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries('retweets');
    },
  });

  const liked = post.Likers.find((v) => me?.id && v.id === me.id);

  const { mutate: likeMutate } = useLikeMutation(post.id);

  const { mutate: unlikeMutate } = useUnLikeMutation(post.id);

  const onLike = useCallback(() => {
    likeMutate(post.id);
  }, [likeMutate, post.id]);

  const onUnLike = useCallback(() => {
    unlikeMutate(post.id);
  }, [unlikeMutate, post.id]);

  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    mutate();
  }, [mutate]);

  const onRetweet = useCallback(() => {
    reTweetMutation(post.id);
  }, [reTweetMutation, post.id]);

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
                {me && post.User.id === me.id ? (
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
        extra={me?.id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <Card.Meta
              avatar={<Avatar>{post.User.nickname![0]}</Avatar>}
              title={post.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname![0]}</Avatar>}
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
