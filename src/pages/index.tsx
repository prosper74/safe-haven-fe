// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import Navbar from '@src/components/common/navbar';

const Home: FC = () => (
  <div>
    <Head>
      <title>Safe Haven</title>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <Navbar />
    <main className="px-4 md:px-2 xl:px-32 py-4">
      <h1 className="text-xl font-bold">Welcome to Safe Haven</h1>
    </main>
  </div>
);

export default Home;
