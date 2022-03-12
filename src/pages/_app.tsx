// _app.tsx
import '@styles/globals.css';

import React, { FC, useState } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { Provider } from 'react-redux';
import configureStore from '@src/store';
import Layout from '@src/components/common/layouts/layout';
import Loader from '@src/components/common/loader';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  return (
    <>
      <Provider store={configureStore}>
        {isLoading ? (
          <Loader />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Provider>
    </>
  );
};
export default MyApp;

// import '@styles/globals.css';

// import React, { FC, useState } from 'react';
// import { AppProps } from 'next/app';
// import Router from 'next/router';
// import { Provider } from 'react-redux';
// import configureStore from '@src/store';
// import Layout from '@src/components/common/layouts/layout';
// import Loader from '@src/components/common/loader';

// const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
//   const [loading, setLoading] = useState(false);

//   Router.events.on('routeChangeStart', (url) => {
//     setLoading(true);
//   });
//   Router.events.on('routeChangeComplete', (url) => {
//     setLoading(false);
//   });

//   return (
//     <>
//       <Provider store={configureStore}>
//         <Layout>{loading ? <Loader /> : <Component {...pageProps} />}</Layout>
//       </Provider>
//     </>
//   );
// };
// export default MyApp;
