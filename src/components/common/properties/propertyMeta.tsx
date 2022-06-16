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
  single: boolean;
}

const PropertyMeta: FC<IProps> = ({ property, single }) => {
  return (
    <>
      {/* Location */}
      <ul
        className={`flex items-center my-1 space-x-1 ${
          single ? 'text-lg' : 'text-sm'
        } font-normal leading-4 text-coolGray-500`}
      >
        <li>
          <LocationIcon
            width={single ? '25' : '20'}
            height={single ? '25' : '20'}
            fill="#9932cc"
          />
        </li>
        <li>
          {property.city}, {property.state}
        </li>
      </ul>
      {/* End of Location */}
      {/* Meta Description  */}
      <ul
        className={`flex items-center my-1 space-x-1 ${
          single ? 'text-base' : 'text-sm'
        } font-normal leading-4 text-coolGray-500`}
      >
        {property.sittingroom && (
          <li>
            <TVIcon
              width={single ? '25' : '20'}
              height={single ? '25' : '20'}
              fill="#9932cc"
            />
          </li>
        )}
        {property.sittingroom && (
          <li>
            {property.sittingroom} {single ? 'Living Room' : 'L.Room'}
          </li>
        )}
        {property.bedroom && <li>&middot;</li>}
        {property.bedroom && (
          <li>
            <BedIcon
              width={single ? '25' : '20'}
              height={single ? '25' : '20'}
              fill="#9932cc"
            />
          </li>
        )}
        {property.bedroom && <li>{property.bedroom} Beds</li>}
        {property.bathroom && <li>&middot;</li>}
        {property.bathroom && (
          <li>
            <ShowerIcon
              width={single ? '25' : '20'}
              height={single ? '25' : '20'}
              fill="#9932cc"
            />
          </li>
        )}
        {property.bathroom && <li>{property.bathroom} Baths</li>}
        {property.bathroom && property.size ? <li>&middot;</li> : ''}
        {property.size && (
          <li>
            <HomeIcon
              width={single ? '25' : '20'}
              height={single ? '25' : '20'}
              fill="#9932cc"
            />            
          </li>
        )}
        {property.size && <li>{property.size} sqm</li>}
      </ul>
    </>
  );
};

export default PropertyMeta;
