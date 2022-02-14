import React, { FC } from 'react';
import { Tab } from '@headlessui/react';
import { ShortletTab, RentTab, BuyTab } from './tab-content';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// install Swiper modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation, Autoplay]);

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(' ');
};

// type Images = {
//   url: String;
// };

// type Category = {
//   name: String;
// };

// interface IProps {
//   properties: {
//     name?: String;
//     description?: String;
//     price?: Number;
//     category?: Category;
//     images?: Images[];
//   };
// }

const PropertyTab: FC = ({ properties }) => {
  return (
    <div className="w-full py-16 items-center">
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
            Buy
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
            Rent
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
            Shortlet
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            <BuyTab properties={properties} />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            <RentTab properties={properties} />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'bg-white rounded-xl py-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
            )}
          >
            <ShortletTab properties={properties} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PropertyTab;
