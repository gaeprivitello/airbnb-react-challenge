'use client';

import ApolloProvider from '@/lib/graphql/apollo';
import { APIProvider } from '@vis.gl/react-google-maps';
import React, { ReactNode } from 'react';

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        {children}
      </APIProvider>
    </ApolloProvider>
  );
};

export default Providers;
