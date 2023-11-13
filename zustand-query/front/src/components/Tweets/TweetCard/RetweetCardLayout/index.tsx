'use client';

import React, { PropsWithChildren } from 'react';
import { Card } from '@mui/material';

const RetweetCardLayout = ({ children }: PropsWithChildren) => {
  return <Card sx={{ margin: '1rem' }}>{children}</Card>;
};

export default RetweetCardLayout;
