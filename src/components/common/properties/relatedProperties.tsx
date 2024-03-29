import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PropertyCard } from '@src/components/common/properties/propertyCard';
import {
  useIsLarge,
  useIsXLarge,
} from '@src/components/common/hooks/mediaQuery';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// install Swiper modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation, Autoplay]);

interface IProps {
  propertyType: string[];
}

export const RelatedPropertiesSlide: FC<IProps> = ({ propertyType }) => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/adverts?type=${propertyType}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isLarge = useIsLarge();
  const isXLarge = useIsXLarge();

  return (
    <div>
      <Swiper
        slidesPerView={isXLarge ? 3 : isLarge ? 2 : 1}
        spaceBetween={2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id} className="my-6">
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
