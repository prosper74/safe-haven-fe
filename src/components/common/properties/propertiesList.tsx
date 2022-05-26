// index.tsx
import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropertyCard from '@src/components/common/properties/propertyCard';
import SortModal from './Sorting/sortModal';
// import { FilterIcon } from '@src/components/common/svgIcons';
import { singleProperties } from '@src/components/common/interfaces';
import FilterModal from './filter/filterModal';

interface IProps {
  allProperties: singleProperties;
  sortedProperties: singleProperties;
  totalCount: number;
  sortOptions: any[];
  setSortOptions: (open: any) => any;
}

const PropertiesList: FC<IProps> = ({
  allProperties,
  sortedProperties,
  totalCount,
  sortOptions,
  setSortOptions,
}) => {
  const [isProperties, setIsProperties] = useState(sortedProperties);
  const [hasMore, setHasMore] = useState(true);

  const getMoreProperties = () => {
    const newProperties = allProperties.slice(
      isProperties.length!,
      isProperties.length! + 9
    );
    // @ts-ignore
    setIsProperties((isProperties) => [...isProperties, ...newProperties]);
  };

  useEffect(() => {
    setHasMore(totalCount > isProperties.length! ? true : false);
  }, [isProperties]);

  useEffect(() => {
    setIsProperties(sortedProperties);
  }, [sortOptions]);

  return (
    <>
      <main className="">
        <div className="flex items-center justify-between my-4">
          <div className="">
            <FilterModal />
          </div>
          <div>
            <SortModal
              sortOptions={sortOptions}
              setSortOptions={setSortOptions}
            />
          </div>
        </div>

        <InfiniteScroll
          // @ts-ignore
          dataLength={isProperties.length}
          next={getMoreProperties}
          hasMore={hasMore}
          loader={
            <div className="flex items-center justify-center mt-6">
              <img
                src="https://res.cloudinary.com/prosper-dev/image/upload/v1647127499/eclipse_qljx8s.svg"
                alt="Loader"
                className="m-auto w-12"
              />
            </div>
          }
          endMessage={
            <p className="text-center mt-6">
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
      </main>
    </>
  );
};

export default PropertiesList;
