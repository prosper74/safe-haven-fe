import React, { FC } from 'react';
import { featuresProps } from '../../interfaces';
import { CheckIcon } from '../../svgIcons';

interface IProps {
  features: featuresProps;
}

export const PropertyFeatures: FC<IProps> = ({ features }) => {
  const featuresArray = features.split(' | ');
  return (
    <>
      {features ? (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {featuresArray.map((feature: featuresProps, index: number) => (
            <div key={index} className="text-lg flex items-center">
              <CheckIcon width="22" height="22" fill="#9932cc" />
              <span className="pl-2">{feature}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-lg flex items-center">
          <CheckIcon width="22" height="22" fill="#9932cc" />
          <span className="pl-2">Nice Property</span>
        </div>
      )}
    </>
  );
};
