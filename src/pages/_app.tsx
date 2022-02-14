// _app.tsx
import '@styles/globals.css';

import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import store from '@src/app/store';
import Layout from '@src/components/common/layouts/layout';
import { client } from '@src/apollo/client';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  </>
);
export default MyApp;
