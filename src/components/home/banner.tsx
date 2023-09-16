// index.tsx
import React, { FC } from 'react';
import { singleProperties } from '@src/components/common/interfaces';
import SearchWidget from '../common/searchWidget';

interface IProps {
  properties: singleProperties;
}

const HomeBanner: FC<IProps> = ({ properties }) => (
  <section className="pb-16 2xl:pb-20 overflow-hidden">
    <div className="relative bg-purple-100 rounded-b-10xl">
      <div className="sm:container px-4 md:px-2 xl:px-32 mx-auto">
        <div className="flex flex-wrap items-center -mx-4 pt-10 pb-20">
          <div className="w-full md:w-1/2 px-4 mb-24 lg:mb-0">
            <span className="block mb-4 font-medium tracking-widest uppercase text-sm text-purple-600">
              A Better Way to Live
            </span>
            <h1 className="max-w-xl mb-4 font-heading font-medium text-4xl md:text-3xl xl:text-8xl leading-none">
              <span>Find Your Way </span>
              <span className="relative inline-block">
                <span className="relative z-10"> Home</span>
              </span>
            </h1>
            <p className="mb-10 lg:mb-12 text-xl text-darkBlueGray-400 leading-snug">
              Get the best deals for your new home...
            </p>
            {/* Search widget  */}
            <SearchWidget
              properties={properties}
              placeholder="Find Your Home..."
              width={''}
              height={''}
              fill={''}
            />
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
