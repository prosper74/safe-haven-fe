// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import PropertyCard from '@src/components/common/properties/propertyCard';
import axios from 'axios';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  properties: singleProperties;
}

const RentPage: FC<IProps> = ({ properties }) => {
  return (
    <>
      <Head>
        <title>Safe Haven | Rent</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="mt-24">
        <div className="container xs:px-0 md:px-6 xl:px-32 mx-auto bg-white">
          <h1 className="font-bold text-center text-3xl mt-32 mb-16">
            Rent Ads({properties.length})
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-1 mb-32">
            {properties.map((property: singleProperties) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default RentPage;

export async function getServerSideProps() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Rent`
  );
  return {
    props: {
      properties: res.data,
    },
  };
}
