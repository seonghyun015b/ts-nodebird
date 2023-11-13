import React, { PropsWithChildren } from 'react';
import { Card } from '@mui/material';

const TweetCardLayout = ({ children }: PropsWithChildren) => {
  return <Card sx={{ margin: '1.5rem 0.5rem' }}>{children}</Card>;
};

export default TweetCardLayout;
