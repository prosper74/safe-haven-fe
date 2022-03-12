// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import axios from 'axios';
import HomeBanner from '@src/components/Home/banner';
import HowItWorks from '@src/components/Home/howItWorks';
import FeaturedProperties from '@src/components/Home/featured';
import CTASection from '@src/components/Home/ctaSection';
import { homeTabs } from '@src/components/common/interfaces';

interface IProps {
  properties: homeTabs;
}

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
  return {
    props: {
      properties: res.data,
    },
  };
}
