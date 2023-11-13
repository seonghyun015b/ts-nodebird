'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default Providers;
