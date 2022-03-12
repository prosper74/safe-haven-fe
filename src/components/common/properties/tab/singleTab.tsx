import React, { FC } from 'react';
import { Tab } from '@headlessui/react';
import { PropertyFeatures } from './propertyFeatures';
import { singleProperties } from '../../interfaces';

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(' ');
};

interface IProps {
  property: singleProperties;
}

const SingleTab: FC<IProps> = ({ property }) => {
  return (
    <div className="w-full py-8 items-center">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-purple-100 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-lg leading-5 font-medium text-gray-900 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
              )
            }
          >
            Features
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-lg leading-5 font-medium text-gray-900 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
              )
            }
          >
            Full Description
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            <PropertyFeatures features={property.features} />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            <p className="text-lg">{property.description}</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SingleTab;
