"use client"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react'
/**
 * 
 * @param param0 
 * @description NextQueryProvider component to provide the query client to the application
 * @returns 
 */
function NextQueryProvider({children}: {children: React.ReactNode}) {
  const [queryClient] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 10000 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default NextQueryProvider