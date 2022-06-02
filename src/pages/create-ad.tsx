// index.tsx
import React, { FC, useState } from 'react';
import Head from 'next/head';
import { RootStateOrAny, useSelector } from 'react-redux';
import AuthPortal from '@src/components/auth';
import LoginPopupButton from '@src/components/common/buttons/loginPopup';
import { CreateAdForm } from '@src/components/common/property_form/createAdForm';
// import axios from 'axios';

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
          ) : (
            <>
              <h1 className="font-bold text-center text-3xl mt-28 mb-10">
                Create New Ad
              </h1>
              <CreateAdForm />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default CreateAdPage;
