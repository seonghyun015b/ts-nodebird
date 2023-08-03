import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Col, Input, Menu, Row } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

interface AppLayout {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayout) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const inputStyle = useMemo(() => ({ verticalAlign: 'middle' }), []);

  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item key='home'>
          <Link href='/'>노드버드</Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link href='/profile'>프로필</Link>
        </Menu.Item>
        <Menu.Item key='search'>
          <Input.Search enterButton style={inputStyle} />
        </Menu.Item>
        <Menu.Item key='signup'>
          <Link href='/signup'>회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href='https://www.naver.com'
            target='_blank'
            rel='noreferrer nooppener'
          >
            네이버
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
