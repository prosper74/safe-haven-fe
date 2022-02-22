// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RENT_PROPERTIES } from '@src/apollo/queries';
import PropertyCard from '@src/components/common/properties/property-card';

type Images = {
  url: String;
};

type Category = {
  name: String;
};

interface IProps {
  properties: {
    id?: String;
    name?: String;
    description?: String;
    price?: Number;
    category?: Category;
    state?: String;
    city?: String;
    per?: String;
    bedrooms?: Number;
    bathroom?: Number;
    size?: Number;
    images?: Images[];
  };
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
            Rent Ads
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

export default RentPage;

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_API,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({ query: RENT_PROPERTIES });
  return {
    props: {
      properties: data.properties,
    },
  };
}
