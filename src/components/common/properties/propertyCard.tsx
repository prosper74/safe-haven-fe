import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';
import PropertyMeta from '@src/components/common/properties/propertyMeta';
import { useIsSmall } from '@src/components/common/hooks/mediaQuery';
import { singleProperties } from '../interfaces';
import { DeleteIcon, EditIcon } from '../svgIcons';

interface IProps {
  property: singleProperties;
}

export const PropertyCard: FC<IProps> = ({ property }) => {
  return (
    <div className="flex justify-center mb-2 mx-1 cursor-pointer">
      {property ? (
        <Link
          href={
            property.title
              ? `/${property?.category?.name.toLowerCase()}/${property?.name
                  .toLowerCase()
                  .replace(/ /g, '-')}&id=${property.id}`
              : ''
          }
        >
          <div className="rounded-lg shadow-lg bg-white max-w-sm">
            <a data-mdb-ripple="true" data-mdb-ripple-color="light">
              <Image
                src={
                  property.images
                    ? `${property.images[0].url}`
                    : '/logoIcon.svg'
                }
                alt={property.title}
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
              <PropertyMeta property={property} single={false} />
              {/* End of Meta Description  */}
              {/* Price  */}
              <h3 className="text-purple-600 font-bold text-xl mt-2">
                ₦{Number(property.price).toLocaleString()}
                {property.per ? `/${property.per}` : ''}
              </h3>
            </div>
          </div>
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

export const PropertyCardList: FC<IProps> = ({ property }) => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (adId: string) => {
    setIsLoading(true);
    axios
      .delete(`${process.env.NEXT_PUBLIC_REST_API}/adverts/${adId}`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(() => {
        setIsLoading(false);
        dispatch(
          setSnackbar({
            status: 'success',
            message: ` ad deleted successfully`,
            open: true,
          })
        );
        router.push('/agent/account');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        dispatch(
          setSnackbar({
            status: 'error',
            message: ` There was an error. Please try again later`,
            open: true,
          })
        );
      });
  };

  const isSmall = useIsSmall();
  return (
    <div className="mb-1">
      {property ? (
        <div className="grid grid-cols-7 rounded-lg shadow-lg bg-white w-full h-32 px-2 py-4">
          <img
            src={
              property.images ? `${property.images[0].url}` : '/logoIcon.svg'
            }
            alt={property.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="px-4 sm:col-span-4 col-span-6 flex flex-col justify-between">
            <h4 className="text-gray-900 text-lg flex-wrap font-medium">
              {property?.title?.substring(0, 60)} ({property?.category?.name})
            </h4>
            {isSmall && <PropertyMeta property={property} single={false} />}
            {!isSmall && (
              <div className="flex flex-row sm:flex-col justify-between">
                <h3 className="text-purple-600 font-bold text-xl">
                  ₦{Number(property.price).toLocaleString()}
                  {property.per ? `/${property.per}` : ''}
                </h3>
                <div className="flex flex-row mb-1">
                  <button className="flex flex-row mr-4">
                    <EditIcon width="22px" height="22px" fill="#9333EC" />
                  </button>
                  {isLoading ? (
                    <div className="border-b-2 border-purple-600 rounded-full animate-spin w-6 h-6 " />
                  ) : (
                    <button onClick={() => handleDelete(property.id)}>
                      <DeleteIcon width="22px" height="22px" fill="#c10000" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          {isSmall && (
            <div className="flex flex-row sm:flex-col justify-between">
              <h3 className="text-purple-600 font-bold text-xl">
                ₦{Number(property.price).toLocaleString()}
                {property.per ? `/${property.per}` : ''}
              </h3>
              <div className="flex flex-row mb-1">
                <button className="flex flex-row mr-4">
                  <EditIcon width="22px" height="22px" fill="#9333EC" />
                </button>
                {isLoading ? (
                  <div className="border-b-2 border-purple-600 rounded-full animate-spin w-6 h-6 " />
                ) : (
                  <button onClick={() => handleDelete(property.id)}>
                    <DeleteIcon width="22px" height="22px" fill="#c10000" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
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
