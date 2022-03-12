// _app.tsx
import '@styles/globals.css';

import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// import store from '@src/app/store';
import configureStore from '@src/store';
import Layout from '@src/components/common/layouts/layout';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={configureStore}>
        <Layout>          
          <Component {...pageProps} />
        </Layout>
    </Provider>
  </>
);
export default MyApp;
