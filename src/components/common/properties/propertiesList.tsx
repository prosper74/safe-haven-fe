// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import PropertyCard from '@src/components/common/properties/propertyCard';
import { singleProperties } from '@src/components/common/interfaces';
import { FilterIcon } from '@src/components/common/svgIcons';

interface IProps {
  properties: singleProperties;
}

const PropertiesList: FC<IProps> = ({ properties }) => {
  return (
    <>
      <Head>
        <title>Safe Haven | Buy Properties</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="">
        <div className="flex items-center justify-between my-4">
          <div className="">
            <FilterIcon width="30" height="30" fill="#9932cc" />
          </div>
          <div>
            <select
              // onChange={(e) => sort(e.target.value)}
              className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
            >
              <option defaultValue="newest">Newest</option>
              <option value="asc">Lowest Price</option>
              <option value="desc">Highest Price</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-1">
          {properties.map((property: singleProperties) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </>
  );
};

export default PropertiesList;
