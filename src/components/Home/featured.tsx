import React, { FC } from 'react';
import PropertyTab from './tab/tab';

type Images = {
  url: String;
};

type Category = {
  name: String;
};

interface IProps {
  properties: {
    name?: String;
    description?: String;
    price?: Number;
    category?: Category;
    images?: Images[];
  };
}

const FeaturedProperties: FC<IProps> = ({ properties }) => {

  return (
    <div className="container px-6 xl:px-32 mx-auto bg-white">
      <h2 className="text-center text-4xl md:text-4xl xl:text-11xl leading-none font-heading font-medium">
        Featured Properties
      </h2>
      {/* Tab Start */}
      <PropertyTab properties={properties} />
      {/* Tab End */}
    </div>
  );
};

export default FeaturedProperties;
