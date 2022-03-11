// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import HomeBanner from '@src/components/Home/banner';
import HowItWorks from '@src/components/Home/howItWorks';
import FeaturedProperties from '@src/components/Home/featured';
import CTASection from '@src/components/Home/ctaSection';
import { IProps } from '@src/components/common/interfaces';
import axios from 'axios';

const Home: FC<IProps> = ({ properties }) => {
  return (
    <>
      <Head>
        <title>Safe Haven</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="mt-16">
        <HomeBanner />
        <FeaturedProperties properties={properties} />
        <HowItWorks />
        <CTASection />
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_LIVE}/properties`
  );
  console.log('Properties:', res.data);
  return {
    props: {
      properties: res.data,
    },
  };
}
