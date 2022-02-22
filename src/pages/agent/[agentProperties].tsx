// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import AgentSidebar from '@src/components/common/properties/agent/agent-sidebar';
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
    username?: String;
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
    length: Number;
  };
}

const BuySingle: FC<IProps> = ({ properties }) => {
  const agent = properties[0].users_permissions_user;
  console.log('Properties:', agent);
  return (
    <>
      <Head>
        <title>Agent | {agent.username}</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          content={`View all ads of properties posted by ${agent.username}`}
        />
      </Head>

      <main className="my-24">
        <div className="container xs:px-0 md:px-6 xl:px-32 mx-auto bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-0 sm:gap-4 mt-6">
            {/* agent sidebar */}
            <div>
              <AgentSidebar agent={agent} totalCount={properties.length} />
            </div>

            {/* Agent Properties  */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 2xl:gap-1 mb-32">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BuySingle;

export async function getServerSideProps({ params }: GetServerSideProps) {
  const agentProperties = params.agentProperties;
  const agentPropertiesId = agentProperties.slice(agentProperties.length - 24);

  const properties = await axios
    .get(
      `${process.env.NEXT_PUBLIC_REST_API}/properties?users_permissions_user=${agentPropertiesId}`
    )
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      agentProperties,
      properties,
    },
  };
}
