import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyMeta from '@src/components/common/properties/propertyMeta';
import { propertyCard } from '../interfaces';

interface IProps {
  property: propertyCard;
}

const PropertyCard: FC<IProps> = ({ property }) => {
  return (
    <div className="flex justify-center mb-2 mx-1">
      {property ? (
        <Link
          href={
            property.name
              ? `/${property?.category?.name.toLowerCase()}/${property?.name
                  .toLowerCase()
                  .replace(/ /g, '-')}&id=${property.id}`
              : ''
          }
        >
          <a>
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              <a data-mdb-ripple="true" data-mdb-ripple-color="light">
                <Image
                  src={
                    property.images
                      ? `${property.images[0].url}`
                      : '/logoIcon.svg'
                  }
                  alt={property.name}
                  width={500}
                  height={350}
                  className="rounded-t-lg object-cover"
                />
              </a>
              <div className="p-4">
                <h4 className="text-gray-900 text-xl font-medium mb-2">
                  {property?.name?.substring(0, 23)}
                </h4>
                {/* Location */}
                <PropertyMeta property={property} />
                {/* End of Meta Description  */}
                {/* Price  */}
                <h3 className="text-purple-600 font-bold text-xl mt-2">
                  ₦{Number(property.price).toLocaleString()}
                  {property.per ? `/${property.per}` : ''}
                </h3>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <div>
          <a data-mdb-ripple="true" data-mdb-ripple-color="light">
            <img
              className="rounded-t-lg w-80 h-44 object-cover"
              src="/logo.svg"
              alt=""
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
