// index.tsx
import React, { FC, useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropertyCard from '@src/components/common/properties/propertyCard';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  newestProperties: singleProperties;
  lowestPriceProperties: singleProperties;
  highestPriceProperties: singleProperties;
  totalCount: number;
}

const BuyPage: FC<IProps> = ({
  newestProperties,
  lowestPriceProperties,
  highestPriceProperties,
  totalCount,
}) => {
  const [isProperties, setIsProperties] = useState(newestProperties);
  const [hasMore, setHasMore] = useState(true);
  const [sortOptions, setSortOptions] = useState({ sort: 'newest' });

  const sort = (sort: string) => {
    setSortOptions({ sort });
  };

  const getMoreProperties = async () => {
    const selectedSort =
      sortOptions.sort === 'newest'
        ? 'createdAt:desc'
        : sortOptions.sort === 'asc'
        ? 'price:asc'
        : sortOptions.sort === 'desc'
        ? 'price:desc'
        : 'createdAt:desc';
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Buy&_start=${isProperties.length}&_limit=9&_sort=${selectedSort}`
    );
    const newProperties = await res.data;
    // @ts-ignore
    setIsProperties((isProperties) => [...isProperties, ...newProperties]);
  };

  useEffect(() => {
    if (sortOptions.sort === 'asc') {
      setIsProperties(lowestPriceProperties);
    } else if (sortOptions.sort === 'desc') {
      setIsProperties(highestPriceProperties);
    } else {
      setIsProperties(newestProperties);
    }
  }, [sortOptions]);

  useEffect(() => {
    setHasMore(totalCount > isProperties.length! ? true : false);
  }, [isProperties]);

  return (
    <>
      <Head>
        <title>Safe Haven | Buy Properties</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="mt-24">
        <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
          <h1 className="font-bold text-center text-3xl mt-32 mb-10">
            Buy Ads({totalCount})
          </h1>

          <div className="flex items-center justify-between my-4">
            <div className="">filter goes here</div>
            <div>
              <select
                onChange={(e) => sort(e.target.value)}
                className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
              >
                <option defaultValue="newest">Newest</option>
                <option value="asc">Lowest Price</option>
                <option value="desc">Highest Price</option>
              </select>
            </div>
          </div>

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
              {isProperties.map((property: singleProperties) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
    </>
  );
};

export default BuyPage;

export async function getServerSideProps() {
  const newest = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Buy&_limit=9&_sort=createdAt:desc`
  );
  const lowestPrice = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Buy&_limit=9&_sort=price:asc`
  );
  const highestPrice = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties?category.name=Buy&_limit=9&_sort=price:desc`
  );
  const totalCount = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/properties/count?category.name=Buy`
  );
  return {
    props: {
      newestProperties: newest.data,
      lowestPriceProperties: lowestPrice.data,
      highestPriceProperties: highestPrice.data,
      totalCount: totalCount.data,
    },
  };
}
