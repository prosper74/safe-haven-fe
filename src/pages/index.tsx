// index.tsx

import React, { FC } from 'react';
import Head from 'next/head';

const Home: FC = () => (
  <div>
    <Head>
      <title>Safe Haven</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="text-xl font-bold underline">Welcome to Safe Haven</h1>
    </main>
  </div>
);

export default Home;
