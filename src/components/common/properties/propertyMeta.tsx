import React, { FC } from 'react';
import { singleProperties } from '../interfaces';
import {
  BedIcon,
  HomeIcon,
  LocationIcon,
  ShowerIcon,
  TVIcon,
} from '../svgIcons';

interface IProps {
  property: singleProperties;
}

export const PropertyMeta: FC<IProps> = ({ property }) => {
  return (
    <>
      {/* Location */}
      <ul className="flex items-center my-1 space-x-1 text-lg font-normal leading-4 text-coolGray-500">
        <li>
          <LocationIcon width="25" height="25" fill="#9932cc" />
        </li>
        <li>
          {property.city}, {property.state}
        </li>
      </ul>
      {/* End of Location */}
      {/* Meta Description  */}
      <ul className="flex items-center my-1 space-x-1 text-base font-normal leading-4 text-coolGray-500">
        {property.sittingroom && (
          <li>
            <TVIcon width="25" height="25" fill="#9932cc" />
          </li>
        )}
        {property.sittingroom && <li>{property.sittingroom} Living Room</li>}
        {property.bedroom && <li>&middot;</li>}
        {property.bedroom && (
          <li>
            <BedIcon width="25" height="25" fill="#9932cc" />
          </li>
        )}
        {property.bedroom && (
          <li>
            {property.bedroom} Bedroom{Number(property.bedroom) > 1 && 's'}
          </li>
        )}
        {property.bathroom && <li>&middot;</li>}
        {property.bathroom && (
          <li>
            <ShowerIcon width="25" height="25" fill="#9932cc" />
          </li>
        )}
        {property.bathroom && (
          <li>
            {property.bathroom} Bathroom{Number(property.bathroom) > 1 && 's'}
          </li>
        )}
        {property.bathroom && property.size ? <li>&middot;</li> : ''}
        {property.size && (
          <li>
            <HomeIcon width="25" height="25" fill="#9932cc" />
          </li>
        )}
        {property.size && <li>{property.size} sqm</li>}
      </ul>
    </>
  );
};

export const PropertyCardMeta: FC<IProps> = ({ property }) => {
  return (
    <>
      {/* Location */}
      <ul className="flex items-center my-1 space-x-1 text-sm font-normal leading-4 text-coolGray-500">
        <li>
          <LocationIcon width="20" height="20" fill="#9932cc" />
        </li>
        <li>
          {property.city}, {property.state}
        </li>
      </ul>
      {/* End of Location */}
      {/* Meta Description  */}
      <ul className="flex items-center my-1 space-x-1 text-sm font-normal leading-4 text-coolGray-500">
        {property.sittingroom && (
          <li>
            <TVIcon width="20" height="20" fill="#9932cc" />
          </li>
        )}
        {property.sittingroom && <li>{property.sittingroom} L.Room</li>}
        {property.bedroom && <li>&middot;</li>}
        {property.bedroom && (
          <li>
            <BedIcon width="20" height="20" fill="#9932cc" />
          </li>
        )}
        {property.bedroom && <li>{property.bedroom} Beds</li>}
        {property.bathroom && property.size ? <li>&middot;</li> : ''}
        {property.size && (
          <li>
            <HomeIcon width="25" height="25" fill="#9932cc" />
          </li>
        )}
        {property.size && <li>{property.size} sqm</li>}
      </ul>
    </>
  );
};
