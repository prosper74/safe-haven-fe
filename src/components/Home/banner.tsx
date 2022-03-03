// index.tsx
import React, { FC } from 'react';

const HomeBanner: FC = () => (
  <section className="pb-16 2xl:pb-20 overflow-hidden">
    <div className="relative bg-purple-100 rounded-b-10xl">
      <div className="container px-4 md:px-2 xl:px-32 mx-auto">
        <div className="flex flex-wrap items-center -mx-4 pt-10 pb-20">
          <div className="w-full md:w-1/2 px-4 mb-24 lg:mb-0">
            <span className="block mb-4 font-medium tracking-widest uppercase text-sm text-purple-600">
              A Better Way to Live
            </span>
            <h1 className="max-w-xl mb-4 font-heading font-medium text-4xl md:text-3xl xl:text-8xl leading-none">
              <span>Find Your Way </span>
              <span className="relative inline-block">
                <span className="absolute inset-0 xl:-left-8 xl:-right-8">
                  <img
                    className="absolute inset-0 w-full max-w-non"
                    src="assets/images/lines-blue1.svg"
                    alt=""
                  />
                  <img
                    className="absolute inset-0 mt-1 lg:mt-2 xl:ml-4 w-full max-w-none"
                    src="uinel-assets/elements/heroes/lines-blue2.svg"
                    alt=""
                  />
                </span>
                <span className="relative z-10"> Home</span>
              </span>
            </h1>
            <p className="mb-16 lg:mb-24 text-xl text-darkBlueGray-400 leading-snug">
              Get the best deals for your new home...
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                className="py-5 px-10 bg-white text-xl text-darkBlueGray-400 placeholder-darkBlueGray-400 outline-none rounded-xl"
                type="text"
                placeholder="find your home"
              />
              <button className="py-5 px-10 mt-3 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter text-xl text-white text-center bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-900 rounded-xl">
                Search
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="relative max-w-sm xl:max-w-none mx-auto">
              <img
                className="relative xl:max-w-max z-10"
                src="assets/images/widget.png"
                alt=""
              />
              <img
                className="absolute -top-3 -left-24 xl:max-w-max"
                src="assets/images/elipse.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeBanner;
