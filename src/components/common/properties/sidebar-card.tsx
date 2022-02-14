import React, { FC } from 'react';
import Link from 'next/link';

interface IProps {
  property: {
    name?: String;
  };
  data: {
    heading: String;
    description: String;
    button: String;
  };
}

const SidebarCard: FC<IProps> = ({ property, data }) => {
  return (
    <div className="flex justify-center pb-6">
      <div className="rounded-lg shadow-lg bg-purple-100 max-w-sm">
        <div className="p-4">
          <h4 className="text-center text-gray-900 text-2xl font-medium mb-2">
            {data.heading}
            {/* {property.name.substring(0, 25)} */}
          </h4>
          <p className="text-gray-900 text-center text-lg font-light mb-2">
            {data.description}
          </p>
          <div className="flex justify-center my-6">
            <Link href="/">
              <button className="flex justify-center shadow-lg py-2 px-6 mt-3 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter text-xl text-white text-center bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:bg-purple-900 rounded-xl">
                {data.button}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCard;