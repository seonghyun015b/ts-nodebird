import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

interface AppLayout {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayout) => {
  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'>노드버드</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'>프로필</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'>회원가입</Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default AppLayout;
