// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import axios from 'axios';
import PropertiesList from '@src/components/common/properties/propertiesList';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  properties: singleProperties;
  totalCount: number;
}

const BuyPage: FC<IProps> = ({ properties, totalCount }) => {
  return (
    <>
      <Head>
        <title>Safe Haven | Buy Properties</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="my-24">
        <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
          <h1 className="font-bold text-center text-3xl mt-24 mb-10">
            Buy Ads({totalCount})
          </h1>

          <PropertiesList properties={properties} />
        </div>
      </main>
    </>
  );
};

export default BuyPage;

export async function getServerSideProps() {
  const properties = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Buy`
  );
  const totalCount = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties/count?category.name=Buy`
  );
  return {
    props: {
      properties: properties.data,
      totalCount: totalCount.data,
    },
  };
}
