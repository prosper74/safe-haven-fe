import React, { FC } from 'react';

interface IProps {
  features?: {
    features?: String;
  };
}

export const PropertyFeatures: FC<IProps> = ({ features }) => {
  return (
    <>
      {features.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {features?.map((d) => (
            <div key={d.id} className="text-lg flex items-center">
              <svg
                height="22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#9932cc"
                  d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                />
              </svg>
              <span className="pl-2">{d.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-lg flex items-center">
          <svg
            height="22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#9932cc"
              d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            />
          </svg>
          <span className="pl-2">Nice Property</span>
        </div>
      )}
    </>
  );
};
