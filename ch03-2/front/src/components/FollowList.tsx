import { StopOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';

interface FollowListProp {
  header: string;
  data: { nickname: string }[];
}

const FollowList = ({ header, data }: FollowListProp) => {
  return (
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card actions={[<StopOutlined key='stop' />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
