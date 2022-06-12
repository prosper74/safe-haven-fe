import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Tab } from '@headlessui/react';
import AgentSidebar from './agentSidebar';
import { singleProperties } from '@src/components/common/interfaces';
import { PropertyCardList } from '../propertyCard';
import { PageLoader } from '../../loader';

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(' ');
};

const UserTab: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const [ads, setAds] = useState<any[]>([]);
  const newAds =
    ads.length > 0 &&
    ads[0].sort(
      (a: { createdAt: string }, b: { createdAt: string }) =>
        Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/adverts?users_permissions_user.id=${user.id}`
      )
      .then((res) => {
        setAds([res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {ads.length < 1 ? (
        <PageLoader />
      ) : (
        <div className="w-full py-16">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 text-lg font-medium bg-purple-100 rounded-xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 leading-5 text-gray-900 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
                  )
                }
              >
                Profile
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 leading-5 text-gray-900 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
                  )
                }
              >
                Reviews
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 leading-5 text-gray-900 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-gray-700 hover:bg-white/[0.12] hover:text-purple-600'
                  )
                }
              >
                Favourites
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  'bg-white rounded-xl py-3',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
                )}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-0 sm:gap-4">
                  {/* agent sidebar */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <button
                        className={`inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2`}
                      >
                        Edit Profile
                      </button>

                      {user.verified ? (
                        <Link href="/create-ad">
                          <button className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2">
                            Create Ad
                          </button>
                        </Link>
                      ) : (
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2">
                          Verify Account
                        </button>
                      )}
                    </div>
                    <AgentSidebar agent={user} totalCount={ads[0].length} />
                  </div>

                  {ads[0].length! < 1 ? (
                    <div className="flex flex-col justify-center items-center text-center">
                      <h3 className="font-medium text-lg">
                        You do not have any ads.{' '}
                        {user.verified
                          ? 'Create one'
                          : 'Please verify your account, then create new ads'}
                      </h3>
                      {user.verified ? (
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2">
                          Create Ad
                        </button>
                      ) : (
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2">
                          Verify Account
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-3">
                      {newAds.map((property: singleProperties) => (
                        <PropertyCardList
                          key={property.id}
                          property={property}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'bg-white rounded-xl py-3',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
                )}
              >
                Reviews
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'bg-white rounded-xl py-3',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
                )}
              >
                Favourites
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </>
  );
};

export default UserTab;
