// index.tsx
import React, { FC, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import PropertiesList from '@src/components/common/properties/propertiesList';
import {
  time,
  alphabetic,
  price,
} from '@src/components/common/properties/Sorting/SortFunctions';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  properties: singleProperties;
  totalCount: number;
}

const BuyPage: FC<IProps> = ({ properties, totalCount }) => {
  const [sortOptions, setSortOptions] = useState([
    {
      label: 'NEWEST',
      active: true,
      function: (data: singleProperties) => time(data, 'asc'),
    },
    {
      label: 'OLDEST',
      active: false,
      function: (data: singleProperties) => time(data, 'desc'),
    },
    {
      label: 'A-Z',
      active: false,
      function: (data: singleProperties) => alphabetic(data, 'asc'),
    },
    {
      label: 'Z-A',
      active: false,
      function: (data: singleProperties) => alphabetic(data, 'desc'),
    },
    {
      label: 'PRICE ⬆',
      active: false,
      function: (data: singleProperties) => price(data, 'asc'),
    },
    {
      label: 'PRICE ⬇',
      active: false,
      function: (data: singleProperties) => price(data, 'desc'),
    },
  ]);

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
