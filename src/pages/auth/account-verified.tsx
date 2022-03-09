import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, RootStateOrAny } from 'react-redux';
import Lottie from 'react-lottie-player';
import lottieJson from '@src/components/auth/success-animation.json';

const AccountVerified: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.onboarding) {
      router.push('/');
    }
  });
  return (
    <>
      <div className="flex flex-col justify-center my-24">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
          <p className="text-2xl font-bold text-center my-6">
            Account Email Successfully Verified!!!
          </p>
          <div className="flex justify-center items-center">
            <Lottie
              loop
              play
              animationData={lottieJson}
              direction={1}
              style={{
                width: 150,
                height: 150,
                marginBottom: 10,
                alignSelf: 'center',
              }}
            />
          </div>
          <p className="text-base font-normal text-center px-4">
            Your email has been verified. You can login to your account now
          </p>
          <p className="text-base font-normal text-center px-4">
            We are pleased to have you onboard 😊
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountVerified;
