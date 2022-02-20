import React, { FC } from 'react';
import ImageSlider from './image-slider';
import PropertyMeta from './property-meta';
import { timeSince } from '@src/components/common/dateFunction';
import AgentCard from './agent-card';
import SingleTab from '@src/components/common/properties/tab/single-tab';
import { RelatedPropertiesSlide } from './related-properties';

// type Images = {
//   url: String;
// };

// interface IProps {
//   property: {
//     id?: String;
//     name?: String;
//     description?: String;
//     price?: Number;
//     category?: String;
//     state?: String;
//     city?: String;
//     per?: String;
//     bedrooms?: Number;
//     bathroom?: Number;
//     size?: Number;
//     images?: Images[];
//   };
// }

const SingleProperty: FC = ({ property }) => {
  // console.log('Property:', property);
  const propertyAgent = property.users_permissions_user;
  return (
    <section className="mb-6">
      {/* Property Image Slide */}
      <ImageSlider property={property.images} />

      {/* Property Name  */}
      <h3 className="font-bold text-2xl md:text-3xl mt-8">{property.name}</h3>
      <PropertyMeta property={property} single={true} />
      <ul className="flex items-center my-1 space-x-1 text-lg font-normal leading-4 text-coolGray-500">
        <li>
          <svg
            width="23"
            height="23"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path
              fill="#9932cc"
              d="M12,19a1,1,0,1,0-1-1A1,1,0,0,0,12,19Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,19Zm0-4a1,1,0,1,0-1-1A1,1,0,0,0,17,15Zm-5,0a1,1,0,1,0-1-1A1,1,0,0,0,12,15ZM19,3H18V2a1,1,0,0,0-2,0V3H8V2A1,1,0,0,0,6,2V3H5A3,3,0,0,0,2,6V20a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V6A3,3,0,0,0,19,3Zm1,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V11H20ZM20,9H4V6A1,1,0,0,1,5,5H6V6A1,1,0,0,0,8,6V5h8V6a1,1,0,0,0,2,0V5h1a1,1,0,0,1,1,1ZM7,15a1,1,0,1,0-1-1A1,1,0,0,0,7,15Zm0,4a1,1,0,1,0-1-1A1,1,0,0,0,7,19Z"
            />
          </svg>
        </li>
        <li>
          <span className="font-medium">Created: </span>{' '}
          {timeSince(new Date(property.createdAt))}
        </li>
      </ul>
      <h3 className="text-purple-600 font-bold text-2xl md:text-4xl my-4">
        ₦{Number(property.price).toLocaleString()}
        {property.per ? `/${property.per}` : ''}
      </h3>
      <AgentCard agent={propertyAgent} />
      <SingleTab property={property} />
      <h3 className="text-3xl font-medium">Related Properties</h3>
      <RelatedPropertiesSlide tabCategory={property.type} />
    </section>
  );
};

export default SingleProperty;
