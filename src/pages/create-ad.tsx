// index.tsx
import React, { FC, useState } from 'react';
import Head from 'next/head';
import { RootStateOrAny, useSelector } from 'react-redux';
import AuthPortal from '@src/components/auth';
import LoginPopupButton from '@src/components/common/buttons/loginPopup';
import { CreateAdForm } from '@src/components/common/property_form/createAdForm';
import Link from 'next/link';

const CreateAdPage: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Create New Ad</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="my-24">
        <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
          {!user.onboarding && !user.jwt ? (
            <>
              <h3 className="font-bold text-center text-xl mt-24 mb-10">
                Please login or create an account before you can post an ad
              </h3>
              <LoginPopupButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonText="Login"
              />
              <AuthPortal isOpen={isOpen} setIsOpen={setIsOpen} />
            </>
          ) : user.verified === false ? (
            <>
              <h1 className="font-bold text-center text-3xl mt-28 mb-4">
                Your account is not yet veirifed!
              </h1>
              <h1 className="font-bold text-center text-xl mb-3">
                Please verify your account to create ads
              </h1>
              <Link href="/agent/account">
                <a className="transition duration-200 text-white bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-auto py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200">
                  Verify
                </a>
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-bold text-center text-3xl mt-28 mb-10">
                Create New Ad
              </h1>
              {/* @ts-ignore */}
              <CreateAdForm />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default CreateAdPage;
