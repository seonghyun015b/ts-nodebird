import React, { useCallback, useMemo } from 'react';
import { Menu, Input, Row, Col } from 'antd';
import Link from 'next/link';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { RootState } from '../store/configureStore';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Router from 'next/router';

interface AppLayoutProp {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProp) => {
  const { me } = useSelector((state: RootState) => state.user);

  const inputStyle = useMemo(() => ({ verticalAlign: 'middle' }), []);

  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <>
      <Menu mode='horizontal'>
        <Menu.Item key='home'>
          <Link href='/'>노드버드</Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link href='/profile'>프로필</Link>
        </Menu.Item>
        <Menu.Item key='search'>
          <Input.Search
            enterButton
            style={inputStyle}
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item key='signup'>
          <Link href='/signup'>회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          {' '}
          <a href='https://www.naver.com' target='_blank' rel='noreferrer nooppener'>
            네이버
          </a>
        </Col>
      </Row>
    </>
  );
};

export default AppLayout;
