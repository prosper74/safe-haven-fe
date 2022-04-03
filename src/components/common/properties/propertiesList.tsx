// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import PropertyCard from '@src/components/common/properties/propertyCard';
import { singleProperties } from '@src/components/common/interfaces';
import { FilterIcon } from '@src/components/common/svgIcons';
import SortModal from './Sorting/sortModal';

interface IProps {
  properties: singleProperties;
  sortOptions: any[];
  setSortOptions: (open: any) => any;
}

const PropertiesList: FC<IProps> = ({
  properties,
  sortOptions,
  setSortOptions,
}) => {

  
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
            <SortModal
              sortOptions={sortOptions}
              setSortOptions={setSortOptions}
              // map={undefined}
            />
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
