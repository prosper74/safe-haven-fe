import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PropertyCard } from '@src/components/common/properties/propertyCard';
import {
  useIsMedium,
  useIsLarge,
  useIsXLarge,
} from '@src/components/common/hooks/mediaQuery';
import { singleProperties } from '@src/components/common/interfaces';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// install Swiper modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import Link from 'next/link';
SwiperCore.use([Pagination, Navigation, Autoplay]);

interface IProps {
  properties: singleProperties;
  tabCategory: string;
}

export const TabContent: FC<IProps> = ({ properties, tabCategory }) => {
  const isMedium = useIsMedium();
  const isLarge = useIsLarge();
  const isXLarge = useIsXLarge();

  const buyProperties = properties.filter(
    (property: { category: { name: string } }) =>
      property.category.name === tabCategory
  );

  return (
    <div>
      <Swiper
        slidesPerView={isXLarge ? 4 : isLarge ? 3 : isMedium ? 2 : 1}
        spaceBetween={2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {buyProperties.map((property: singleProperties) => (
          <SwiperSlide key={property.id} className="my-6">
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center my-6">
        <Link href={`/${tabCategory.toLocaleLowerCase()}`}>
          <button className="flex justify-center shadow-lg py-5 px-10 mt-3 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter text-xl text-white text-center bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-900 rounded-xl">
            View All {tabCategory} Ads
          </button>
        </Link>
      </div>
    </div>
  );
};
