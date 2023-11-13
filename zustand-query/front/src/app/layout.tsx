import React, { cache } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Providers from './providers.client';
import ClientLayout from './layout.client';
import { headers } from 'next/headers';
import { loadMyInfoAPI } from '../api/auth';
import Hydrate from './Hydrate.client';

export const metadata = {
  title: 'NodeBird',
  description: 'NodeBird Copy by Next.js 13',
};

const getQueryClient = cache(() => new QueryClient());

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const header = headers();
  const cookie = header.get('Cookie');
  await queryClient.prefetchQuery(['user'], () =>
    loadMyInfoAPI({ headers: cookie ? { cookie } : undefined })
  );
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Hydrate state={dehydratedState}>
            <ClientLayout>{children}</ClientLayout>
          </Hydrate>
        </Providers>
      </body>
    </html>
  );
}
