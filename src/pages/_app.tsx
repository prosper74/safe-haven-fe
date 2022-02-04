// _app.tsx
import '@styles/globals.css';

import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@src/app/store';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className="container mx-auto m-0">
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </div>
);
export default MyApp;
