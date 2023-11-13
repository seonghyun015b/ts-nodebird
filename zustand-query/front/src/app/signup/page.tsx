import { redirect } from 'next/navigation';
import { loadMyInfoAPI } from '../../api/auth';
import SignUpForm from '../../components/Auth/SignUpForm';
import { headers } from 'next/headers';

const SignUpPage = async () => {
  const header = headers();
  const cookie = header.get('Cookie');
  // const data = await loadMyInfoAPI({
  //   headers: cookie ? { cookie } : undefined,
  // });
  // if (data) {
  //   redirect('/');
  // }
  return <SignUpForm />;
};

export default SignUpPage;
