import React, { FC } from 'react';
import { AppleIcon, GooglePlayIcon } from '../common/svgIcons';

const CTASection: FC = () => (
  <div className="bg-white dark:bg-gray-800 flex relative items-center overflow-hidden my-16">
    <div className="container mx-auto xs:px-0 md:px-6 flex relative py-16">
      <div className="w-full md:w-1/2 flex flex-col relative xl:pl-20">
        <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
        <h1 className="font-bebas-neue uppercase text-3xl md:text-5xl xl:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
          Our mobile app is coming soon.
        </h1>
        <p className="text-sm sm:text-base text-gray-700 dark:text-white">
          Dimension of reality that makes change possible and understandable. An
          indefinite and homogeneous environment in which natural events and
          human existence take place.
        </p>
        <div className="flex flex-col sm:flex-row mt-8">
          <div className="flex mt-3 mr-2 w-48 h-14 bg-black text-white rounded-lg items-center justify-center">
            <div className="mr-3">
              <GooglePlayIcon />
            </div>
            <div>
              <div className="text-xs">GET IT ON</div>
              <div className="text-xl font-semibold font-sans -mt-1">
                Google Play
              </div>
            </div>
          </div>
          <div className="flex mt-3 w-48 h-14 bg-transparent text-black border border-black rounded-xl items-center justify-center">
            <div className="mr-3">
              <AppleIcon />
            </div>
            <div>
              <div className="text-xs">Download on the</div>
              <div className="text-2xl font-semibold font-sans -mt-1">
                App Store
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
        <img src="/assets/images/mobile-app.png" className="max-w-lg m-auto" />
      </div>
    </div>
  </div>
);

export default CTASection;
