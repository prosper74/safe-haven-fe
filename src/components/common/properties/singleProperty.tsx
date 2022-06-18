import React, { FC } from 'react';
import ImageSlider from './imageSlider';
import { PropertyMeta } from './propertyMeta';
import { timeSince } from '@src/components/common/dateFunction';
import AgentCard from './agentCard';
import SingleTab from '@src/components/common/properties/tab/singleTab';
import { RelatedPropertiesSlide } from './relatedProperties';
import { singleProperties } from '../interfaces';
import { CalendarIcon } from '../svgIcons';

interface IProps {
  property: singleProperties;
}

const SingleProperty: FC<IProps> = ({ property }) => {
  const propertyAgent = property.users_permissions_user;
  return (
    <section className="mb-6">
      {/* Property Image Slide */}
      <ImageSlider property={property} />

      {/* Property Name  */}
      <p className="mt-6 italic">{property.category.name}</p>
      <h3 className="font-bold text-2xl md:text-3xl">{property.title}</h3>
      <PropertyMeta property={property} />
      <ul className="flex items-center my-1 space-x-1 text-lg font-normal leading-4 text-coolGray-500">
        <li>
          <CalendarIcon width="22" height="22" fill="#9932cc" />
        </li>
        <li>
          <span className="font-medium">Added: </span>{' '}
          {timeSince(new Date(property.createdAt))} ago
        </li>
      </ul>
      <h3 className="text-purple-600 font-bold text-2xl md:text-4xl my-4">
        ₦{Number(property.price).toLocaleString()}
        {property.period ? `/${property.period}` : ''}
      </h3>
      <AgentCard agent={propertyAgent} />
      <SingleTab property={property} />
      <h3 className="text-3xl font-medium">Related Properties</h3>
      <RelatedPropertiesSlide propertyType={property.type} />
    </section>
  );
};

export default SingleProperty;
