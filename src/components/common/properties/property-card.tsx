import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyMeta from '@src/components/common/properties/property-meta';

type Images = {
  url: String;
};

type Category = {
  name: String;
};

interface IProps {
  property: {
    id?: String;
    name?: String;
    description?: String;
    price?: Number;
    category?: Category[];
    state?: String;
    city?: String;
    per?: String;
    bedrooms?: Number;
    bathroom?: Number;
    size?: Number;
    images?: Images[];
  };
}

const PropertyCard: FC<IProps> = ({ property }) => {
  return (
    <div className="flex justify-center mb-6 mx-1">
      {property ? (
        <Link
          href={`/${property.category.name.toLowerCase()}/${property.name
            .toLowerCase()
            .replace(/ /g, '-')}&id=${property.id}`}
        >
          <a>
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              <a data-mdb-ripple="true" data-mdb-ripple-color="light">
                <Image
                  src={property.images[0].url}
                  alt={property.name}
                  width={500}
                  height={350}
                  className="rounded-t-lg object-cover"
                />
                {/* <img
                  className="rounded-t-lg w-80 h-44 object-cover"
                  src={property.images[0].url}
                  alt=""
                /> */}
              </a>
              <div className="p-4">
                <h4 className="text-gray-900 text-xl font-medium mb-2">
                  {property.name.substring(0, 23)}
                </h4>
                {/* Location */}
                <PropertyMeta property={property} />
                {/* End of Meta Description  */}
                {/* Price  */}
                <h3 className="text-purple-600 font-bold text-xl mt-2">
                  ₦{property.price.toLocaleString()}
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
