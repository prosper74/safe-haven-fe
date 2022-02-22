import React, { useState, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useIsXLarge } from '../hooks/media-query';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

type Images = {
  url: String;
};

interface IProps {
  property: {
    images: Images[];
    length: Number;
  };
}

const ImageSlider: FC<IProps> = ({ property }) => {
  const isXLarge = useIsXLarge();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#F3E8FF',
          '--swiper-pagination-color': '#F3E8FF',
        }}
        loop={true}
        spaceBetween={10}
        navigation={property.length < 2 ? false : true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {property.map((d) => (
          <SwiperSlide key={d.id} className="relative">
            <img
              src={d.url}
              className="mb-2 rounded-xl shadow-md w-full h-127 md:h-128 object-cover"
            />
            <div className="absolute left-0 top-0 z-[100] bg-purple-500 text-white py-1 px-2 rounded-xl">
              {property.indexOf(d) + 1}/{property.length}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={5}
        slidesPerView={
          property.length < 2
            ? 1
            : property.length < 3
            ? 4
            : property.length > 2 && isXLarge
            ? 6
            : 5
        }
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {property.map((d) => (
          <SwiperSlide key={d.id}>
            <img
              src={d.url}
              className="rounded-xl shadow-md md:w-32 md:h-24 w-full h-20 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
