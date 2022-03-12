import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Lottie from 'react-lottie-player';
import lottieJson from '@src/components/auth/success-animation.json';
import { setUser } from '@src/store/reducers/userReducer';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';

const AccountVerified: FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user.onboarding) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access_token = params.get('access_token');

    if (access_token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_REST_API}/auth/facebook/callback`, {
          params: { access_token },
        })
        .then((response) => {
          dispatch(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
              onboarding: true,
            })
          );
          setSnackbar({
            status: 'success',
            message: ` Account Created`,
            open: true,
          });
          router.push('/');
        })
        .catch((error) => {
          console.error(error);
          dispatch(
            setSnackbar({
              status: 'error',
              message: 'Connecting to facebook failed, please try again',
            })
          );
        });

      axios
        .get(`${process.env.NEXT_PUBLIC_REST_API}/auth/google/callback`, {
          params: { access_token },
        })
        .then((response) => {
          dispatch(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
              onboarding: true,
            })
          );
          setSnackbar({
            status: 'success',
            message: ` Account Created`,
            open: true,
          });
          router.push('/');
        })
        .catch((error) => {
          console.error(error);
          dispatch(
            setSnackbar({
              status: 'error',
              message: 'Connecting to Google failed, please try again',
            })
          );
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Safe Haven | Verification Successfull</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="Reset your password" />
      </Head>
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
