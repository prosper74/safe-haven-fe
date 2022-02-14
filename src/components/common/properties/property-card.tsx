import React, { FC } from 'react';
import Link from 'next/link';

const PropertyCard: FC = ({ property }) => {
  return (
    <div className="flex justify-center mb-6 mx-2">
      {property ? (
        <Link
          href={`/${property.category.name.toLowerCase()}/${property.name
            .toLowerCase()
            .replace(/ /g, '-')}&id=${property.id}`}
        >
          <a>
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              <a data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img
                  className="rounded-t-lg w-80 h-44 object-cover"
                  src={property.images[0].url}
                  alt=""
                />
              </a>
              <div className="p-4">
                <h4 className="text-gray-900 text-xl font-medium mb-2">
                  {property.name.substring(0, 25)}
                </h4>
                {/* Location */}
                <ul className="flex items-center my-1 space-x-1 text-sm font-normal leading-4 text-coolGray-500">
                  <li>
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#9932cc"
                        d="M12,10.8a2,2,0,1,0-2-2A2,2,0,0,0,12,10.8Zm-.71,6.91a1,1,0,0,0,1.42,0l4.09-4.1a6.79,6.79,0,1,0-9.6,0ZM7.23,8.34A4.81,4.81,0,0,1,9.36,4.79a4.81,4.81,0,0,1,5.28,0,4.82,4.82,0,0,1,.75,7.41L12,15.59,8.61,12.2A4.77,4.77,0,0,1,7.23,8.34ZM19,20H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"
                      />
                    </svg>
                  </li>
                  <li>
                    {property.city}, {property.state}
                  </li>
                </ul>
                {/* End of Location */}
                {/* Meta Description  */}
                <ul className="flex items-center my-1 space-x-1 text-sm font-normal leading-4 text-coolGray-500">
                  {property.bedrooms && (
                    <li>
                      <svg
                        width="18"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#9932cc"
                          d="M7,12.5a3,3,0,1,0-3-3A3,3,0,0,0,7,12.5Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,7,8.5Zm13-2H12a1,1,0,0,0-1,1v6H3v-8a1,1,0,0,0-2,0v13a1,1,0,0,0,2,0v-3H21v3a1,1,0,0,0,2,0v-9A3,3,0,0,0,20,6.5Zm1,7H13v-5h7a1,1,0,0,1,1,1Z"
                        />
                      </svg>
                    </li>
                  )}
                  {property.bedrooms && <li>{property.bedrooms} Beds</li>}
                  {property.bedrooms && <li>&middot;</li>}
                  {property.bathroom && (
                    <li>
                      <svg
                        width="18"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#9932cc"
                          d="M22,12H5V6.41016A1.97474,1.97474,0,0,1,6.04,4.65137a1.99474,1.99474,0,0,1,1.14764-.2312,3.49114,3.49114,0,0,0,.83771,3.55444L9.08594,9.03516a.99965.99965,0,0,0,1.41406,0L14.03516,5.5a.99964.99964,0,0,0,0-1.41406L12.97461,3.02539a3.494,3.494,0,0,0-4.52972-.34253A3.99247,3.99247,0,0,0,3,6.41016V12H2a1,1,0,0,0,0,2H3v3a2.995,2.995,0,0,0,2,2.81567V21a1,1,0,0,0,2,0V20H17v1a1,1,0,0,0,2,0V19.81573A2.99507,2.99507,0,0,0,21,17V14h1a1,1,0,0,0,0-2ZM9.43945,4.43945a1.50184,1.50184,0,0,1,2.1211,0l.35351.35352L9.793,6.91406l-.35352-.35351A1.50123,1.50123,0,0,1,9.43945,4.43945ZM19,17a1.00067,1.00067,0,0,1-1,1H6a1.00067,1.00067,0,0,1-1-1V14H19Z"
                        />
                      </svg>
                    </li>
                  )}
                  {property.bathroom && <li>{property.bathroom} Baths</li>}
                  {property.bathroom && property.size ? <li>&middot;</li> : ''}
                  {property.size && (
                    <li>
                      <svg
                        width="18"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#9932cc"
                          d="M21.66,10.25l-9-8a1,1,0,0,0-1.32,0l-9,8a1,1,0,0,0-.27,1.11A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.93-.64A1,1,0,0,0,21.66,10.25ZM13,20H11V17a1,1,0,0,1,2,0Zm5,0H15V17a3,3,0,0,0-6,0v3H6V12H18ZM5.63,10,12,4.34,18.37,10Z"
                        />
                      </svg>
                    </li>
                  )}
                  {property.size && <li>{property.size} sqm</li>}
                </ul>
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