// index.tsx
import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { SortIcon } from '../../svgIcons';

interface IProps {
  sortOptions: any[];
  setSortOptions: (open: any) => void;
}

const SortModal: FC<IProps> = ({ sortOptions, setSortOptions }) => {
  const handleSort = (i: string | number) => {
    const newOptions = [...sortOptions];
    newOptions.map((option) => (option.active = false));
    // @ts-ignore
    newOptions[i].active = true;
    setSortOptions(newOptions);
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-1000">
      <div>
        <Menu.Button className="">
          <button className="flex items-center mr-2">
            <SortIcon width="33" height="33" fill="#9932cc" />
          </button>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 w-56 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[1000]">
          {sortOptions.map((option, i) => (
            <div
              key={option.label}
              onClick={() => handleSort(i)}
              className="py-1"
            >
              <Menu.Item>
                <button
                  className={`block px-4 py-1 text-sm ${
                    option.active &&
                    'bg-purple-500 text-gray-100 text-left rounded-md w-full'
                  }`}
                >
                  {option.label}
                </button>
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortModal;
