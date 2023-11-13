'use client';

import { Box, Typography } from '@mui/material';
import useMyInfoQuery from '../../hooks/queries/useMyInfoQuery';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: me } = useMyInfoQuery();

  const router = useRouter();

  useEffect(() => {
    if (me) {
      router.replace('/');
    }
  }, [me, router]);

  return (
    <Box component='div' sx={{ mt: '1rem' }}>
      <Typography variant='h5' sx={{ textAlign: 'center', mb: '1rem' }}>
        회원가입
      </Typography>
      {children}
    </Box>
  );
};

export default SignUpLayout;
