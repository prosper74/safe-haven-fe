import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import UserDropdown from './user-dropdown';

const Navbar: FC = () => {
  const [selectedNav, setSelectedNav] = useState('');

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

            <div className="flex items-center ml-auto">
              <Link href="#">
                <a className="hidden sm:flex text-gray-500 hover:text-purple-500">
                  <svg
                    width="20"
                    height="23"
                    viewBox="0 0 20 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5219 18.016H2.70312V8.5933C2.70313 6.719 3.48375 4.92147 4.87328 3.59614C6.2628 2.27081 8.1474 1.52625 10.1125 1.52625C12.0776 1.52625 13.9622 2.27081 15.3517 3.59614C16.7412 4.92147 17.5219 6.719 17.5219 8.5933V18.016Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M1 18.0121H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.87891 22H10.8789"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>
              </Link>
              <div className="w-px h-8 bg-gray bg-opacity-50 ml-6 mr-6" />

              <UserDropdown />
            </div>
          </div>
        </nav>
      </section>
      {/* End of Desktop menu */}

      {/* Mobile menu  */}
      <nav className="fixed bottom-0 inset-x-0 bg-gray-50 md:hidden flex justify-between text-sm text-gray-700 uppercase font-mono rounded-t-lg shadow-inner z-[10000]">
        <Link href="/buy">
          <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500 transition duration-300">
            <svg
              className="w-6 h-6 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#9932cc"
                d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"
              />
            </svg>
            Buy
          </a>
        </Link>

        <Link href="/rent">
          <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
            <svg
              className="w-6 h-6 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
            >
              <path
                fill="#9932cc"
                d="M18.9917,21.002h-1V19.335a5.00057,5.00057,0,0,0-.29956-1.67773c-.01093-.02936-.0224-.05658-.03589-.08454a4.97694,4.97694,0,0,0-.66455-1.23675l-1.3999-1.86719a3.01933,3.01933,0,0,1-.6001-1.80078V11.6582a3.02108,3.02108,0,0,1,.87842-2.12109l.65722-.65723A4.94566,4.94566,0,0,0,17.92365,6.0415c.00054-.01391.008-.02551.008-.03955l-.00281-.01373a5.01836,5.01836,0,0,0,.06287-.64349V3.002h1a1,1,0,0,0,0-2h-14a1,1,0,0,0,0,2h1V5.34473a5.01836,5.01836,0,0,0,.06287.64349L6.05176,6.002c0,.014.00744.02564.008.03955a4.94571,4.94571,0,0,0,1.3963,2.83838l.65723.65723A3.02108,3.02108,0,0,1,8.9917,11.6582V12.668a3.02212,3.02212,0,0,1-.59961,1.80078L6.99121,16.33594a4.98221,4.98221,0,0,0-.66437,1.23718c-.0133.02771-.02472.05463-.03552.08368A5.00309,5.00309,0,0,0,5.9917,19.335v1.667h-1a1,1,0,0,0,0,2h14a1,1,0,0,0,0-2Zm-11-16v-2h8v2Zm.87842,2.46387A2.97036,2.97036,0,0,1,8.49323,7.002h6.99694a2.97094,2.97094,0,0,1-.37689.46387l-.65723.65723a4.9603,4.9603,0,0,0-1.42187,2.8789h-2.085A4.96025,4.96025,0,0,0,9.52734,8.123ZM9.99219,15.668a5.03688,5.03688,0,0,0,.98828-2.666h2.02246a5.03332,5.03332,0,0,0,.98877,2.666l1.00012,1.334H8.99133Zm5.99951,5.334h-8V19.335a2.954,2.954,0,0,1,.02722-.333h7.94556a2.954,2.954,0,0,1,.02722.333Z"
              />
            </svg>
            Rent
          </a>
        </Link>

        <Link href="/shortlet">
          <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
            <svg
              className="w-6 h-6 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#9932cc"
                d="M18.5,2H6.5a3,3,0,0,0-3,3V17a3,3,0,0,0,2,2.82V21a1,1,0,0,0,2,0V20h10v1a1,1,0,0,0,2,0V19.82a3,3,0,0,0,2-2.82V5A3,3,0,0,0,18.5,2ZM5.5,8h6v4h-6Zm14,9a1,1,0,0,1-1,1H6.5a1,1,0,0,1-1-1V14h14Zm0-5h-6V8h6Zm0-6H5.5V5a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1ZM16.12,16.92a1,1,0,0,0,.38.08,1,1,0,0,0,1-1,1.36,1.36,0,0,0,0-.2.64.64,0,0,0-.06-.18.76.76,0,0,0-.09-.18,1.58,1.58,0,0,0-.12-.15l-.15-.12a.76.76,0,0,0-.18-.09A.64.64,0,0,0,16.7,15a1,1,0,0,0-.91.27,1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2,1,1,0,0,0,.29.7A1,1,0,0,0,16.12,16.92Zm-8,0A1,1,0,0,0,8.5,17a1,1,0,0,0,1-1,1.36,1.36,0,0,0,0-.2.64.64,0,0,0-.06-.18.76.76,0,0,0-.09-.18,1.58,1.58,0,0,0-.12-.15l-.15-.12-.18-.09L8.7,15a1,1,0,0,0-.91.27,1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2,1,1,0,0,0,.29.7A1,1,0,0,0,8.12,16.92Z"
              />
            </svg>
            Shortlet
          </a>
        </Link>

        <Link href="/account">
          <a className="w-full block py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
            <svg
              className="w-6 h-6 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
            >
              <path
                fill="#9932cc"
                d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z"
              />
            </svg>
            Settings
          </a>
        </Link>
      </nav>
      {/* Mobile menu ends here  */}
    </div>
  );
};

export default Navbar;
