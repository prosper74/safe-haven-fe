// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import axios from 'axios';
import HomeBanner from '@src/components/home/banner';
import HowItWorks from '@src/components/home/howItWorks';
import FeaturedProperties from '@src/components/home/featured';
import CTASection from '@src/components/home/ctaSection';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  properties: singleProperties;
}

const Home: FC<IProps> = ({ properties }) => {
  return (
    <>
      <Head>
        <title>Safe Haven</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="mt-16">
        <HomeBanner properties={properties} />
        <FeaturedProperties properties={properties} />
        <HowItWorks />
        <CTASection />
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/adverts`);
  return {
    props: {
      properties: res.data,
    },
  };
}
