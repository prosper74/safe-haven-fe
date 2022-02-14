import React, { FC } from 'react';

const HowItWorks: FC = () => (
  <section className="py-10 bg-white">
    <div className="container px-6 mx-auto">
      <div className="mb-10 text-center">
        <span className="block mb-9 text-xs leading-4 font-medium uppercase tracking-widest text-gray-500">
          How it works
        </span>
        <h2 className="text-4xl md:text-4xl xl:text-11xl leading-none font-heading font-medium">
          Easy to use
        </h2>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center -mx-4 mb-1 md:mb-10">
        <div className="w-full md:w-11/12 px-4 mb-12 md:mb-0">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 px-4">
              <div className="relative max-w-sm mx-auto mb-8">
                <div className="relative pt-16 pb-20 px-8 md:px-16 bg-white border border-black border-opacity-10 z-10 rounded-3xl">
                  <div className="relative inline-flex items-center justify-center mb-8 w-12 h-12 leading-6 text-white bg-purple-700 rounded-full">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h2 className="mb-4 text-2xl lg:text-3xl leading-tight font-medium font-heading">
                    Filter and Search
                  </h2>
                  <p className="text-lg text-darkBlueGray-400">
                    Browse our list of homes and properties, and find your
                    favourite space.
                  </p>
                </div>
                <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-11/12 h-24 border border-black border-opacity-10 rounded-3xl"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-4">
              <div className="relative max-w-sm mx-auto xl:mt-10 mb-8">
                <div className="relative pt-16 pb-20 px-8 md:px-16 bg-white border border-black border-opacity-10 z-10 rounded-3xl">
                  <div className="relative inline-flex items-center justify-center mb-8 w-12 h-12 leading-6 text-white bg-purple-700 rounded-full">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h2 className="mb-4 text-2xl lg:text-3xl leading-tight font-medium font-heading">
                    Schedule Viewing
                  </h2>
                  <p className="text-lg text-darkBlueGray-400">
                    Look through our available properties and schedule a
                    viewing.
                  </p>
                </div>
                <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-11/12 h-24 border border-black border-opacity-10 rounded-3xl"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-4">
              <div className="relative max-w-sm mx-auto mb-8">
                <div className="relative pt-16 pb-20 px-8 md:px-16 bg-white border border-black border-opacity-10 z-10 rounded-3xl">
                  <div className="relative inline-flex items-center justify-center mb-8 w-12 h-12 leading-6 text-white bg-purple-700 rounded-full">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h2 className="mb-4 text-2xl lg:text-3xl leading-tight font-medium font-heading">
                    Make an Offer
                  </h2>
                  <p className="text-lg text-darkBlueGray-400">
                    Make payment and prepare to move into your new space.
                  </p>
                </div>
                <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-11/12 h-24 border border-black border-opacity-10 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-44 h-1 mx-auto bg-purple-600"></div>
    </div>
  </section>
);

export default HowItWorks;
