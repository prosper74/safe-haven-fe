// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_TAB_PROPERTIES } from '@src/apollo/queries';
import HomeBanner from '@src/components/Home/banner';
import HowItWorks from '@src/components/Home/howItWorks';
import FeaturedProperties from '@src/components/Home/featured';
import CTASection from '@src/components/Home/ctaSection';
import { IProps } from '@src/components/common/interfaces';

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
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_API,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({ query: GET_TAB_PROPERTIES });
  return {
    props: {
      properties: data.properties,
    },
  };
}
