// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SHORTLET_PROPERTIES } from '@src/apollo/queries';
import PropertyCard from '@src/components/common/properties/propertyCard';
import { IProperty } from '@src/components/common/interfaces';
import axios from 'axios';

interface IProps {
  properties: IProperty[];
}
const ShortletPage: FC<IProps> = ({ properties }) => {
  return (
    <>
      <Head>
        <title>Safe Haven | Shortlet</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="mt-24">
        <div className="container xs:px-0 md:px-6 xl:px-32 mx-auto bg-white">
          <h1 className="font-bold text-center text-3xl mt-32 mb-16">
            Shortlet Ads
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-1 mb-32">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ShortletPage;

export async function getServerSideProps() {
  // const client = new ApolloClient({
  //   uri: process.env.STRAPI_GRAPHQL_API,
  //   cache: new InMemoryCache(),
  // });
  // const { data } = await client.query({ query: SHORTLET_PROPERTIES });
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_LIVE}/properties?category.name=Shortlet`
  );
  console.log('Shortlet:', res.data);
  return {
    props: {
      properties: res.data,
    },
  };
}
