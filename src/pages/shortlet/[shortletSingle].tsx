// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import SidebarCard from '@src/components/common/properties/sidebarCard';
// import { GetServerSideProps } from 'next';
import { data } from '@src/components/common/properties/sidebarData';
import Breadcrumb from '@src/components/common/layouts/breadcrumb';
import SingleProperty from '@src/components/common/properties/singleProperty';
import axios from 'axios';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  properties: {
    0: singleProperties;
  };
}

const ShortletSingle: FC<IProps> = ({ properties }) => {
  const property = properties[0];
  return (
    <>
      <Head>
        <title>Buy | {property.name.substr(0, 50)}</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="my-24">
        <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
          <Breadcrumb category="Shortlet" property={property.name} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-6 mt-6">
            {/* main properties  */}
            <div className="col-span-2">
              <SingleProperty property={property} />
            </div>

            {/* SideBar  */}
            <div className="">
              {data.map((d) => (
                <SidebarCard key={d.id} data={d} property={property} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ShortletSingle;

export async function getServerSideProps({ params }: any) {
  const shortletSingle = params.shortletSingle;
  const shortletSingleId = shortletSingle.slice(shortletSingle.length - 24);

  const properties = await axios
    .get(
      `${process.env.NEXT_PUBLIC_REST_API}/properties?id=${shortletSingleId}`
    )
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      shortletSingle,
      properties,
    },
  };
}
