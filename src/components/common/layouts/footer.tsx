import React, { FC } from 'react';
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../svgIcons';
// import Link from 'next/link';
// import Image from 'next/image';

const Footer: FC = () => (
  <footer className="bg-purple-100 dark:bg-gray-800 pt-8 pb-8 xl:pt-8">
    <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 text-gray-800 dark:text-gray-300">
      <ul className="text-lg font-light pb-8 flex flex-wrap justify-center">
        <li className="w-1/2 md:w-1/3 lg:w-1/3">
          <div className="text-center">
            <h2 className="text-gray-900 dark:text-gray-200 text-md uppercase mb-4">
              Quick Links
            </h2>
            <ul>
              <li className="mb-4 hover:text-purple-500 dark:hover:text-white transition-colors duration-200">
                <a href="#">Buy</a>
              </li>
              <li className="mb-4 hover:text-purple-500 dark:hover:text-white transition-colors duration-200">
                <a href="#">Rent</a>
              </li>
              <li className="mb-4 hover:text-purple-500 dark:hover:text-white transition-colors duration-200">
                <a href="#">Shortlet</a>
              </li>
              <li className="mb-4 hover:text-purple-500 dark:hover:text-white transition-colors duration-200">
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="w-1/2 md:w-1/3 lg:w-1/3">
          <div className="text-center">
            <h2 className="text-gray-900 dark:text-gray-200 text-md uppercase mb-4">
              Other Links
            </h2>
            <ul>
              <li className="mb-4 hover:text-purple-900 dark:hover:text-white transition-colors duration-200">
                <a href="#">Terms of Use</a>
              </li>
              <li className="mb-4 hover:text-purple-900 dark:hover:text-white transition-colors duration-200">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mb-4 hover:text-purple-900 dark:hover:text-white transition-colors duration-200">
                <a href="#">Disclaimer</a>
              </li>
              <li className="mb-4 hover:text-purple-900 dark:hover:text-white transition-colors duration-200">
                <a href="#">FAQ</a>
              </li>
              <li className="mb-4 hover:text-purple-900 dark:hover:text-white transition-colors duration-200">
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </li>
        <li className="md:w-1/3 lg:w-1/3">
          <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
            <form className="flex flex-col md:flex-row md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Subscribe'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="pt-8 flex border-t border-gray-200 max-w-xs mx-auto items-center justify-between">
            <a href="#">
              <FacebookIcon width="22" height="22" />
            </a>
            <a href="#">
              <TwitterIcon width="22" height="22" />
            </a>
            <a href="#">
              <GithubIcon width="22" height="22" />
            </a>
            <a href="#">
              <LinkedinIcon width="22" height="22" />
            </a>
          </div>
        </li>
      </ul>
      <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
        Created by &nbsp;
        <a
          href="https://prosperatu.netlify.app/"
          target="_blank"
          className="font-bold"
        >
          Prosper Atu
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
