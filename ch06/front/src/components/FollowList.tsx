import React, { useMemo } from 'react';
import { StopOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import {
  FollowType,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_REQUEST,
} from '../reducers/user';

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

const ListDiv = styled.div`
  text-align: center;
  margin: 10px 0;
`;

interface ListData {
  id: number;
  nickname?: string;
  Follow?: FollowType[];
}

interface FollowListProp {
  header: string;
  data: ListData[];
}

const FollowList = ({ header, data }: FollowListProp) => {
  const listGrid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);

  const listStyle = useMemo(() => ({ marginBottom: 20 }), []);

  const dispatch = useDispatch();

  const onCancel = (id: number) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <List<ListData>
      style={listStyle}
      grid={listGrid}
      size='small'
      header={<div>{header}</div>}
      loadMore={
        <ListDiv>
          <Button>더 보기</Button>
        </ListDiv>
      }
      bordered
      dataSource={data}
      renderItem={(item: ListData) => (
        <ListItem>
          <Card
            actions={[<StopOutlined key='stop' onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

export default FollowList;
