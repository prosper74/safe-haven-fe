// index.tsx
import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
// import Image from 'next/image';

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ');
}

const UserDropdown: FC = () => (
  <Menu as="div" className="relative inline-block text-left z-1000">
    <div>
      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        <a className="flex items-center mr-10" href="#">
          <span>John</span>
          <img className="ml-4" src="/assets/images/avatar-online.png" alt="" />
          <img
            className="ml-4"
            src="/assets/images/arrow-down-gray.svg"
            alt=""
          />
        </a>
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
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[1000]">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active
                    ? 'bg-gray-100 text-gray-900 rounded-md'
                    : 'bg-purple-500 text-gray-100 rounded-md',
                  'block px-4 py-2 text-sm'
                )}
              >
                Create Ad
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
              >
                Support
              </a>
            )}
          </Menu.Item>
          <form method="POST" action="#">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </form>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default UserDropdown;
