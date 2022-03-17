// index.tsx
import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setUser } from '@src/store/reducers/userReducer';
import { useIsMedium } from '@src/components/common/hooks/mediaQuery';

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ');
}

const UserDropdown: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const isMedium = useIsMedium();
  const dispatch = useDispatch();
  const defaultUser = { username: 'Guest' };

  const userImage = user.image && user.image.url;

  const handleLogout = async () => {
    typeof window !== 'undefined' && window.localStorage.removeItem('user');
    dispatch(setUser(defaultUser));
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-1000">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-100 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <a className="flex items-center mr-2" href="#">
            <span>{isMedium && user.username.substr(0, 7)}</span>
            <img
              className={`ml-2 sm:ml-4 ${
                userImage && 'w-10 h-10 object-cover rounded-full'
              }`}
              src={userImage ? userImage : '/assets/images/avatar-online.png'}
              alt=""
            />
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
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
