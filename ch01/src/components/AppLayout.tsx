import Link from 'next/link';

interface AppLayout {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayout) => {
  return (
    <div>
      <div>
        <Link href='/'>노드버드</Link>
        <Link href='/profile'>프로필</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
