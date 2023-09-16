import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, RootStateOrAny } from 'react-redux';
import UserDropdown from './userDropdown';
import AuthPortal from '@src/components/auth';
import LoginPopupButton from '../buttons/loginPopup';
import {
  HomeIcon,
  RentIcon,
  SettingsIcon,
  ShortletIcon,
  UserIcon,
} from '../svgIcons';

const Navbar: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const [selectedNav, setSelectedNav] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.location.href.indexOf('/buy') > -1) {
      setSelectedNav('buy');
    } else if (window.location.href.indexOf('/rent') > -1) {
      setSelectedNav('rent');
    } else if (window.location.href.indexOf('/shortlet') > -1) {
      setSelectedNav('shortlet');
    } else {
      setSelectedNav('');
    }
  });

  return (
    <div className="container text-center mx-auto">
      {/* Desktop Menu */}
      <section className="shadow-lg fixed top-0 inset-x-0 w-full text-gray-700 font-heading font-medium bg-gray-50 bg-opacity-100 z-[10000]">
        <nav className="flex justify-between px-4 md:px-2 xl:px-32 py-2">
          <div className="flex w-full items-center">
            <Link href="/">
              <a>
                <img className="h-9" src="/logo.svg" alt="Safe Haven Logo" />
              </a>
            </Link>
            <ul className="hidden md:flex px-4 ml-24 md:ml-10 xl:ml-32">
              <li className="mr-16">
                <Link href="/buy">
                  <a
                    className={`text-base text-gray-500 hover:text-purple-500 uppercase ${
                      selectedNav === 'buy' ? 'text-purple-500' : ''
                    }`}
                  >
                    Buy
                  </a>
                </Link>
              </li>
              <li className="mr-16">
                <Link href="/rent">
                  <a
                    className={`text-base text-gray-500 hover:text-purple-500 uppercase ${
                      selectedNav === 'rent' ? 'text-purple-500' : ''
                    }`}
                  >
                    Rent
                  </a>
                </Link>
              </li>
              <li className="mr-16">
                <Link href="/shortlet">
                  <a
                    className={`text-base text-gray-500 hover:text-purple-500 uppercase ${
                      selectedNav === 'shortlet' ? 'text-purple-500' : ''
                    }`}
                  >
                    Shortlet
                  </a>
                </Link>
              </li>
            </ul>

            {/* User buttons  */}
            {user.jwt && user.onboarding ? (
              <div className="flex items-center ml-auto">
                <UserDropdown />
              </div>
            ) : (
              <LoginPopupButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonText="Login"
              />
            )}
          </div>
        </nav>
      </section>
      {/* End of Desktop menu */}

      {/* Mobile menu  */}
      <nav className="fixed bottom-0 inset-x-0 bg-gray-50 md:hidden flex justify-between text-sm text-gray-700 uppercase font-mono rounded-t-lg shadow-inner z-[10000]">
        <Link href="/buy">
          <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500 transition duration-300">
            <HomeIcon width="25" height="25" fill="#9932cc" />
            Buy
          </a>
        </Link>

        <Link href="/rent">
          <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
            <RentIcon width="25" height="25" fill="#9932cc" />
            Rent
          </a>
        </Link>

        <Link href="/shortlet">
          <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
            <ShortletIcon width="25" height="25" fill="#9932cc" />
            Shortlet
          </a>
        </Link>

        {user.jwt && user.onboarding ? (
          <Link href="/agent/account">
            <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
              <SettingsIcon width="25" height="25" fill="#9932cc" />
              Account
            </a>
          </Link>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500"
          >
            <UserIcon width="25" height="25" fill="#9932cc" />
            Login
          </button>
        )}
      </nav>
      {/* Mobile menu ends here  */}

      {/* Auth Modal Popup */}
      <AuthPortal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
