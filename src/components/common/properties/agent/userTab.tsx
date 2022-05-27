import React, { FC } from 'react';
import { Tab } from '@headlessui/react';
import AgentSidebar from './agentSidebar';
import { userProps } from '@src/components/common/interfaces';

interface IProps {
  // properties: userProps;
  user: userProps;
}

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(' ');
};

const UserTab: FC<IProps> = ({ user }) => {
  const properties = user.properties;
  console.log('properties', properties);
  return (
    <div className="w-full py-16 items-center">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 text-lg font-medium bg-purple-100 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 leading-5 text-gray-900 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
              )
            }
          >
            Profile
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 leading-5 text-gray-900 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
              )
            }
          >
            Reviews
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 leading-5 text-gray-900 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
              )
            }
          >
            Favourites
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-0 sm:gap-4 mt-6">
              {/* agent sidebar */}
              <div>
                <AgentSidebar
                  agent={user.properties}
                  totalCount={properties.length}
                />
              </div>

              {/* Agent Properties  */}
              <div className="col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 2xl:gap-1 mb-32">
                  {/* {properties.map((property: singleProperties) => (
                    <PropertyCard key={property.id} property={property} />
                  ))} */}
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            Tab1
            {/* <TabContent properties={properties} tabCategory="Rent" /> */}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            Tab2
            {/* <TabContent properties={properties} tabCategory="Shortlet" /> */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default UserTab;
