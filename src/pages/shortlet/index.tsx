// index.tsx
import React, { FC, useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropertyCard from '@src/components/common/properties/propertyCard';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  properties: singleProperties;
  totalCount: number;
}

const ShortletPage: FC<IProps> = ({ properties, totalCount }) => {
  const [isProperties, setIsProperties] = useState(properties);
  const [hasMore, setHasMore] = useState(true);

  const getMoreProperties = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Shortlet&_start=${isProperties.length}&_limit=9&_sort=createdAt:desc`
    );
    const newProperties = await res.data;
    // @ts-ignore
    setIsProperties((isProperties) => [...isProperties, ...newProperties]);
  };

  useEffect(() => {
    setHasMore(totalCount > isProperties.length! ? true : false);
  }, [isProperties]);

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
            Shortlet Ads({totalCount})
          </h1>
          <InfiniteScroll
            // @ts-ignore
            dataLength={isProperties.length}
            next={getMoreProperties}
            hasMore={hasMore}
            loader={
              <div className="flex items-center justify-center mt-6 mb-32">
                <img
                  src="https://res.cloudinary.com/prosper-dev/image/upload/v1647127499/eclipse_qljx8s.svg"
                  alt="Loader"
                  className="m-auto w-12"
                />
              </div>
            }
            endMessage={
              <p className="text-center mt-6 mb-32">
                <b>No more properties to load</b>
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-1">
              {properties.map((property: singleProperties) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
    </>
  );
};

export default ShortletPage;

export async function getServerSideProps() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Shortlet&_limit=9&_sort=createdAt:desc`
  );
  const totalCount = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties/count?category.name=Shortlet`
  );
  return {
    props: {
      properties: res.data,
      totalCount: totalCount.data,
    },
  };
}
