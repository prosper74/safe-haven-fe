import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropertyCard from '@src/components/common/properties/property-card';
import {
  useIsMedium,
  useIsLarge,
  useIsXLarge,
} from '@src/components/common/hooks/media-query';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// install Swiper modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation, Autoplay]);

type Images = {
  url: String;
};

type Category = {
  name: String;
};

interface IProps {
  properties?: {
    name?: String;
    description?: String;
    price?: Number;
    category?: Category;
    images?: Images[];
  };
}

export const BuyTab: FC<IProps> = ({ properties }) => {
  const isMedium = useIsMedium();
  const isLarge = useIsLarge();
  const isXLarge = useIsXLarge();

  const buyProperties = properties.filter(
    (property) => property.category.name === 'Buy'
  );

  return (
    <div>
      <Swiper
        slidesPerView={isXLarge ? 4 : isLarge ? 3 : isMedium ? 2 : 1}
        spaceBetween={2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        {buyProperties.map((property) => (
          <SwiperSlide key={property.id} className="my-6">
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center my-6">
        <button className="flex justify-center shadow-lg py-5 px-10 mt-3 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter text-xl text-white text-center bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-900 rounded-xl">
          View All Buy Ads
        </button>
      </div>
    </div>
  );
};

export const RentTab: FC = ({ properties }) => {
  const isMedium = useIsMedium();
  const isLarge = useIsLarge();
  const isXLarge = useIsXLarge();

  const RentProperties = properties.filter(
    (property) => property.category.name === 'Rent'
  );

  return (
    <div>
      <Swiper
        slidesPerView={isXLarge ? 4 : isLarge ? 3 : isMedium ? 2 : 1}
        spaceBetween={2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        {RentProperties.map((property) => (
          <SwiperSlide key={property.id} className="my-6">
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center my-6">
        <button className="flex justify-center shadow-lg py-5 px-10 mt-3 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter text-xl text-white text-center bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-900 rounded-xl">
          View All Rent Ads
        </button>
      </div>
    </div>
  );
};

export const ShortletTab: FC = ({ properties }) => {
  const isMedium = useIsMedium();
  const isLarge = useIsLarge();
  const isXLarge = useIsXLarge();

  const ShortletProperties = properties.filter(
    (property) => property.category.name === 'Shortlet'
  );

  return (
    <div>
      <Swiper
        slidesPerView={isXLarge ? 4 : isLarge ? 3 : isMedium ? 2 : 1}
        spaceBetween={2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        {ShortletProperties.map((property) => (
          <SwiperSlide key={property.id} className="my-6">
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center my-6">
        <button className="flex justify-center shadow-lg py-5 px-10 mt-3 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter text-xl text-white text-center bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-900 rounded-xl">
          View All Shortlet Ads
        </button>
      </div>
    </div>
  );
};
