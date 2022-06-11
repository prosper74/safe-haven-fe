// index.tsx
import React, { FC, Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setUser } from '@src/store/reducers/userReducer';
import { useIsMedium } from '@src/components/common/hooks/mediaQuery';
import Link from 'next/link';

const UserDropdown: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const isMedium = useIsMedium();
  const dispatch = useDispatch();
  const defaultUser = { username: 'Guest' };
  const [isOpen, setIsOpen] = useState(false);

  const userImage = user.image && user.image.url;

  const handleLogout = async () => {
    setIsOpen(!isOpen);
    typeof window !== 'undefined' && window.localStorage.removeItem('user');
    dispatch(setUser(defaultUser));
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-1000">
      <div>
        <Menu.Button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-100 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
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
        appear
        as={Fragment}
        show={isOpen}
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
              <Link href="/create-ad">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`text-gray-900 block px-4 py-2 w-full text-left text-sm font-bold rounded-md hover:bg-slate-100`}
                >
                  Create Ad
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/agent/account">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`text-gray-900 block px-4 py-2 w-full text-left text-sm rounded-md hover:bg-slate-100`}
                >
                  My Profile
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="#">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`text-gray-900 block px-4 py-2 w-full text-left text-sm rounded-md hover:bg-slate-100`}
                >
                  Support
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                type="submit"
                className={`text-gray-900 block px-4 py-2 w-full text-left text-sm rounded-md hover:bg-slate-100`}
                onClick={handleLogout}
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
