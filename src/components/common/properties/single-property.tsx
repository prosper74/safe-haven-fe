import React, { FC } from 'react';
import ImageSlider from './image-slider';
// import Link from 'next/link';

type Images = {
  url: String;
};

interface IProps {
  property: {
    id?: String;
    name?: String;
    description?: String;
    price?: Number;
    category?: String;
    state?: String;
    city?: String;
    per?: String;
    bedrooms?: Number;
    bathroom?: Number;
    size?: Number;
    images?: Images[];
  };
}

const SingleProperty: FC<IProps> = ({ property }) => {
  return (
    <section className="mb-6">
      {/* Property Image Slide */}
      <ImageSlider property={property.images} />

      {/* Property Name  */}
      <h3 className="font-bold text-2xl md:text-3xl mt-8">{property.name}</h3>
    </section>
  );
};

export default SingleProperty;
